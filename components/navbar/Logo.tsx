import React from 'react'
import { RiShoppingBag3Fill } from "react-icons/ri";
import { Button } from '../ui/button';
import Link from 'next/link';


function Logo() {
  return (
    <Button size='icon-lg' asChild>
      <Link href='/'>
        <RiShoppingBag3Fill className='h-6 w-6' />
      </Link>
    </Button>
  )
}

export default Logo