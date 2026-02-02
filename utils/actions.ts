'use server'

import db from '@/utils/db'
import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { imageSchema, productSchema, validateWithZodSchema } from './schema'
import { deleteImage, uploadImage } from './supabase'
import { revalidatePath } from 'next/cache'

const getAuthUser = async() =>{
    const user = await currentUser()
    if(!user) redirect('/')//simple escape is the current user returned by clerk becomes null
    return user; 
}

const getAdminUser = async() =>{
    const user = await getAuthUser()
    if(user.id !== process.env.ADMIN_USER) redirect('/')//if somehow a regular user gets the access of the admin dashboard we wanna redirect them back to home
    return user;
}

const renderError = (error:unknown):{message:string} =>{
    console.log(error)
    return{
        message: error instanceof Error ? error.message : 'an error occurred'
    }
}

export const fetchFeaturedProducts = async()=>{
    const products = await db.product.findMany({
        where:{
            featured: true//get the products whose featured is true
        }
        // ,select:{
        //     name:true//to specify the props we need from the filtered products(here name)
        // }
    })
    return products
}

export const fetchAllProducts = async ({search}:{search:string})=>{
    return db.product.findMany({//returns all the prods which will be ordered according to "createdAt" in desc order 
        where:search ? {
            // returns all the products whose product's name contains 'search text' or product's company contains the search text
            // case insensitive
            OR:[
                {name:{contains:search,mode:'insensitive'}},
                {company:{contains:search,mode:'insensitive'}},
            ]
        } : undefined,
        orderBy:{
            createdAt: 'desc'
        }
    })
}

export const fetchSingleProduct = async(productId:string)=>{
    const product = await db.product.findUnique({
        where:{
            id:productId
        }
    })
    if(!product) redirect('/products')
    return product
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createProductAction = async(prevState:any,formData:FormData) : Promise<{message:string}> =>{
    const user = await getAuthUser()
    try {
        const rawData = Object.fromEntries(formData)
        // console.log(rawData)
        const file = formData.get('image') as File//extracting the image separately to validate separately
        // const validateFields = productSchema.parse(rawData);//zod will parse our data based on the schema
        const validateFields = validateWithZodSchema(productSchema,rawData)
        const validatedFile = validateWithZodSchema(imageSchema,{image:file})
        // console.log(validatedFile)
        const fullPath = await uploadImage(validatedFile.image)
        await db.product.create({
            data:{
                ...validateFields,//all the regular key-value pairs from the formData along with image url and clerkId
                image:fullPath,
                clerkId:user.id
            }
        })
    } catch (error) {
        console.log(error)
        return renderError(error)
    }
    redirect('/admin/products')
}

export const fetchAdminProducts = async()=>{
    await getAdminUser();
    const products = await db.product.findMany({
        orderBy:{
            createdAt: 'desc'
        }
    })
    return products
}

export const deleteProductAction = async(prevState:{productId:string})=>{
    const {productId} = prevState;
    await getAdminUser()
    try {
        const product = await db.product.delete({
            where:{
                id:productId
            }
        })
        await deleteImage(product.image)
        revalidatePath('/admin/products')
        return {message: 'product removed'}
    } catch (error) {
        return renderError(error)
    }
}