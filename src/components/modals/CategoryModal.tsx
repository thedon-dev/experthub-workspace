import axios from 'axios';
import React, { useState } from 'react';
import { notification } from 'antd';

const CategoryModal = ({ open, handleClick }: { open: boolean, handleClick: any }) => {
  const [loading, setLoading] = useState(false)
  const [category, setCategory] = useState("")
  const [subCategory, setSubCategory] = useState<string[]>([])
  const [api, contextHolder] = notification.useNotification();
  const [newCat, setNewCat] = useState("")

  const handleSubmit = () => {
    setLoading(true)
    axios.post('category/new', {
      category,
      subCategory
    }).then(function (response) {
      console.log(response.data)
      setLoading(false)
      handleClick()
      api.open({
        message: "Category added successfully!"
      });
    })
      .catch(err => {
        setLoading(false)
        api.open({
          message: err.response.data.message
        });
      })
  }

  return (
    open && <div>
      {contextHolder}
      <div onClick={() => handleClick()} className='fixed cursor-pointer bg-[#000000] opacity-50 top-0 left-0 right-0 w-full h-[100vh] z-10'></div>
      <div className='fixed top-10 bottom-10 left-0 rounded-md right-0 lg:w-[50%] w-[90%] overflow-y-auto h-[80%] mx-auto z-20 bg-[#F8F7F4]'>
        <div className='shadow-[0px_1px_2.799999952316284px_0px_#1E1E1E38] p-4 lg:px-12 flex justify-between'>
          <p className='font-medium'>Add Category</p>
          <img onClick={() => handleClick()} className='w-6 h-6 cursor-pointer' src="/images/icons/material-symbols_cancel-outline.svg" alt="" />
        </div>
        <div className='lg:p-10 p-4'>
          <input onChange={(e) => setCategory(e.target.value)} type="text" className='p-3 border my-1 rounded-md w-full' placeholder='Enter Category' />

          {
            subCategory.map(cat => <p className='text-lg'>{cat}</p>)
          }
          <input onChange={(e) => setNewCat(e.target.value)} type="text" className='p-3 border my-1 rounded-md w-full' placeholder='Enter Sub Category' />
          <button onClick={() => { setSubCategory([...subCategory, newCat]); setNewCat("") }} className='p-3 bg-primary my-6'>Add</button>
          <div>
            <div className='flex'>
              <button onClick={() => handleSubmit()} className='p-2 bg-primary font-medium w-40 rounded-md text-sm'> {loading ? "loading..." : "Submit"}</button>
              <button onClick={() => handleClick()} className='mx-4'>Cancel</button>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
};

export default CategoryModal;