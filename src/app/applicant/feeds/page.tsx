"use client"


import DashboardLayout from '@/components/DashboardLayout';
import RecommendedCard from '@/components/cards/RecommendedCard';
import { CourseType } from '@/types/CourseType';
import { ResourceType } from '@/types/ResourceType';
import apiService from '@/utils/apiService';
import React, { useEffect, useState } from 'react';

const archive = () => {
  const [courses, setCourses] = useState<CourseType | []>([])

  const getCourses = async () => {
    apiService.get("courses/all/category")
      .then(function (response) {
        setCourses(response.data.allCourse)
        // console.log(response.data)
      })
  }

  useEffect(() => {
    getCourses()
  }, [])


  return (
    <DashboardLayout>
      <section className='p-4'>
        {courses.map((course: { category: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | React.PromiseLikeOfReactNode | null | undefined; courses: any[]; }) => <>
          <h1 className='text-xl'>{course.category}</h1>
          <div className='flex flex-wrap justify-between'>{course.courses.map(single => <RecommendedCard course={single} call={() => getCourses()} />)}</div>
        </>)}
      </section>
    </DashboardLayout>
  );
};

export default archive;