import { CourseType } from '@/types/CourseType';
import axios from 'axios';
import React from 'react';

const RecommendedCard = ({ course }: { course: CourseType }) => {
  const enroll = (id: string) => {
    try {
      axios.post(`courses/enroll/${id}`)
        .then(function (response) {
          console.log(response.data)
        })
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div className='flex justify-between border p-3 my-3 w-[49%] rounded-md border-[#1E1E1E75]'>
      <img className='w-32 rounded-md' src="/images/card.png" alt="" />
      <div className='mx-4 w-full'>
        <p className='text-primary text-sm'>{course.category}. <span className='text-black'> Evans D</span></p>
        <p className='font-medium'>{course.title}</p>
        <p className='text-sm'>{course.startDate}</p>
      </div>
      <button onClick={() => enroll(course._id)} className='p-2 w-52 bg-primary my-auto rounded-sm'>Enrol Now</button>
    </div>
  );
};

export default RecommendedCard;