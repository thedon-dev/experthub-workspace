import { CourseType } from '@/types/CourseType';
import { MenuProps, Dropdown } from 'antd';
import React from 'react';
import {
  FacebookShareButton,
  WhatsappShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  EmailShareButton,
} from "react-share";

const Share = ({ course }: { course: CourseType }) => {
  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <FacebookShareButton url={`https://trainings.experthubllc.com/applicant/course?page=${course._id}`}>
          <button className='bg-transparent'>
            Facebook
          </button>
        </FacebookShareButton>
      ),
    },
    {
      key: '2',
      label: (
        <WhatsappShareButton url={`https://trainings.experthubllc.com/applicant/course?page=${course._id}`}>
          <button className='bg-transparent'>
            Whatsapp
          </button>
        </WhatsappShareButton>
      ),
    },
    {
      key: '3',
      label: (
        <LinkedinShareButton url={`https://trainings.experthubllc.com/applicant/course?page=${course._id}`}>
          <button className='bg-transparent'>
            Linkedln
          </button>
        </LinkedinShareButton>
      ),
    },
    {
      key: '4',
      label: (
        <TwitterShareButton url={`https://trainings.experthubllc.com/applicant/course?page=${course._id}`}>
          <button className='bg-transparent'>
            Twitter
          </button>
        </TwitterShareButton>
      ),
    },
    {
      key: '5',
      label: (
        <EmailShareButton url={`https://trainings.experthubllc.com/applicant/course?page=${course._id}`}>
          <button className='bg-transparent'>
            Email
          </button>
        </EmailShareButton>
      ),
    },
  ];
  return (
    <div>
      <Dropdown menu={{ items }}>
        <button className='bg-transparent'>
          <p>Share Course</p>
        </button>
      </Dropdown>
    </div>
  );
};

export default Share;