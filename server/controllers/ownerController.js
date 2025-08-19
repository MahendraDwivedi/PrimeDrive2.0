import { log } from "console"
import imagekit from "../configs/imageKit.js"
import Booking from "../model/Booking.js"
import Car from "../model/Car.js"
import User from "../model/User.js"
import fs from 'fs'


//  change role to Owner
export const changeRoleToOwner = async (req, res) => {
    try {
        const { _id } = req.user
        await User.findByIdAndUpdate(_id, { role: "owner" })
        res.json({ success: true, message: "Now you can list Cars" })
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })
    }
}
    
//API to list car

export const addCar = async (req, res) => {
  try {
    const { _id } = req.user;

    if (!req.body.carData) {
      return res.status(400).json({ success: false, message: "No car data received" });
    }

    let car;
    try {
      car = JSON.parse(req.body.carData);
    } catch (err) {
      return res.status(400).json({ success: false, message: "Invalid car JSON" });
    }

    const imageFile = req.file;

    // upload image to imagekit
    const fileBuffer = fs.readFileSync(imageFile.path);
    const response = await imagekit.upload({
      file: fileBuffer,
      fileName: imageFile.originalname,
      folder: "/cars"
    });

    // optimization through imagekit URL transformation
    const optimizedImageURL = imagekit.url({
      path: response.filePath,
      transformation: [
        { width: "1280" },
        { quality: "auto" },
        { format: "webp" }
      ]
    });

    const image = optimizedImageURL;
    await Car.create({ ...car, owner: _id, image });

    res.json({ success: true, message: "Car Added" });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};


// API to List Owner Cars
export const getOwnerCars = async (req, res) => {
    try {
        const { _id } = req.user;
        const cars = await Car.find({ owner: _id })
        res.json({ success: true, cars })
    } catch (error) {
        console.log(error.message);
        res.json({success:false,message:error.message})
        
    }
}

//API to toggle car availability
export const toggleCarAvailability = async (req,res)=>{
    try {
        const{_id} = req.user;
        const {carId} = req.body;
        const car = await Car.findById(carId)
        if(car.owner.toString()!= _id.toString()) return res.json({success:false,message:"Unauthorized"})
        car.isAvailable=!car.isAvailable;

        await car.save();
        res.json({success:true,message:"Availability toggled"})
    } catch (error) {
        console.log(error.message);
        res.json({success:false,message:error.message})
        
    }
}

// upadate vehicle detail

export const  updateVehicleDetails = async (req, res) => {
  try {
    
    const {
      carId,
      vehicleType,
      brand,
      model,
      features,
      image,
      year,
      category,
      seating_capacity,
      fuel_type,
      transmission,
      pricePerDay,
      location,
      description,
      isAvailable,
    } = req.body;


    if (!carId) {
      return res.status(400).json({ success: false, message: "Car ID is required" });
    }

    const updatedCar = await Car.findByIdAndUpdate(
      carId,
      {
        vehicleType,
        brand,
        model,
        features,        // ✅ features array
        image,
        year,
        category,
        seating_capacity,
        fuel_type,
        transmission,
        pricePerDay,
        location,
        description,
        isAvailable,
      },
      { new: true, runValidators: true }
    );


    if (!updatedCar) {
      return res.status(404).json({ success: false, message: "Vehicle not found" });
    }

    res.json({ success: true, message: "Vehicle updated successfully", car: updatedCar });
  } catch (error) {
    console.error("Error updating vehicle:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

//API to delete 
export const deleteCar = async (req,res)=>{
    try {
        const{_id} = req.user;
        const {carId} = req.body;
        const car = await Car.findById(carId)
        
        if(car.owner.toString()!= _id.toString()) return res.json({success:false,message:"Unauthorized"})

        car.owner = null;
        car.isAvailable = false;

        await car.save();
        res.json({success:true,message:"Car Removed"})
    } catch (error) {
        console.log(error.message);
        res.json({success:false,message:error.message})
        
    }
}

// API to get dashboard Data
export const getDashboardData = async (req,res)=>{
    try {
        const {_id,role} = req.user;

        if(role !== 'owner'){
            return res.json({success:false,message:"Unauthorized"});
        }

        const cars = await Car.find({owner:_id})
        const bookings = await Booking.find({owner:_id}).populate('car').sort({createdAt:-1});

        const pendingBookings  = await Booking.find({owner:_id,status:'pending'});
        const completedBookings  = await Booking.find({owner:_id,status:'confirmed'})

        //calculate monthly reveneue from bookings whre status is confirmed
        const monthlyRevenue = bookings.slice().filter(booking => booking.status==='confirmed').reduce((acc,booking)=>acc+booking.price,0)

        const dashboardData = {
            totalCars:cars.length,
            totalBookings: bookings.length,
            pendingBookings:pendingBookings.length,
            completedBookings:completedBookings.length,
            recentBookings : bookings.slice(0,3),
            monthlyRevenue:monthlyRevenue
        }

        res.json({success:true,dashboardData});

    } catch (error) {
         console.log(error.message);
        res.json({success:false,message:error.message})
        
    }
}


// API to update user image
export const updateUserImage = async(req,res)=>{
    try {
        const {_id} = req.user
        const imageFile = req.file;

        // upload timage to imagekit
        const fileBuffer = fs.readFileSync(imageFile.path)
        const response = await imagekit.upload({
            file: fileBuffer,
            fileName: imageFile.originalname,
            folder: '/users'
        })

        //optimization through imagekit URL transofmration

        var optimizedImageURL = imagekit.url({
            path: response.filePath,
            transformation: [
                { width: "400" },//width resizing
                { quality: 'auto' },//auto compression
                { format: 'webp' }//convert to modern format
            ]
        });

        const image = optimizedImageURL;
        await User.findByIdAndUpdate(_id,{image});
        res.json({success:true,message:"Image Updated"})
    }catch (error) {
         console.log(error.message);
        res.json({success:false,message:error.message})
        
    }
}

export const clientDetails = async (req, res) => {
  try {
    const ownerId = req.user._id;

    const bookings = await Booking.find({ owner: ownerId })
      .populate("car", "brand model")
      .populate("user", "name email");

    res.json({ success: true, bookings });

    res.json({ success: true, bookings: ownerBookings });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
}