import { createClient } from '@supabase/supabase-js'
const bucket = 'main-bucket'

export const supabase = createClient(
    process.env.SUPABASE_URL as string,
    process.env.SUPABASE_KEY as string
)

export const uploadImage = async(image:File)=>{
    const timestamp = Date.now()
    const newName = `${timestamp}-${image.name}`//doing a custom naming of the image as image name along with timestamp
    const {data} = await supabase.storage
    .from(bucket)
    .upload(
        newName,
        image,
        {
            cacheControl: '3600'
        }
    )
    if(!data) throw new Error('Image upload failed')
    return supabase.storage.from(bucket).getPublicUrl(newName).data.publicUrl//returns the url of the uploaded image
}

export const deleteImage = async(url:string)=>{
    // we can get the url of the deleted product so we can also remove its image from the bucket
    const imageName = url.split('/').pop()//get the image url id
    if(!imageName) throw new Error(`Invalid URL`)
    return supabase.storage.from(bucket).remove([imageName]) //remove the image from bucket
}