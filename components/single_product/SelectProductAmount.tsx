import React from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'

export enum Mode {
    SingleProduct = 'singleProduct',
    CartItem = 'cartItem'
}

type SelectProductAmountProps = {
    mode: Mode.SingleProduct,
    amount: number,
    setAmount: (value: number) => void//it is set to be a function instead of a number becoz we are also using it in cart while updating 
}

type SelectCartItemAmountProps = {
    mode: Mode.CartItem,
    amount: number,
    setAmount: (value:number) => Promise<void>,
    isLoading: boolean
}

function SelectProductAmount(props:SelectCartItemAmountProps | SelectProductAmountProps) {
    const {mode,amount,setAmount} = props;
    const cartItem = mode === Mode.CartItem;
  return (
    <>
        <h4 className="mb-2">Amount : </h4>
        <Select 
            defaultValue={amount.toString()} 
            onValueChange={(value)=>setAmount(Number(value))} 
            disabled={cartItem ? props.isLoading : false}
            >
                {/* this disabled happens when the props are cartItems , thus editing items' count */}
                <SelectTrigger className={cartItem ? 'w-25' : 'w-40'}>
                    <SelectValue placeholder={amount} />
                </SelectTrigger>
                <SelectContent>
                    {Array.from({length:cartItem ? amount+10 : 10},(_,index)=>{
                        const selectValue = (index+1).toString()
                        return <SelectItem key={selectValue} value={selectValue}>{selectValue}</SelectItem>
                    })}
                </SelectContent>
        </Select>
    </>
  )
}

export default SelectProductAmount