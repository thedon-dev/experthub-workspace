"use client"

import DashboardLayout from '@/components/DashboardLayout';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CourseType } from '@/types/CourseType';
import Link from 'next/link';

const courses = () => {
  const [pending, setPending] = useState<CourseType | []>([])

  const getPendngCourses = () => {
    axios.get("courses/unapproved")
      .then(function (response) {
        setPending(response.data.courses)
        console.log(response.data)
      })
  }


  useEffect(() => {
    getPendngCourses()
  }, [])
  return (
    <DashboardLayout>
      <section>
        <div className='my-6'>
          <p className='text-xl'>Courses Under Review</p>
          {pending.length >= 1 ? <div>
            {pending.map((item: CourseType, index: React.Key | null | undefined) => <div key={index} className='p-1 flex flex-wrap justify-between w-full'>
              <div className='border my-4  border-[#1E1E1E59] p-4 rounded-md flex justify-between'>
                {typeof item.thumbnail === 'string' ? '' : item.thumbnail.type === 'image' ? <img className='rounded-md w-1/2 h-32 object-cover shadow-[26px_0px_32.099998474121094px_0px_#FDC3324D]' src={item.thumbnail.url} alt="" /> :
                  <div className='rounded-md w-1/2 h-32 object-cover shadow-[26px_0px_32.099998474121094px_0px_#FDC3324D]'>
                    <video
                      src={item.thumbnail.url}
                      width="100"
                      autoPlay muted
                      className="embed-responsive-item w-full object-cover h-full"
                    >
                      <source src={item.thumbnail.url} type="video/mp4" />
                    </video>
                  </div>}
                <div className='pl-10 w-full'>
                  <h4 className='text-xl my-2 font-medium'>{item.title}</h4>
                  <p className='text-xs my-3'>{item.about.substring(0, 30)}</p>
                  <Link href={`/admin/${item._id}?page=${item.type}`}>
                    <button className='p-2 px-6 rounded-sm bg-primary'>Publish</button>
                  </Link>
                </div>
              </div>
            </div>)}
          </div> : <div>No courses to review</div>}
        </div>
      </section >
    </DashboardLayout >
  );
};

export default courses;
