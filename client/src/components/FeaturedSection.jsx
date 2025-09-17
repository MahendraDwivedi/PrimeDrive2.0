// import React from 'react'
// import Title from './Title'
// import { assets, dummyCarData } from '../assets/assets'
// import CarCard from './CarCard'
// import { useNavigate } from 'react-router-dom'
// import { useAppContext } from '../context/AppContext'
// import { delay, motion, scale } from 'motion/react'

// const FeaturedSection = () => {
//     const navigate = useNavigate()
//     const { cars ,isDark } = useAppContext()
//     return (
//         <motion.div
//             initial={{ y: 40, opacity: 0 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 1, ease: "easeOut" }}
//             className={`flex flex-col items-center py-34 px-6 md:px-16 lg:px-24 xl:px-32  ${isDark ? 'bg-dark text-light':'bg-light text-dark'}`}>
//             <motion.div
//                 initial={{ y: 20, opacity: 0 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 1, delay: 0.5 }}>
//                 <Title title='Prime Selections' subTitle='Discover our range of premium vehicles ready for your next journey.' />
//             </motion.div>

//             <motion.div
//                 initial={{ y: 100, opacity: 0 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 1, delay: 0.5 }}
//                 className='grid grid-cols-1 sm:grid-cols-2 lg-grid-cols-3 gap-8 mt-18'>
//                 {
//                     cars.slice(0, 6).map((car) => (
//                         <motion.div key={car._id}
//                             initial={{scale:0.95, opacity: 0 }}
//                             whileInView={{ opacity: 1, scale:1 }}
//                             transition={{ duration: 0.4, ease: "easeOut" }}
//                         >
//                             <CarCard car={car} />
//                         </motion.div>
//                     ))
//                 }
//             </motion.div>

//             <button 
//             initial={{ y: 20, opacity: 0 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.4, delay:0.6}}
//             onClick={() => {
//                 navigate('/cars'); scrollTo(0, 0)
//             }}
//                 className='flex items-center justify-center gap-2 px-6 py-2 border border-borderColor hover:bg-gray-50 rounded-md mt-18 cursor-pointer'>
//                 Explore all cars <img src={assets.arrow_icon} />
//             </button>
//         </motion.div>
//     )
// }

// export default FeaturedSection


import React, { useState, useEffect } from 'react'
import Title from './Title'
import { assets } from '../assets/assets'
import CarCard from './CarCard'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
import { motion } from 'motion/react'

const FeaturedSection = () => {
    const navigate = useNavigate()

    const { cars: vehicles, isDark ,user} = useAppContext()

    const [vehicleType, setVehicleType] = useState('')
    const [filteredVehicles, setFilteredVehicles] = useState([])
      const [showPopup, setShowPopup] = useState(false)
    
    const handleMenuClick = (e) => {
    if (!user) {
        e.preventDefault()
      setShowPopup(true)
      setTimeout(() => setShowPopup(false), 3000)
     } else {
       navigate('/vehicles')
       scrollTo(0, 0)
     }
    }

    useEffect(() => {
        if (vehicleType === '') {
            setFilteredVehicles(vehicles.slice(0, 6))
        } else {
            setFilteredVehicles(
            vehicles.filter(v => v.vehicleType.toLowerCase() === vehicleType.toLowerCase()).slice(0, 6)
            )
        }
    }, [vehicleType, vehicles])

    return (
        <motion.div
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className={`flex flex-col items-center py-34 px-6 md:px-16 lg:px-24 xl:px-32  
                ${isDark ? 'bg-dark text-light' : 'bg-light text-dark'}`}
        >

            {/* Title */}
            <motion.div
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.5 }}>
                <Title title='Prime Selections' subTitle='Discover our range of premium vehicles ready for your next journey.' />
            </motion.div>

            {/* ✅ Vehicle Type Filter */}
            <div className="flex flex-wrap justify-center gap-2 mt-6">
                {['', 'car', 'bike', 'bus', 'truck', 'lorry', 'tractor', 'cycle'].map(type => (
                    <button
                        key={type}
                        onClick={() => setVehicleType(type)}
                        className={`px-4 py-2 rounded-full border transition-all ${
                            vehicleType === type ? 'bg-black text-white' : 'bg-white text-gray-600'
                        }`}
                    >
                        {type === '' ? 'All' : type.charAt(0).toUpperCase() + type.slice(1)}
                    </button>
                ))}
            </div>

            {/* Vehicle Grid */}
            <motion.div
                initial={{ y: 100, opacity: 0 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
                className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12'
            >
                {
                    filteredVehicles.map((vehicle) => (
                        <motion.div key={vehicle._id}
                            initial={{ scale: 0.95, opacity: 0 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.4, ease: "easeOut" }}
                        >
                            <CarCard car={vehicle} />
                        </motion.div>
                    ))
                }
            </motion.div>


            
            <motion.button
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.6 }}

                onClick={(e)=>handleMenuClick(e)}
                className='flex items-center justify-center gap-2 px-6 py-2 border border-borderColor hover:bg-gray-50 rounded-md mt-18 cursor-pointer'
            >
                Explore all vehicles <img src={assets.arrow_icon} alt="arrow" />
            </motion.button>
  {/* Popup */}
                    {showPopup && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="  mt-10 mr-4 bg-red-500 text-white px-20 py-10 rounded shadow-md z-50"
                      >
                        Please log in to continue.
                      </motion.div>
                    )}
        </motion.div>
    )
}

export default FeaturedSection
