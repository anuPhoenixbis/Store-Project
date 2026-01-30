import React, { Suspense } from 'react'
import Container from '../global/Container'
import Logo from './Logo'
import NavSearch from './NavSearch'
import CartButton from './CartButton'
import DarkMode from './DarkMode'
import LinksDropdown from './LinksDropdown'

function Navbar() {
  return (
    <nav className='border-b'>
      <Container className='flex flex-col sm:flex-row gap-4 sm:justify-between sm:items-center flex-wrap py-8'>
        <Logo/>
        {/* NavSearch being a sever component and about being a client component and we display navSearch almost every where in the app
          so this will create conflicts during the deployment making navSearch to be client-side rendered which we don't want so we gotta wrap 
          it around Suspense do its sever side work whilst the client side : about page renders */}
        <Suspense>
          <NavSearch/>
        </Suspense>
        <div className="flex gap-4 items-center">
          <CartButton/>
          <DarkMode/>
          <LinksDropdown/>
        </div>
      </Container>
    </nav>
  )
}

export default Navbar