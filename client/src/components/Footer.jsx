import React from 'react'
import { assets } from '../assets/assets';

const Footer = () => {
    return (

        <footer className="flex flex-col bg-blue-700 items-center justify-around w-full py-16 text-sm text-black">
            <div className="flex flex-wrap justify-between items-start gap-8 pb-6 border-borderColor">
                <a href="#" className="font-medium text-white-500 hover:text-black transition-all">
                    Home
                </a>
                <a href="#" className="font-medium text-white-500 hover:text-black transition-all">
                    About
                </a>
                <a href="#" className="font-medium text-white-500 hover:text-black transition-all">
                    Services
                </a>
                <a href="#" className="font-medium text-white-500 hover:text-black transition-all">
                    Contact
                </a>
                <a href="#" className="font-medium text-white-500 hover:text-black transition-all">
                    Help
                </a>
            </div>
            <div className="flex items-center gap-4 mt-8 text-indigo-500">
                <a href="#" className="hover:-translate-y-0.5 transition-all duration-300">
                    <img src={assets.facebook_logo} className='w-5 -h5' alt="" />
                </a>

                <a href="#" className="hover:-translate-y-0.5 transition-all duration-300">
                    <img src={assets.instagram_logo} className='w-5 -h5' alt="" />

                </a>
                <a href="#" className="hover:-translate-y-0.5 transition-all duration-300">
                    <img src={assets.twitter_logo} className='w-5 -h5' alt="" />

                </a>
                <a href="#" className="hover:-translate-y-0.5 transition-all duration-300">
                    <img src={assets.gmail_logo} className='w-5 -h5' alt="" />

                </a>
            </div>
            <p className="mt-8 text-center">Copyright © 2025 <a href="/">PrimeDrive</a>. All rights reservered.</p>
        </footer>
    );
}

export default Footer