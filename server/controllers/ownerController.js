import imagekit from "../configs/imageKit.js"
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
        let car = JSON.parse(req.body.carData);
        const imageFile = req.file;

        // upload timage to imagekit
        const fileBuffer = fs.readFileSync(imageFile.path)
        const response = await imagekit.upload({
            file: fileBuffer,
            fileName: imageFile.originalname,
            folder: '/cars'
        })

        //optimization through imagekit URL transofmration

        var optimizedImageURL = imagekit.url({
            path: response.filePath,
            transformation: [
                { width: "1280" },//width resizing
                { quality: 'auto' },//auto compression
                { format: 'webp' }//convert to modern format
            ]
        });

        const image = optimizedImageURL;
        await Car.create({ ...car, owner: _id, image })

        res.json({ success: true, message: "Car Added" })
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })
    }
}

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
        res.json({success:true,message:"Availability toggeled"})
    } catch (error) {
        console.log(error.message);
        res.json({success:false,message:error.message})
        
    }
}

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
export const getDashboardData = async ()=>{
    try {
        const {_id,role} = req.user;

        if(role !== 'owner'){
            return res.json({success:false,message:"Unauthorized"});
        }

        const cars = await Car.find({owner:_id})
    } catch (error) {
         console.log(error.message);
        res.json({success:false,message:error.message})
        
    }
}