"use client"

import DashboardLayout from '@/components/DashboardLayout';
import React, { useEffect, useState } from 'react';
import AdmissionCard from '@/components/cards/AdmissionCard';
import SearchNav from '@/components/SearchNav';
import { UserType } from '@/types/UserType';
import Notice from '@/components/modals/Notice';
import { Modal } from 'antd';
import SignUpComp from '@/components/SignUpComp';
import apiService from '@/utils/apiService';

const addmissions = () => {
  const [active, setActive] = useState("contact")
  const [students, setStudents] = useState<UserType | []>([])
  const [tutors, setTutors] = useState<UserType | []>([])
  const [all, setAll] = useState<UserType | []>([])
  const [allTutor, setAllTutor] = useState<UserType | []>([])
  const [open, setOpen] = useState(false)
  const [contact, setContact] = useState(false)

  const getStudents = () => {
    apiService.get('user/students')
      .then(function (response) {
        setStudents(response.data.students)
        setAll(response.data.students)
        console.log(response.data)
      })
  }
  const getTutors = () => {
    apiService.get('user/instructors')
      .then(function (response) {
        setTutors(response.data.instructors)
        setAllTutor(response.data.instructors)
        // console.log(response.data)
      })
  }

  useEffect(() => {
    getStudents()
    getTutors()
  }, [])

  const search = (value: string) => {
    const results = all.filter((obj: UserType) => obj.fullname.toLowerCase().includes(value.toLowerCase()));
    setStudents(results)
  }

  const searchTutor = (value: string) => {
    const results = allTutor.filter((obj: UserType) => obj.fullname.toLowerCase().includes(value.toLowerCase()));
    setTutors(results)
  }

  return (
    <DashboardLayout>
      {/* <SearchNav /> */}

      <section className='m-4'>
        <div className='flex justify-between lg:w-[40%]'>
          <div onClick={() => setActive("contact")} className={active === "contact" ? "border-b-2 border-[#DC9F08] py-2" : "py-2 cursor-pointer"}>
            <p className='font-medium text-lg'>Contact</p>
          </div>
          <div onClick={() => setActive("students")} className={active === "students" ? "border-b-2 border-[#DC9F08] py-2" : "py-2 cursor-pointer"}>
            <p className='font-medium text-lg'>Students</p>
          </div>
          <div onClick={() => setActive("mentors")} className={active === "mentors" ? "border-b-2 border-[#DC9F08] py-2" : "py-2 cursor-pointer"}>
            <p className='font-medium text-lg'>Training Providers</p>
          </div>
        </div>
        {(() => {
          switch (active) {
            case 'contact':
              return <div>
                <div className='w-[60%] flex relative my-4'>
                  <input onChange={e => search(e.target.value)} type="text" className='pl-10 p-2 w-1/2 rounded-md border border-[#1E1E1E8A] bg-transparent' placeholder='Search students' />
                  <img className='absolute top-2 w-6 left-2' src="/images/icons/search.svg" alt="" />
                  <button onClick={() => setOpen(true)} className='bg-primary px-4 p-2 ml-6'>Send Notice</button>
                  <button onClick={() => setContact(true)} className='bg-primary px-4 p-2 ml-6'>Add Contact</button>
                </div>
                {
                  students.map((student: UserType, index: any) => student.contact ? <AdmissionCard role={active} tutor={student} key={index} /> : null)
                }
              </div>
            case 'students':
              return <div>
                <div className='w-[60%] flex relative my-4'>
                  <input onChange={e => search(e.target.value)} type="text" className='pl-10 p-2 w-1/2 rounded-md border border-[#1E1E1E8A] bg-transparent' placeholder='Search students' />
                  <img className='absolute top-2 w-6 left-2' src="/images/icons/search.svg" alt="" />
                  <button onClick={() => setOpen(true)} className='bg-primary px-4 p-2 ml-6'>Send Notice</button>
                  <button onClick={() => setContact(true)} className='bg-primary px-4 p-2 ml-6'>Add Contact</button>
                </div>
                {
                  students.map((student: UserType, index: any) => student.contact ? null : <AdmissionCard role={active} tutor={student} key={index} />)
                }

              </div>
            case 'mentors':
              return <div>
                <div className='w-[60%] flex relative my-4'>
                  <input onChange={e => searchTutor(e.target.value)} type="text" className='pl-10 p-2 w-1/2 rounded-md border border-[#1E1E1E8A] bg-transparent' placeholder='Search students' />
                  <img className='absolute top-2 w-6 left-2' src="/images/icons/search.svg" alt="" />
                  <button onClick={() => setOpen(true)} className='bg-primary px-4 p-2 ml-6'>Send Notice</button>
                  <button onClick={() => setContact(true)} className='bg-primary px-4 p-2 ml-6'>Add Contact</button>
                </div>
                {
                  tutors.map((student: UserType, index: any) => <AdmissionCard role={active} tutor={student} key={index} />)
                }
              </div>
            default:
              return null
          }
        })()}

        <Notice open={open} handleClick={() => setOpen(false)} />
        <Modal title="Add Contact" footer={[]} open={contact} onOk={() => setContact(false)} onCancel={() => setContact(false)}>
          <SignUpComp role='student' action={() => { getStudents(), setContact(false) }} />
        </Modal>
      </section>
    </DashboardLayout>
  );
};

export default addmissions;