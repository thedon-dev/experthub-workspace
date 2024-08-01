"use client"


import DashboardLayout from '@/components/DashboardLayout';
import RecommendedCard from '@/components/cards/RecommendedCard';
import { CourseType } from '@/types/CourseType';
import { ResourceType } from '@/types/ResourceType';
import apiService from '@/utils/apiService';
import React, { useEffect, useState } from 'react';

const archive = () => {
  const [courses, setCourses] = useState<CourseType | []>([])
  const [all, setAll] = useState<CourseType | []>([])

  const getCourses = async () => {
    apiService.get("courses/all/category")
      .then(function (response) {
        setCourses(response.data.allCourse)
        setAll(response.data.allCourse)
      })
  }

  const search = (value: string) => {
    const results = all.filter((obj: CourseType) => obj.category.toLowerCase().includes(value.toLowerCase()));
    setCourses(results)
  }

  useEffect(() => {
    getCourses()
  }, [])


  return (
    <DashboardLayout>
      <section className='p-4'>
        <div className='lg:w-[55%] w-full flex relative mb-4'>
          <input onChange={e => search(e.target.value)} type="text" className='pl-10 p-2 w-full rounded-md border border-[#1E1E1E8A] bg-transparent' placeholder='Search' />
          <img className='absolute top-2 w-6 left-2' src="/images/icons/search.svg" alt="" />
        </div>
        {courses.map((course: { category: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | React.PromiseLikeOfReactNode | null | undefined; courses: any[]; }) => <>
          <h1 className='text-xl'>{course.category}</h1>
          <div className='flex flex-wrap justify-between'>{course.courses.map(single => <RecommendedCard course={single} call={() => getCourses()} />)}</div>
        </>)}
      </section>
    </DashboardLayout>
  );
};

export default archive;