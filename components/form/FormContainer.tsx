'use client'

import { actionFunction } from "@/utils/types"
import { useActionState, useEffect } from "react"
import { toast } from "sonner"

const initialState = {
  message : ''
}

function FormContainer({
  action,
  children
} : {
  action: actionFunction,
  children : React.ReactNode
}) {
  // this hook will be use to look out for which action we are performing on the form
  const [state,formAction] = useActionState(action,initialState)
  useEffect(()=>{
    if(state.message){
      toast(state.message)
    }
  },[state])
  return (
    <form action={formAction}>
      {children}
    </form>
  )
}

export default FormContainer