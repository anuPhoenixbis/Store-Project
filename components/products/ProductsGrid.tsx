import { formatCurrency } from '@/utils/format'
import { Product } from '@prisma/client'//getting the type of our created model from prisma
import Link from 'next/link'
import React from 'react'
import { Card, CardContent } from '../ui/card'
import Image from 'next/image'
import FavoriteToggleButton from './FavoriteToggleButton'

function ProductsGrid({products}:{products:Product[]}) {
  return (
    <div className='pt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
      {products.map((product)=>{
        const {name,price,image} = product
        const productId = product.id
        const rupeesAmt = formatCurrency(price)

        return <article key={productId} className='group relative'>
          <Link href={`/products/${productId}`}>
          <Card className='transform ease-in-out group-hover:shadow-xl transition-shadow duration-500'>
            <CardContent className='p-4'>
              <div className="relative h-64 md:h-48 rounded-box overflow-hidden">
                <Image src={image} alt={name} fill sizes='(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw' priority className='rounded-box w-full object-cover transform group-hover:scale-110 transition-transform duration-500'/>
              </div>
              <div className='mt-4 text-center'>
                <h2 className="text-lg capitalize">{name}</h2>
                <p className="text-muted-foreground mt-2">{rupeesAmt}</p>
              </div>
            </CardContent>
          </Card>
          </Link>
          {/* placing the fav btn outside link so that on clicking it we don't wanna travel to product's page
           thus article is made relative to make this position of this btn absolute */}
          <div className="absolute top-12 right-6 z-5">
            <FavoriteToggleButton productId={productId}/>
          </div>
        </article>
      })}
    </div>
  )
}

export default ProductsGrid