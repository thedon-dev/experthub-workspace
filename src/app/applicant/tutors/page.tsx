"use client"

import DashboardLayout from '@/components/DashboardLayout';
import SearchNav from '@/components/SearchNav';
import AdmissionCard from '@/components/cards/AdmissionCard';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const tutor = () => {
  const [instructors, setInstructors] = useState([])

  const getTutors = () => {
    axios.get('https://experthub-20f6efa1a0d9.herokuapp.com/user/instructors')
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
      <SearchNav />
      <section className='m-4'>
        <p className='text-lg my-3 font-medium'>Training Providers</p>
        {instructors.map((tutor) => <AdmissionCard tutor={tutor} />)}
      </section>
    </DashboardLayout>
  );
};

export default tutor;