import { Prisma } from "@prisma/client";

/* eslint-disable @typescript-eslint/no-explicit-any */
export type actionFunction = (
  prevState: any,
  formData: FormData
) => Promise<{ message: string }>;

// while displaying the cartItems we also require the info for their respective products
// thus, we require this type
export type CartItemWithProduct = Prisma.CartItemGetPayload<{
  include:{product:true}
}>

export type CartItem = {
  productId: string;
  image: string;
  title: string;
  price: string;
  amount: number;
  company: string;
};

export type CartState = {
  cartItems: CartItem[];
  numItemsInCart: number;
  cartTotal: number;
  shipping: number;
  tax: number;
  orderTotal: number;
};