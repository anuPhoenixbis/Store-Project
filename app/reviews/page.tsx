import { IconButton } from '@/components/form/Buttons'
import FormContainer from '@/components/form/FormContainer'
import SectionTitle from '@/components/global/SectionTitle'
import ReviewCard from '@/components/reviews/ReviewCard'
import { deleteReviewAction, fetchProductReviewByUser } from '@/utils/actions'
import React from 'react'

async function ReviewsPage() {
    const reviews = await fetchProductReviewByUser()
    if(reviews.length === 0){
        return <SectionTitle text="Are you a NPC? Don't you have a single review to give?" />
    }
  return (
    <>
    <SectionTitle text='Your Reviews'/>
    <section className="grid md:grid-cols-2 gap-8 mt-4">
        {reviews.map((review)=>{
            const {comment,rating} = review
            const{name,image} = review.product
            const reviewInfo = {comment,rating,name,image}
            return <ReviewCard key={review.id} reviewInfo={reviewInfo}>
              <DeleteReview reviewId={review.id} />
            </ReviewCard>
        })}
    </section>
    </>
  )
}

const DeleteReview = ({reviewId}:{reviewId:string}) =>{
  const deleteReview = deleteReviewAction.bind(null,{reviewId})
  return (
    <FormContainer action={deleteReview}>
      <IconButton actionType='delete'/>
    </FormContainer>
  )
}

export default ReviewsPage