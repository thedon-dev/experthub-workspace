"use client"

import DashboardLayout from '@/components/DashboardLayout';
import SearchNav from '@/components/SearchNav';
import AdmissionCard from '@/components/cards/AdmissionCard';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useAppSelector } from '@/store/hooks';

const tutor = () => {
  const [instructors, setInstructors] = useState([])
  const user = useAppSelector((state) => state.value);

  const getTutors = () => {
    axios.put('user/myinstructors', {
      course: user.assignedCourse
    })
      .then(function (response) {
        setInstructors(response.data.instructors)
        console.log(response.data)
      })
  }

  useEffect(() => {
    getTutors()
  }, [])
  return (
    <DashboardLayout>
      {/* <SearchNav /> */}
      <section className='m-4'>
        <p className='text-lg my-3 font-medium'>Training Providers</p>
        {instructors.length > 0 ? instructors.map((tutor, index) => <AdmissionCard role='mentors' tutor={tutor} key={index} />) : <p>No Instructors available!</p>}
      </section>
    </DashboardLayout>
  );
};

export default tutor;