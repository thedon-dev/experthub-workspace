"use client"

import CoursesCard from '@/components/cards/CoursesCard';
import DashboardLayout from '@/components/DashboardLayout';
import RecommendedCard from '@/components/cards/RecommendedCard';
import StatCard from '@/components/cards/StatCard';
import React, { useEffect, useState } from 'react';
import { DownOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Dropdown } from 'antd';
import AddCourse from '@/components/modals/AddCourse';
import AddResources from '@/components/modals/AddResources';
import { useAppSelector } from '@/store/hooks';
import axios from 'axios';
import Link from 'next/link';

const adminDashboard = () => {
  const user = useAppSelector((state) => state.value);
  const [open, setOpen] = useState(false)
  const [resources, setResources] = useState(false)
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
  const [courses, setCourses] = useState([])
  const [students, setStudents] = useState([])
  const [tutors, setTutors] = useState([])

  const getCourses = async () => {
    axios.get("courses/all")
      .then(function (response) {
        setCourses(response.data.courses)
        // console.log(response.data)
      })
  }
  const getStudents = () => {
    axios.get('user/students')
      .then(function (response) {
        setStudents(response.data.students)
        console.log(response.data)
      })
  }
  const getTutors = () => {
    axios.get('user/instructors')
      .then(function (response) {
        setTutors(response.data.instructors)
        console.log(response.data)
      })
  }

  useEffect(() => {
    getCourses()
    getStudents()
    getTutors()
  }, [])
  return (
    <DashboardLayout>
      <section>
        <div className='p-4 flex justify-between w-full shadow-[0px_1px_2.799999952316284px_0px_#1E1E1E38]'>
          <div>
            <p className='font-medium'>Welcome</p>
            <p className='font-bold capitalize'>{user.fullName}</p>
          </div>
          <div className='w-1/2 relative'>
            <input type="text" className='pl-10 p-2 w-full rounded-md border border-[#1E1E1E8A] bg-transparent' placeholder='Search courses, trainer, test etc' />
            <img className='absolute top-2 w-6 left-2' src="/images/icons/search.svg" alt="" />
          </div>
          <div className='flex w-28 justify-between'>
            <div className='p-3 h-10 w-10 my-auto rounded-full shadow-md'>
              <img src="/images/icons/notification.svg" alt="" />
            </div>
            <img className='h-10 w-10 my-auto' src="/images/user.png" alt="" />
          </div>
        </div>
      </section>
      <section className='p-4 flex justify-between'>
        <StatCard title='Total No. of Courses' count={courses.length} bg='#27C2D6' img='clock-line' />
        <StatCard title='Total No. of Admissions' count={students.length} bg='#DC9F08' img='ic_outline-assessment' />
        <StatCard title='Graduates/Experts' count={"40"} bg='#53C48C' img='game-icons_progression' />
        <StatCard title='Training Providers' count={tutors.length} bg='#7E34C9' img='ph_chalkboard-teacher' />
      </section>
      <section className='m-2 p-3 shadow-md'>
        <div className='text-sm flex justify-between'>
          <div className='flex justify-between w-[40%]'>
            <p className='my-auto'>All Courses</p>
            <Dropdown menu={{ items }} trigger={["click"]}>
              <button className='bg-primary p-2 font-medium text-sm rounded-md'>
                + Add training resources
                <DownOutlined />
              </button>
            </Dropdown>
          </div>
          <Link href={'/admin/courses'}><p className='text-[#DC9F08]'>VIEW ALL</p></Link>
        </div>
        <div className='flex flex-wrap justify-between'>
          {
            courses.length >= 1 ?
              courses.slice(0, 6).map((course) => <CoursesCard course={course} />) : <div>No course yet!</div>
          }
        </div>
      </section>
      <AddCourse open={open} handleClick={() => setOpen(!open)} />
      <AddResources open={resources} handleClick={() => setResources(!resources)} />
    </DashboardLayout>
  );
};

export default adminDashboard;