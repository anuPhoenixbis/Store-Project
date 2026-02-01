import { Button } from "@/components/ui/button"
import { CgDetailsMore } from "react-icons/cg";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  LogOutIcon,
} from "lucide-react"
import { links } from "@/utils/links";
import Link from "next/link";
import UserIcon from "./UserIcon";
import { SignedIn, SignedOut, SignInButton, SignUpButton } from "@clerk/nextjs";
import SignOutLink from "./SignOutLink";

export default function LinksDropdown() {
  return (
    <DropdownMenu>
      {/* menu trigger button */}
      <DropdownMenuTrigger asChild>
        <Button size="lg" variant="outline">
          <CgDetailsMore />
          <UserIcon/>
        </Button>
      </DropdownMenuTrigger>
      {/* menu content */}
      <DropdownMenuContent align="start" className="w-40" sideOffset={10}>
        {/* signedOut holds the links which will appear when signedOut and vice-verse for signedIn */}
        <SignedOut>
          <DropdownMenuItem>
            <SignInButton mode="redirect">
              <button className="w-full text-left">
                Login
              </button>
            </SignInButton>
          </DropdownMenuItem>
          <DropdownMenuSeparator/>
          <DropdownMenuItem>
            <SignUpButton mode="redirect">
              <button className="w-full text-left">
                Sign Up
              </button>
            </SignUpButton>
          </DropdownMenuItem>
        </SignedOut>
        <SignedIn>
          {links.map((link)=>{
            return (<Link key={link.href} href={link.href}>
              <DropdownMenuItem className="capitalize w-full">
                {link.label}
              </DropdownMenuItem>
            </Link>)
          })}
        </SignedIn>
        <DropdownMenuSeparator/>
        <DropdownMenuItem variant="destructive">
          <LogOutIcon />
          <SignOutLink/>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
