"use client"

import DashboardLayout from '@/components/DashboardLayout';
import ApplicantCourses from '@/components/cards/ApplicantCourses';
import RecommendedCard from '@/components/cards/RecommendedCard';
import StatCard from '@/components/cards/StatCard';
import CourseDetails from '@/components/modals/CourseDetails';
import React, { useEffect, useState } from 'react';
import { useAppSelector } from '@/store/hooks';
import axios from 'axios';
import { CourseType } from '@/types/CourseType';
import { AssesmentType } from '@/types/AssesmentType';

const applicant = () => {
  const user = useAppSelector((state) => state.value);
  const [reccomended, setReccomended] = useState<CourseType | []>([])
  const [courses, setCourses] = useState<CourseType | []>([])
  const [view, setView] = useState(3)
  const [instructors, setInstructors] = useState([])

  const [assesments, setAssesment] = useState<AssesmentType | []>([])

  const getAssesment = async () => {
    await axios.get(`assessment/my-assessment/${user.id}`)
      .then(function (response) {
        setAssesment(response.data.myAssesment.reverse())
        // console.log(response.data)
      })
  }
  const getRecommended = async () => {
    await axios.get(`courses/recommended-courses/${user.id}`)
      .then(function (response) {
        setReccomended(response.data.courses)
        // console.log(response.data)
      })
  }
  const getCourses = async () => {
    await axios.get(`courses/enrolled-courses/${user.id}`)
      .then(function (response) {
        setCourses(response.data.enrolledCourses.reverse())
        // console.log(response.data.enrolledCourses)
      })
  }
  const getTutors = () => {
    axios.put('user/myinstructors', {
      course: user.assignedCourse
    })
      .then(function (response) {
        setInstructors(response.data.instructors)
        // console.log(response.data)
      })
  }

  useEffect(() => {
    getRecommended()
    getCourses()
    getTutors()
    getAssesment()
  }, [])

  return (
    <DashboardLayout>
      <section>
        <div className='p-4 flex justify-between w-full shadow-[0px_1px_2.799999952316284px_0px_#1E1E1E38]'>
          <div>
            <p className='font-medium'>Welcome</p>
            <p className='font-bold capitalize'>{user.fullName}</p>
          </div>
          <div className='sm:hidden w-1/2 relative'>
            <input type="text" className='pl-10 p-2 w-full rounded-md border border-[#1E1E1E8A] bg-transparent' placeholder='Search courses, trainer, test etc' />
            <img className='absolute top-2 w-6 left-2' src="/images/icons/search.svg" alt="" />
          </div>
          <div className='flex w-28 justify-between'>
            <div className='p-3 h-10 w-10 my-auto rounded-full shadow-md'>
              <img src="/images/icons/notification.svg" alt="" />
            </div>
            <img className='h-10 w-10 rounded-full my-auto' src={user.profilePicture} alt="" />
          </div>
        </div>
      </section>
      <section className='p-4 lg:flex justify-between'>
        <StatCard title='Total Learning Hours' count={"0 hrs 0 mins"} bg='#27C2D6' img='clock-line' />
        <StatCard title='Module Assessments' count={assesments.length} bg='#DC9F08' img='ic_outline-assessment' />
        <StatCard title='Progress' count={"0%"} bg='#53C48C' img='game-icons_progression' />
        <StatCard title='Training Providers' count={instructors.length} bg='#7E34C9' img='ph_chalkboard-teacher' />
      </section>
      <section className='m-3 p-3 rounded-md shadow-[0px_2px_4px_0px_#1E1E1E21]'>
        <div className='text-sm flex justify-between'>
          <div className=' lg:w-[40%]'>
            <h4 className='text-lg font-medium'>Continue learning</h4>
            <p className='my-2 text-base'>{user.assignedCourse}</p>

          </div>
          <p onClick={() => setView(view === 3 ? courses.length : 3)} className='text-[#DC9F08] cursor-pointer mt-auto'>VIEW {view === 3 ? "ALL" : "LESS"}</p>
        </div>
        <div className='flex flex-wrap justify-between'>
          {courses.slice(0, view).map((course: CourseType) => <ApplicantCourses key={course._id} course={course} />)}
          {/* <ApplicantCourses />
          <ApplicantCourses />
          <ApplicantCourses /> */}
        </div>
      </section>
      <section className='m-4'>
        <p className='text-xl font-medium my-3'>Application status</p>
        <p className='text-sm'>You are a part of our Learning Community and will be in queue for future phases of the training program. The learning
          community will provide you with self-paced resources that you can leverage on your learning journey. In the learning community,
          you will have companions on your learning journey through connections with other learners in your cohort learning similar skills and the support
          of a dedicated mentor and our Admin to guide you along the way.
          <br /> <br />
          Your Learning Community journey will begin on the 12th of January, 2024. You can begin your learning journey with some introductory
          courses in your skill area in the resources section in your archive. We are excited to support your learning journey. Thank you for your cooperation,
          and enjoy your journey to becoming an expert and a digital nomad.</p>
      </section>
      <section className='m-2 p-3 shadow-md'>
        <div className='text-sm my-3 flex justify-between'>
          <p className='font-bold text-base'>Recommended for you</p>
          <p className='text-[#DC9F08] text-sm'>VIEW ALL</p>
        </div>
        <div className='flex flex-wrap justify-between'>
          {
            reccomended.length === 0 ? <div>No reccomended courses</div> : reccomended.map((course: any) => <RecommendedCard key={course._id} course={course} call={() => getCourses()} />)
          }
          {/* <RecommendedCard />
          <RecommendedCard />
          <RecommendedCard /> */}
        </div>
      </section>
    </DashboardLayout>
  );
};

export default applicant;