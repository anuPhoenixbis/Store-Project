'use client'
import { SignOutButton } from "@clerk/nextjs"
import Link from "next/link"
import { toast } from "sonner"

function SignOutLink() {
  const handleLogout = () =>{
    toast.success('Logout Successful',{ position: 'bottom-right' })
  }
  return (
    <SignOutButton>
      <Link href='/' className="w-full text-left capitalize" onClick={handleLogout}>log out</Link>
    </SignOutButton>
  )
}

export default SignOutLink