import React, { useState } from 'react';
import { Dropdown, MenuProps } from 'antd';
import axios from 'axios';
import { ResourceType } from '@/types/ResourceType';
import AddResources from '../modals/AddResources';

const ResourcesCard = ({ material, getAll }: { material: ResourceType, getAll: any }) => {
  const [edit, setEdit] = useState(false)
  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <p onClick={() => setEdit(true)} >Edit Resource</p>
      )
    },
    {
      key: '1',
      label: (
        <p onClick={() => setDelete()} >Delete Resource</p>
      )
    },
  ]



  const setDelete = () => {
    axios.delete(`resources/delete/${material._id}`)
      .then(function (response) {
        console.log(response.data)
        getAll()
      })
  }
  return (
    <div className='p-1 lg:w-[32%] w-full'>
      <div className=''>
        <a href={material.websiteUrl} target='_blank'>
          <div className='p-3 rounded-md bg-white'>
            <img className='rounded-md h-44 object-cover w-full' src={material.image} alt="" />
          </div>
        </a>
        <div className='p-1 flex justify-between'>
          {/* <p className='text-[#DC9F08] font-medium text-sm'>Course by Peoples power</p> */}
          <div>
            <h4 className='text-xl my-3'>{material.title}</h4>
            <p className='text-sm'>{material.aboutCourse}</p>
          </div>
          <div>
            <Dropdown menu={{ items }} trigger={["click"]}>
              <button className='bg-transparent'>
                <img className='w-4 h-4' src="/images/icons/edit.svg" alt="" />
              </button>
            </Dropdown>
          </div>
        </div>
      </div>
      <AddResources open={edit} handleClick={() => setEdit(false)} material={material} />
    </div>
  );
};

export default ResourcesCard;