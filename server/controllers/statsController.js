import Booking from "../model/Booking.js";

export const overallBooking = async (req, res) => {
  try {
    const bookings = await Booking.find();

    // initialize stats for 12 months
    const stats = Array(12).fill(0).map((_, i) => ({
      month: new Date(0, i).toLocaleString("default", { month: "short" }),
      bookings: 0,
    }));

    bookings.forEach(b => {
      const monthIndex = new Date(b.pickupDate).getMonth();
      stats[monthIndex].bookings += 1;
    });

    res.json({ success: true, stats });
  } catch (err) {
    console.error("Error fetching stats:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
}

export const ownerBooking = async (req, res) => {
  try {
    const ownerId = req.user._id;

    const bookings = await Booking.find({ owner: ownerId })
      .populate("car", "brand model") // get vehicle info
      .populate("user", "name email "); // get user info

    const stats = Array(12).fill(0).map((_, i) => ({
      month: new Date(0, i).toLocaleString("default", { month: "short" }),
      bookings: 0,
      revenue: 0,
    }));

    bookings.forEach(b => {
      const monthIndex = new Date(b.pickupDate).getMonth();
      stats[monthIndex].bookings += 1;
      stats[monthIndex].revenue += b.price;
    });

    res.json({ success: true, stats, bookings });
  } catch (err) {
    console.error("Error fetching owner stats:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
}