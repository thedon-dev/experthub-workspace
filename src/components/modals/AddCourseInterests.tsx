import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { CategoryType } from '@/types/CourseType';
import apiService from '@/utils/apiService';
import { notification } from 'antd';
import React, { useEffect, useState } from 'react';
import { setUser } from "@/store/slices/userSlice";

const AddCourseInterests = ({ open, handleClick }: { open: boolean, handleClick: any }) => {
  const [api, contextHolder] = notification.useNotification();
  const [saving, setSaving] = useState(false)
  const user = useAppSelector((state) => state.value);
  const dispatch = useAppDispatch();

  const [category, setCategory] = useState("")
  const [categoryIndex, setCategoryIndex] = useState("")
  const [categories, setCategories] = useState<CategoryType[]>([])

  const getCategories = () => {
    apiService.get('category/all').then(function (response) {
      setCategories(response.data.category)
    }).catch(error => {
      console.log(error)
    })
  }
  useEffect(() => {
    getCategories()
  }, [])

  const saveChanges = async () => {
    setSaving(true)
    await apiService.put(`user/assign/${user.id}`, {
      course: category === "" ? categoryIndex : category
    }).then(function (response) {
      console.log(response.data.user)
      dispatch(
        setUser({
          ...response.data.user,
          accessToken: user.accessToken,
        })
      );
      setSaving(false)
      api.open({
        message: `Interest Added Successfully!`
      });
      handleClick()
    }).catch(error => {
      console.log(error)
      setSaving(false)
    })
  }

  const unAssign = async (category: any) => {
    // setSaving(true)
    await apiService.put(`user/unassign/${user.id}`, {
      course: category
    }).then(function (response) {
      console.log(response.data.user)
      dispatch(
        setUser({
          ...response.data.user,
          accessToken: user.accessToken,
        })
      );
      // setSaving(false)
      api.open({
        message: `Interest removed Successfully!`
      });
      handleClick()
    }).catch(error => {
      console.log(error)
      setSaving(false)
    })
  }

  return (
    open ? <div>
      <div onClick={() => handleClick()} className='fixed cursor-pointer bg-[#000000] opacity-50 top-0 left-0 right-0 w-full h-[100vh] z-10'></div>
      <div className='fixed top-10 bottom-10 left-0 overflow-y-auto rounded-md right-0 lg:w-[40%] w-[95%] mx-auto z-20 bg-[#F8F7F4]'>
        <div className='shadow-[0px_1px_2.799999952316284px_0px_#1E1E1E38] p-4 lg:px-12 flex justify-between'>
          <p className='font-medium'>Course Interests</p>
          <img onClick={() => handleClick()} className='w-6 h-6 cursor-pointer' src="/images/icons/material-symbols_cancel-outline.svg" alt="" />
        </div>
        {contextHolder}
        <div className='mx-10'>
          <div className=' p-3 rounded-md my-4'>
            <div className='w-full my-2'>
              <label className='text-sm font-medium my-1'>Category</label>
              <select onChange={e => setCategoryIndex(e.target.value)} value={categoryIndex} className='border rounded-md w-full border-[#1E1E1ED9] p-2 bg-transparent'>
                <option className='hidden' value="">Select Category</option>
                {categories.map((single, index) => <option key={index} value={single.category}>{single.category}</option>)}
              </select>
            </div>
            {categories.map(single => single.category === categoryIndex && single.subCategory.length >= 1 && <div key={single._id} className='w-full my-2'>
              <label className='text-sm font-medium my-1'>Sub Category</label>
              <select onChange={e => setCategory(e.target.value)} value={category} className='border rounded-md w-full border-[#1E1E1ED9] p-2 bg-transparent'>
                <option className='hidden' value="">Select Sub-Category</option>
                {single.subCategory.map((sub, index) => <option key={index} value={sub}>{sub}</option>)}
              </select>
            </div>)}
            <div className='text-center'><button onClick={() => saveChanges()} className='bg-primary p-2 px-6 my-4 font-medium'>{saving ? "saving..." : "Save Changes"}</button></div>
          </div>
        </div>
        <div className='px-4'>
          <p className='text-base font-bold'>Interests</p>
          {user.otherCourse?.map((single: string, index: any) => single.length === 0 ? null : <div key={index} className='my-2  text-base flex w-1/2 justify-between'>
            <div className='bg-gray px-4'>
              <p >{single}</p>
            </div>
            <div className='my-auto cursor-pointer' onClick={() => { unAssign(single) }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
                <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
              </svg>
            </div>
          </div>)}
        </div>
      </div>
    </div> : null
  );

};

export default AddCourseInterests;