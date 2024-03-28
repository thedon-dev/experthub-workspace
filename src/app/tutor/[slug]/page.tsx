"use client"

import { CourseType } from '@/types/CourseType';
import axios from 'axios';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Head from 'next/head';
import React, { Fragment, useEffect, useState } from 'react';
import { useSearchParams, usePathname } from 'next/navigation'
import DashboardLayout from '@/components/DashboardLayout';
import SinglePage from '@/components/SinglePage';

const SingleCourse = () => {
  const [repo, setRepo] = useState<CourseType | null>(null)
  const pathname = useSearchParams().get("page")
  const page = usePathname().slice(7)

  const getData = async () => {
    await axios.get(`courses/single-course/${page}`)
      .then(function (response) {
        setRepo(response.data.course)
        console.log(response.data)
      })
  }

  const getEvent = async () => {
    await axios.get(`events/${page}`)
      .then(function (response) {
        setRepo(response.data.course)
        console.log(response.data)
      })
  }

  useEffect(() => {
    if (pathname === 'event') {
      getEvent()
    } else {
      getData()
    }
  }, [])


  return (
    <Fragment>
      <DashboardLayout>
        <section className=''>
          {repo && page && <SinglePage pathname={pathname} repo={repo} page={page} />}
        </section>
      </DashboardLayout>
    </Fragment>
  );
};

export default SingleCourse;