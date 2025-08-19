import express from 'express'
import { overallBooking, ownerBooking } from '../controllers/statsController.js'
import { protect } from '../middleware/auth.js';

const stats = express.Router();

stats.get('/overall',overallBooking);
stats.get('/owner',protect,ownerBooking)

export default stats;