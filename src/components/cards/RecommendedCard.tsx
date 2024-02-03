import { CourseType } from '@/types/CourseType';
import axios from 'axios';
import React from 'react';
import { useAppSelector } from '@/store/hooks';
import { notification } from 'antd';

const RecommendedCard = ({ course, call }: { course: CourseType, call: any }) => {
  const user = useAppSelector((state) => state.value);
  const [api, contextHolder] = notification.useNotification();

  const enroll = (id: string) => {
    try {
      axios.post(`courses/enroll/${id}`, {
        id: user.id
      })
        .then(function (response) {
          // console.log(response.data)
          call()
          api.open({
            message: 'Enrolled Successfully'
          });
        })
        .catch(err => {
          api.open({
            message: err.response.data.message
          });
          // console.log(err.response.data.message)
        })
    } catch (e: any) {
      // console.log(e.response.data.message)
    }
  }

  return (
    <div className='flex justify-between border p-3 my-3 w-[49%] rounded-md border-[#1E1E1E75]'>
      {contextHolder}
      <div className='w-52'>
        <img className='w-full h-20 object-cover rounded-md' src={course.thumbnail} alt="" />
      </div>
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