import React from 'react'
import Title from './Title';
import { assets } from '../assets/assets';
import {motion} from 'motion/react'
import { useAppContext } from '../context/AppContext';
const Testimonials = () => {
    const {isDark} = useAppContext()

     const testimonials = [
        {
            name: "Emma Rodriguez",
            location: "Barcelona, Spain", 
            image: assets.testimonial_image_1,
            rating: 5, 
            review: "PrimeDrive made my trip stress-free. The car was spotless, the process was simple, and the customer service was top-notch. Highly recommend!" },
        {
            name: "Tanya Mishra", 
            location: "Mumbai, India", 
            image: assets.testimonial_image_2, 
            rating: 4, 
            review: "I've rented cars from various companies, but the experience with PrimeDrive was exceptional! From booking to drop-off, everything was smooth and professional!" },
        { 
            name: "Sophia Lee", 
            location: "Seoul, South Korea", 
            image: assets.testimonial_image_1, 
            rating: 5, 
            review: "It felt like driving a brand-new car. PrimeDrive delivers luxury without the hassle. I’ll definitely book again!"
 }
    ];

  return (
        <div className={`py-58 px-6 md:px-16 lg:px-24 xl:px-44  ${isDark ? 'bg-dark text-light':'bg-light text-dark'}`}>
            <Title title="Hear From Our Guests" subTitle="From Paris to Bali, find out why travelers trust StayVenture for unforgettable luxury experiences.

"/>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-18">
                {testimonials.map((testimonial,index) => (
                    <motion.div 
                    initial={{opacity:0,y:40}}
                    whileInView={{opacity:1,y:0}}
                    transition={{duration:0.6 , delay:index * 0.2,ease:'easeOut'}}
                    key={index} className="bg-white p-6 rounded-xl shadow-lg hover:-translate-y-1 transition-all duration-500">
                        <div className="flex items-center gap-3">
                            <img className="w-12 h-12 rounded-full" src={testimonial.image} alt={testimonial.name} />
                            <div>
                                <p className="text-xl text-dark">{testimonial.name}</p>
                                <p className="text-gray-500">{testimonial.location}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-1 mt-4">
                            {Array(5).fill(0).map((_, index) => (
                               <img src={assets.star_icon} alt='star_icon'/>
                            ))}
                        </div>
                        <p className="text-gray-500 max-w-90 mt-4 font-light">"{testimonial.review}"</p>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}

export default Testimonials