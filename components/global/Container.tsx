import { cn } from '@/lib/utils'
import React from 'react'

/**
What cn() Actually Does

Given this:

cn(
  "px-4 py-2",
  isActive && "bg-blue-500",
  isDisabled && "opacity-50"
)


It returns:

"px-4 py-2 bg-blue-500"


(if isActive === true)

And with Tailwind merging:
cn("px-4", "px-8")


returns:

"px-8"


instead of "px-4 px-8".

That’s huge for Tailwind correctness.
 */

function Container({children,className}:{children:React.ReactNode,className?:string}) {
  return (
    <div className={cn('mx-auto max-w-6xl xl:max-w-7xl px-8',className)}>
        {/* inside cn if the "className" exists it will be added to the class of the div thats why the className is optional */}
        {children}
        {/* the children will be all the components rendered inside the container tag of Navbar */}
    </div>
  )
}

export default Container