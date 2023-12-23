import React from 'react';

const SearchNav = () => {
  return (
    <section>
      <div className='p-4 flex justify-between w-full shadow-[0px_1px_2.799999952316284px_0px_#1E1E1E38]'>
        <div>

        </div>
        <div className='w-1/2 relative'>
          <input type="text" className='pl-10 p-2 w-full rounded-md border border-[#1E1E1E8A] bg-transparent' placeholder='Search courses, trainer, test etc' />
          <img className='absolute top-2 w-6 left-2' src="/images/icons/search.svg" alt="" />
        </div>
        <div className='flex w-28 justify-between'>
          <div className='p-3 h-10 w-10 my-auto rounded-full shadow-md'>
            <img src="/images/icons/notification.svg" alt="" />
          </div>
          <img className='h-10 w-10 my-auto' src="/images/user.png" alt="" />
        </div>
      </div>
    </section>
  );
};

export default SearchNav;