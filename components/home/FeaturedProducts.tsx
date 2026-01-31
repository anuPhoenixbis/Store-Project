export const dynamic = 'force-dynamic';//prevent the db call from happening in build time
// Do NOT execute this component at build time.
// Execute it only at request time.

import { fetchFeaturedProducts } from '@/utils/actions'
import React from 'react'
import EmptyList from '../global/EmptyList';
import SectionTitle from '../global/SectionTitle';
import ProductsGrid from '../products/ProductsGrid';

async function FeaturedProducts() {
  const products = await fetchFeaturedProducts();
  if(products.length === 0 ) return <EmptyList/>
  return (
    <section className='pt-24'>
      <SectionTitle text='featured products'/>
      <ProductsGrid products={products}/>
    </section>
  )
}

export default FeaturedProducts