"use client"

import React from 'react';
import Slider from "react-slick";

const SliderComp = () => {
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 6000,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: false
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  return (
    <div className='mx-20'>
      <link
        rel="stylesheet"
        type="text/css"
        charSet="UTF-8"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick.min.css"
      />
      <link
        rel="stylesheet"
        type="text/css"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick-theme.min.css"
      />
      <Slider {...settings}>
        <div className="p-2 border border-[#1E1E1E82] rounded-sm bg-white">
          <img className="rounded-sm w-full" src="/images/card.png" alt="" />
          <h3 className="font-medium my-3">Samuel Phillip</h3>
          <p className="text-sm font-medium">UX UI Designer</p>
        </div>
        <div className="p-2 border border-[#1E1E1E82] rounded-sm bg-white">
          <img className="rounded-sm w-full" src="/images/card.png" alt="" />
          <h3 className="font-medium my-3">Samuel Phillip</h3>
          <p className="text-sm font-medium">UX UI Designer</p>
        </div>
        <div className="p-2 border border-[#1E1E1E82] rounded-sm bg-white">
          <img className="rounded-sm w-full" src="/images/card.png" alt="" />
          <h3 className="font-medium my-3">Samuel Phillip</h3>
          <p className="text-sm font-medium">UX UI Designer</p>
        </div>
      </Slider>
    </div>
  );
};

export default SliderComp;