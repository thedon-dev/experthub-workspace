import React, { useEffect, useState } from 'react';
import { useAppSelector } from '@/store/hooks';
import axios from 'axios';
import { CourseType } from '@/types/CourseType';
import { UserType } from '@/types/UserType';
import { notification } from 'antd';

const EnrollStudent = ({ open, handleClick, course }: { open: boolean, handleClick: any, course: CourseType }) => {
  const [user, setUser] = useState("")
  const [loading, setLoading] = useState(false)
  const [students, setStudents] = useState<UserType[]>([])
  const [api, contextHolder] = notification.useNotification();

  const getStudents = () => {
    axios.get('user/students')
      .then(function (response) {
        setStudents(response.data.students)
        // console.log(response.data)
      })
  }


  const enroll = () => {
    setLoading(true)
    axios.post(`courses/enroll/${course._id}`, {
      id: user
    })
      .then(function (response) {
        console.log(response.data)
        setLoading(false)
        handleClick()
        api.open({
          message: "Student enrolled successfully!"
        });
      })
      .catch(err => {
        setLoading(false)
        api.open({
          message: err.response.data.message
        });
      })
  }

  useEffect(() => {
    getStudents()
  }, [])
  return (
    open && <div>
      {contextHolder}
      <div onClick={() => handleClick()} className='fixed cursor-pointer bg-[#000000] opacity-50 top-0 left-0 right-0 w-full h-[100vh] z-10'></div>
      <div className='fixed top-10 bottom-10 left-0 rounded-md right-0 lg:w-[50%] w-[90%] h-[40%] mx-auto z-20 bg-[#F8F7F4]'>
        <div className='shadow-[0px_1px_2.799999952316284px_0px_#1E1E1E38] p-4 lg:px-12 flex justify-between'>
          <p className='font-medium'>Enroll Student</p>
          <img onClick={() => handleClick()} className='w-6 h-6 cursor-pointer' src="/images/icons/material-symbols_cancel-outline.svg" alt="" />
        </div>
        <div className='lg:p-10 p-4'>
          <div className='flex justify-between my-3'>
            <div className='w-full'>
              <label className='text-sm font-medium my-2'>Select Student</label>
              <select onChange={e => setUser(e.target.value)} value={user} className='border rounded-md w-full border-[#1E1E1ED9] p-2 bg-transparent'>
                {students.map(student => <option key={student.studentId} value={student.studentId}>{student.fullname}</option>)}
              </select>
            </div>
          </div>
          <div>
            <div className='flex'>
              <button onClick={() => enroll()} className='p-2 bg-primary font-medium w-40 rounded-md text-sm'> {loading ? "loading..." : "Enroll"}</button>
              <button onClick={() => handleClick()} className='mx-4'>Cancel</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnrollStudent;