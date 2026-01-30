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
  CreditCardIcon,
  LogOutIcon,
  SettingsIcon,
  UserIcon,
} from "lucide-react"
import { links } from "@/utils/links";
import Link from "next/link";

export default function LinksDropdown() {
  return (
    <DropdownMenu>
      {/* menu trigger button */}
      <DropdownMenuTrigger asChild>
        <Button size="icon-lg" variant="outline">
          <CgDetailsMore />
        </Button>
      </DropdownMenuTrigger>
      {/* menu content */}
      <DropdownMenuContent align="start" className="w-40" sideOffset={10}>
        {links.map((link)=>{
          return (<Link key={link.href} href={link.href}>
            <DropdownMenuItem className="capitalize w-full">
              {link.label}
            </DropdownMenuItem>
          </Link>)
        })}
        <DropdownMenuSeparator/>
        <DropdownMenuItem variant="destructive">
          <LogOutIcon />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
