import img1 from '@/public/hero1.jpg'
import img2 from '@/public/hero2.jpg'
import img3 from '@/public/hero3.jpg'
import img4 from '@/public/hero4.jpg'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../ui/carousel'
import { Card, CardContent } from '../ui/card'
import Image from 'next/image'

const carouselImages = [img1,img2,img3,img4]

function HeroCarousel() {
  return (
    <div className='hidden lg:block'>
      <Carousel>
        <CarouselContent>
          {carouselImages.map((image,index)=>{
            return <CarouselItem key={index}>
              <Card>
                <CardContent className='p-2'>
                  <Image src={image} alt='hero' className='w-full h-96 rounded-selector object-cover'/>
                </CardContent>
              </Card>
            </CarouselItem>
          })}
        </CarouselContent>
        <CarouselPrevious/>
        <CarouselNext/>
      </Carousel>
    </div>
  )
}

export default HeroCarousel