import React from 'react';

const CourseDetails = ({ open, handleClick }: { open: boolean, handleClick: any }) => {
  return (
    open && <div>
      <div onClick={() => handleClick()} className='fixed cursor-pointer bg-[#000000] opacity-50 top-0 left-0 right-0 w-full h-[100vh] z-10'></div>
      <div className='fixed top-10 bottom-10 left-0 rounded-md right-0 w-[80%] mx-auto z-20 bg-[#F8F7F4]'>
        <div className='shadow-[0px_1px_2.799999952316284px_0px_#1E1E1E38] p-4 px-12 flex justify-between'>
          <p className='font-medium'>Course Details</p>
          <img onClick={() => handleClick()} className='w-6 h-6 cursor-pointer' src="/images/icons/material-symbols_cancel-outline.svg" alt="" />
        </div>
        <div className='py-4 px-10'>
          <div className='flex justify-between'>
            <div className='w-[40%]'>
              <img src="/images/card.png" className='w-full' alt="" />
              <div className='p-4'>
                <p className='font-medium text-base'>Get Started With Prototyping</p>
                <div className='my-4'>
                  <p className='font-medium'>The course includes</p>
                  <div className='flex my-1'>
                    <img className='h-2 my-auto mr-2 w-2' src="/images/Ellipse.png" alt="" />
                    <p className='text-sm'>2 learning hours</p>
                  </div>
                  <div className='flex my-1'>
                    <img className='h-2 my-auto mr-2 w-2' src="/images/Ellipse.png" alt="" />
                    <p className='text-sm'>Course modules/assesments</p>
                  </div>
                  <div className='flex my-1'>
                    <img className='h-2 my-auto mr-2 w-2' src="/images/Ellipse.png" alt="" />
                    <p className='text-sm'>Certificate of completion</p>
                  </div>
                </div>
                <button className='bg-primary p-2 rounded-md px-8'>Buy Now</button>
              </div>
            </div>
            <div className='w-[58%]'>
              <p className='text-lg font-bold'>Get Started With Prototyping</p>
              <p className='my-2 text-sm font-medium'>This great online course will equip you with the knowledge and basic skills
                needed to design vector graphics using Figma.</p>
              <p className='text-sm'>This ‘Figma Design Basics and Features’ course has been designed to teach you the
                essential skills and techniques required to create websites and app prototypes.
                This course teaches you how to develop basic shapes in Figma, make comments
                share Figma files and export your designs. Explore some advanced Figma features
                which include some keyboard shortcuts and how to design an IOS prototype app.
                Start today!This ‘Figma Design Basics and Features’ course has been designed to teach you the
                essential skills and techniques required to create websites and app prototypes.
                This course teaches you how to develop basic shapes in Figma, make comments
                share Figma files and export your designs. Explore some advanced Figma features
                which include some keyboard shortcuts and how to design an IOS prototype app.
                Start today!This ‘Figma Design Basics and Features’ course has been designed to teach you the
                essential skills and techniques required to create websites and app prototypes.
                This course teaches you how to develop basic shapes in Figma, make comments
                share Figma files and export your designs. Explore some advanced Figma features
                which include some keyboard shortcuts and how to design an IOS prototype app.
                Start today!This ‘Figma Design Basics and Features’ course has been designed to teach you the
                essential skills and techniques required to create websites and app prototypes.
                This course teaches you how to develop basic shapes in Figma, make comments
                share Figma files and export your designs. Explore some advanced Figma features
                which include some keyboard shortcuts and how to design an IOS prototype app.
                Start today!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;