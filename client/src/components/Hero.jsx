import React, { useState } from 'react'
import { assets, cityList } from '../assets/assets'
import { useAppContext } from '../context/AppContext'
import { motion } from 'motion/react'
const Hero = () => {

    const [pickupLocation, setPickupLocation] = useState('')

    const { pickupDate, setPickupDate, returnDate, setReturnDate, navigate, isDark, setIsDark } = useAppContext()

    const handleSearch = (e) => {
        e.preventDefault()
        navigate('/cars?pickupLocation=' + pickupLocation + '&pickupDate=' + pickupDate + '&returnDate=' + returnDate)
    }
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className={`flex flex-col items-center justify-center p-20 gap-14 ${isDark ? 'bg-dark text-light' : 'bg-light text-dark'} text-center`}>

            <div className="max-w-4xl flex flex-col text-center gap-10">
                <motion.h1
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                   className="text-4xl font-bold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent italic"> PrimeDrive – Your Journey Starts Here</motion.h1>
                <p className="text-lg md:text-xl text- dark:text-gray-400 ">
                    <span className="block font-semibold text-indigo-600 dark:text-indigo-400 mb-2">
                        Reliable. Affordable. Effortless.
                    </span>
                    Welcome to <strong>PrimeDrive</strong>, your ultimate destination for smart and seamless car rentals.
                    Whether you're planning a weekend getaway, a business trip, or just need a ride around town —
                    we’ve got the perfect vehicle for every journey.
                </p>
            </div>

            <motion.form
                initial={{ scale: 0.95, y: 50, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}

                onSubmit={handleSearch} className='flex flex-col md:flex-row items-start md:items-center justify-between p-6 rounded-full w-full max-w-80 md:max-w-200 bg-white shadow-[0px_8px_20px_rgba(0,0,0,0.1)]'>
                <div className='flex flex-col md:flex-row items-start md:items-center gap-10 min-md:ml-8 text-gray-900'>
                    <div className='flex flex-col items-start gap-2 text-gray-00'>
                        <select required value={pickupLocation} onChange={(e) => setPickupLocation(e.target.value)}>
                            <option value="">PickUp Location</option>
                            {
                                cityList.map((city) => <option key={city} value={city}>{city}</option>)
                            }
                        </select>
                        <p className='px-1 text-sm text-gray-500'>{pickupLocation ? pickupLocation : 'Please select location'}</p>
                    </div>

                    <div className='flex flex-col items-start gap-2'>
                        <label htmlFor="pickup-date">Pick-up Date</label>
                        <input value={pickupDate} onChange={e => setPickupDate(e.target.value)} type="date" id="pickup-date" min={new Date().toISOString().split('T')[0]} className='text-sm text-gray-500' required />
                    </div>

                    <div className='flex flex-col items-start gap-2'>
                        <label htmlFor="return-date">Return Date</label>
                        <input value={returnDate} onChange={e => setReturnDate(e.target.value)} type="date" id="return-date" className='text-sm text-gray-500' required />
                    </div>
                </div>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className='flex items-center justify-center gap-1 px-9 py-3 max-sm:mt-4 bg-primary hover:bg-primary-dull text-white rounded-full cursor-pointer'>
                    <img src={assets.search_icon} alt="search" className='brightness-300' />
                    Search
                </motion.button>
            </motion.form>

            <motion.img
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                src={assets.main_car} alt="car" className='max-h-74' />
        </motion.div>
    )
}

export default Hero