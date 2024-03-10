"use client"

import { CourseType } from '@/types/CourseType';
import axios from 'axios';
import React, { Fragment, useState, useEffect } from 'react';
import { useSearchParams, usePathname } from 'next/navigation'
import DashboardLayout from '@/components/DashboardLayout';
import SinglePage from '@/components/SinglePage';


export default function SingleCourse() {
  const [repo, setRepo] = useState<CourseType | null>(null)
  const pathname = useSearchParams().get("page")
  const page = usePathname().slice(11)

  const getData = async () => {
    await axios.get(`courses/single-course/${page}`)
      .then(function (response) {
        setRepo(response.data.course)
        // console.log(response.data)
      })
  }

  useEffect(() => {
    getData()
  }, [])



  return (
    <Fragment>
      <DashboardLayout>
        <section className=''>
          {repo && page && <SinglePage pathname={pathname} repo={repo} page={null} />}
        </section>
      </DashboardLayout>
    </Fragment>
  );
};


