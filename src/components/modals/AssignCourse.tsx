import React, { useState } from 'react';
import { useAppSelector } from '@/store/hooks';
import axios from 'axios';

const AssignCourse = ({ open, handleClick, studentId }: { open: boolean, handleClick: any, studentId: string }) => {
  const user = useAppSelector((state) => state.value);
  const [category, setCategory] = useState("")
  const [loading, setLoading] = useState(false)

  const assign = () => {
    setLoading(true)
    try {
      axios.put(`user/updateProfile/${studentId}`, {
        course: category
      })
        .then(function (response) {
          setLoading(false)
          console.log(response.data)
          handleClick()
        })
    } catch (e) {
      console.log(e)
      setLoading(false)
    }
  }

  return (
    open && <div>
      <div onClick={() => handleClick()} className='fixed cursor-pointer bg-[#000000] opacity-50 top-0 left-0 right-0 w-full h-[100vh] z-10'></div>
      <div className='fixed top-10 bottom-10 left-0 rounded-md right-0 w-[50%] h-[40%] mx-auto z-20 bg-[#F8F7F4]'>
        <div className='shadow-[0px_1px_2.799999952316284px_0px_#1E1E1E38] p-4 px-12 flex justify-between'>
          <p className='font-medium'>Assign Course</p>
          <img onClick={() => handleClick()} className='w-6 h-6 cursor-pointer' src="/images/icons/material-symbols_cancel-outline.svg" alt="" />
        </div>
        <div className='p-10'>
          <div className='flex justify-between my-3'>
            <div className='w-full'>
              <label className='text-sm font-medium my-2'>Course Category</label>
              <select onChange={e => setCategory(e.target.value)} value={category} className='border rounded-md w-full border-[#1E1E1ED9] p-2 bg-transparent'>
                <option value="Virtual Assistant">Virtual Assistant</option>
                <option value="Product Management">Product Management</option>
                <option value="Cybersecurity">Cybersecurity </option>
                <option value="Software Development">Software Development</option>
                <option value="AI / Machine Learning">AI / Machine Learning</option>
                <option value="Data Analysis & Visualisation">Data Analysis & Visualisation</option>
                <option value="Story Telling">Story Telling</option>
                <option value="Animation">Animation</option>
                <option value="Cloud Computing">Cloud Computing</option>
                <option value="Dev Ops">Dev Ops</option>
                <option value="UI/UX Design">UI/UX Design</option>
                <option value="Journalism">Journalism</option>
                <option value="Game development">Game development</option>
                <option value="Data Science">Data Science</option>
                <option value="Digital Marketing">Digital Marketing</option>
                <option value="Advocacy">Advocacy</option>
              </select>
            </div>
          </div>

          <div>
            <div className='flex'>
              <button onClick={() => assign()} className='p-2 bg-primary font-medium w-40 rounded-md text-sm'> {loading ? "loading..." : "Assign"}</button>
              <button onClick={() => handleClick()} className='mx-4'>Cancel</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignCourse;