import { FaHeart, FaRegHeart } from "react-icons/fa";
import { Button } from "../ui/button";

function FavoriteToggleButton({productId}:{productId:string}) {
  return (
    <Button className='p-2 cursor-pointer btn-soft btn-neutral' size='icon' variant='outline'>
      <FaHeart/>
    </Button>
  )
}

export default FavoriteToggleButton