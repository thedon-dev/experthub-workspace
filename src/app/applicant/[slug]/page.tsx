"use client"

import { CourseType } from '@/types/CourseType';
import axios from 'axios';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Head from 'next/head';
import React, { Fragment, useEffect, useState } from 'react';
import { useSearchParams, usePathname } from 'next/navigation'
import DashboardLayout from '@/components/DashboardLayout';
import FileDownload from '@/components/FileDownload'

const SingleCourse = () => {
  const [repo, setRepo] = useState<CourseType | null>(null)
  const page = useSearchParams().get("page")
  const pathname = usePathname().slice(11)
  const [indexCount, setIndexCount] = useState(0)

  const getData = async () => {
    await axios.get(`courses/single-course/${page}`)
      .then(function (response) {
        setRepo(response.data.course)
        console.log(response.data)
      })
  }


  const setNext = () => {
    if (repo) {
      if (repo?.videos.length - 1 === indexCount) {
        return
      }
      setIndexCount(indexCount + 1)
    }
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
          {(() => {
            switch (pathname) {
              case 'video':
                return <div className='p-6 lg:flex'>
                  <div className='w-full'>
                    {
                      repo !== null && <video controls className="w-full">
                        <source src={repo?.videos[indexCount].videoUrl} type="video/mp4" />
                      </video>
                    }
                    <div className='lg:flex my-4 justify-between'>
                      <div className='flex'>
                        <img className='w-6 h-6 my-auto rounded-full' src={repo?.instructorImage || "/images/user.png"} alt="" />
                        <p className='my-auto ml-3'>A course by {repo?.instructorName}</p>
                      </div>

                      <button onClick={() => setNext()} className='text-[#DC9F08] sm:my-3 border border-[#DC9F08] rounded-sm p-1 px-4'>Next Chapter</button>
                    </div>
                    <div>
                      <p className='text-lg lg:hidden sm:block font-medium mb-2'>Title: {repo?.title}</p>
                      <p className='my-2'>{repo?.about}</p>
                    </div>
                  </div>
                  <div className=' lg:w-[40%] lg:px-4 '>
                    <p className='text-lg sm:hidden lg:block font-medium mb-2'>Title: {repo?.title}</p>
                    <div className='p-2 border border-[#1E1E1E82] rounded-md'>
                      {repo?.videos.map((video, index) => <div key={video._id} className='flex my-3'>
                        {
                          indexCount === index ? <img src="/images/icon-2.png" alt="" /> : indexCount > index ?
                            <img src="/images/icon-1.png" alt="" /> : <img className='cursor-pointer' onClick={() => setIndexCount(index)} src="/images/icon-3.png" alt="" />
                        }
                        <p className='font-medium my-auto ml-3'>{video.title}</p>
                      </div>)}
                    </div>
                  </div>
                </div>;
              case 'pdf':
                return <div className='p-6 lg:w-[60%] mx-auto'>
                  <img className='w-full object-cover h-80' src={repo?.thumbnail} alt="" />
                  <h1 className='font-bold text-2xl my-2'>{repo?.title}</h1>
                  <p>{repo?.about}</p>
                  <FileDownload file={repo?.file} />
                </div>;
              case 'offline':
                return <div className='p-6 lg:w-[60%] mx-auto'>
                  <img className='w-full object-cover h-80' src={repo?.thumbnail} alt="" />
                  <h1 className='font-bold text-2xl my-2'>{repo?.title}</h1>
                  <p>{repo?.about}</p>
                  <p><span className='font-bold'>Location:</span> {repo?.location}</p>
                  <p> <span className='font-bold'>Room:</span> {repo?.room}</p>
                </div>;
              case 'online':
                return <div className='p-6 lg:w-[60%] mx-auto'>
                  <img className='w-full object-cover h-80' src={repo?.thumbnail} alt="" />
                  <h1 className='font-bold text-2xl my-2'>{repo?.title}</h1>
                  <p>{repo?.about}</p>
                </div>;
              default:
                return <div></div>;
            }
          })()}
        </section>
      </DashboardLayout>
    </Fragment>
  );
};

export default SingleCourse;