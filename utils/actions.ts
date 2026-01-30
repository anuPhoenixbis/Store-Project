import db from '@/utils/db'
import { redirect } from 'next/navigation'

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

export const fetchAllProducts = ({search}:{search:string})=>{
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