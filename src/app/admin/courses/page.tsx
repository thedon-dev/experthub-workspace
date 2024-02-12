"use client"

import DashboardLayout from '@/components/DashboardLayout';
import React, { useState } from 'react';
import { DownOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Dropdown } from 'antd';
import AddCourse from '@/components/modals/AddCourse';
import AddResources from '@/components/modals/AddResources';

const courses = () => {

  const [open, setOpen] = useState(false)
  const [resources, setResources] = useState(false)

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <p onClick={() => setOpen(true)} >Courses</p>
      ),
    },
    {
      key: '2',
      label: (
        <p>Materials</p>

      ),
    },
    {
      key: '3',
      label: (
        <p onClick={() => setResources(true)}>Resources</p>
      ),
    },

  ];
  return (
    <DashboardLayout>
      <section className='p-4'>
        <div className='flex justify-between'>
          <div>
            <p className='text-xl'>All Course</p>
            <p className='text-sm'>You will never go wrong with our course</p>
          </div>
          <div className=''>
            <Dropdown menu={{ items }} trigger={["click"]}>
              <button className='bg-primary p-2 font-medium text-sm rounded-md'>
                + Add training resources
                <DownOutlined />
              </button>
            </Dropdown>
          </div>
          <div></div>
        </div>
        <AddCourse open={open} handleClick={() => setOpen(!open)} />
        <AddResources open={resources} handleClick={() => setResources(!resources)} />
      </section>
    </DashboardLayout>
  );
};

export default courses;
