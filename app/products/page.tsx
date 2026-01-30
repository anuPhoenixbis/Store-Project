import ProductsContainer from '@/components/products/ProductsContainer';
import React from 'react'

type searchParams={
    layout?:string;
    search?:string
  }

async function ProductsPage({searchParams}:{
  searchParams:Promise<searchParams>
}) {
  // console.log( await searchParams)
  const params = await searchParams;
  const layout = params.layout || 'grid';//for the layout of the products
  const search = params.search || '';//the search query/item
  return (
    <ProductsContainer layout={layout} search={search} /> 
  )
}

export default ProductsPage