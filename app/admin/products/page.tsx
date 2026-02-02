import { IconButton } from '@/components/form/Buttons'
import FormContainer from '@/components/form/FormContainer'
import EmptyList from '@/components/global/EmptyList'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { deleteProductAction, fetchAdminProducts } from '@/utils/actions'
import { formatCurrency } from '@/utils/format'
import Link from 'next/link'
import React from 'react'

async function AdminProductsPage() {
  const items = await fetchAdminProducts()
  if(items.length === 0) return <EmptyList/>
  return (
    <section>
        <Table>
          <TableCaption className='capitalize'>
            total product{items.length === 1 ? <span></span> : <span>s</span>} : {items.length}
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Product Name</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item)=>{
              const {name, id:productId,company,price} = item
              return <TableRow key={productId}>
                <TableCell>
                  <Link href={`/products/${productId}`} className='text-muted-foreground tracking-wide capitalize' >
                    {name}
                  </Link>
                </TableCell>
                <TableCell>{company}</TableCell>
                <TableCell>{formatCurrency(price)}</TableCell>
                <TableCell className='flex items-center gap-x-2'>
                  <Link href={`/admin/products/${productId}/edit`}>
                    <IconButton actionType='edit' />
                  </Link>
                  <DeleteProduct productId={productId} />
                </TableCell>
              </TableRow>
            })}
          </TableBody>
        </Table>
    </section>
  )
}

function DeleteProduct({productId}:{productId:string}){
  const deleteProduct  = deleteProductAction.bind(null,{productId})//the bind function takes 2 params : 1 returns the value of the passed param(productId) and other the default param(null)
  // when productId is null then this runs
  return <FormContainer action={deleteProduct}>
    <IconButton actionType='delete'/>
  </FormContainer>
}

export default AdminProductsPage