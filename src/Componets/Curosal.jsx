
import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';


// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

function Curosal() {
  return (
    <div>
        <Swiper
        spaceBetween={30}
        centeredSlides={true}
        loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
            
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
            <img className='object-fill' src="https://www.radhatmt.com/blog/wp-content/uploads/2022/01/TMT-Bars-and-their-Applications-in-Construction.jpg" alt="" srcset="" />
        </SwiperSlide>
        <SwiperSlide>
            <img className='object-fill' src="https://media.licdn.com/dms/image/v2/C4E12AQFgioX5z4mAlQ/article-cover_image-shrink_600_2000/article-cover_image-shrink_600_2000/0/1644923560313?e=2147483647&v=beta&t=E5BOOyWa3cRu-QQoh5cHuhs9KNqqusXIV-ODvgXy4Xs" alt="" srcset="" />
        </SwiperSlide>
        <SwiperSlide>
            <img className='object-fill' src="https://www.asianpaintscauseway.com/content/dam/ap-sri/home/homebanner/AP-Safe-Paint-Web-Banner-1905x660.jpg" alt="" srcset="" />
        </SwiperSlide>
        <SwiperSlide>Slide 4</SwiperSlide>
        <SwiperSlide>Slide 5</SwiperSlide>
        <SwiperSlide>Slide 6</SwiperSlide>
        <SwiperSlide>Slide 7</SwiperSlide>
        <SwiperSlide>Slide 8</SwiperSlide>
        <SwiperSlide>Slide 9</SwiperSlide>
      </Swiper>
    </div>
  )
}

export default Curosal