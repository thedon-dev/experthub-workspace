"use client"

import { CourseType } from '@/types/CourseType';
import axios from 'axios';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Head from 'next/head';
import React, { Fragment, useEffect, useState } from 'react';
import { useSearchParams, usePathname } from 'next/navigation'
import DashboardLayout from '@/components/DashboardLayout';
import SinglePage from '@/components/SinglePage';
import { Metadata, ResolvingMetadata } from 'next';


type Props = {
  params: {
    slug: string,
    title: string
  }
  searchParams: { [page: string]: string | string[] | undefined }
}

export const geenerateMetaData = async ({ params, searchParams }: Props, parent: ResolvingMetadata): Promise<Metadata> => {
  const id = searchParams.page
  // fetch data
  const course = await fetch(`https://shark-app-2-k9okk.ondigitalocean.app/courses/single-course/${id}`).then((res) => res.json())
  console.log(course)

  return {
    title: `Course || ${course.title}`,
    description: course.about,
    openGraph: {
      images: course.thumbnail,
      title: course.title,
      type: "website",
      description: course.about,
      siteName: course.title,
      url: `https://trainings.experthubllc.com/applicant/${params.slug}?page=${id}`
    },
    twitter: {
      title: course.title,
      description: course.about,
      images: course.thumbnail,
    }
  }
}


const SingleCourse = ({ params, searchParams }: Props) => {
  const [repo, setRepo] = useState<CourseType | null>(null)
  const page = useSearchParams().get("page")
  const pathname = usePathname().slice(11)

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

export default SingleCourse;

