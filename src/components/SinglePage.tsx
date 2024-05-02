import { CourseType } from '@/types/CourseType';
import React, { useEffect, useState } from 'react';
import FileDownload from '@/components/FileDownload'
import { useAppSelector } from '@/store/hooks';
import UploadVideo from './modals/UploadVideo';
import axios from 'axios';
import { ResourceType } from '@/types/ResourceType';

const SinglePage = ({ repo, pathname, page }: { repo: CourseType, pathname: any, page: any }) => {
  const [indexCount, setIndexCount] = useState(0)
  const [videos, setVideos] = useState(repo.videos)
  const [resources, setResources] = useState([])
  const setNext = () => {
    if (videos.length - 1 === indexCount) {
      return
    }
    const count = indexCount
    setIndexCount(count + 1)

  }

  const getAssigned = () => {
    axios.get(`resources/all/${repo._id}`)
      .then(function (response) {
        console.log(response.data)
        setResources(response.data.resource)
      })
  }

  useEffect(() => {
    getAssigned()
  }, [])

  return (
    <div>
      {(() => {
        switch (pathname) {
          case 'video':
            return <div className='p-6 lg:flex'>
              <div className='w-full'>
                {videos.map((video, index) => <div>
                  {index === indexCount ? <video key={index} controls className="w-full">
                    <source src={video.videoUrl} type="video/mp4" />
                  </video> : null}
                </div>)}


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
                {/* {user.role !== "student" && <button className='bg-primary px-4 p-2 rounded-md my-4'>Add Videos</button>} */}
                {page !== null && <UploadVideo id={page} />}
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
              {repo?.days && <>
                <div className='my-3 font-bold'>Weekly Hours</div>
                {repo?.days.map((day: any) => day.checked && <div className='flex w-1/2 justify-between'>
                  <p>{day.day}</p>
                  <p>{day.startTime}</p>
                  <p>-</p>
                  <p>{day.endTime}</p>
                </div>)}</>}
            </div>;
          case 'online':
            return <div className='p-6 lg:w-[60%] mx-auto'>
              <img className='w-full object-cover h-80' src={repo?.thumbnail} alt="" />
              <h1 className='font-bold text-2xl my-2'>{repo?.title}</h1>
              <p>{repo?.about}</p>
            </div>;
          case 'event':
            return <div className='p-6 lg:w-[60%] mx-auto'>
              <img className='w-full object-cover h-80' src={repo?.thumbnail} alt="" />
              <h1 className='font-bold text-2xl my-2'>{repo?.title}</h1>
              <p>{repo?.about}</p>
              {
                repo.room && <>
                  <p><span className='font-bold'>Location:</span> {repo?.location}</p>
                  <p> <span className='font-bold'>Room:</span> {repo?.room}</p>
                </>
              }
            </div>;
          default:
            return <div></div>;
        }
      })()}

      {resources.length >= 1 && <div className='p-4'>
        <p className='text-xl font-medium'>Related Learning Resources</p>
        <div className='flex flex-wrap justify-between'>
          {
            resources.map((material: ResourceType) => <div key={material._id} className='p-1 lg:w-[32%] w-full'>
              <a href={material.websiteUrl} target='_blank'>
                <div className=''>
                  <div className='p-3 rounded-md bg-white'>
                    <img className='rounded-md h-44 object-cover w-full' src={material.image} alt="" />
                  </div>
                  <div className='p-1'>
                    {/* <p className='text-[#DC9F08] font-medium text-sm'>Course by Peoples power</p> */}
                    <h4 className='text-xl my-3'>{material.title}</h4>
                    <p className='text-sm'>{material.aboutCourse}</p>
                  </div>
                </div>
              </a>
            </div>)
          }
        </div>
      </div>}
    </div>
  );
};

export default SinglePage;