export const dynamic = 'force-dynamic';

import FavoriteToggleButton from '@/components/products/FavoriteToggleButton';
import ProductReviews from '@/components/reviews/ProductReviews';
import SubmitReview from '@/components/reviews/SubmitReview';
import AddToCart from '@/components/single_product/AddToCart';
import BreadCrumbs from '@/components/single_product/BreadCrumbs';
import ProductRating from '@/components/single_product/ProductRating';
import ShareButton from '@/components/single_product/ShareButton';
import { fetchSingleProduct, findExistingReview } from '@/utils/actions'
import { formatCurrency } from '@/utils/format';
import { auth } from '@clerk/nextjs/server';
import Image from 'next/image';
import React from 'react'

type PageProps = {
    params : Promise<{id:string}>
}

async function SingleProductPage({params}:PageProps) {
    const {id} = await params;
    const product = await fetchSingleProduct(id);
    const {name,image,company,description,price} = product;
    const rupeesAmt = formatCurrency(price);
    const {userId} = await auth()
    // if the userId DNE then we won't find whether the review by the userId is given for the productId or not or else vice-versa
    const reviewDNE = userId && !(await findExistingReview(userId,product.id))
  return (
    <section>
        <BreadCrumbs name={name}/>
        <div className="mt-6 grid gap-y-8 lg:grid-cols-2 lg:gap-x-16">
            {/* img 1st col */}
            <div className="relative h-full">
                <Image 
                    src={image} 
                    alt={name} 
                    fill 
                    sizes='(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw' 
                    priority 
                    className='w-full rounded object-cover' 
                />
            </div>
            {/* img 2nd col */}
            <div>
                <div className="flex gap-x-8 items-center">
                    <h1 className="capitalize text-3xl font-bold">{name}</h1>
                    <div className='flex items-center gap-x-2'>
                        <FavoriteToggleButton productId={id}/>
                        <ShareButton name={product.name} productId={id} />
                    </div>
                </div>
                <ProductRating productId={id}/>
                <h4 className="text-xl mt-2">{company}</h4>
                <p className="mt-3 text-md bg-muted inline-block p-2 rounded">{rupeesAmt}</p>
                <p className="mt-6 leading-8 text-muted-foreground">{description}</p>
                <AddToCart productId={id} />
            </div>
        </div>
        <ProductReviews productId={id}/>
        {/* renders the submit review button iff user exists and review is previously not given */}
        {reviewDNE && <SubmitReview productId={id}/>}
    </section>
  )
}

export default SingleProductPage