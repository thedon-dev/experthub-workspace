"use client"


import DashboardLayout from '@/components/DashboardLayout';
import React, { useEffect, useState, useRef } from 'react';
import { useAppSelector } from '@/store/hooks';
import { notification } from 'antd';
import apiService from '@/utils/apiService';

const profile = () => {
  const user = useAppSelector((state) => state.value);
  const uploadRef = useRef<HTMLInputElement>(null)
  const [api, contextHolder] = notification.useNotification();
  const [phone, setPhone] = useState("")
  const [skill, setSkill] = useState("")
  const [age, setAge] = useState("")
  const [gender, setGender] = useState("")
  const [state, setState] = useState("")
  const [country, setCountry] = useState("")
  const [profilePicture, setProfilePicture] = useState<string>()
  const [editing, setEditing] = useState(false)

  const [banks, setBanks] = useState<any | []>([])
  const [bankCode, setCode] = useState('')
  const [accountNumber, setAccountNumber] = useState('')
  const [accountName, setAccountName] = useState("")
  const [load, setLoad] = useState(false)

  const [loading, setLoading] = useState(false)
  const [file, setFile] = useState<FileList | null>()

  const getBanks = () => {
    apiService.get(`transactions/banks`)
      .then(function (response) {
        // console.log(response.data)
        setBanks(response.data.data)
      })
  }

  const verifyAccount = (code: string) => {
    try {
      setLoading(true)
      apiService.put(`transactions/verify-account`, {
        accountNumber,
        bankCode: code
      })
        .then(function (response) {
          // console.log(response.data)
          setCode(code)
          setAccountName(response.data.data)
          setLoading(false)
        })
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    verifyAccount(bankCode)
  }, [bankCode])


  useEffect(() => {
    getBanks()
  }, [])

  const createRecipient = () => {
    try {
      setLoad(true)
      apiService.post(`transactions/create-recipient`, {
        accountNumber,
        bankCode,
        userId: user.id
      })
        .then(function (response) {
          // console.log(response.data)
          api.open({
            message: response.data.message
          });
          setLoad(false)
        })
        .catch(err => {
          setLoad(false)
          api.open({
            message: err.response.data
          });
          // console.log(err.response.data.message)
        })
    } catch (e) {
      console.log(e)
    }
  }
  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {

    const files = e.target.files
    setFile(e.target.files)

    const reader = new FileReader()
    if (files && files.length > 0) {

      reader.readAsDataURL(files[0])
      reader.onloadend = () => {
        if (reader.result) {
          // const type = files[0].name.substr(files[0].name.length - 3)
          setProfilePicture(reader.result as string)
        }
      }
    }
  }

  const getUser = () => {
    apiService.get(`user/profile/${user.id}`)
      .then(function (response) {
        setPhone(response.data.user.phone)
        setSkill(response.data.user.skillLevel)
        setAge(response.data.user.age)
        setGender(response.data.user.gender)
        setState(response.data.user.state)
        setCountry(response.data.user.country)
        setProfilePicture(response.data.user.profilePicture)
        setAccountNumber(response.data.user.accountNumber)
        setCode(response.data.user.bankCode)
        console.log(response.data)
      })
  }

  const addPic = () => {
    setEditing(true)
    const formData = new FormData()
    file && formData.append("image", file[0])
    try {
      apiService.put(`user/updateProfilePicture/${user.id}`, formData)
        .then(function (response) {
          getUser()
          api.open({
            message: 'Profile Picture Updated Successfully!'
          });
          setEditing(false)
          console.log(response.data)
        })
    } catch (e) {
      setEditing(false)
      console.log(e)
    }
  }

  const updateUser = () => {
    setLoading(true)
    try {
      apiService.put(`user/updateProfile/${user.id}`, {
        phone,
        gender,
        age,
        skillLevel: skill,
        country,
        state
      })
        .then(function (response) {
          getUser()
          setLoading(false)
          console.log(response.data)
        })
    } catch (e) {
      console.log(e)
      setLoading(false)
    }
  }

  useEffect(() => {
    getUser()
  }, [])
  return (
    <DashboardLayout>
      <section className='lg:w-[25%] mt-4 mx-auto'>
        {contextHolder}
        <div className='shadow-[0px_2px_4px_0px_#1E1E1E21] p-3 text-center rounded-md'>
          <p className='font-medium text-lg'>Personal Details</p>
          <img onClick={() => uploadRef.current?.click()} src={profilePicture ? profilePicture : "/images/user.png"} className='w-10 h-10 rounded-full object-cover cursor-pointer mx-auto my-3' alt="" />
          <input
            onChange={handleImage}
            type="file"
            name="identification"
            accept="image/*"
            ref={uploadRef}
            hidden
            multiple={false}
          />
          <p className='font-medium'>{user.fullName}</p>
          <p className='text-xs'>{user.email} </p>
          <button onClick={() => addPic()} className='bg-primary p-2 px-6 my-4 font-medium'>{editing ? 'loading...' : 'Edit profile'}</button>
        </div>
        <div className='p-3'>
          <div className='my-4 text-center p-3 shadow-[0px_2px_4px_0px_#1E1E1E21] rounded-md'>
            <p className='font-medium text-sm'>Bank Account</p>
          </div>
          <div className='my-3'>
            <div className='my-2'>
              <label htmlFor="accountNumber" className='mb-2'>Account Number</label> <br />
              <input onChange={e => setAccountNumber(e.target.value)} value={accountNumber} className='p-3 rounded-md w-full' type="number" name="accountNumber" id="accountNumber" />
            </div>
            <div className='my-2'>
              <label htmlFor="bank" className='mb-2'>Bank</label> <br />
              <select onChange={e => { verifyAccount(e.target.value) }} name="bank" value={bankCode} id="bank" className='p-3 rounded-md w-full'>
                <option className='hidden' value="">Select your bank</option>
                {banks.map((bank: { code: string; name: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | React.PromiseLikeOfReactNode | null | undefined; }, index: React.Key | null | undefined) => <option key={index} value={bank.code}>{bank.name}</option>)}
              </select>
              {/* <button className='p-2 mt-2 w-18 !ml-auto bg-primary rounded-md text-white' onClick={() => verifyAccount()}>Verify</button> */}
            </div>
            <div className='my-2'>
              <label htmlFor="accountName" className='mb-2'>Account Name</label> <br />
              <input defaultValue={accountName} disabled className='p-3 rounded-md w-full' type="text" name="accountName" id="accountName" />
              <p className='text-xs'>{loading ? 'confirming account information' : null}    </p>
            </div>
          </div>
          <div className='text-center'>
            <button onClick={() => createRecipient()} className='bg-primary p-2 px-6 my-4 font-medium'>{load ? 'loading...' : 'Update Account'}</button>
          </div>
        </div>

        <div className='my-4 text-center p-3 shadow-[0px_2px_4px_0px_#1E1E1E21] rounded-md'>
          <p className='font-medium text-sm'>Highlights</p>
        </div>
        <div className='my-4 p-3 shadow-[0px_2px_4px_0px_#1E1E1E21] rounded-md'>
          <div className='my-2'>
            <label className='text-sm font-medium my-1'>Phone Number</label>
            <input onChange={e => setPhone(e.target.value)} value={phone} className='bg-transparent border-b border-[#1E1E1E66] w-full' type="number" />
          </div>
          <div className='my-2'>
            <label className='text-sm font-medium my-1'>Gender</label>
            <input onChange={e => setGender(e.target.value)} value={gender} className='bg-transparent border-b border-[#1E1E1E66] w-full' type="text" />
          </div>
          <div className='my-2'>
            <label className='text-sm font-medium my-1'>Age</label>
            <input onChange={e => setAge(e.target.value)} value={age} className='bg-transparent border-b border-[#1E1E1E66] w-full' type="number" />
          </div>
          <div className='my-2'>
            <label className='text-sm font-medium my-1'>Country of Residence</label>
            <input onChange={e => setCountry(e.target.value)} value={country} className='bg-transparent border-b border-[#1E1E1E66] w-full' type="text" />
          </div>

          <div className='my-2'>
            <label className='text-sm font-medium my-1'>State of Residence</label>
            <input onChange={e => setState(e.target.value)} value={state} className='bg-transparent border-b border-[#1E1E1E66] w-full' type="text" />
          </div>
          <div className='my-2'>
            <label className='text-sm font-medium my-1'>Skill Level</label>
            <input onChange={e => setSkill(e.target.value)} value={skill} className='bg-transparent border-b border-[#1E1E1E66] w-full' type="text" />
          </div>
          <div className='text-center'><button onClick={updateUser} className='bg-primary p-2 px-6 my-4 font-medium'>{loading ? "updating..." : "Edit highlights"}</button></div>
        </div>
      </section>
    </DashboardLayout>
  );
};

export default profile;