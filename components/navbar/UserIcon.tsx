import { auth, currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import { LuUser } from "react-icons/lu";

async function UserIcon() {
  // const { userId } = auth()//this is just to fetch the userId of the current user and not the entire user's info
  const user = await currentUser()//this clerk util func fetches us all the info about the user
  const profileImage = user?.imageUrl;//using optional chaining incase the user is null
  if(profileImage){
    return <Image src={profileImage} alt='user profile' className="w-6 h-6 rounded-full object-cover" width={6} height={6}/>
  }
  return (
    <LuUser className="w-6 h-6 bg-primary rounded-full text-white" />
  )
}

export default UserIcon