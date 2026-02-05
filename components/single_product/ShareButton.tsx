'use client'

import { MdIosShare } from "react-icons/md";
import { Button } from "../ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import {
    TelegramIcon,
  TelegramShareButton,
  ThreadsIcon,
  ThreadsShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";

function ShareButton({
    productId,
    name
} : {
    productId:string,
    name:string
}) {
    const url = process.env.WEBSITE_URL
    const shareLink = `${url}/products/${productId}`
  return (
    <Popover>
        <PopoverTrigger>
            <Button asChild variant='outline' size='icon' className="p-2">
                <MdIosShare />
            </Button>
        </PopoverTrigger>
        <PopoverContent side='top' align="end" sideOffset={10} className="flex items-center gap-x-2 justify-center w-full">
            <TwitterShareButton url={shareLink} title={name}>
                <TwitterIcon size={32} round/>
            </TwitterShareButton>
            <TelegramShareButton url={shareLink} title={name}>
                <TelegramIcon size={32} round/>
            </TelegramShareButton>
            <ThreadsShareButton url={shareLink} title={name}>
                <ThreadsIcon size={32} round/>
            </ThreadsShareButton>
            <WhatsappShareButton url={shareLink} title={name}>
                <WhatsappIcon size={32} round/>
            </WhatsappShareButton>
        </PopoverContent>
    </Popover>
  )
}

export default ShareButton