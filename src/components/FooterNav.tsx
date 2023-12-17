import React from 'react';

const FooterNav = () => {
  return (
    <footer className='bg-[#253131] text-white flex flex-wrap justify-between lg:p-16 p-4'>
      <div className='lg:w-1/2 w-full'>
        <h3 className='text-xl font-bold'>EXPERTHUB TRAININGS</h3>
        <p>We are determine to raise the next generation of global leaders
          and empower youths to harness the immense power of
          technology to overcome the challenges our planet faces
          including its dwindling economy. Our platform is more than
          just a website; it's a thriving community of like-minded
          individuals who share a passion for change. Together
          we learn, grow, and collaborate to make a tangible
          impact on our communities and planet.</p>
        <div className='flex sm:justify-between sm:my-4'>
          <img className='m-2' src="/images/icons/mdi_facebook.svg" alt="" />
          <img className='m-2' src="/images/icons/formkit_twitter.svg" alt="" />
          <img className='m-2' src="/images/icons/icomoon-free_linkedin.svg" alt="" />
        </div>
      </div>
      <div className='lg:w-[20%] w-[40%]'>
        <p className='font-medium uppercase'>Navigate</p>
        <p className='my-3 text-sm'>www.experthubllc.com</p>
        <p className='my-3 text-sm'>www.peoplespower.me</p>
        <p className='my-3 text-sm'>theplaint.org</p>
        <p className='my-3 text-sm'>Terms & Conditions</p>
        <p className='my-3 text-sm'>Privacy Policy</p>
      </div>
      <div className='lg:w-[20%] w-[55%]'>
        <p className='font-medium uppercase'>Contact</p>
        <div className='flex my-3'>
          <img src="/images/icons/location.svg" alt="" />
          <div className='ml-2'>
            <p className='text-sm font-medium'>OUR LOCATION</p>
            <p className='text-xs'>7b Promise Wali Crescent, Rumudara 500102
              Port Harcourt, Rivers</p>
          </div>
        </div>
        <div className='flex my-3'>
          <img src="/images/icons/mail.svg" alt="" />
          <div className='ml-2'>
            <p className='text-sm font-medium'>SEND US A MAIL</p>
            <p className='text-xs'>trainings@experthubllc.com</p>
          </div>
        </div>
        <div className='flex my-3'>
          <img src="/images/icons/call.svg" alt="" />
          <div className='ml-2'>
            <p className='text-sm font-medium'>CALL US</p>
            <p className='text-xs'>08107639372</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterNav;