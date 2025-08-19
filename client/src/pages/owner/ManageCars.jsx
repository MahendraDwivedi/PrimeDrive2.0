// import React, { useEffect, useState } from 'react'
// import { assets, dummyCarData } from '../../assets/assets'
// import Title from '../../components/owner/Title'
// import { useAppContext } from '../../context/AppContext'
// import toast from 'react-hot-toast'

// const ManageCars = () => {

//   const { isOwner, axios, currency } = useAppContext()

//   const [cars, setCars] = useState([])

//   const fetchOwnerCars = async () => {
//     try {
//       const { data } = await axios.get('/api/owner/vehicle')

//       if (data.success) {
//         setCars(data.cars)
//       }
//       else {
//         toast.error(data.message)
//       }
//     } catch (error) {
//       toast.error(error.message)
//     }
//   }

//   const toggleAvailability = async (carId) => {
//     try {
//       const { data } = await axios.post('/api/owner/toggle-vehicle', { carId })
//       if (data.success) {
//         toast.success(data.message)
//         fetchOwnerCars()
//       }
//       else {
//         toast.error(error.message)
//       }
//     }
//     catch (error) {
//       toast.error(error.message)
//     }
//   }


//   const deleteCar = async (carId) => {
//     try {
//       const confirm = window.confirm('Do u want to delete the vehicle?')
//       if(!confirm) return null;
//       const { data } = await axios.post('/api/owner/delete-car', { carId })
//       if (data.success) {
//         toast.success(data.message)
//         fetchOwnerCars()
//       }
//       else {
//         toast.error(error.message)
//       }
//     }
//     catch (error) {
//       toast.error(error.message)
//     }
//   }
//   useEffect(() => {
//     isOwner && fetchOwnerCars()
//   }, [isOwner])

//   return (
//     <div className='px-4 pt-10 md:px-10 w-full'>
//       <Title title="Manage Vehicle" subTitle="View all listed vehicle, update their details, or remove them from the booking platform." />

//       <div className='max-w-3xl w-full rounded-md overflow-hidden border border-borderColor mt-6'>
//         <table className='w-full border-collapse text-left text-sm text-gray-600 '>
//           <thead className='text-gray-500'>
//             <tr>
//               <th className='p-3 font-medium'>Car</th>
//               <th className='p-3 font-medium max-md:hidden'>Type</th>
//               <th className='p-3 font-medium'>Price</th>
//               <th className='p-3 font-medium max-md:hidden'>Status</th>
//               <th className='p-3 font-medium'>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {cars.map((car, index) => (
//               <tr key={index} className='border-t border-borderColor'>
//                 <td className='p-3 flex items-center gap-3'>
//                   <img src={car.image} alt="" className='h-12 w-12 aspect-square rounded-md object-cover' />
//                   <div className='max-md:hidden'>
//                     <p className='font-medium'>{car.brand} {car.model}</p>
//                     <p className='text-xs text-gray-500'>{car.seating_capacity} | {car.transmission}</p>
//                   </div>
//                 </td>

//                 <td className='p-3 max-md:hidden'>{car.vehicleType}</td>
//                 <td className='p-3'>{currency} {car.pricePerDay}</td>

//                 <td className='p-3 max-md:hidden'>
//                   <span className={`px-3 py-1 rounded-full text-xs ${car.isAvailable ? "bg-green-100 text-green-500" : "bg-red-100 text-red-500"}`}>{car.isAvailable ? "Available" : "Unavailable"}</span>
//                 </td>

//                 <td className='flex items-center p-3'>
//                   <img onClick={()=> toggleAvailability(car._id)} src={car.isAvailable ? assets.eye_close_icon : assets.eye_icon} alt="" className='cursor-pointer' />
//                   <img onClick={()=>deleteCar(car._id)} src={assets.delete_icon} alt="" className='cursor-pointer' />
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   )
// }

// export default ManageCars


import React, { useEffect, useState } from 'react'
import { assets } from '../../assets/assets'
import Title from '../../components/owner/Title'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'

const ManageCars = () => {

  const { isOwner, axios, currency } = useAppContext()

  const [cars, setCars] = useState([])
  const [editingCar, setEditingCar] = useState(null)
  const [formData, setFormData] = useState({})

  const fetchOwnerCars = async () => {
    try {
      const { data } = await axios.get('/api/owner/vehicle')

      if (data.success) {
        setCars(data.cars)
      }
      else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const toggleAvailability = async (carId) => {
    try {
      const { data } = await axios.post('/api/owner/toggle-vehicle', { carId })
      if (data.success) {
        toast.success(data.message)
        fetchOwnerCars()
      }
      else {
        toast.error(error.message)
      }
    }
    catch (error) {
      toast.error(error.message)
    }
  }

  const deleteCar = async (carId) => {
    try {
      const confirm = window.confirm('Do u want to delete the vehicle?')
      if(!confirm) return null;
      const { data } = await axios.post('/api/owner/delete-car', { carId })
      if (data.success) {
        toast.success(data.message)
        fetchOwnerCars()
      }
      else {
        toast.error(error.message)
      }
    }
    catch (error) {
      toast.error(error.message)
    }
  }

  const openEditModal = (car) => {
    setEditingCar(car)
    setFormData({ ...car })
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
  }

  const handleFeaturesChange = (e) => {
    setFormData((prev) => ({ ...prev, features: e.target.value.split(',').map(f => f.trim()) }))
  }

  const handleUpdate = async () => {
    try {
      console.log("checking");
      
      const { data } = await axios.post('/api/owner/update-vehicle', { carId: editingCar._id, ...formData })
      console.log(data);
      
      if (data.success) {
        toast.success("Vehicle updated successfully")
        setEditingCar(null)
        fetchOwnerCars()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    isOwner && fetchOwnerCars()
  }, [isOwner])

  return (
    <div className='px-4 pt-10 md:px-10 w-full'>
      <Title title="Manage Vehicle" subTitle="View all listed vehicle, update their details, or remove them from the booking platform." />

      <div className='max-w-3xl w-full rounded-md overflow-hidden border border-borderColor mt-6'>
        <table className='w-full border-collapse text-left text-sm text-gray-600 '>
          <thead className='text-gray-500'>
            <tr>
              <th className='p-3 font-medium'>Car</th>
              <th className='p-3 font-medium max-md:hidden'>Type</th>
              <th className='p-3 font-medium'>Price</th>
              <th className='p-3 font-medium max-md:hidden'>Status</th>
              <th className='p-3 font-medium'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {cars.map((car, index) => (
              <tr key={index} className='border-t border-borderColor'>
                <td className='p-3 flex items-center gap-3'>
                  <img src={car.image} alt="" className='h-12 w-12 aspect-square rounded-md object-cover' />
                  <div className='max-md:hidden'>
                    <p className='font-medium'>{car.brand} {car.model}</p>
                    <p className='text-xs text-gray-500'>{car.seating_capacity} | {car.transmission}</p>
                  </div>
                </td>

                <td className='p-3 max-md:hidden'>{car.vehicleType}</td>
                <td className='p-3'>{currency} {car.pricePerDay}</td>

                <td className='p-3 max-md:hidden'>
                  <span className={`px-3 py-1 rounded-full text-xs ${car.isAvailable ? "bg-green-100 text-green-500" : "bg-red-100 text-red-500"}`}>{car.isAvailable ? "Available" : "Unavailable"}</span>
                </td>

                <td className='flex items-center gap-3 p-3'>
                  <img onClick={()=> toggleAvailability(car._id)} src={car.isAvailable ? assets.eye_close_icon : assets.eye_icon} alt="" className='cursor-pointer' />
                  <img onClick={()=>deleteCar(car._id)} src={assets.delete_icon} alt="" className='cursor-pointer' />
                  <button onClick={()=>openEditModal(car)} className='px-2 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600'>Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {editingCar && (      
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 overflow-y-auto'>
          <div className='bg-white p-6 rounded shadow-md w-full max-w-lg max-h-[90vh] overflow-y-auto'>
            <h2 className='text-lg font-semibold mb-4'>Edit Vehicle</h2>
            <div className='grid grid-cols-1 gap-3'>
              <input name="brand" value={formData.brand} onChange={handleChange} placeholder="Brand" className='border px-3 py-2 rounded' />
              <input name="model" value={formData.model} onChange={handleChange} placeholder="Model" className='border px-3 py-2 rounded' />
              <input name="year" type="number" value={formData.year} onChange={handleChange} placeholder="Year" className='border px-3 py-2 rounded' />
              <input name="vehicleType" value={formData.vehicleType} onChange={handleChange} placeholder="Vehicle Type" className='border px-3 py-2 rounded' />
              <input name="category" value={formData.category} onChange={handleChange} placeholder="Category" className='border px-3 py-2 rounded' />
              <input name="seating_capacity" type="number" value={formData.seating_capacity} min={1} max={100} onChange={handleChange} placeholder="Seating Capacity" className='border px-3 py-2 rounded' />
              <input name="fuel_type" value={formData.fuel_type} onChange={handleChange} placeholder="Fuel Type" className='border px-3 py-2 rounded' />
              <input name="transmission" value={formData.transmission} onChange={handleChange} placeholder="Transmission" className='border px-3 py-2 rounded' />
              <input name="pricePerDay" type="number" min={1} max={100000} value={formData.pricePerDay} onChange={handleChange} placeholder="Price Per Day" className='border px-3 py-2 rounded' />
              <input name="location" value={formData.location} onChange={handleChange} placeholder="Location" className='border px-3 py-2 rounded' />
              <input name="image" value={formData.image} onChange={handleChange} placeholder="Image URL" className='border px-3 py-2 rounded' />
              <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" className='border px-3 py-2 rounded' />
              <input type="text" value={formData.features?.join(', ')} onChange={handleFeaturesChange} placeholder="Features (comma separated)" className='border px-3 py-2 rounded' />
              <label className='flex items-center gap-2'>
                <input type="checkbox" name="isAvailable" checked={formData.isAvailable} onChange={handleChange} />
                Available
              </label>
            </div>
            <div className='flex justify-end gap-2 mt-4'>
              <button onClick={()=>setEditingCar(null)} className='px-3 py-1 bg-gray-300 rounded'>Cancel</button>
              <button onClick={handleUpdate} className='px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700'>Update</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ManageCars