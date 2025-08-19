// import React, { useEffect, useState } from 'react'
// import Title from '../components/Title'
// import { assets } from '../assets/assets'
// import CarCard from '../components/CarCard'
// import { useSearchParams } from 'react-router-dom'
// import { useAppContext } from '../context/AppContext'
// import toast from 'react-hot-toast'
// import {motion} from 'motion/react'

// const Cars = () => {

//   //getting search params from url
//   const [searchParams] = useSearchParams()
//   const pickupLocation = searchParams.get('pickupLocation')
//   const pickupDate = searchParams.get('pickupDate')
//   const returnDate = searchParams.get('returnDate')

//   const { cars, axios,user,navigate } = useAppContext()
  

//   const isSearchData = pickupLocation && pickupDate && returnDate

//   const [filteredCars, setFilteredCars] = useState([])
//   const [input, setInput] = useState('')

//   const applyFilter = async () => {
//     if (input === '') {
//       setFilteredCars(cars)
//       return null
//     }

//     const filtered = cars.slice().filter((car) => {
//       return car.brand.toLowerCase().includes(input.toLowerCase()) 
//        || car.model.toLowerCase().includes(input.toLowerCase()) 
//        || car.vehicleType.toLowerCase().includes(input.toLowerCase()) 
//        || car.category.toLowerCase().includes(input.toLowerCase()) 
//        || car.transmission.toLowerCase().includes(input.toLowerCase())
//     })
//     setFilteredCars(filtered)
    
//   }



//   const searchCarAvailability = async () => {
//     const { data } = await axios.post('/api/booking/check-availability', { location: pickupLocation, pickupDate, returnDate })
//     if (data.success) {
//       setFilteredCars(data.availableCars)
      
//       if (data.availableCars.length === 0) {
//         toast('No cars availble')
//       }
//       return null
//     }
//   }

//   useEffect(() => {
//     isSearchData && searchCarAvailability()
//   }, [])

//   useEffect(() => {
//     cars.length > 0 && !isSearchData && applyFilter()
//   }, [input, cars])

//   useEffect(()=>{
//     if(!user) navigate('/')
//   })
//   return (
//     <div>
//       <motion.div 
//       initial={{ opacity: 0, y: 30 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ ease:"easeOut", duration: 0.6 }}
        
//       className='flex flex-col items-center py-20 bg-light max-md:px-4'>
//         <Title title='Available Cars' subTitle='Browse our selection of premium vehicles for your next adventure' />

//         <motion.div 
//         initial={{ opacity: 0, y:20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ delay:0.3, duration: 0.5 }}
        
//         className='flex items-center bg-white px-4 mt-6 max-w-140 w-full h-12 rounded-full shadow'>
//           <img src={assets.search_icon} alt="" className='w-4.5 h-4.5 mr-2' />
//           <input onChange={(e) => setInput(e.target.value)} value={input} type="text" placeholder='Search by make ,model or features' className='w-full h-full outline-none text-gray-500' />

//           <img src={assets.filter_icon} alt="" className='w-4.5 h-4.5 ml-2' />
//         </motion.div>
//       </motion.div>

//       <motion.div 
//       initial={{ opacity: 0, y: 30 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ ease:"easeOut", duration: 0.6 }}
        
//       className='px-6 md:px-16 lg:px-24 xl:px-32 mt-10'>
//         <p className='text-gray-500 xl:px-20 max-w-7xl mx-auto'>Showing {filteredCars.length} Cars</p>

//         <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-4 xl:px-20 max-w-7xl mx-auto'>
//           {filteredCars.map((car, index) => (
//             <motion.div key={index}
//             initial={{opacity:0 , y:20}}
//             animate={{opacity:1,y:0}}
//             transition={{delay:0.1*index , duration:0.4}}
//             >
//               <CarCard car={car} />
//             </motion.div>
//           ))}
//         </div>
//       </motion.div>
//     </div>
//   )
// }

// export default Cars

import React, { useEffect, useState } from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import CarCard from '../components/CarCard'
import { useSearchParams } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'
import {motion} from 'motion/react'

const Vehicles = () => {

  const [searchParams] = useSearchParams()
  const pickupLocation = searchParams.get('pickupLocation')
  const pickupDate = searchParams.get('pickupDate')
  const returnDate = searchParams.get('returnDate')

  const { cars: vehicles, axios, user, navigate } = useAppContext()
  
  const isSearchData = pickupLocation && pickupDate && returnDate

  const [filteredVehicles, setFilteredVehicles] = useState([])
  const [input, setInput] = useState('')
  const [vehicleType, setVehicleType] = useState('') // NEW state

  // ✅ Apply search + vehicle type filter
  const applyFilter = async () => {
    let filtered = vehicles

    if (input !== '') {
      filtered = filtered.filter((v) =>
        v.brand.toLowerCase().includes(input.toLowerCase()) ||
        v.model.toLowerCase().includes(input.toLowerCase()) ||
        v.vehicleType.toLowerCase().includes(input.toLowerCase()) ||
        v.category.toLowerCase().includes(input.toLowerCase()) ||
        v.transmission.toLowerCase().includes(input.toLowerCase())
      )
    }

    if (vehicleType !== '') {
      filtered = filtered.filter((v) => v.vehicleType.toLowerCase() === vehicleType.toLowerCase())
    }

    setFilteredVehicles(filtered)
  }

  const searchVehicleAvailability = async () => {
    const { data } = await axios.post('/api/booking/check-availability', { location: pickupLocation, pickupDate, returnDate })
    if (data.success) {
      setFilteredVehicles(data.availableCars)
      if (data.availableCars.length === 0) {
        toast('No vehicles available')
      }
    }
  }

  useEffect(() => {
    isSearchData && searchVehicleAvailability()
  }, [])

  useEffect(() => {
    vehicles.length > 0 && !isSearchData && applyFilter()
  }, [input, vehicleType, vehicles]) // include vehicleType

  useEffect(() => {
    if (!user) navigate('/')
  })

  return (
    <div>
      {/* HEADER */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ease:"easeOut", duration: 0.6 }}
        className='flex flex-col items-center py-20 bg-light max-md:px-4'>
        
        <Title title='Available Vehicles' subTitle='Browse our selection of vehicles for your next adventure' />

        {/* SEARCH BAR */}
        <motion.div 
          initial={{ opacity: 0, y:20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay:0.3, duration: 0.5 }}
          className='flex items-center bg-white px-4 mt-6 max-w-140 w-full h-12 rounded-full shadow'>
          
          <img src={assets.search_icon} alt="" className='w-4.5 h-4.5 mr-2' />
          <input 
            onChange={(e) => setInput(e.target.value)} 
            value={input} 
            type="text" 
            placeholder='Search by vehicle type , make, model or features' 
            className='w-full h-full outline-none text-gray-500' 
          />
          <img src={assets.filter_icon} alt="" className='w-4.5 h-4.5 ml-2' />
        </motion.div>

        {/* ✅ VEHICLE TYPE FILTER */}
        <div className='flex flex-wrap gap-2 mt-4'>
          {['', 'car','bike','bus','truck','lorry','tractor','cycle'].map((type) => (
            <button
              key={type}
              onClick={() => setVehicleType(type)}
              className={`px-4 py-2 rounded-full border ${
                vehicleType === type ? 'bg-black text-white' : 'bg-white text-gray-600'
              }`}
            >
              {type === '' ? 'All' : type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>
      </motion.div>

      {/* VEHICLE LIST */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ease:"easeOut", duration: 0.6 }}
        className='px-6 md:px-16 lg:px-24 xl:px-32 mt-10'>
        
        <p className='text-gray-500 xl:px-20 max-w-7xl mx-auto'>
          Showing {filteredVehicles.length} Vehicles
        </p>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-4 xl:px-20 max-w-7xl mx-auto'>
          {filteredVehicles.map((vehicle, index) => (
            <motion.div key={index}
              initial={{opacity:0 , y:20}}
              animate={{opacity:1,y:0}}
              transition={{delay:0.1*index , duration:0.4}}>
              <CarCard car={vehicle} />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

export default Vehicles
