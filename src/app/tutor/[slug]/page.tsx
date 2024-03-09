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
  const page = useSearchParams().get("page")
  const pathname = usePathname().slice(7)

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
          {repo && page && <SinglePage pathname={pathname} repo={repo} page={page} />}
        </section>
      </DashboardLayout>
    </Fragment>
  );
};

export default SingleCourse;