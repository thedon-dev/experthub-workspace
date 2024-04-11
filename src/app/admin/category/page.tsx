"use client"

import DashboardLayout from '@/components/DashboardLayout';
import CategoryModal from '@/components/modals/CategoryModal';
import { CategoryType } from '@/types/CourseType';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Accordion, AccordionItem as Item } from '@szhsin/react-accordion';
import Category from '@/components/cards/Category';
// import chevron from "@/../public/images/icons/chevron-down.svg";



const category = () => {
  const [category, setCategory] = useState(false)
  const [categories, setCategories] = useState<CategoryType[]>([])

  const getCategories = () => {
    axios.get('category/all').then(function (response) {
      // console.log(response.data)
      setCategories(response.data.category)
    }).catch(error => {
      console.log(error)
    })
  }

  useEffect(() => {
    getCategories()
  }, [])

  return (
    <DashboardLayout>
      <div className='p-4'>
        <div>
          <button onClick={() => setCategory(true)} className='bg-primary p-3 rounded-md '>Add Category</button>
        </div>
        <div>
          <Accordion>
            {categories.map(category => <div className='my-6' key={category._id}>
              <Category category={category} fetch={() => getCategories()} />
            </div>)}
          </Accordion>
        </div>
        <CategoryModal open={category} category={null} handleClick={() => setCategory(false)} />
      </div>
    </DashboardLayout>
  );
};

export default category;