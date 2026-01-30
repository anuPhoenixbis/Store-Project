// import React from 'react'
// import db from '@/utils/db'


// // async becoz we are gonna talk to db from here
// async function AboutPage() {
//   // db instance "." table name "." query
//   const profile = await db.testProfile.create({
//       data:{
//         name: 'John Doe',
//       }
//   })
//   const users = await db.testProfile.findMany();
//   return (
//     <div>
//       {users.map((user)=>{
//         return(
//           <h1 key={user.id}>{user.name}</h1>
//         )
//       })}
//     </div>
//   )
// }

// export default AboutPage
// db exploration

import BlurText from '@/components/BlurText'
import React from 'react'

function AboutPage() {
  return (
    <section>
      <h1 className="flex flex-wrap gap-2 sm:gap-x-6 items-center justify-center text-9xl font-bold leading-none tracking-wide sm:text-6xl pb-20">
        <BlurText
          text="Welcome to the Store!"
          delay={200}
          animateBy="words"
          direction="top"
          className="text-4xl mb-8"
        />
      </h1>
      <p className='pb-40 text-muted-foreground'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dicta accusamus tempore provident ipsum consequuntur, culpa numquam, impedit delectus vitae, inventore veritatis! Itaque in molestiae deleniti ducimus consectetur non, aperiam distinctio!
      Aspernatur tempore blanditiis dicta libero voluptas magni, eos ea officiis earum fuga est dolore doloribus quam veniam quaerat molestiae quidem? A necessitatibus sint enim. Dolores doloribus deleniti corporis pariatur. Animi!
      Laborum aliquid quasi nostrum aut exercitationem nulla ipsum reiciendis, quae molestiae dicta animi quam vitae quidem odit in! Impedit velit eos ullam temporibus quasi qui fuga iste cupiditate facere perspiciatis.
      Nulla aliquam sunt quia dolores illo, dolore possimus sequi delectus nam labore iste dolorem veritatis doloribus, temporibus voluptatem molestiae. Atque eaque tenetur distinctio molestias odio iste dolores saepe delectus. Quia!</p>
    </section>
  )
}

export default AboutPage
