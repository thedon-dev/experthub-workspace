import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const AssesmentCard = ({ assesment }: { assesment: any }) => {
  const pathname = usePathname()

  return (
    <div className='border lg:w-[48%] my-4 border-[#1E1E1E59] p-4 rounded-md flex justify-between'>
      <img className='rounded-md w-1/2 shadow-[26px_0px_32.099998474121094px_0px_#FDC3324D]' src={assesment.image} alt="" />
      <div className='pl-10 w-full'>
        <h4 className='text-xl my-2 font-medium'>{assesment.title}</h4>
        {/* <p className='text-xs my-3'>Gain the basic skills user
          needs, study the basic
          experience</p> */}
        {pathname.includes('applicant') ? <Link href={`test/${assesment._id}`}>
          <button className='p-2 px-6 rounded-sm bg-primary'>View</button>
        </Link> : <Link href={`assesment/new?page=${assesment._id}`}>
          <button className='p-2 px-6 rounded-sm bg-primary'>Edit</button>
        </Link>}
      </div>
    </div>
  );
};

export default AssesmentCard;