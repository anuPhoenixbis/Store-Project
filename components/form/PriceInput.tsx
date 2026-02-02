import React from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Prisma } from '@prisma/client'

// this way we can directly use the props we have setup in prisma here as well
// Prisma.ProductScalarFieldEnum.price

const name ='price'
type FormInputNumberProps = {
  defaultValue?: number
}

function PriceInput({defaultValue}:FormInputNumberProps) {
  return (
    <div className='mb-2'>
      <Label htmlFor={name} className='capitalize pb-2'>Price (Rs.)</Label>
      <Input
        id={name}
        type='number'
        name={name}
        min={0}
        defaultValue={defaultValue || 100}
        required
      />
    </div>
  )
}

export default PriceInput