import { LuShoppingCart } from "react-icons/lu";
import { Button } from "../ui/button";
import Link from "next/link";

async function CartButton() {
  const numItemsInCart = 5
  return (
    <Button asChild size="icon" className="indicator">
      <Link href='/cart'>
        {/* Button asChild means using the styles of Button but the logic of the inside elems */}
        <LuShoppingCart className="h-5 w-5" />
        <div className="badge badge-sm w-6 h-6 rounded-full indicator-item">{numItemsInCart}</div>
      </Link>
    </Button>
  )
}

export default CartButton