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
import { CourseType } from '@/types/CourseType';
import Link from 'next/link';
import AddEvents from '@/components/modals/AddEvents';
import CategoryModal from '@/components/modals/CategoryModal';

const courses = () => {
  const [courses, setCourses] = useState<CourseType | []>([])
  const [pending, setPending] = useState<CourseType | []>([])
  const [open, setOpen] = useState(false)
  const [resources, setResources] = useState(false)
  const [event, setEvent] = useState(false)
  const [category, setCategory] = useState(false)

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
        <p onClick={() => setEvent(true)}>Events</p>
      ),
    },
    {
      key: '3',
      label: (
        <p onClick={() => setResources(true)}>Resources</p>
      ),
    },
    {
      key: '4',
      label: (
        <p onClick={() => setCategory(true)}>Add Category</p>
      ),
    },
  ];

  const getCourses = async () => {
    axios.get("courses/all/category")
      .then(function (response) {
        setCourses(response.data.allCourse)
        // console.log(response.data)
      })
  }

  const getPendngCourses = () => {
    axios.get("courses/unapproved")
      .then(function (response) {
        setPending(response.data.courses)
        console.log(response.data)
      })
  }


  useEffect(() => {
    getPendngCourses()
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
        <div className='lg:w-[98%] mx-auto'>
          {
            courses.map((course: { category: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | React.PromiseLikeOfReactNode | null | undefined; courses: any[]; }, index: React.Key | null | undefined) => <div key={index}>
              <p className='font-bold mt-4'>{course.category}</p>
              <div className='shadow-[0px_1px_2.799999952316284px_0px_#1E1E1E38] my-2'>
                <Slider {...settings}>
                  {course.courses.map((item: any, index: React.Key | null | undefined) => <div key={index} className='p-1 w-full'>
                    <CoursesCard getCourse={() => getCourses()} course={item} />
                  </div>)}
                </Slider>
              </div>
            </div>)
          }
        </div>
        <div className='my-6'>
          <p className='text-xl'>Courses Under Review</p>
          {pending.length >= 1 ? <div>
            <Slider {...settings}>
              {pending.map((item: CourseType, index: React.Key | null | undefined) => <div key={index} className='p-1 w-full'>
                <div className='border my-4 border-[#1E1E1E59] p-4 rounded-md flex justify-between'>
                  <img className='rounded-md w-1/2 h-32 object-cover shadow-[26px_0px_32.099998474121094px_0px_#FDC3324D]' src={item.thumbnail} alt="" />
                  <div className='pl-10 w-full'>
                    <h4 className='text-xl my-2 font-medium'>{item.title}</h4>
                    <p className='text-xs my-3'>{item.about.substring(0, 30)}</p>
                    <Link href={`/admin/${item._id}?page=${item.type}`}>
                      <button className='p-2 px-6 rounded-sm bg-primary'>Publish</button>
                    </Link>
                  </div>
                </div>
              </div>)}
            </Slider>
          </div> : <div>No courses to review</div>}
        </div>
        <AddCourse course={null} open={open} handleClick={() => setOpen(!open)} />
        <AddResources open={resources} handleClick={() => setResources(!resources)} />
        <AddEvents open={event} handleClick={() => setEvent(!event)} course={null} />
        <CategoryModal open={category} category={null} handleClick={() => setCategory(false)} />

      </section>
    </DashboardLayout>
  );
};

export default courses;
