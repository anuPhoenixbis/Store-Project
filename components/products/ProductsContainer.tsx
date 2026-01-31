export const dynamic = 'force-dynamic';//to prevent the db call from happening in the build time

import { fetchAllProducts } from '@/utils/actions'
import { BsFillGrid3X3GapFill } from "react-icons/bs";
import { FaList } from "react-icons/fa";
import ProductsGrid from './ProductsGrid'
import ProductsList from './ProductsList'
import { Button } from '../ui/button'
import Link from 'next/link'
import { Separator } from '../ui/separator';

async function ProductsContainer({layout,search}:{
  layout:string,
  search:string
}) {
  const products = await fetchAllProducts({search})//get the products
  const totalProducts = products.length
  const searchTerm = search?`&search=${search}`:'';//if the search isn't an empty string pass the query or else the empty string itself 
  // console.log(searchTerm)
  return (
    <>
      {/* header */}
      <section>
        <div className="flex justify-between items-center">
          <h4 className="font-medium text-lg">
            {totalProducts} Product{totalProducts > 1 ? <span>s</span> :<></> }
          </h4>
          <div className="flex gap-x-4">
            {/* grid button */}
            <Button variant={layout === 'grid' ? 'default' : 'ghost'} size='icon' asChild>
              <Link href={`/products?layout=grid${searchTerm}`} >
                <BsFillGrid3X3GapFill />
              </Link>
            </Button>
            {/* list button */}
            <Button variant={layout === 'list' ? 'default' : 'ghost'} size='icon' asChild>
              <Link href={`/products?layout=list${searchTerm}`} >
                <FaList />
              </Link>
            </Button>
          </div>
        </div>
        <Separator className='mt-4' /> 
      </section>
      {/* products */}
      <div>
        {totalProducts === 0 ? <h5 className='text-2xl mt-16'>Sorry, no products matched your search...</h5> : 
        layout === 'grid' ? <ProductsGrid products={products} /> : <ProductsList products={products} />}
      </div>
    </>
  )
}

export default ProductsContainer