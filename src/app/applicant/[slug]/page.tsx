"use client"

import { CourseType } from '@/types/CourseType';
import axios from 'axios';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Head from 'next/head';
import React, { Fragment, useEffect, useState } from 'react';
import { useSearchParams, usePathname } from 'next/navigation'
import DashboardLayout from '@/components/DashboardLayout';

const SingleCourse = () => {
  const [repo, setRepo] = useState<CourseType | null>(null)
  const page = useSearchParams().get("page")
  const pathname = usePathname().slice(11)

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
        <section className=' mt-10'>
          {(() => {
            switch (pathname) {
              case 'video':
                return <div className='p-6 flex'>
                  <div className='w-full'>
                    {
                      repo !== null && <video controls autoPlay className="w-full">
                        <source src={repo?.videos[0].videoUrl} type="video/mp4" />
                      </video>
                    }
                  </div>
                  <div className='w-[40%] px-4 '>
                    <p className='text-lg font-medium mb-2'>Title:{repo?.title}</p>
                    <div className='p-2 border border-[#1E1E1E82] rounded-md'>
                      {repo?.videos.map(video => <div key={video._id}>
                        <p className='font-medium'>{video.title}</p>
                      </div>)}
                    </div>
                  </div>
                </div>;
              case 'user':
                return <div>Error: Invalid User Role</div>;
              default:
                return <div>Error: Invalid User Role</div>;
            }
          })()}
        </section>
      </DashboardLayout>
    </Fragment>
  );
};

export default SingleCourse;