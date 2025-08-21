// import React, { useState } from 'react'
// import Title from '../../components/owner/Title'
// import { assets } from '../../assets/assets'
// import { useAppContext } from '../../context/AppContext'
// import toast from 'react-hot-toast'

// const AddCar = () => {

//   const { axios, currency } = useAppContext()
//   const [image, setImage] = useState(null)
//   const [car, setCar] = useState({
//     brand: '',
//     vehicleType:"",
//     model: '',
//     year: 0,
//     pricePerDay: 0,
//     category: '',
//     transmission: '',
//     fuel_type: '',
//     seating_capacity: 0,
//     location: '',
//     description: ''
//   })

//   const [isLoading, setIsLoading] = useState(false)

//   const onSubmitHandler = async (e) => {
//     e.preventDefault()
//     if (isLoading) return null;

//     setIsLoading(true)
//     try {
//       const formData = new FormData()
//       formData.append('image', image)
//       formData.append('carData', JSON.stringify(car))

//       const { data } = await axios.post('/api/owner/add-car', formData)

//       if (data.success) {
//         toast.success(data.message)
//         setImage(null)
//         setCar({
//           brand: '',
//           model: '',
//           year: 0,
//           pricePerDay: 0,
//           category: '',
//           transmission: '',
//           fuel_type: '',
//           seating_capacity: 0,
//           location: '',
//           description: ''
//         })
//       }
//       else {
//         toast.error(data.message)
//       }
//     } catch (error) {
//       toast.error(error.message)
//     }
//     finally {
//       setIsLoading(false)
//     }
//   }

//   return (
//     <div className='px-4 py-10 md:px-10 flex-1'>
//       <Title title="Add New Car" subTitle="Fill in details to list a new car for booking, including pricing , avilability, and car specifications." />

//       <form onSubmit={onSubmitHandler} className='flex flex-col gap-5 text-gray-500 text-sm mt-6 max-w-xl'>

//         {/* {car image} */}

//         <div className='flex items-center gap-2 w-full'>
//           <label htmlFor="car-image">
//             <img src={image ? URL.createObjectURL(image) : assets.upload_icon} alt="" className='h-14 rounded cursor-pointer' />
//             <input type="file" id='car-image' accept='image/*' hidden onChange={e => setImage(e.target.files[0])} />
//           </label>
//           <p className='text-sm text-gray-500'>Upload a picture of your car</p>
//         </div>

// {/* vehicle type */}
//          <div className='flex flex-col w-full'>
//           <label>Vehicle Type</label>
//             <input type="text" placeholder='e.g. Car,Bus,Bike...' required className='px-3 py-2 mt-1 border-borderColor rounded-md outline-none' value={car.vehicleType} onChange={e => setCar({ ...car, vehicleType: e.target.value })} />
//         </div>

//         {/* car bracnd and model */}
//         <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
//           <div className='flex flex-col w-full'>
//             <label>Brand</label>
//             <input type="text" placeholder='e.g. BMW, Mercedes , Audi...' required className='px-3 py-2 mt-1 border-borderColor rounded-md outline-none' value={car.brand} onChange={e => setCar({ ...car, brand: e.target.value })} />
//           </div>

//           <div className='flex flex-col w-full'>
//             <label>Model</label>
//             <input type="text" placeholder='e.g. X5, E-Class , M4...' required className='px-3 py-2 mt-1 border-borderColor rounded-md outline-none' value={car.model} onChange={e => setCar({ ...car, model: e.target.value })} />
//           </div>
//         </div>

//         {/* car year price category */}

//         <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
//           <div className='flex flex-col w-full'>
//             <label>Year</label>
//             <input type="number" placeholder='2025' required className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none' value={car.year} onChange={e => setCar({ ...car, year: e.target.value })} />
//           </div>
//           <div className='flex flex-col w-full'>
//             <label>Daily Price({currency})</label>
//             <input type="number" placeholder='2025' required className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none' value={car.pricePerDay} onChange={e => setCar({ ...car, pricePerDay: e.target.value })} />
//           </div>
//           <div className='flex flex-col w-full'>
//             <label>Category</label>
//             <select onChange={e => setCar({ ...car, category: e.target.value })} value={car.category} className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none'>
//               <option value="">Select a category</option>
//               <option value="Sedan">Sedan</option>
//               <option value="SUV">SUV</option>
//               <option value="Van">Van</option>
//             </select>
//           </div>
//         </div>

//         {/* car transimission ,fuke tyoe ,seating capacity */}
//         <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
//           <div className='flex flex-col w-full'>
//             <label>Transmission</label>
//             <select onChange={e => setCar({ ...car, transmission: e.target.value })} value={car.transmission} className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none'>
//               <option value="">Select a category</option>
//               <option value="Automatic">Automatic</option>
//               <option value="Manual">Manual</option>
//               <option value="Semi-Automatic">Semi-Automatic</option>
//             </select>
//           </div>
//           <div className='flex flex-col w-full'>
//             <label>Fuel Type</label>
//             <select onChange={e => setCar({ ...car, fuel_type: e.target.value })} value={car.fuel_type} className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none'>
//               <option value="">Select a category</option>
//               <option value="Gas">Gas</option>
//               <option value="Diesel">Diesel</option>
//               <option value="Petrol">Petrol</option>
//               <option value="Electric">Electric</option>
//               <option value="Hybrid">Hybrid</option>
//             </select>
//           </div>
//           <div className='flex flex-col w-full'>
//             <label>Seating Capacity</label>
//             <input type="number" placeholder='4' required className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none' value={car.seating_capacity} onChange={e => setCar({ ...car, seating_capacity: e.target.value })} />
//           </div>
//         </div>

//         {/* Car location */}

//         <div className='flex flex-col w-full'>
//           <label htmlFor="">Location</label>
//           <select
//             onChange={e => setCar({ ...car, location: e.target.value })}
//             value={car.location}
//             className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none"
//           >
//             <option value="">Select a city</option>

//             {/* US Cities */}
//             <option value="New York">New York</option>
//             <option value="Los Angeles">Los Angeles</option>
//             <option value="Houston">Houston</option>
//             <option value="Chicago">Chicago</option>

//             {/* Indian Cities */}
//             <option value="Mumbai">Mumbai</option>
//             <option value="Delhi">Delhi</option>
//             <option value="Bangalore">Bangalore</option>
//             <option value="Hyderabad">Hyderabad</option>
//             <option value="Kolkata">Kolkata</option>
//             <option value="Lucknow">Lucknow</option>
//             <option value="Chennai">Chennai</option>
//             <option value="Pune">Pune</option>
//             <option value="Ahmedabad">Ahmedabad</option>
//             <option value="Jaipur">Jaipur</option>
//             <option value="Goa">Goa</option>
//           </select>

//         </div>

//         {/* car description */}
//         <div className='flex flex-col w-full'>
//           <label>Description</label>
//           <textarea rows={5} placeholder='e.g. A luxirious SUV with a spacious interior a dna powerful engine.' required className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none' value={car.description} onChange={e => setCar({ ...car, description: e.target.value })} />
//         </div>
//         <button className='flex items-center gap-2 px-4 py-2.5 mt-4 bg-primary text-white rounded-md font-medium w-max cursor-pointer'>{isLoading ? 'Listing...' : 'List Your Car'}</button>

//       </form>
//     </div>
//   )
// }

// export default AddCar

// import React, { useState } from 'react'
// import Title from '../../components/owner/Title'
// import { assets } from '../../assets/assets'
// import { useAppContext } from '../../context/AppContext'
// import toast from 'react-hot-toast'

// const AddVehicle = () => {

//   const { axios, currency } = useAppContext()
//   const [image, setImage] = useState(null)
//   const [vehicle, setVehicle] = useState({
//     brand: '',
//     vehicleType: '',
//     model: '',
//     year: 0,
//     pricePerDay: 0,
//     category: '',
//     transmission: '',
//     fuel_type: '',
//     seating_capacity: 0,
//     location: '',
//     description: ''
//   })

//   const [isLoading, setIsLoading] = useState(false)

//   const onSubmitHandler = async (e) => {
//     e.preventDefault()
//     if (isLoading) return null;

//     setIsLoading(true)
//     try {
//       const formData = new FormData()
//       formData.append('image', image)
//       formData.append('vehicleData', JSON.stringify(vehicle))

//       const { data } = await axios.post('/api/owner/add-vehicle', formData)

//       if (data.success) {
//         toast.success(data.message)
//         setImage(null)
//         setVehicle({
//           brand: '',
//           vehicleType: '',
//           model: '',
//           year: 0,
//           pricePerDay: 0,
//           category: '',
//           transmission: '',
//           fuel_type: '',
//           seating_capacity: 0,
//           location: '',
//           description: ''
//         })
//       }
//       else {
//         toast.error(data.message)
//       }
//     } catch (error) {
//       toast.error(error.message)
//     }
//     finally {
//       setIsLoading(false)
//     }
//   }

//   return (
//     <div className='px-4 py-10 md:px-10 flex-1'>
//       <Title title="Add New Vehicle" subTitle="Fill in details to list a new vehicle for booking, including pricing, availability, and specifications." />

//       <form onSubmit={onSubmitHandler} className='flex flex-col gap-5 text-gray-500 text-sm mt-6 max-w-xl'>

//         {/* Vehicle image */}
//         <div className='flex items-center gap-2 w-full'>
//           <label htmlFor="vehicle-image">
//             <img src={image ? URL.createObjectURL(image) : assets.upload_icon} alt="" className='h-14 rounded cursor-pointer' />
//             <input type="file" id='vehicle-image' accept='image/*' hidden onChange={e => setImage(e.target.files[0])} />
//           </label>
//           <p className='text-sm text-gray-500'>Upload a picture of your vehicle</p>
//         </div>

//         {/* Vehicle type */}
//         <div className='flex flex-col w-full'>
//           <label>Vehicle Type</label>
//           <select
//             required
//             className='px-3 py-2 mt-1 border-borderColor rounded-md outline-none'
//             value={vehicle.vehicleType}
//             onChange={e => setVehicle({ ...vehicle, vehicleType: e.target.value })}
//           >
//             <option value="">Select a vehicle type</option>
//             <option value="car">Car</option>
//             <option value="bike">Bike</option>
//             <option value="bus">Bus</option>
//             <option value="truck">Truck</option>
//             <option value="lorry">Lorry</option>
//             <option value="tractor">Tractor</option>
//             <option value="cycle">Cycle</option>
//           </select>
//         </div>

//         {/* Brand & Model */}
//         <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
//           <div className='flex flex-col w-full'>
//             <label>Brand</label>
//             <input type="text" required placeholder='e.g. BMW, Honda, Tata...' 
//               className='px-3 py-2 mt-1 border-borderColor rounded-md outline-none' 
//               value={vehicle.brand} 
//               onChange={e => setVehicle({ ...vehicle, brand: e.target.value })} />
//           </div>

//           <div className='flex flex-col w-full'>
//             <label>Model</label>
//             <input type="text" required placeholder='e.g. X5, Pulsar, Activa...' 
//               className='px-3 py-2 mt-1 border-borderColor rounded-md outline-none' 
//               value={vehicle.model} 
//               onChange={e => setVehicle({ ...vehicle, model: e.target.value })} />
//           </div>
//         </div>

//         {/* Year, Price, Category */}
//         <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
//           <div className='flex flex-col w-full'>
//             <label>Year</label>
//             <input type="number" placeholder='2025' required 
//               className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none' 
//               value={vehicle.year} 
//               onChange={e => setVehicle({ ...vehicle, year: e.target.value })} />
//           </div>
//           <div className='flex flex-col w-full'>
//             <label>Daily Price ({currency})</label>
//             <input type="number" placeholder='100' required 
//               className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none' 
//               value={vehicle.pricePerDay} 
//               onChange={e => setVehicle({ ...vehicle, pricePerDay: e.target.value })} />
//           </div>

//           {/* Category only for cars/bikes/trucks */}
//           {['car','bike','truck','lorry','bus'].includes(vehicle.vehicleType) && (
//             <div className='flex flex-col w-full'>
//               <label>Category</label>
//               <select 
//                 onChange={e => setVehicle({ ...vehicle, category: e.target.value })} 
//                 value={vehicle.category} 
//                 className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none'>
//                 <option value="">Select a category</option>
//                 <option value="Sedan">Sedan</option>
//                 <option value="SUV">SUV</option>
//                 <option value="Van">Van</option>
//                 <option value="Sport">Sport</option>
//               </select>
//             </div>
//           )}
//         </div>

//         {/* Transmission, Fuel Type, Seating Capacity (only for motor vehicles) */}
//         {['car','bike','truck','lorry','bus','tractor'].includes(vehicle.vehicleType) && (
//           <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
//             <div className='flex flex-col w-full'>
//               <label>Transmission</label>
//               <select 
//                 onChange={e => setVehicle({ ...vehicle, transmission: e.target.value })} 
//                 value={vehicle.transmission} 
//                 className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none'>
//                 <option value="">Select transmission</option>
//                 <option value="Automatic">Automatic</option>
//                 <option value="Manual">Manual</option>
//                 <option value="Semi-Automatic">Semi-Automatic</option>
//               </select>
//             </div>
//             <div className='flex flex-col w-full'>
//               <label>Fuel Type</label>
//               <select 
//                 onChange={e => setVehicle({ ...vehicle, fuel_type: e.target.value })} 
//                 value={vehicle.fuel_type} 
//                 className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none'>
//                 <option value="">Select fuel type</option>
//                 <option value="Petrol">Petrol</option>
//                 <option value="Diesel">Diesel</option>
//                 <option value="Electric">Electric</option>
//                 <option value="Hybrid">Hybrid</option>
//                 <option value="CNG">CNG</option>
//               </select>
//             </div>
//             <div className='flex flex-col w-full'>
//               <label>Seating Capacity</label>
//               <input type="number" placeholder='4' 
//                 className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none' 
//                 value={vehicle.seating_capacity} 
//                 onChange={e => setVehicle({ ...vehicle, seating_capacity: e.target.value })} />
//             </div>
//           </div>
//         )}

//         {/* Location */}
//         <div className='flex flex-col w-full'>
//           <label>Location</label>
//           <select
//             onChange={e => setVehicle({ ...vehicle, location: e.target.value })}
//             value={vehicle.location}
//             className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none"
//           >
//             <option value="">Select a city</option>
//             <option value="New York">New York</option>
//             <option value="Los Angeles">Los Angeles</option>
//             <option value="Mumbai">Mumbai</option>
//             <option value="Delhi">Delhi</option>
//             <option value="Bangalore">Bangalore</option>
//             <option value="Chennai">Chennai</option>
//             <option value="Goa">Goa</option>
//           </select>
//         </div>

//         {/* Description */}
//         <div className='flex flex-col w-full'>
//           <label>Description</label>
//           <textarea rows={5} placeholder='Describe your vehicle...' required 
//             className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none' 
//             value={vehicle.description} 
//             onChange={e => setVehicle({ ...vehicle, description: e.target.value })} />
//         </div>

//         <button className='flex items-center gap-2 px-4 py-2.5 mt-4 bg-primary text-white rounded-md font-medium w-max cursor-pointer'>
//           {isLoading ? 'Listing...' : `Listing your ${vehicle.vehicleType?vehicle.vehicleType:"Vehicle"}`}
//         </button>

//       </form>
//     </div>
//   )
// }

// export default AddVehicle


// import React, { useState } from 'react'
// import Title from '../../components/owner/Title'
// import { assets } from '../../assets/assets'
// import { useAppContext } from '../../context/AppContext'
// import toast from 'react-hot-toast'

// const AddVehicle = () => {

//   const { axios, currency } = useAppContext()
//   const [image, setImage] = useState(null)
//   const [vehicle, setVehicle] = useState({
//     brand: '',
//     vehicleType: '',
//     model: '',
//     year: 0,
//     pricePerDay: 0,
//     category: '',
//     transmission: '',
//     fuel_type: '',
//     seating_capacity: 0,
//     location: '',
//     description: '',
//     features: []  // ✅ NEW
//   })
//   const [customFeature, setCustomFeature] = useState("") // ✅ NEW
//   const [isLoading, setIsLoading] = useState(false)

//   const onSubmitHandler = async (e) => {
//     e.preventDefault()
//     if (isLoading) return null;

//     setIsLoading(true)
//     try {
//       const formData = new FormData()
//       formData.append('image', image)
//       formData.append('carData', JSON.stringify(vehicle))

//       const { data } = await axios.post('/api/owner/add-vehicle', formData)

//       console.log({data});
      
//       if (data.success) {
//         toast.success(data.message)
//         setImage(null)
//         setVehicle({
//           brand: '',
//           vehicleType: '',
//           model: '',
//           year: 0,
//           pricePerDay: 0,
//           category: '',
//           transmission: '',
//           fuel_type: '',
//           seating_capacity: 0,
//           location: '',
//           description: '',
//           features: [] // reset
//         })
//       }
//       else {
//         toast.error(data.message)
//       }
//     } catch (error) {
//       toast.error(error.message)
//     }
//     finally {
//       setIsLoading(false)
//     }
//   }

//   // ✅ Toggle features check/uncheck
//   const handleFeatureToggle = (feat) => {
//     if (vehicle.features.includes(feat)) {
//       setVehicle({ ...vehicle, features: vehicle.features.filter(f => f !== feat) })
//     } else {
//       setVehicle({ ...vehicle, features: [...vehicle.features, feat] })
//     }
//   }

//   // ✅ Add custom feature
//   const addCustomFeature = () => {
//     if (customFeature.trim() && !vehicle.features.includes(customFeature.trim())) {
//       setVehicle({ ...vehicle, features: [...vehicle.features, customFeature.trim()] })
//       setCustomFeature("")
//     }
//   }

//   return (
//     <div className='px-4 py-10 md:px-10 flex-1'>
//       <Title title="Add New Vehicle" subTitle="Fill in details to list a new vehicle for booking, including pricing, availability, and specifications." />

//       <form onSubmit={onSubmitHandler} className='flex flex-col gap-5 text-gray-500 text-sm mt-6 max-w-xl'>

//         {/* Vehicle image */}
//         <div className='flex items-center gap-2 w-full'>
//           <label htmlFor="vehicle-image">
//             <img src={image ? URL.createObjectURL(image) : assets.upload_icon} alt="" className='h-14 rounded cursor-pointer' />
//             <input type="file" id='vehicle-image' accept='image/*' hidden onChange={e => setImage(e.target.files[0])} />
//           </label>
//           <p className='text-sm text-gray-500'>Upload a picture of your vehicle</p>
//         </div>

//         {/* Vehicle type */}
//         <div className='flex flex-col w-full'>
//           <label>Vehicle Type</label>
//           <select
//             required
//             className='px-3 py-2 mt-1 border-borderColor rounded-md outline-none'
//             value={vehicle.vehicleType}
//             onChange={e => setVehicle({ ...vehicle, vehicleType: e.target.value })}
//           >
//             <option value="">Select a vehicle type</option>
//             <option value="car">Car</option>
//             <option value="bike">Bike</option>
//             <option value="bus">Bus</option>
//             <option value="truck">Truck</option>
//             <option value="lorry">Lorry</option>
//             <option value="tractor">Tractor</option>
//             <option value="cycle">Cycle</option>
//           </select>
//         </div>

//         {/* Brand & Model */}
//         <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
//           <div className='flex flex-col w-full'>
//             <label>Brand</label>
//             <input type="text" required placeholder='e.g. BMW, Honda, Tata...'
//               className='px-3 py-2 mt-1 border-borderColor rounded-md outline-none'
//               value={vehicle.brand}
//               onChange={e => setVehicle({ ...vehicle, brand: e.target.value })} />
//           </div>

//           <div className='flex flex-col w-full'>
//             <label>Model</label>
//             <input type="text" required placeholder='e.g. X5, Pulsar, Activa...'
//               className='px-3 py-2 mt-1 border-borderColor rounded-md outline-none'
//               value={vehicle.model}
//               onChange={e => setVehicle({ ...vehicle, model: e.target.value })} />
//           </div>
//         </div>

//         {/* Year, Price, Category */}
//         <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
//           <div className='flex flex-col w-full'>
//             <label>Year</label>
//             <input type="number" placeholder='2025' required
//               className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none'
//               value={vehicle.year}
//               onChange={e => setVehicle({ ...vehicle, year: e.target.value })} />
//           </div>
//           <div className='flex flex-col w-full'>
//             <label>Daily Price ({currency})</label>
//             <input type="number" placeholder='100' required
//               className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none'
//               value={vehicle.pricePerDay}
//               onChange={e => setVehicle({ ...vehicle, pricePerDay: e.target.value })} />
//           </div>

//           {/* Category only for cars/bikes/trucks */}
//           {['car','bike','truck','lorry','bus'].includes(vehicle.vehicleType) && (
//             <div className='flex flex-col w-full'>
//               <label>Category</label>
//               <select
//                 onChange={e => setVehicle({ ...vehicle, category: e.target.value })}
//                 value={vehicle.category}
//                 className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none'>
//                 <option value="">Select a category</option>
//                 <option value="Sedan">Sedan</option>
//                 <option value="SUV">SUV</option>
//                 <option value="Van">Van</option>
//                 <option value="Sport">Sport</option>
//               </select>
//             </div>
//           )}
//         </div>

//         {/* Transmission, Fuel Type, Seating Capacity */}
//         {['car','bike','truck','lorry','bus','tractor'].includes(vehicle.vehicleType) && (
//           <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
//             <div className='flex flex-col w-full'>
//               <label>Transmission</label>
//               <select
//                 onChange={e => setVehicle({ ...vehicle, transmission: e.target.value })}
//                 value={vehicle.transmission}
//                 className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none'>
//                 <option value="">Select transmission</option>
//                 <option value="Automatic">Automatic</option>
//                 <option value="Manual">Manual</option>
//                 <option value="Semi-Automatic">Semi-Automatic</option>
//               </select>
//             </div>
//             <div className='flex flex-col w-full'>
//               <label>Fuel Type</label>
//               <select
//                 onChange={e => setVehicle({ ...vehicle, fuel_type: e.target.value })}
//                 value={vehicle.fuel_type}
//                 className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none'>
//                 <option value="">Select fuel type</option>
//                 <option value="Petrol">Petrol</option>
//                 <option value="Diesel">Diesel</option>
//                 <option value="Electric">Electric</option>
//                 <option value="Hybrid">Hybrid</option>
//                 <option value="CNG">CNG</option>
//               </select>
//             </div>
//             <div className='flex flex-col w-full'>
//               <label>Seating Capacity</label>
//               <input type="number" placeholder='4'
//                 className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none'
//                 value={vehicle.seating_capacity}
//                 onChange={e => setVehicle({ ...vehicle, seating_capacity: e.target.value })} />
//             </div>
//           </div>
//         )}

//         {/* Location */}
//         <div className='flex flex-col w-full'>
//           <label>Location</label>
//           <select
//             onChange={e => setVehicle({ ...vehicle, location: e.target.value })}
//             value={vehicle.location}
//             className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none"
//           >
//             <option value="">Select a city</option>
//             <option value="New York">New York</option>
//             <option value="Los Angeles">Los Angeles</option>
//             <option value="Mumbai">Mumbai</option>
//             <option value="Delhi">Delhi</option>
//             <option value="Bangalore">Bangalore</option>
//             <option value="Chennai">Chennai</option>
//             <option value="Goa">Goa</option>
//           </select>
//         </div>

//         {/* Description */}
//         <div className='flex flex-col w-full'>
//           <label>Description</label>
//           <textarea rows={5} placeholder='Describe your vehicle...' required
//             className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none'
//             value={vehicle.description}
//             onChange={e => setVehicle({ ...vehicle, description: e.target.value })} />
//         </div>

//         {/* ✅ Features */}
//         <div className='flex flex-col w-full'>
//           <label>Features</label>
//           <div className="grid grid-cols-2 gap-2 mt-2">
//             {["360 Camera", "Bluetooth", "GPS", "Heated Seats", "Rear View Mirror"].map((feat) => (
//               <label key={feat} className="flex items-center gap-2 text-sm">
//                 <input
//                   type="checkbox"
//                   value={feat}
//                   checked={vehicle.features.includes(feat)}
//                   onChange={() => handleFeatureToggle(feat)}
//                 />
//                 {feat}
//               </label>
//             ))}
//           </div>

//           {/* Custom feature input */}
//           <div className='flex items-center gap-2 mt-3'>
//             <input
//               type="text"
//               placeholder="Add custom feature"
//               value={customFeature}
//               onChange={(e) => setCustomFeature(e.target.value)}
//               className="flex-1 px-3 py-2 border border-borderColor rounded-md outline-none"
//             />
//             <button type="button" onClick={addCustomFeature} className="bg-primary text-white px-3 py-2 rounded-md">
//               Add
//             </button>
//           </div>

//           {/* Show selected features */}
//           {vehicle.features.length > 0 && (
//             <ul className="mt-2 flex flex-wrap gap-2">
//               {vehicle.features.map((f) => (
//                 <li key={f} className="bg-gray-200 px-2 py-1 rounded text-xs">{f}</li>
//               ))}
//             </ul>
//           )}
//         </div>

//         <button className='flex items-center gap-2 px-4 py-2.5 mt-4 bg-primary text-white rounded-md font-medium w-max cursor-pointer'>
//           {isLoading ? 'Listing...' : `Listing your ${vehicle.vehicleType?vehicle.vehicleType:"Vehicle"}`}
//         </button>

//       </form>
//     </div>
//   )
// }

// export default AddVehicle

//   import React, { useState } from 'react'
// import Title from '../../components/owner/Title'
// import { assets } from '../../assets/assets'
// import { useAppContext } from '../../context/AppContext'
// import toast from 'react-hot-toast'

// const AddVehicle = () => {

//   const { axios, currency } = useAppContext()
//   const [image, setImage] = useState(null)
//   const [vehicle, setVehicle] = useState({
//     brand: '',
//     vehicleType: '',
//     model: '',
//     year: 0,
//     pricePerDay: 0,
//     category: '',
//     transmission: '',
//     fuel_type: '',
//     seating_capacity: 0,
//     customAddress: '',
//     location: '',
//     description: '',
//     features: []
//   })
//   const [customFeature, setCustomFeature] = useState("")
//   const [newFeature, setNewFeature] = useState("")
//   const [availableFeatures, setAvailableFeatures] = useState(["360 Camera", "Bluetooth", "GPS", "Heated Seats", "Rear View Mirror"])
//   const [isLoading, setIsLoading] = useState(false)

//   const onSubmitHandler = async (e) => {
//     e.preventDefault()
//     if (isLoading) return null;

//     setIsLoading(true)
//     try {
//       const formData = new FormData()
//       formData.append('image', image)
//       formData.append('carData', JSON.stringify(vehicle))

//       const { data } = await axios.post('/api/owner/add-vehicle', formData)
//       console.log(data);
      
//       if (data.success) {
//         toast.success(data.message)
//         setImage(null)
//         setVehicle({
//           brand: '',
//           vehicleType: '',
//           model: '',
//           year: 0,
//           pricePerDay: 0,
//           category: '',
//           transmission: '',
//           fuel_type: '',
//           seating_capacity: 0,
//           customAddress: '',
//           location: '',
//           description: '',
//           features: []
//         })
//       }
//       else {
//         toast.error(data.message)
//       }
//     } catch (error) {
//       toast.error(error.message)
//     }
//     finally {
//       setIsLoading(false)
//     }
//   }

//   const handleFeatureToggle = (feat) => {
//     if (vehicle.features.includes(feat)) {
//       setVehicle({ ...vehicle, features: vehicle.features.filter(f => f !== feat) })
//     } else {
//       setVehicle({ ...vehicle, features: [...vehicle.features, feat] })
//     }
//   }

//   const addCustomFeature = () => {
//     if (customFeature.trim() && !vehicle.features.includes(customFeature.trim())) {
//       setVehicle({ ...vehicle, features: [...vehicle.features, customFeature.trim()] })
//       setCustomFeature("")
//     }
//   }

//   const addNewFeatureOption = () => {
//     if (newFeature.trim() && !availableFeatures.includes(newFeature.trim())) {
//       setAvailableFeatures([...availableFeatures, newFeature.trim()])
//       setNewFeature("")
//     }
//   }

//   const removeFeature = (feat) => {
//     setVehicle({ ...vehicle, features: vehicle.features.filter(f => f !== feat) })
//   }

//   return (
//     <div className='px-4 py-10 md:px-10 flex-1'>
//       <Title title="Add New Vehicle" subTitle="Fill in details to list a new vehicle for booking, including pricing, availability, and specifications." />

//       <form onSubmit={onSubmitHandler} className='flex flex-col gap-5 text-gray-500 text-sm mt-6 max-w-xl'>

//         {/* Vehicle image */}
//         <div className='flex items-center gap-2 w-full'>
//           <label htmlFor="vehicle-image">
//             <img src={image ? URL.createObjectURL(image) : assets.upload_icon} alt="" className='h-14 rounded cursor-pointer' />
//             <input type="file" id='vehicle-image' accept='image/*' hidden onChange={e => setImage(e.target.files[0])} />
//           </label>
//           <p className='text-sm text-gray-500'>Upload a picture of your vehicle</p>
//         </div>

//         {/* Vehicle type */}
//         <div className='flex flex-col w-full'>
//           <label>Vehicle Type</label>
//           <select
//             required
//             className='px-3 py-2 mt-1 border-borderColor rounded-md outline-none'
//             value={vehicle.vehicleType}
//             onChange={e => setVehicle({ ...vehicle, vehicleType: e.target.value })}
//           >
//             <option value="">Select a vehicle type</option>
//             <option value="car">Car</option>
//             <option value="bike">Bike</option>
//             <option value="bus">Bus</option>
//             <option value="truck">Truck</option>
//             <option value="lorry">Lorry</option>
//             <option value="tractor">Tractor</option>
//             <option value="cycle">Cycle</option>
//           </select>
//         </div>

//         {/* Brand & Model */}
//         <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
//           <div className='flex flex-col w-full'>
//             <label>Brand</label>
//             <input type="text" required placeholder='e.g. BMW, Honda, Tata...'
//               className='px-3 py-2 mt-1 border-borderColor rounded-md outline-none'
//               value={vehicle.brand}
//               onChange={e => setVehicle({ ...vehicle, brand: e.target.value })} />
//           </div>

//           <div className='flex flex-col w-full'>
//             <label>Model</label>
//             <input type="text" required placeholder='e.g. X5, Pulsar, Activa...'
//               className='px-3 py-2 mt-1 border-borderColor rounded-md outline-none'
//               value={vehicle.model}
//               onChange={e => setVehicle({ ...vehicle, model: e.target.value })} />
//           </div>
//         </div>

//         {/* Year, Price, Category */}
//         <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
//           <div className='flex flex-col w-full'>
//             <label>Year</label>
//             <input type="number" placeholder='2025' required
//               className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none'
//               value={vehicle.year}
//               onChange={e => setVehicle({ ...vehicle, year: e.target.value })} />
//           </div>
//           <div className='flex flex-col w-full'>
//             <label>Daily Price ({currency})</label>
//             <input type="number" placeholder='100' required
//               className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none'
//               value={vehicle.pricePerDay}
//               onChange={e => setVehicle({ ...vehicle, pricePerDay: e.target.value })} />
//           </div>

//           {['car','bike','truck','lorry','bus'].includes(vehicle.vehicleType) && (
//             <div className='flex flex-col w-full'>
//               <label>Category</label>
//               <select
//                 onChange={e => setVehicle({ ...vehicle, category: e.target.value })}
//                 value={vehicle.category}
//                 className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none'>
//                 <option value="">Select a category</option>
//                 <option value="Sedan">Sedan</option>
//                 <option value="SUV">SUV</option>
//                 <option value="Van">Van</option>
//                 <option value="Sport">Sport</option>
//               </select>
//             </div>
//           )}
//         </div>

//         {['car','bike','truck','lorry','bus','tractor'].includes(vehicle.vehicleType) && (
//           <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
//             <div className='flex flex-col w-full'>
//               <label>Transmission</label>
//               <select
//                 onChange={e => setVehicle({ ...vehicle, transmission: e.target.value })}
//                 value={vehicle.transmission}
//                 className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none'>
//                 <option value="">Select transmission</option>
//                 <option value="Automatic">Automatic</option>
//                 <option value="Manual">Manual</option>
//                 <option value="Semi-Automatic">Semi-Automatic</option>
//               </select>
//             </div>
//             <div className='flex flex-col w-full'>
//               <label>Fuel Type</label>
//               <select
//                 onChange={e => setVehicle({ ...vehicle, fuel_type: e.target.value })}
//                 value={vehicle.fuel_type}
//                 className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none'>
//                 <option value="">Select fuel type</option>
//                 <option value="Petrol">Petrol</option>
//                 <option value="Diesel">Diesel</option>
//                 <option value="Electric">Electric</option>
//                 <option value="Hybrid">Hybrid</option>
//                 <option value="CNG">CNG</option>
//               </select>
//             </div>
//             <div className='flex flex-col w-full'>
//               <label>Seating Capacity</label>
//               <input type="number" placeholder='4'
//                 className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none'
//                 value={vehicle.seating_capacity}
//                 onChange={e => setVehicle({ ...vehicle, seating_capacity: e.target.value })} />
//             </div>
//           </div>
//         )}

//         {/* Custom Address */}
//         <div className='flex flex-col w-full'>
//           <label>Custom Address</label>
//           <input type="text" placeholder='Enter exact address / landmark / town / district / pincode'
//             className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none'
//             value={vehicle.customAddress}
//             onChange={e => setVehicle({ ...vehicle, customAddress: e.target.value })} />
//         </div>

//         {/* Location */}
//         <div className='flex flex-col w-full'>
//           <label>State / UT</label>
//           <select
//             onChange={e => setVehicle({ ...vehicle, location: e.target.value })}
//             value={vehicle.location}
//             className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none"
//           >
//             <option value="">Select a State / UT</option>
//             <option value="Andhra Pradesh">Andhra Pradesh</option>
//             <option value="Arunachal Pradesh">Arunachal Pradesh</option>
//             <option value="Assam">Assam</option>
//             <option value="Bihar">Bihar</option>
//             <option value="Chhattisgarh">Chhattisgarh</option>
//             <option value="Goa">Goa</option>
//             <option value="Gujarat">Gujarat</option>
//             <option value="Haryana">Haryana</option>
//             <option value="Himachal Pradesh">Himachal Pradesh</option>
//             <option value="Jharkhand">Jharkhand</option>
//             <option value="Karnataka">Karnataka</option>
//             <option value="Kerala">Kerala</option>
//             <option value="Madhya Pradesh">Madhya Pradesh</option>
//             <option value="Maharashtra">Maharashtra</option>
//             <option value="Manipur">Manipur</option>
//             <option value="Meghalaya">Meghalaya</option>
//             <option value="Mizoram">Mizoram</option>
//             <option value="Nagaland">Nagaland</option>
//             <option value="Odisha">Odisha</option>
//             <option value="Punjab">Punjab</option>
//             <option value="Rajasthan">Rajasthan</option>
//             <option value="Sikkim">Sikkim</option>
//             <option value="Tamil Nadu">Tamil Nadu</option>
//             <option value="Telangana">Telangana</option>
//             <option value="Tripura">Tripura</option>
//             <option value="Uttar Pradesh">Uttar Pradesh</option>
//             <option value="Uttarakhand">Uttarakhand</option>
//             <option value="West Bengal">West Bengal</option>
//             <option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
//             <option value="Chandigarh">Chandigarh</option>
//             <option value="Dadra and Nagar Haveli and Daman and Diu">Dadra and Nagar Haveli and Daman and Diu</option>
//             <option value="Delhi">Delhi</option>
//             <option value="Jammu and Kashmir">Jammu and Kashmir</option>
//             <option value="Ladakh">Ladakh</option>
//             <option value="Lakshadweep">Lakshadweep</option>
//             <option value="Puducherry">Puducherry</option>
//           </select>
//         </div>

//         {/* Description */}
//         <div className='flex flex-col w-full'>
//           <label>Description</label>
//           <textarea rows={5} placeholder='Describe your vehicle...' required
//             className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none'
//             value={vehicle.description}
//             onChange={e => setVehicle({ ...vehicle, description: e.target.value })} />
//         </div>

//         {/* ✅ Features */}
//         <div className='flex flex-col w-full'>
//           <label>Features</label>
//           <div className="grid grid-cols-2 gap-2 mt-2">
//             {availableFeatures.map((feat) => (
//               <label key={feat} className="flex items-center gap-2 text-sm">
//                 <input
//                   type="checkbox"
//                   value={feat}
//                   checked={vehicle.features.includes(feat)}
//                   onChange={() => handleFeatureToggle(feat)}
//                 />
//                 {feat}
//               </label>
//             ))}
//           </div>

//           {/* Add new feature option */}
//           <div className='flex items-center gap-2 mt-3'>
//             <input
//               type="text"
//               placeholder="Add new feature option"
//               value={newFeature}
//               onChange={(e) => setNewFeature(e.target.value)}
//               className="flex-1 px-3 py-2 border border-borderColor rounded-md outline-none"
//             />
//             <button type="button" onClick={addNewFeatureOption} className="bg-green-600 text-white px-3 py-2 rounded-md">
//               +
//             </button>
//           </div>

//           {/* Add custom selected feature */}
//           <div className='flex items-center gap-2 mt-3'>
//             <input
//               type="text"
//               placeholder="Add custom feature"
//               value={customFeature}
//               onChange={(e) => setCustomFeature(e.target.value)}
//               className="flex-1 px-3 py-2 border border-borderColor rounded-md outline-none"
//             />
//             <button type="button" onClick={addCustomFeature} className="bg-primary text-white px-3 py-2 rounded-md">
//               Add
//             </button>
//           </div>

//           {vehicle.features.length > 0 && (
//             <ul className="mt-2 flex flex-wrap gap-2">
//               {vehicle.features.map((f) => (
//                 <li key={f} className="bg-gray-200 px-2 py-1 rounded text-xs flex items-center gap-2">
//                   {f}
//                   <button type="button" onClick={() => removeFeature(f)} className="text-red-600 font-bold">x</button>
//                 </li>
//               ))}
//             </ul>
//           )}
//         </div>

//         <button className='flex items-center gap-2 px-4 py-2.5 mt-4 bg-primary text-white rounded-md font-medium w-max cursor-pointer'>
//           {isLoading ? 'Listing...' : `Listing your ${vehicle.vehicleType?vehicle.vehicleType:"Vehicle"}`}
//         </button>

//       </form>
//     </div>
//   )
// }

// export default AddVehicle


// import React, { useState } from 'react'
// import Title from '../../components/owner/Title'
// import { assets } from '../../assets/assets'
// import { useAppContext } from '../../context/AppContext'
// import toast from 'react-hot-toast'



// const AddVehicle = () => {
//   const { axios, currency } = useAppContext()
//   const [image, setImage] = useState(null)
//   const [vehicle, setVehicle] = useState({
//     brand: '',
//     vehicleType: '',
//     model: '',
//     year: 0,
//     pricePerDay: 0,
//     category: '',
//     transmission: '',
//     fuel_type: '',
//     seating_capacity: 0,
//     state: '',
//     city: '',
//     description: '',
//     features: []
//   })
//   const [customFeature, setCustomFeature] = useState("")
//   const [newFeature, setNewFeature] = useState("")
//   const [availableFeatures, setAvailableFeatures] = useState(["360 Camera", "Bluetooth", "GPS", "Heated Seats", "Rear View Mirror"])
//   const [isLoading, setIsLoading] = useState(false)

//   const onSubmitHandler = async (e) => {
//     e.preventDefault()
//     if (isLoading) return null;

//     setIsLoading(true)
//     try {
//       const formData = new FormData()
//       formData.append('image', image)
//       formData.append('carData', JSON.stringify(vehicle))

//       const { data } = await axios.post('/api/owner/add-vehicle', formData)

//       if (data.success) {
//         toast.success(data.message)
//         setImage(null)
//         setVehicle({
//           brand: '',
//           vehicleType: '',
//           model: '',
//           year: 0,
//           pricePerDay: 0,
//           category: '',
//           transmission: '',
//           fuel_type: '',
//           seating_capacity: 0,
//           state: '',
//           city: '',
//           description: '',
//           features: []
//         })
//       } else {
//         toast.error(data.message)
//       }
//     } catch (error) {
//       toast.error(error.message)
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   const handleFeatureToggle = (feat) => {
//     if (vehicle.features.includes(feat)) {
//       setVehicle({ ...vehicle, features: vehicle.features.filter(f => f !== feat) })
//     } else {
//       setVehicle({ ...vehicle, features: [...vehicle.features, feat] })
//     }
//   }

//   const addCustomFeature = () => {
//     if (customFeature.trim() && !vehicle.features.includes(customFeature.trim())) {
//       setVehicle({ ...vehicle, features: [...vehicle.features, customFeature.trim()] })
//       setCustomFeature("")
//     }
//   }

//   const addNewFeatureOption = () => {
//     if (newFeature.trim() && !availableFeatures.includes(newFeature.trim())) {
//       setAvailableFeatures([...availableFeatures, newFeature.trim()])
//       setNewFeature("")
//     }
//   }

//   const removeFeature = (feat) => {
//     setVehicle({ ...vehicle, features: vehicle.features.filter(f => f !== feat) })
//   }

//   return (
//     <div className='px-4 py-10 md:px-10 flex-1'>
//       <Title title="Add New Vehicle" subTitle="Fill in details to list a new vehicle for booking, including pricing, availability, and specifications." />

//       <form onSubmit={onSubmitHandler} className='flex flex-col gap-5 text-gray-500 text-sm mt-6 max-w-xl'>
        
//         {/* Vehicle image */}
//         <div className='flex items-center gap-2 w-full'>
//           <label htmlFor="vehicle-image">
//             <img src={image ? URL.createObjectURL(image) : assets.upload_icon} alt="" className='h-14 rounded cursor-pointer' />
//             <input type="file" id='vehicle-image' accept='image/*' hidden onChange={e => setImage(e.target.files[0])} />
//           </label>
//           <p className='text-sm text-gray-500'>Upload a picture of your vehicle</p>
//         </div>

//         {/* Vehicle Type */}
//         <div className='flex flex-col w-full'>
//           <label>Vehicle Type</label>
//           <select
//             required
//             className='px-3 py-2 mt-1 border-borderColor rounded-md outline-none'
//             value={vehicle.vehicleType}
//             onChange={e => setVehicle({ ...vehicle, vehicleType: e.target.value })}
//           >
//             <option value="">Select a vehicle type</option>
//             <option value="car">Car</option>
//             <option value="bike">Bike</option>
//             <option value="bus">Bus</option>
//             <option value="truck">Truck</option>
//             <option value="lorry">Lorry</option>
//             <option value="tractor">Tractor</option>
//             <option value="cycle">Cycle</option>
//           </select>
//         </div>

//         {/* Brand & Model */}
//         <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
//           <div className='flex flex-col w-full'>
//             <label>Brand</label>
//             <input type="text" required placeholder='e.g. BMW, Honda, Tata...'
//               className='px-3 py-2 mt-1 border-borderColor rounded-md outline-none'
//               value={vehicle.brand}
//               onChange={e => setVehicle({ ...vehicle, brand: e.target.value })} />
//           </div>

//           <div className='flex flex-col w-full'>
//             <label>Model</label>
//             <input type="text" required placeholder='e.g. X5, Pulsar, Activa...'
//               className='px-3 py-2 mt-1 border-borderColor rounded-md outline-none'
//               value={vehicle.model}
//               onChange={e => setVehicle({ ...vehicle, model: e.target.value })} />
//           </div>
//         </div>

//         {/* Year, Price, Category */}
//         <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
//           <div className='flex flex-col w-full'>
//             <label>Year</label>
//             <input type="number" placeholder='2025' required
//               className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none'
//               value={vehicle.year}
//               onChange={e => setVehicle({ ...vehicle, year: e.target.value })} />
//           </div>
//           <div className='flex flex-col w-full'>
//             <label>Daily Price ({currency})</label>
//             <input type="number" placeholder='100' required
//               className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none'
//               value={vehicle.pricePerDay}
//               onChange={e => setVehicle({ ...vehicle, pricePerDay: e.target.value })} />
//           </div>

//           {['car','bike','truck','lorry','bus'].includes(vehicle.vehicleType) && (
//             <div className='flex flex-col w-full'>
//               <label>Category</label>
//               <select
//                 onChange={e => setVehicle({ ...vehicle, category: e.target.value })}
//                 value={vehicle.category}
//                 className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none'>
//                 <option value="">Select a category</option>
//                 <option value="Sedan">Sedan</option>
//                 <option value="SUV">SUV</option>
//                 <option value="Van">Van</option>
//                 <option value="Sport">Sport</option>
//               </select>
//             </div>
//           )}
//         </div>

//         {['car','bike','truck','lorry','bus','tractor'].includes(vehicle.vehicleType) && (
//           <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
//             <div className='flex flex-col w-full'>
//               <label>Transmission</label>
//               <select
//                 onChange={e => setVehicle({ ...vehicle, transmission: e.target.value })}
//                 value={vehicle.transmission}
//                 className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none'>
//                 <option value="">Select transmission</option>
//                 <option value="Automatic">Automatic</option>
//                 <option value="Manual">Manual</option>
//                 <option value="Semi-Automatic">Semi-Automatic</option>
//               </select>
//             </div>
//             <div className='flex flex-col w-full'>
//               <label>Fuel Type</label>
//               <select
//                 onChange={e => setVehicle({ ...vehicle, fuel_type: e.target.value })}
//                 value={vehicle.fuel_type}
//                 className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none'>
//                 <option value="">Select fuel type</option>
//                 <option value="Petrol">Petrol</option>
//                 <option value="Diesel">Diesel</option>
//                 <option value="Electric">Electric</option>
//                 <option value="Hybrid">Hybrid</option>
//                 <option value="CNG">CNG</option>
//               </select>
//             </div>
//             <div className='flex flex-col w-full'>
//               <label>Seating Capacity</label>
//               <input type="number" placeholder='4'
//                 className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none'
//                 value={vehicle.seating_capacity}
//                 onChange={e => setVehicle({ ...vehicle, seating_capacity: e.target.value })} />
//             </div>
//           </div>
//         )}

//         {/* State & City */}
//         <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
//           <div className='flex flex-col w-full'>
//             <label>State / UT</label>
//             <select
//               required
//               onChange={e => setVehicle({ ...vehicle, state: e.target.value, city: '' })}
//               value={vehicle.state}
//               className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none"
//             >
//               <option value="">Select a State / UT</option>
//               {Object.keys(indianStatesWithCities).sort().map((state) => (
//                 <option key={state} value={state}>{state}</option>
//               ))}
//             </select>
//           </div>

//           <div className='flex flex-col w-full'>
//             <label>City</label>
//             <select
//               required
//               disabled={!vehicle.state}
//               onChange={e => setVehicle({ ...vehicle, city: e.target.value })}
//               value={vehicle.city}
//               className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none"
//             >
//               <option value="">Select a City</option>
//               {vehicle.state &&
//                 indianStatesWithCities[vehicle.state].sort().map((city) => (
//                   <option key={city} value={city}>{city}</option>
//                 ))
//               }
//             </select>
//           </div>
//         </div>

//         {/* Description */}
//         <div className='flex flex-col w-full'>
//           <label>Description</label>
//           <textarea rows={5} placeholder='Describe your vehicle...' required
//             className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none'
//             value={vehicle.description}
//             onChange={e => setVehicle({ ...vehicle, description: e.target.value })} />
//         </div>

//         {/* ✅ Features */}
//         <div className='flex flex-col w-full'>
//           <label>Features</label>
//           <div className="grid grid-cols-2 gap-2 mt-2">
//             {availableFeatures.map((feat) => (
//               <label key={feat} className="flex items-center gap-2 text-sm">
//                 <input
//                   type="checkbox"
//                   value={feat}
//                   checked={vehicle.features.includes(feat)}
//                   onChange={() => handleFeatureToggle(feat)}
//                 />
//                 {feat}
//               </label>
//             ))}
//           </div>

//           {/* Add new feature option */}
//           <div className='flex items-center gap-2 mt-3'>
//             <input
//               type="text"
//               placeholder="Add new feature option"
//               value={newFeature}
//               onChange={(e) => setNewFeature(e.target.value)}
//               className="flex-1 px-3 py-2 border border-borderColor rounded-md outline-none"
//             />
//             <button type="button" onClick={addNewFeatureOption} className="bg-green-600 text-white px-3 py-2 rounded-md">
//               +
//             </button>
//           </div>

//           {/* Add custom selected feature */}
//           <div className='flex items-center gap-2 mt-3'>
//             <input
//               type="text"
//               placeholder="Add custom feature"
//               value={customFeature}
//               onChange={(e) => setCustomFeature(e.target.value)}
//               className="flex-1 px-3 py-2 border border-borderColor rounded-md outline-none"
//             />
//             <button type="button" onClick={addCustomFeature} className="bg-primary text-white px-3 py-2 rounded-md">
//               Add
//             </button>
//           </div>

//           {vehicle.features.length > 0 && (
//             <ul className="mt-2 flex flex-wrap gap-2">
//               {vehicle.features.map((f) => (
//                 <li key={f} className="bg-gray-200 px-2 py-1 rounded text-xs flex items-center gap-2">
//                   {f}
//                   <button type="button" onClick={() => removeFeature(f)} className="text-red-600 font-bold">x</button>
//                 </li>
//               ))}
//             </ul>
//           )}
//         </div>

//         <button className='flex items-center gap-2 px-4 py-2.5 mt-4 bg-primary text-white rounded-md font-medium w-max cursor-pointer'>
//           {isLoading ? 'Listing...' : `Listing your ${vehicle.vehicleType ? vehicle.vehicleType : "Vehicle"}`}
//         </button>

//       </form>
//     </div>
//   )
// }

// export default AddVehicle


import React, { useState } from 'react'
import Title from '../../components/owner/Title'
import { assets, cityList } from '../../assets/assets'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'

const AddVehicle = () => {
  const { axios, currency } = useAppContext()
  const [image, setImage] = useState(null)
  const [vehicle, setVehicle] = useState({
    brand: '',
    vehicleType: '',
    model: '',
    year: 0,
    pricePerDay: 0,
    category: '',
    transmission: '',
    fuel_type: '',
    seating_capacity: 0,
    city: '',
    description: '',
    features: []
  })
  const [customFeature, setCustomFeature] = useState("")
  const [newFeature, setNewFeature] = useState("")
  const [availableFeatures, setAvailableFeatures] = useState([
    "360 Camera", "Bluetooth", "GPS", "Heated Seats", "Rear View Mirror"
  ])
  const [isLoading, setIsLoading] = useState(false)

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    if (isLoading) return null;

    setIsLoading(true)
    try {
      const formData = new FormData()
      formData.append('image', image)
      formData.append('carData', JSON.stringify(vehicle))

      const { data } = await axios.post('/api/owner/add-vehicle', formData)

      if (data.success) {
        toast.success(data.message)
        setImage(null)
        setVehicle({
          brand: '',
          vehicleType: '',
          model: '',
          year: 0,
          pricePerDay: 0,
          category: '',
          transmission: '',
          fuel_type: '',
          seating_capacity: 0,
          city: '',
          description: '',
          features: []
        })
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleFeatureToggle = (feat) => {
    if (vehicle.features.includes(feat)) {
      setVehicle({ ...vehicle, features: vehicle.features.filter(f => f !== feat) })
    } else {
      setVehicle({ ...vehicle, features: [...vehicle.features, feat] })
    }
  }

  const addCustomFeature = () => {
    if (customFeature.trim() && !vehicle.features.includes(customFeature.trim())) {
      setVehicle({ ...vehicle, features: [...vehicle.features, customFeature.trim()] })
      setCustomFeature("")
    }
  }

  const addNewFeatureOption = () => {
    if (newFeature.trim() && !availableFeatures.includes(newFeature.trim())) {
      setAvailableFeatures([...availableFeatures, newFeature.trim()])
      setNewFeature("")
    }
  }

  const removeFeature = (feat) => {
    setVehicle({ ...vehicle, features: vehicle.features.filter(f => f !== feat) })
  }

  return (
    <div className='px-4 py-10 md:px-10 flex-1'>
      <Title 
        title="Add New Vehicle" 
        subTitle="Fill in details to list a new vehicle for booking, including pricing, availability, and specifications." 
      />

      <form onSubmit={onSubmitHandler} className='flex flex-col gap-5 text-gray-500 text-sm mt-6 max-w-xl'>
        
        {/* Vehicle image */}
        <div className='flex items-center gap-2 w-full'>
          <label htmlFor="vehicle-image">
            <img 
              src={image ? URL.createObjectURL(image) : assets.upload_icon} 
              alt="" 
              className='h-14 rounded cursor-pointer' 
            />
            <input 
              type="file" 
              id='vehicle-image' 
              accept='image/*' 
              hidden 
              onChange={e => setImage(e.target.files[0])} 
            />
          </label>
          <p className='text-sm text-gray-500'>Upload a picture of your vehicle</p>
        </div>

        {/* Vehicle Type */}
        <div className='flex flex-col w-full'>
          <label>Vehicle Type</label>
          <select
            required
            className='px-3 py-2 mt-1 border-borderColor rounded-md outline-none'
            value={vehicle.vehicleType}
            onChange={e => setVehicle({ ...vehicle, vehicleType: e.target.value })}
          >
            <option value="">Select a vehicle type</option>
            <option value="car">Car</option>
            <option value="bike">Bike</option>
            <option value="bus">Bus</option>
            <option value="truck">Truck</option>
            <option value="lorry">Lorry</option>
            <option value="tractor">Tractor</option>
            <option value="cycle">Cycle</option>
          </select>
        </div>

        {/* Brand & Model */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <div className='flex flex-col w-full'>
            <label>Brand</label>
            <input 
              type="text" 
              required 
              placeholder='e.g. BMW, Honda, Tata...'
              className='px-3 py-2 mt-1 border-borderColor rounded-md outline-none'
              value={vehicle.brand}
              onChange={e => setVehicle({ ...vehicle, brand: e.target.value })} 
            />
          </div>

          <div className='flex flex-col w-full'>
            <label>Model</label>
            <input 
              type="text" 
              required 
              placeholder='e.g. X5, Pulsar, Activa...'
              className='px-3 py-2 mt-1 border-borderColor rounded-md outline-none'
              value={vehicle.model}
              onChange={e => setVehicle({ ...vehicle, model: e.target.value })} 
            />
          </div>
        </div>

        {/* Year, Price, Category */}
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
          <div className='flex flex-col w-full'>
            <label>Year</label>
            <input 
              type="number" 
              placeholder='2025' 
              required
              className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none'
              value={vehicle.year}
              onChange={e => setVehicle({ ...vehicle, year: e.target.value })} 
            />
          </div>
          <div className='flex flex-col w-full'>
            <label>Daily Price ({currency})</label>
            <input 
              type="number" 
              placeholder='100' 
              required
              className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none'
              value={vehicle.pricePerDay}
              onChange={e => setVehicle({ ...vehicle, pricePerDay: e.target.value })} 
            />
          </div>

          {['car','bike','truck','lorry','bus'].includes(vehicle.vehicleType) && (
            <div className='flex flex-col w-full'>
              <label>Category</label>
              <select
                onChange={e => setVehicle({ ...vehicle, category: e.target.value })}
                value={vehicle.category}
                className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none'>
                <option value="">Select a category</option>
                <option value="Sedan">Sedan</option>
                <option value="SUV">SUV</option>
                <option value="Van">Van</option>
                <option value="Sport">Sport</option>
              </select>
            </div>
          )}
        </div>

        {['car','bike','truck','lorry','bus','tractor'].includes(vehicle.vehicleType) && (
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
            <div className='flex flex-col w-full'>
              <label>Transmission</label>
              <select
                onChange={e => setVehicle({ ...vehicle, transmission: e.target.value })}
                value={vehicle.transmission}
                className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none'>
                <option value="">Select transmission</option>
                <option value="Automatic">Automatic</option>
                <option value="Manual">Manual</option>
                <option value="Semi-Automatic">Semi-Automatic</option>
              </select>
            </div>
            <div className='flex flex-col w-full'>
              <label>Fuel Type</label>
              <select
                onChange={e => setVehicle({ ...vehicle, fuel_type: e.target.value })}
                value={vehicle.fuel_type}
                className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none'>
                <option value="">Select fuel type</option>
                <option value="Petrol">Petrol</option>
                <option value="Diesel">Diesel</option>
                <option value="Electric">Electric</option>
                <option value="Hybrid">Hybrid</option>
                <option value="CNG">CNG</option>
              </select>
            </div>
            <div className='flex flex-col w-full'>
              <label>Seating Capacity</label>
              <input 
                type="number" 
                placeholder='4'
                className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none'
                value={vehicle.seating_capacity}
                onChange={e => setVehicle({ ...vehicle, seating_capacity: e.target.value })} 
              />
            </div>
          </div>
        )}

        {/* City */}
        <div className='flex flex-col w-full'>
          <label>City</label>
          <select
            required
            onChange={e => setVehicle({ ...vehicle, city: e.target.value })}
            value={vehicle.city}
            className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none"
          >
            <option value="">Select a City</option>
            {cityList.sort().map((city) => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
        </div>

        {/* Description */}
        <div className='flex flex-col w-full'>
          <label>Description</label>
          <textarea 
            rows={5} 
            placeholder='Describe your vehicle...' 
            required
            className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none'
            value={vehicle.description}
            onChange={e => setVehicle({ ...vehicle, description: e.target.value })} 
          />
        </div>

        {/* ✅ Features */}
        <div className='flex flex-col w-full'>
          <label>Features</label>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {availableFeatures.map((feat) => (
              <label key={feat} className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  value={feat}
                  checked={vehicle.features.includes(feat)}
                  onChange={() => handleFeatureToggle(feat)}
                />
                {feat}
              </label>
            ))}
          </div>

          {/* Add new feature option */}
          <div className='flex items-center gap-2 mt-3'>
            <input
              type="text"
              placeholder="Add new feature option"
              value={newFeature}
              onChange={(e) => setNewFeature(e.target.value)}
              className="flex-1 px-3 py-2 border border-borderColor rounded-md outline-none"
            />
            <button type="button" onClick={addNewFeatureOption} className="bg-green-600 text-white px-3 py-2 rounded-md">
              +
            </button>
          </div>

          {/* Add custom selected feature */}
          <div className='flex items-center gap-2 mt-3'>
            <input
              type="text"
              placeholder="Add custom feature"
              value={customFeature}
              onChange={(e) => setCustomFeature(e.target.value)}
              className="flex-1 px-3 py-2 border border-borderColor rounded-md outline-none"
            />
            <button type="button" onClick={addCustomFeature} className="bg-primary text-white px-3 py-2 rounded-md">
              Add
            </button>
          </div>

          {vehicle.features.length > 0 && (
            <ul className="mt-2 flex flex-wrap gap-2">
              {vehicle.features.map((f) => (
                <li key={f} className="bg-gray-200 px-2 py-1 rounded text-xs flex items-center gap-2">
                  {f}
                  <button type="button" onClick={() => removeFeature(f)} className="text-red-600 font-bold">x</button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <button className='flex items-center gap-2 px-4 py-2.5 mt-4 bg-primary text-white rounded-md font-medium w-max cursor-pointer'>
          {isLoading ? 'Listing...' : `Listing your ${vehicle.vehicleType ? vehicle.vehicleType : "Vehicle"}`}
        </button>

      </form>
    </div>
  )
}

export default AddVehicle
