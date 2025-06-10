import React, { use } from 'react'
import { Link } from 'react-router-dom'
import { HiMiniBars3CenterLeft } from 'react-icons/hi2'
import { BsSearch } from 'react-icons/bs'
import { HiOutlineUser } from 'react-icons/hi2'
import { HiOutlineHeart } from 'react-icons/hi2'
import { HiOutlineShoppingCart } from 'react-icons/hi2'
import avatarimg from '../assets/avatar.png'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useAuth } from '../context/authcontext'



const Navbar = () => {
    
    const [isDropdownOpen, setIsDropdownOpen]= useState(false);
    console.log(isDropdownOpen)
    const cartItems = useSelector((state) => state.cart.cartItems);
    const {currentUser, logout} = useAuth()
        const handleLogout =  () => {
                logout()
        }



    const navigation = [
        { name: 'Dashboard', href: '/dashboard' },
        { name: 'Orders', href: '/orders' },
        { name: 'Cart', href: '/cart' },
        { name: 'Checkout', href: '/checkout' },
    ]
return (
    <header className='max-w-screen-2xl mx-auto px-4 py-6'>
            <nav className='flex justify-between items-center'>

            {/* Right side */}
            <div className='flex items-center md:gap-16 gap-4'>
                    <Link to="/">
                            <HiMiniBars3CenterLeft className='size-6' />
                    </Link>
                 {/* Search bar */}
                    <div className='relative sm:w-72 w-40 space-x-2'>
                            <BsSearch className='absolute inline-block left-3 inset-y-2' />
                            <input type="text" placeholder='What are you looking' className='bg-[#EAEAEA] w-full py-1 md:px-8 px-6 rounded-md focus:outline-none' />
                    </div>
            </div>
            {/* Left side */}
            <div className='relative flex items-center md:space-x-1 space-x-2'>
                    <div> 
                        {
                            currentUser ? <>
                            <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} aria-label="Toggle User Dropdown" >
                                <img src={avatarimg} alt="User avatar" className={`size-6 rounded-full ${currentUser ? 'ring-2 ring-blue-500' : ''}`} />
                            </button>
                                {isDropdownOpen && (
                                        <div className='absolute right-0 top-10 bg-white shadow-lg rounded-md p-4'>
                                        <ul className='space-y-2'>
                                                {navigation.map((item) => (
                                                <li key={item.name} onClick={() => setIsDropdownOpen(false)}>
                                                        <Link to={item.href} className='block text-gray-700 hover:text-blue-500'>{item.name}</Link>
                                                </li>
                                                ))}
                                                <li>
                                                   <button 
                                                   onClick={handleLogout}
                                                   className='block w-full text-left text-gray-700 hover:text-blue-500'> logout
                                                        </button>     
                                                </li>
                                        </ul>
                                        </div>
                                )}
                            </> : <Link to="/login" aria-label="Login">  <HiOutlineUser className='size-6' /> </Link> 
                        }
                       
                    </div>
                    
                    <button className='hidden sm:block' aria-label="Wishlist Button">
                            <HiOutlineHeart className='size-6' />
                    </button>
                    <Link to="/cart" className='bg-primary p-1 sm:px-6 px-2 flex items-center rounded-sm'>
                            <HiOutlineShoppingCart className='size-6' />
                            {
                                cartItems.length > 0 ? <span className='text-sm font-semibold sm:ml-1'>{cartItems.length}</span> : <span className='text-sm font-semibold sm:ml-1'>0</span>
                            }
                            
                    </Link>
            </div>
            </nav>
    </header>
)
}

export default Navbar

