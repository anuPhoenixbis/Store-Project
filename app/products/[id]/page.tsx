import FavoriteToggleButton from '@/components/products/FavoriteToggleButton';
import AddToCart from '@/components/single_product/AddToCart';
import BreadCrumbs from '@/components/single_product/BreadCrumbs';
import ProductRating from '@/components/single_product/ProductRating';
import { fetchSingleProduct } from '@/utils/actions'
import { formatCurrency } from '@/utils/format';
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
                    <FavoriteToggleButton productId={id}/>
                </div>
                <ProductRating productId={id}/>
                <h4 className="text-xl mt-2">{company}</h4>
                <p className="mt-3 text-md bg-muted inline-block p-2 rounded">{rupeesAmt}</p>
                <p className="mt-6 leading-8 text-muted-foreground">{description}</p>
                <AddToCart productId={id} />
            </div>
        </div>
    </section>
  )
}

export default SingleProductPage