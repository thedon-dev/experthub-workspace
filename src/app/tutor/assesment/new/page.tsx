"use client"

import DashboardLayout from '@/components/DashboardLayout';
import React, { useState } from 'react';

const newAssesment = () => {
  const [questions, setQuestions] = useState([])
  return (
    <DashboardLayout>
      <div className='p-3'>
        hello
      </div>
    </DashboardLayout>
  );
};

export default newAssesment;