import { CourseType } from '@/types/CourseType';
import React, { useState } from 'react';
import FileDownload from '@/components/FileDownload'
import { useAppSelector } from '@/store/hooks';
import UploadVideo from './modals/UploadVideo';

const SinglePage = ({ repo, pathname, page }: { repo: CourseType, pathname: any, page: any }) => {
  const [indexCount, setIndexCount] = useState(0)
  const [videos, setVideos] = useState(repo.videos)
  const setNext = () => {
    if (videos.length - 1 === indexCount) {
      return
    }
    const count = indexCount
    setIndexCount(count + 1)

  }

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
    </div>
  );
};

export default SinglePage;