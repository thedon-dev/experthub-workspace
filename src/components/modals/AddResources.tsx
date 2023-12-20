import React from 'react';

const AddResources = ({ open, handleClick }: { open: boolean, handleClick: any }) => {
  return (
    open && <div>
      <div onClick={() => handleClick()} className='fixed cursor-pointer bg-[#000000] opacity-50 top-0 left-0 right-0 w-full h-[100vh] z-10'></div>
      <div className='fixed top-10 bottom-10 left-0 rounded-md right-0 w-[50%] mx-auto z-20 bg-[#F8F7F4]'>
        <div className='shadow-[0px_1px_2.799999952316284px_0px_#1E1E1E38] p-4 px-12 flex justify-between'>
          <p className='font-medium'>Add Resources</p>
          <img onClick={() => handleClick()} className='w-6 h-6 cursor-pointer' src="/images/icons/material-symbols_cancel-outline.svg" alt="" />
        </div>
        <div className='p-10'>
          <div className='flex justify-between my-1'>
            <div className='w-[48%]'>
              <label className='text-sm font-medium my-1'>Title of Resources</label>
              <input type="text" className='border rounded-md w-full border-[#1E1E1ED9] p-2 bg-transparent' />
            </div>
            <div className='w-[48%]'>
              <label className='text-sm font-medium my-1'>Privacy</label>
              <select className='border rounded-md w-full border-[#1E1E1ED9] p-2 bg-transparent'>
                <option value=""></option>
              </select>
            </div>
          </div>
          <div className='my-1'>
            <label className='text-sm font-medium my-1'>Website Url/link</label>
            <input type="text" className='border rounded-md w-full border-[#1E1E1ED9] p-2 bg-transparent' />
          </div>
          <div className='my-1'>
            <label className='text-sm font-medium my-1'>About course</label>
            <textarea className='border rounded-md border-[#1E1E1ED9] w-full h-32 p-2 bg-transparent'></textarea>
          </div>
          <div>
            <p className='text-sm my-4'>By uploading you agree that this course is a product of you
              and not being forged<input className='ml-2' type="checkbox" /></p>
            <div className='flex'>
              <button className='p-2 bg-primary font-medium w-40 rounded-md text-sm'>Add Course</button>
              <button onClick={() => handleClick()} className='mx-4'>Cancel</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddResources;