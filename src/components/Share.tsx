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

const Share = ({ course, type }: { course: CourseType, type?: string }) => {
  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <FacebookShareButton url={type ? `https://trainings.experthubllc.com/applicant/${course._id}?page=${type}` : `https://trainings.experthubllc.com/applicant/${course._id}?page=${course.type}`}>
          <button className='bg-transparent'>
            Facebook
          </button>
        </FacebookShareButton>
      ),
    },
    {
      key: '2',
      label: (
        <WhatsappShareButton url={type ? `https://trainings.experthubllc.com/applicant/${course._id}?page=${type}` : `https://trainings.experthubllc.com/applicant/${course._id}?page=${course.type}`}>
          <button className='bg-transparent'>
            Whatsapp
          </button>
        </WhatsappShareButton>
      ),
    },
    {
      key: '3',
      label: (
        <LinkedinShareButton url={type ? `https://trainings.experthubllc.com/applicant/${course._id}?page=${type}` : `https://trainings.experthubllc.com/applicant/${course._id}?page=${course.type}`}>
          <button className='bg-transparent'>
            Linkedln
          </button>
        </LinkedinShareButton>
      ),
    },
    {
      key: '4',
      label: (
        <TwitterShareButton url={type ? `https://trainings.experthubllc.com/applicant/${course._id}?page=${type}` : `https://trainings.experthubllc.com/applicant/${course._id}?page=${course.type}`}>
          <button className='bg-transparent'>
            Twitter
          </button>
        </TwitterShareButton>
      ),
    },
    {
      key: '5',
      label: (
        <EmailShareButton url={type ? `https://trainings.experthubllc.com/applicant/${course._id}?page=${type}` : `https://trainings.experthubllc.com/applicant/${course._id}?page=${course.type}`}>
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
          {type === 'event' ? <div className='flex mr-3'><img src="/images/share.png" alt="" />
            <p className='ml-2'>share</p></div> : <p>Share Course</p>}
        </button>
      </Dropdown>
    </div>
  );
};

export default Share;