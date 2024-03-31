"use client"


import DashboardLayout from '@/components/DashboardLayout';
import { ResourceType } from '@/types/ResourceType';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';

const archive = () => {
  const [materials, setMaterials] = useState<ResourceType | []>([])

  const getResources = async () => {
    axios.get(`resources/all`)
      .then(function (response) {
        setMaterials(response.data.resource)
        console.log(response.data)
      })
  }

  useEffect(() => {
    getResources()
  }, [])


  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 6000,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  return (
    <DashboardLayout>
      <link
        rel="stylesheet"
        type="text/css"
        charSet="UTF-8"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick.min.css"
      />
      <link
        rel="stylesheet"
        type="text/css"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick-theme.min.css"
      />
      <section className='m-4'>
        <p className='font-medium text-lg my-2'>Our Community</p>
        <div className='flex my-6 w-[70%] justify-between'>
          <div className='flex'>
            <div className='mr-3 w-12 h-12'>
              <img src="/images/new-logo.png" alt="" />
            </div>
            <div>
              <p className='font-medium'>Experthub LLC</p>
              <p className='text-[#DC9F08] underline text-xs'>Sign up as a user</p>
            </div>
          </div>
          <div className='flex'>
            <div className='mr-3 w-12 h-12'>
              <img src="/images/new-pow.png" alt="" />
            </div>
            <div>
              <p className='font-medium'>Peoples Power</p>
              <p className='text-[#DC9F08] underline text-xs'>Sign up as a user</p>
            </div>
          </div>
          <div className='flex'>
            <div className='mr-3 w-12 h-12'>
              <img src="/images/new-edf.png" alt="" />
            </div>
            <div>
              <p className='font-medium'>ED Foundation</p>
              <p className='text-[#DC9F08] underline text-xs'>Sign up as a user</p>
            </div>
          </div>
        </div>
      </section>
      <section className='m-4 w-[90%]'>
        <p className='font-medium text-lg my-2'>Training Materials</p>
        <div className='lg:flex justify-between'>
          <div className='lg:w-[62%]'>
            <Slider {...settings}>
              {
                materials.map((material: ResourceType) => <div key={material._id} className='p-1'>
                  <div className=''>
                    <div className='p-3 rounded-md bg-white'>
                      <img className='rounded-md h-40 object-cover w-full' src={material.image} alt="" />
                    </div>
                    <div className='p-1'>
                      {/* <p className='text-[#DC9F08] font-medium text-sm'>Course by Peoples power</p> */}
                      <h4 className='text-xl my-3'>{material.title}</h4>
                      <p className='text-sm'>{material.aboutCourse}</p>
                    </div>
                  </div>
                </div>)
              }
              {/* <div className=''>
                <div className='p-3 rounded-md bg-white'>
                  <img className='rounded-md w-full' src="/images/card.png" alt="" />
                </div>
                <div className='p-1'>
                  <p className='text-[#DC9F08] font-medium text-sm'>Course by Peoples power</p>
                  <h4 className='text-xl my-3'>Design Systems for Websites
                    with Figma</h4>
                  <p className='text-sm'>Learn how to build and design websites
                    using Figma...</p>
                </div>
              </div> */}
              {/* <div className=''>
                <div className='p-3 rounded-md bg-white'>
                  <img className='rounded-md w-full' src="/images/card.png" alt="" />
                </div>
                <div className='p-1'>
                  <p className='text-[#DC9F08] font-medium text-sm'>Course by Peoples power</p>
                  <h4 className='text-xl my-3'>Design Systems for Websites
                    with Figma</h4>
                  <p className='text-sm'>Learn how to build and design websites
                    using Figma...</p>
                </div>
              </div> */}
              {/* <div className=''>
                <div className='p-3 rounded-md bg-white'>
                  <img className='rounded-md w-full' src="/images/card.png" alt="" />
                </div>
                <div className='p-1'>
                  <p className='text-[#DC9F08] font-medium text-sm'>Course by Peoples power</p>
                  <h4 className='text-xl my-3'>Design Systems for Websites
                    with Figma</h4>
                  <p className='text-sm'>Learn how to build and design websites
                    using Figma...</p>
                </div>
              </div> */}
            </Slider>
          </div>
          <div className='lg:w-[35%] p-4 rounded-md shadow-[0px_2px_4px_0px_#1E1E1E21]'>
            <div className='flex'>
              <img src="/images/icons/ic_outline-event.svg" alt="" />
              <p className='font-medium ml-2 text-lg text-[#DC9F08]'>Events</p>
            </div>
            <div className='my-3'>
              <p className='font-medium'>Peoples Power Affiliate program</p>
              <p className='text-sm my-2'>Hosted by Evans D</p>
              <p className='text-sm my-2'>27 - Aug - 23 / 12:00 PM</p>
              <button className='p-2 border border-[#1E1E1E] w-full rounded-md'>Visit event</button>
            </div>
            <div className='my-3'>
              <p className='font-medium'>Peoples Power Affiliate program</p>
              <p className='text-sm my-2'>Hosted by Evans D</p>
              <p className='text-sm my-2'>27 - Aug - 23 / 12:00 PM</p>
              <button className='p-2 border border-[#1E1E1E] w-full rounded-md'>Visit event</button>
            </div>
          </div>
        </div>
      </section>
      <section className='mx-4 my-8 relative w-[90%]'>
        <img src="/images/resources-bg.png" alt="" />
        <div className='absolute top-0 left-0 right-0'>
          <div className='p-6'>
            <div className='border-b w-[35%] border-[#1E1E1E52]'>
              <p className='font-medium'>Training Resources</p>
              <p className='text-sm my-2'>Added training resources for further studies</p>
            </div>

            <div className='flex justify-between my-10 flex-wrap w-[70%]'>
              <p className='w-[30%] text-sm font-medium my-2'>Product Management</p>
              <p className='w-[30%] text-sm font-medium my-2'>Social Media Management</p>
              <p className='w-[30%] text-sm font-medium my-2'>Project Management</p>
              <p className='w-[30%] text-sm font-medium my-2'>Software Development</p>
              <p className='w-[30%] text-sm font-medium my-2'>SEO/Video editing</p>
              <p className='w-[30%] text-sm font-medium my-2'>Software Development</p>
              <p className='w-[30%] text-sm font-medium my-2'>Data Analysis</p>
              <p className='w-[30%] text-sm font-medium my-2'>Data Analytics</p>
              <p className='w-[30%] text-sm font-medium my-2'>Data Analytics</p>
            </div>
          </div>
        </div>
        <img className='w-52 h-52 absolute -right-10 top-10' src="/images/image_19.png" alt="" />

      </section>
    </DashboardLayout>
  );
};

export default archive;