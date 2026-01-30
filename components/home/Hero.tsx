import React from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'
import HeroCarousel from './HeroCarousel'

function Hero() {
  return (
    <section className='grid grid-cols-1 lg:grid-cols-2 gap-24 items-center'>
      <div>
        <h1 className="max-w-2xl font-bold text-4xl tracking-tight sm-text-6xl">
          We are changing the people shop
        </h1>
        <p className="mt-8 max-w-xl text-lg leading-8 text-muted-foreground">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iste quis eum repellat, ullam, debitis modi maxime aut harum reprehenderit pariatur voluptatibus eos maiores voluptatum quisquam doloribus cum non iure. Ducimus!
          Alias earum ex in consectetur magnam culpa dolor doloremque tempora corrupti aperiam assumenda atque fuga dignissimos quod accusamus, fugit iusto distinctio dolores eveniet aliquid autem vel omnis? Dicta, at sapiente.
        </p>
        <Button asChild size='lg' className='mt-10'>
          <Link href='/products'>Our Products</Link>
        </Button>
      </div>
      <HeroCarousel/>
    </section>
  )
}

export default Hero