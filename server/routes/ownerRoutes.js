import express from "express"
import { protect } from "../middleware/auth.js";
import { addCar, changeRoleToOwner, clientDetails, deleteCar, getDashboardData, getOwnerCars, toggleCarAvailability, updateUserImage, updateVehicleDetails } from "../controllers/ownerController.js";
import upload from "../middleware/multer.js";

const ownerRouter = express.Router();

ownerRouter.post("/change-role",protect,changeRoleToOwner)
ownerRouter.post('/add-vehicle',upload.single("image"),protect,addCar)
ownerRouter.get('/vehicle',protect,getOwnerCars)
ownerRouter.post('/toggle-vehicle',protect,toggleCarAvailability)
ownerRouter.post('/delete-car',protect,deleteCar)
ownerRouter.get('/dashboard',protect,getDashboardData)
ownerRouter.post('/update-vehicle',protect,updateVehicleDetails)
ownerRouter.get('/clientDetails',protect,clientDetails)

ownerRouter.post('/update-image',upload.single("image"),protect,updateUserImage)


export default ownerRouter;