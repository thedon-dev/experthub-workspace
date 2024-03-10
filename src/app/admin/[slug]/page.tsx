"use client"

import { CourseType } from '@/types/CourseType';
import axios from 'axios';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Head from 'next/head';
import React, { Fragment, useEffect, useState } from 'react';
import { useSearchParams, usePathname, useRouter } from 'next/navigation'
import DashboardLayout from '@/components/DashboardLayout';
import AddCourse from '@/components/modals/AddCourse';
import SinglePage from '@/components/SinglePage';


const SingleCourse = () => {
  const [repo, setRepo] = useState<CourseType | null>(null)
  const pathname = useSearchParams().get("page")
  const view = useSearchParams().get("view")
  const page = usePathname().slice(7)
  const router = useRouter()
  const [edit, setEdit] = useState(false)

  const getData = async () => {
    await axios.get(`courses/single-course/${page}`)
      .then(function (response) {
        setRepo(response.data.course)
        console.log(response.data)
      })
  }

  useEffect(() => {
    getData()
  }, [])

  const approve = () => {
    axios.put(`courses/approve/${page}`)
      .then(function (response) {
        // getPendngCourses()
        router.back()
        console.log(response.data)
      }).catch(function (error) {
        console.log(error);
      })
  }


  return (
    <Fragment>
      <Head>
        <title>{repo?.title}</title>

        <meta property="og:type" content="website" />
        <meta property="og:title" content={repo?.title} />
        <meta property="og:description" content={repo?.body} />
        <meta property="og:image" content={repo?.thumbnail} />
        <meta property="og:url" content={`https://trainings.experthubllc.com/applicant/course?page=${repo?._id}`} />
        <meta property="og:site_name" content={repo?.title} />

        <meta name="twitter:title" content={repo?.title} />
        <meta name="twitter:description" content={repo?.about} />
        <meta name="twitter:image" content={repo?.thumbnail} />

      </Head>
      <DashboardLayout>
        <section className=''>
          <div className='flex'>
            {view ? null : <button className='p-4 bg-primary m-6' onClick={() => approve()}>Publish</button>}
            <button className=' m-6' onClick={() => setEdit(true)}>Edit</button>
          </div>
          {repo && page && <SinglePage pathname={pathname} repo={repo} page={page} />}
          {repo && <AddCourse course={repo} open={edit} handleClick={() => setEdit(false)} />}
        </section>
      </DashboardLayout>
    </Fragment>
  );
};

export default SingleCourse;