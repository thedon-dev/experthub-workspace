"use client"

import DashboardLayout from '@/components/DashboardLayout';
import React, { useState, useEffect } from 'react';
import { DownOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Dropdown } from 'antd';
import AddCourse from '@/components/modals/AddCourse';
import AddResources from '@/components/modals/AddResources';
import axios from 'axios';
import CoursesCard from '@/components/cards/CoursesCard';
import Slider from 'react-slick';

const courses = () => {
  const [courses, setCourses] = useState<any | []>([])
  const [open, setOpen] = useState(false)
  const [resources, setResources] = useState(false)

  var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 6000,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: false
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
  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <p onClick={() => setOpen(true)} >Courses</p>
      ),
    },
    {
      key: '2',
      label: (
        <p>Materials</p>

      ),
    },
    {
      key: '3',
      label: (
        <p onClick={() => setResources(true)}>Resources</p>
      ),
    },

  ];

  const getCourses = async () => {
    axios.get("courses/all/category")
      .then(function (response) {
        setCourses(response.data.allCourse)
        console.log(response.data)
      })
  }

  useEffect(() => {
    getCourses()
  }, [])
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
      <section className='p-4'>
        <div className='flex justify-between'>
          <div>
            <p className='text-xl'>All Course</p>
            <p className='text-sm'>You will never go wrong with our course</p>
          </div>
          <div className=''>
            <Dropdown menu={{ items }} trigger={["click"]}>
              <button className='bg-primary p-2 font-medium text-sm rounded-md'>
                + Add training resources
                <DownOutlined />
              </button>
            </Dropdown>
          </div>
          <div></div>
        </div>
        <div className='w-[98%] mx-auto'>
          {
            courses.map((course: { category: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | React.PromiseLikeOfReactNode | null | undefined; courses: any[]; }, index: React.Key | null | undefined) => <div key={index}>
              <p className='font-bold mt-4'>{course.category}</p>
              <div className='shadow-[0px_1px_2.799999952316284px_0px_#1E1E1E38] my-2'>
                <Slider {...settings}>
                  {course.courses.map((item: any, index: React.Key | null | undefined) => <div key={index} className='p-1 w-full'>
                    <CoursesCard course={item} />
                  </div>)}
                </Slider>
              </div>
            </div>)
          }
        </div>
        <AddCourse open={open} handleClick={() => setOpen(!open)} />
        <AddResources open={resources} handleClick={() => setResources(!resources)} />
      </section>
    </DashboardLayout>
  );
};

export default courses;
