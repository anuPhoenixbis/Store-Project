/* eslint-disable @typescript-eslint/no-explicit-any */
'use server'

import db from '@/utils/db'
import { auth, currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { imageSchema, productSchema, reviewSchema, validateWithZodSchema } from './schema'
import { deleteImage, uploadImage } from './supabase'
import { revalidatePath } from 'next/cache'
import { Cart, CartItem, Product } from '@prisma/client'

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

export type CartWithItems = Cart & {
  cartItems: (CartItem & {
    product: Product
  })[]
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

export const fetchAdminProductDetails = async(productId:string)=>{
    await getAdminUser()
    const product = await db.product.findUnique({
        where:{
            id:productId
        }
    })
    if(!product) redirect('/admin/products')
    return product
}

export const updateProductAction = async(
    prevState: any,
    formData: FormData
) =>{
    await getAdminUser()
    try {
        const productId = formData.get('id') as string;
        const rawData = Object.fromEntries(formData)
        const validateFields = validateWithZodSchema(productSchema,rawData)
        await db.product.update({
            where:{
                id:productId
            },
            data:{
                ...validateFields,
            }
        })
        revalidatePath(`/admin/products/${productId}/edit`)
        return { message: 'Product updated successfully' }
    } catch (error) {
        return renderError(error)
    }
}

export const updateProductImageAction = async(
    prevState: any,
    formData: FormData
)=>{
    await getAuthUser()
    try {
        const image = formData.get('image') as File
        const productId = formData.get('id') as string
        const oldImageUrl = formData.get('url') as string
        const validatedFile = validateWithZodSchema(imageSchema,{image})
        const fullPath = await uploadImage(validatedFile.image)
        await deleteImage(oldImageUrl)
        await db.product.update({
            where:{
                id: productId,
            },
            data:{
                image: fullPath
            }
        })
        revalidatePath(`/admin/products/${productId}/edit`)
        return { message: 'Product Image updated successfully' }
    } catch (error){
        return renderError(error)
    }
}

export const fetchFavoriteId = async({productId}:{productId:string})=>{
    const user = await getAuthUser()
    const favorite = await db.favorite.findFirst({
        where:{
            productId,
            clerkId: user.id
        },
        select:{
            id:true
        }
    })
    return favorite?.id || null;
}

export const toggleFavoriteAction = async(prevState:{
    productId:string,
    favoriteId:string | null,
    pathname:string
}) =>{
    const user = await getAuthUser()
    const {productId,favoriteId,pathname} = prevState
    try {
        if(favoriteId){
            await db.favorite.delete({
                where:{
                    id: favoriteId
                }
            })
        }else{
            await db.favorite.create({
                data:{
                    productId,
                    clerkId: user.id
                }
            })
        }
        revalidatePath(pathname)//moved to the current path 
        return {message:favoriteId ? 'removed from faves' : 'added to faves'}
    } catch (error) {
        return renderError(error)
    }
}

export const fetchUserFavorites = async()=>{
    const user = await getAuthUser()
    const favorites = await db.favorite.findMany({
        where:{
            clerkId: user.id,
        },
        include:{
            product: true,
        }
    })
    return favorites
}

export const createReviewAction = async(prevState:any,formData:FormData)=>{
    const user = await getAuthUser()
    try {
        const rawData = Object.fromEntries(formData)
        const validateFields = validateWithZodSchema(reviewSchema,rawData)
        await db.review.create({
            data:{
                ...validateFields,
                clerkId: user.id
            }
        })
        revalidatePath(`/products/${validateFields.productId}`)
        return {message:'review submitted successfully'}
    } catch (error) {
        return renderError(error)
    }
}

export const fetchProductReview = async(productId:string)=>{
    const reviews = await db.review.findMany({
        where:{
            productId
        },
        orderBy:{
            createdAt: 'desc'
        }
    })
    return reviews
}
export const fetchProductRating = async(productId:string)=>{
    const result = await db.review.groupBy({
        by: ['productId'],
        _avg:{
            rating:true
        },
        _count:{
            rating:true
        },
        where:{productId}
    })
    return {
        rating : result[0]?._avg.rating?.toFixed(1) ?? 0,
        count: result[0]?._count.rating ?? 0
    }
}
export const fetchProductReviewByUser = async()=>{
    const user = await getAuthUser()
    const reviews = await db.review.findMany({
        where:{
            clerkId:user.id,
        },
        select:{
            id:true,
            rating:true,
            comment:true,
            product:{
                select:{
                    image:true,
                    name:true,
                }
            }
        }
    })
    return reviews
}
export const deleteReviewAction = async(prevState:{reviewId:string})=>{
    const {reviewId} = prevState
    const user = await getAuthUser()
    try {
        await db.review.delete({
            where:{
                id:reviewId,
                clerkId: user.id,
            }
        })
        revalidatePath('/reviews')
        return {message:'review deleted successfully'}
    } catch (error) {
        return renderError(error)
    }
}
export const findExistingReview = async(userId:string,productId:string)=>{
    return db.review.findFirst({
        where:{
            clerkId:userId,
            productId
        }
    })
    //if this returns true then we can't give a review to the product
}


export const fetchCartItems = async()=>{
    const {userId} = await auth()
    const cart = await db.cart.findFirst({
        where:{
            clerkId : userId ?? ''
        },
        select:{
            numItemsInCart:true//just passing the no of cart items 
        }
    })
    // 0 happens when there is no user (not logged in) yet
    return cart?.numItemsInCart || 0;
}
// just to check if the provided productId fetches an actual product from the db or not

const fetchProduct = async (productId: string) => {
  const product = await db.product.findUnique({
    where: {
      id: productId,
    },
  });

  if (!product) {
    throw new Error('Product not found');
  }
  return product;
};
const includeProductClause = {
  cartItems: {
    include: {
      product: true,
    },
  },
};

/*
The critical function: fetchOrCreateCart

What it did:

1.Found or created a cart
2.Returned it with cartItems included
3.Returned cached totals without recomputing them

So it returned an object that looked complete… but wasn’t.

#This is the key failure: A function returned an object that looked authoritative, but wasn’t.

#Derived data must never be trusted unless it was just computed or transactionally guaranteed.

If a value can be recomputed from other rows:

1.It is not authoritative
2.It is not safe to trust
3.It must be explicitly refreshed

This rule applies to:

1.carts
2.totals
3.counts
4.balances
5.analytics
6.inventory
Every system.

| Function             | Role             |
| -------------------- | ---------------- |
| `fetchOrCreateCart`  | Existence only   |
| `updateCartTotals`   | Mutation only    |
| `fetchCartWithItems` | Read-only for UI |

*/

// previously this function was fetching and values thinking the derived values can lead to current updated values from db but instead it called the stale cache values again
// it never showed up in the cart
// make this a fetch function only from the db 
// setting up new update and fetch updated cart functions as well
// to update the UI 
// we might happen to remove the last item in the cart then we must empty the entire cart or we just remove a singular item from the cart
export const fetchOrCreateCart = async ({
  userId,
  errorOnFailure = false,
}: {
  userId: string;
  errorOnFailure?: boolean;
}) => {
  let cart = await db.cart.findFirst({
    where: {
      clerkId: userId,
    }
  });

  if (!cart && errorOnFailure) {
    throw new Error('Cart not found');
  }

  if (!cart) {
    cart = await db.cart.create({
      data: {
        clerkId: userId,
      }
    });
  }

  return cart;
};

// fetch the updated cart items and values
export const fetchCartWithItems = async(
    cartId:string,
): Promise<CartWithItems> =>{
    const cart = await db.cart.findUnique({
        where: {id:cartId},
        include: includeProductClause
    })
    
    if(!cart) throw new Error('Cart not found')
    return cart
}

// function to mutate totals or cart values
export const updateCartTotals = async(cartId: string)=>{
    const cartItems = await db.cartItem.findMany({
        where: {cartId},
        include: {product:true}
    })

    let numItemsInCart = 0;
    let cartTotal = 0;

    for(const item of cartItems){
        numItemsInCart+=item.amount
        cartTotal += item.amount * item.product.price
    }

    const cart = await db.cart.findUnique({
        where: {id: cartId}
    })
    if(!cart) return 

    const tax = cart.taxRate * cartTotal
    const shipping = cartTotal ? cart.shipping : 0
    const orderTotal = cartTotal + tax + shipping

    await db.cart.update({
        where:{ id: cartId },
        data:{
            numItemsInCart,
            cartTotal,
            tax,
            orderTotal
        }
    })
}

// once the cart is created we gotta update the cart with the provided cartId or create a new cartItem using the cartId

const updateOrCreateCartItem = async ({
  productId,
  cartId,
  amount,
}: {
  productId: string;
  cartId: string;
  amount: number;
}) => {
  let cartItem = await db.cartItem.findFirst({
    where: {
      productId,
      cartId,
    },
  });

  if (cartItem) {
    cartItem = await db.cartItem.update({
      where: {
        id: cartItem.id,
      },
      data: {
        amount: cartItem.amount + amount,
      },
    });
  } else {
    cartItem = await db.cartItem.create({
      data: { amount, productId, cartId },
    });
  }
};

// update the cart values with the updated values

// export const updateCart = async (cart: Cart) => {
//   const cartItems = await db.cartItem.findMany({
//     where: {
//       cartId: cart.id,
//     },
//     include: {
//       product: true, // Include the related product
//     },
//   });

//   let numItemsInCart = 0;
//   let cartTotal = 0;

//   for (const item of cartItems) {
//     numItemsInCart += item.amount;
//     cartTotal += item.amount * item.product.price;
//   }
//   const tax = cart.taxRate * cartTotal;
//   const shipping = cartTotal ? cart.shipping : 0;
//   const orderTotal = cartTotal + tax + shipping;

//   await db.cart.update({
//     where: {
//       id: cart.id,
//     },
//     data: {
//       numItemsInCart,
//       cartTotal,
//       tax,
//       orderTotal,
//     },
//   });
// };

export const addToCartAction = async (prevState: any, formData: FormData) => {
  const user = await getAuthUser();
  try {
    const productId = formData.get('productId') as string;
    const amount = Number(formData.get('amount'));
    await fetchProduct(productId);
    const cart = await fetchOrCreateCart({ userId: user.id });
    // await updateOrCreateCartItem({ productId, cartId: cart.id, amount });
    await updateOrCreateCartItem({
        productId,
        cartId: cart.id,
        amount
    })
    await updateCartTotals(cart.id);
  } catch (error) {
    return renderError(error);
  }
  redirect('/cart');
};

export const removeCartItemAction = async(
    prevState:any,
    formData:FormData
)=>{
    const user = await getAuthUser()
    try {
        const cartItemId = formData.get('id') as string
        const cart = await fetchOrCreateCart({
            userId: user.id,
            errorOnFailure:true
        })
        await db.cartItem.delete({
            where:{
                id:cartItemId,
                cartId: cart.id
            }
        })
        await updateCartTotals(cart.id)
        revalidatePath('/cart')
        return {message:'Item removed from cart'}
    } catch (error) {
        return renderError(error)
    }
}

export const updateCartItemAction = async({
    amount,
    cartItemId,
}:{
    amount:number,
    cartItemId:string,
})=>{
    const user = await getAuthUser()
    try {
        const cart = await fetchOrCreateCart({userId:user.id,errorOnFailure:true})
        await db.cartItem.update({
            where:{
                id:cartItemId,
                cartId:cart.id,
            },
            data:{
                amount,
            }
        })
        await updateCartTotals(cart.id)
        revalidatePath('/cart')
        return {message:'cart updated'}
    } catch (error) {
        return renderError(error)
    }
}


export const createOrderAction = async(prevState:any,formData:FormData)=>{
    return {message:'order created'}
}