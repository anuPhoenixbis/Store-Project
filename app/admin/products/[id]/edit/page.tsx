export const dynamic = 'force-dynamic';

import { SubmitButton } from '@/components/form/Buttons';
import CheckBoxInput from '@/components/form/CheckBoxInput';
import FormContainer from '@/components/form/FormContainer';
import FormInput from '@/components/form/FormInput';
import ImageInputContainer from '@/components/form/ImageInputContainer';
import PriceInput from '@/components/form/PriceInput';
import TextAreaInput from '@/components/form/TextAreaInput';
import { fetchAdminProductDetails, updateProductAction, updateProductImageAction } from '@/utils/actions';
import React from 'react'

async function EditProductPage({params} : {params:Promise<{id:string}>}) {
  const {id} = await params;
  const product = await fetchAdminProductDetails(id);
  const {name,company,description,featured,price} = product;
  return (
    <section>
      <h1 className="text-2xl font-semibold mb-8 capitalize">update product</h1>
      <div className="border p-8 rounded">
        {/* image input container */}
        <ImageInputContainer action={updateProductImageAction} name={name} image={product.image} text='update image'>
          {/* these 2 hidden input will be automatically filled when image is added
          id will be used to locate the admin's bucket of image
          url wil be used to replace the current url with the new url
          */}
          <input type="hidden" name='id' value={id} />
          <input type="hidden" name='url' value={product.image} />
        </ImageInputContainer>
        <FormContainer action={updateProductAction}>
          <div className="grid gap-4 md:grid-cols-2 my-4">
            <input type="hidden" name='id' value={id} />
            <FormInput type='text' name='name' label='product name' defaultValue={name} />
            <FormInput type='text' name='company' defaultValue={company} />
            <PriceInput defaultValue={price} />
          </div>
          <TextAreaInput name='description' labelText='product description' defaultValue={description} />
          <div className="mt-6">
            <CheckBoxInput name='featured' label='featured' defaultChecked={featured} />
          </div>
          <SubmitButton text='update product' className='mt-8' />
        </FormContainer>
      </div>
    </section>
  )
}

export default EditProductPage