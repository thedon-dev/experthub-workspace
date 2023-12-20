import React, { useState } from 'react';
import { InboxOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { message, Upload } from 'antd';

const { Dragger } = Upload;

const props: UploadProps = {
  name: 'file',
  multiple: true,
  action: 'https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188',
  onChange(info) {
    const { status } = info.file;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e) {
    console.log('Dropped files', e.dataTransfer.files);
  },
};

const AddCourse = ({ open, handleClick }: { open: boolean, handleClick: any }) => {
  const [active, setActive] = useState(0)

  return (
    open && <div>
      <div onClick={() => handleClick()} className='fixed cursor-pointer bg-[#000000] opacity-50 top-0 left-0 right-0 w-full h-[100vh] z-10'></div>
      <div className='fixed top-10 bottom-10 left-0 rounded-md right-0 w-[70%] mx-auto z-20 bg-[#F8F7F4]'>
        <div className='shadow-[0px_1px_2.799999952316284px_0px_#1E1E1E38] p-4 px-12 flex justify-between'>
          <p className='font-medium'>Add Courses</p>
          <img onClick={() => handleClick()} className='w-6 h-6 cursor-pointer' src="/images/icons/material-symbols_cancel-outline.svg" alt="" />
        </div>
        <div className='flex justify-between mx-12 my-4'>
          <div className='w-[48%]'>
            <Dragger {...props}>
              <div className=''>
                <img src="/images/icons/upload.svg" className='mx-auto' alt="" />
                <p className="ant-upload-text">Click or drag file to this area to upload</p>
              </div>
            </Dragger>
          </div>
          <div className='w-[48%]'>
            <div className='border-b font-medium flex justify-between border-[#1E1E1E12]'>
              <div className={active === 0 ? 'border-b border-primary p-2' : 'p-2'}>
                <p>Course Details</p>
              </div>
              <div className={active === 1 ? 'border-b border-primary p-2' : 'p-2'}>
                <p>Descriptions</p>
              </div>
              <div className={active === 2 ? 'border-b border-primary p-2' : 'p-2'}>
                <p>Fee</p>
              </div>
            </div>
            <div>
              {(() => {
                switch (active) {
                  case 0:
                    return <div>
                      <div className='flex justify-between my-1'>
                        <div className='w-[48%]'>
                          <label className='text-sm font-medium my-1'>Course Category</label>
                          <input type="text" className='border rounded-md w-full border-[#1E1E1ED9] p-2 bg-transparent' />
                        </div>
                        <div className='w-[48%]'>
                          <label className='text-sm font-medium my-1'>Privacy</label>
                          <input type="text" className='border rounded-md w-full border-[#1E1E1ED9] p-2 bg-transparent' />
                        </div>
                      </div>
                      <div className='my-1'>
                        <label className='text-sm font-medium my-1'>Course title</label>
                        <input type="text" className='border rounded-md w-full border-[#1E1E1ED9] p-2 bg-transparent' />
                      </div>
                      <div className='my-1'>
                        <label className='text-sm font-medium my-1'>About course</label>
                        <textarea className='border rounded-md border-[#1E1E1ED9] w-full h-32 p-2 bg-transparent'></textarea>
                      </div>
                    </div>
                  case 1:
                    return <div>
                      <div className='my-1'>
                        <label className='text-sm font-medium my-1'>Instructor Name</label>
                        <input type="text" className='border rounded-md w-full border-[#1E1E1ED9] p-2 bg-transparent' />
                      </div>
                      <div className='flex justify-between mt-6 my-1'>
                        <div className='w-[48%]'>
                          <label className='text-sm font-medium my-1'>Duration</label>
                          <input type="text" className='border rounded-md w-full border-[#1E1E1ED9] p-2 bg-transparent' />
                        </div>
                        <div className='w-[48%]'>
                          <label className='text-sm font-medium my-1'>Course type</label>
                          <select className='border rounded-md w-full border-[#1E1E1ED9] p-2 bg-transparent'>
                            <option value="">Offline</option>
                            <option value="">Video</option>
                            <option value="">PDF</option>
                          </select>
                        </div>
                      </div>
                      <div className='flex justify-between my-1'>
                        <div className='w-[48%]'>
                          <label className='text-sm font-medium my-1'>Start date</label>
                          <input type="date" className='border rounded-md w-full border-[#1E1E1ED9] p-2 bg-transparent' />
                        </div>
                        <div className='w-[48%]'>
                          <label className='text-sm font-medium my-1'>End date</label>
                          <input type="date" className='border rounded-md w-full border-[#1E1E1ED9] p-2 bg-transparent' />
                        </div>
                      </div>
                      <div className='flex justify-between my-1'>
                        <div className='w-[48%]'>
                          <label className='text-sm font-medium my-1'>Start time</label>
                          <input type="time" className='border rounded-md w-full border-[#1E1E1ED9] p-2 bg-transparent' />
                        </div>
                        <div className='w-[48%]'>
                          <label className='text-sm font-medium my-1'>End time</label>
                          <input type="time" className='border rounded-md w-full border-[#1E1E1ED9] p-2 bg-transparent' />
                        </div>
                      </div>
                    </div>
                  case 2:
                    return <div>
                      <div className='my-1'>
                        <label className='text-sm font-medium my-1'>Course Fee</label>
                        <input type="number" className='border rounded-md w-full border-[#1E1E1ED9] p-2 bg-transparent' />
                        <p className='text-xs'>Set course fee to 0 for a free course</p>
                      </div>
                      <div className='my-5'>
                        <label className='text-sm font-medium my-1'>Show striked out original cost fee</label>
                        <textarea className='border rounded-md border-[#1E1E1ED9] w-full h-20 p-2 bg-transparent'></textarea>
                      </div>
                    </div>
                  default:
                    return null
                }
              })()}
              <div>
                <p className='text-sm my-4'>By uploading you agree that this course is a product of you
                  and not being forged<input className='ml-2' type="checkbox" /></p>
                <div className='flex'>
                  {active === 2 ? <button className='p-2 bg-primary font-medium w-40 rounded-md text-sm'>Add Course</button> : <button onClick={() => setActive(active + 1)} className='p-2 bg-primary font-medium w-40 rounded-md text-sm'>Next</button>}
                  <button onClick={() => handleClick()} className='mx-4'>Cancel</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCourse;