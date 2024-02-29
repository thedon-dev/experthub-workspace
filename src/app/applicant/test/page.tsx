"use client"

import DashboardLayout from '@/components/DashboardLayout';
import AssesmentCard from '@/components/cards/AssesmentCard';
import { useAppSelector } from '@/store/hooks';
import { AssesmentType } from '@/types/AssesmentType';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Assesment = () => {
  const [assesments, setAssesment] = useState<AssesmentType | []>([])
  const user = useAppSelector((state) => state.value);
  
  const getAssesment = async () => {
    await axios.get(`assessment/my-assessment/${user.id}`)
      .then(function (response) {
        setAssesment(response.data.myAssesment.reverse())
        // console.log(response.data)
      })
  }
  useEffect(() => {
    getAssesment()
  }, [])

  return (
    <DashboardLayout>
      <section className='shadow-[0px_1px_2.799999952316284px_0px_#1E1E1E38] p-6 text-center'>
        <p className='text-lg font-medium'>My Assessment</p>
      </section>
      <div className='p-4 flex flex-wrap justify-between'>
        {assesments.map((assesment: AssesmentType) => <AssesmentCard key={assesment._id} assesment={assesment} />)}
      </div>
    </DashboardLayout>

  );
};

export default Assesment;