import React from 'react';
import type { MenuProps } from 'antd';
import { Dropdown } from 'antd';

const items: MenuProps['items'] = [
  {
    label: 'Send Assessment',
    key: '1',
  },
  {
    label: 'Send Message',
    key: '2',
  },
  {
    label: 'Assign Course',
    key: '3',
  },
  {
    label: 'View Account',
    key: '4',
  },
];

const AdmissionCard = () => {
  return (
    <div>
      <div className='flex border border-[#1E1E1E80] p-3 rounded-md my-3 flex justify-between'>
        <img src="/images/user.png" alt="" />
        <div>
          <p className='font-medium text-sm'>Evans D</p>
          <p className='text-xs'>Software Engineer</p>
        </div>
        <div>
          <p className='text-xs'>Course</p>
          <p className=' text-sm'>Data Analysis</p>
        </div>
        <p className='text-sm text-[#0BC01E] my-auto font-medium'>Completed</p>
        <div className='my-auto'>
          <Dropdown
            menu={{ items }}
            trigger={["click"]}
          >
            <img className='w-4 h-4 my-auto cursor-pointer' src="/images/icons/edit-icon.svg" alt="" />
          </Dropdown>
        </div>
      </div>
    </div>
  );
};

export default AdmissionCard;