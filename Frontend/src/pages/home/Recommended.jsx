import React from 'react'
import { useEffect, useState } from 'react'
import BookCard from './books/bookcard'
import { Pagination, Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'; 

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { useFetchAllBooksQuery } from '../../redux/features/cart/books/booksApi';

const Recommended = () => {
  
      const {data} = useFetchAllBooksQuery()
               const books = data?.books || [];
    
          
  
  return (
    <div className='py-16'>
      <h2 className='text-3xl font-semibold mb-6'>Recommended for you</h2>
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        navigation={true} 
        pagination={{ clickable: true }}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 5,
            spaceBetween: 50,
          },
          1180: {
            slidesPerView: 3,
            spaceBetween: 50,
          },
        }}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        {books.length > 0 && books.slice(8,16).map((book, index) => (
          <SwiperSlide key={index}>
            <BookCard book={book} />
          </SwiperSlide>
        ))}
      </Swiper>
    
    </div>
  )
}

export default Recommended
