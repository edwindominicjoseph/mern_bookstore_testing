
import React, { useState } from 'react'
import BookCard from './books/BookCard'
import { Pagination, Navigation } from 'swiper/modules'
import { useFetchAllBooksQuery } from '../../redux/features/cart/books/booksApi'


import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';






const categories = ["Choose a genre", "Business", "Fiction", "Horror", "Adventure"]

const Topsellers = () => {

const [selectedCategory, setSelectedCategory] = useState("Choose a genre")
         const {data} = useFetchAllBooksQuery()
         const books = data?.books || [];
         

    
    
        const filteredBooks = selectedCategory === "Choose a genre" ? books : books.filter((book) => book.category?.toLowerCase() === selectedCategory.toLowerCase())
        

  return (
    <>
    <div className='py-10'>

    <h2 className='text-3xl font-semibold mb-6'>Top Sellers</h2>

    {/* Category filtering*/}

    <div className='mb-8 flex items-center'> 
        <select 
         name="category" id="category" 
        onChange={(e) => setSelectedCategory(e.target.value)}
         className='border bg-[#EAEAEA] border-gray-300 rounded-md px-4 py-2 focus:outline-none'>

           {categories.map((category, index) => (
            <option key={index} value={category}>{category}</option>
           ))}

        </select>
    </div>
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
        {filteredBooks.length > 0 && filteredBooks.map((book, index) => (
          <SwiperSlide key={index}>
            <BookCard book={book} />
          </SwiperSlide>
        ))}
      </Swiper>
    
    </div>
    
      
    </>
  )
}

export default Topsellers
