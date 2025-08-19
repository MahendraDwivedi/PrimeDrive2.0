import React from 'react'
import { assets } from '../assets/assets'
import {motion}  from 'motion/react'
import { useAppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'
const Banner = () => {
  const {isDark,isOwner ,changeRole} = useAppContext()
    const navigate = useNavigate()
  
  return (
    <div className={` ${isDark ? 'bg-dark text-light':'bg-light text-dark'}`}>
       <motion.div 
    initial={{opacity:0,y:50}}
    whileInView={{opacity:1,y:0}}
    transition={{duration:0.6}}

    className={`flex flex-col md:flex-row md:items-start items-center justify-between px-8 min-md:pl-14 pt-10    ${isDark ? 'bg-gradient-to-r from-[#090979] to-[#1F1F30] text-light':'bg-gradient-to-r from-[#0558FE] to-[#A9CFFF] text-dark'}   max-w-6xl mx-3 md:mx-auto rounded-2xl overflow-hidden`}>
        <div className='text-white'>
            <h2 className='text-3xl font-medium'>🚗 Own a Luxury Conveyance? Let It Pay for Itself.</h2>
            <p className='mt-2'>Monetize your vehicle effortlessly by listing it on PrimeDrive.</p>
            <p className='max-w-130'>Unlock the earning potential of your luxury vehicles. PrimeDrive manages everything — from insurance to payments - so you can earn passive income, stress-free.</p>

            <button 
            whileHover={{scale:1.05}}
    whileTap={{scale:0.95}}
    onClick={() => isOwner ? navigate('/owner') : changeRole()}
             className='px-6 py-2 bg-white hover:bg-slate-100 transtion-all text-primary rounded-lg text-sm mt-4 cursor-pointer'>{isOwner ? 'Dashboard' : 'List Vehicles'}
</button>
        </div>
        <motion.img 
        initial={{ x:50, opacity: 0 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay:0.4}}
        src={assets.banner_car_image} alt="car" className='max-h-45 mt-10'/>
    </motion.div>
    </div>
   
  )
}

export default Banner