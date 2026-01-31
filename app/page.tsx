import LoadingContainer from '@/components/global/LoadingContainer'
import FeaturedProducts from '@/components/home/FeaturedProducts'
import Hero from '@/components/home/Hero'
import { Suspense } from 'react'

function HomePage() {
  return (
    <>
      <Hero/>
      {/* suspense doesn't prevent build time execution so the db call occurs at build time no matter the suspense thus the issue during the vercel deployment  */}
      <Suspense fallback={<LoadingContainer/>}>
        <FeaturedProducts/>
      </Suspense>
    </>
  )
}

export default HomePage