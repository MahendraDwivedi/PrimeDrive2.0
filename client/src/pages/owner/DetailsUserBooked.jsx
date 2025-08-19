import React, { useEffect, useState } from "react";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const DetailsUserBooked = () => {
  const { axios } = useAppContext();
  const [bookings, setBookings] = useState([]);

  const fetchBookings = async () => {
    try {
      const { data } = await axios.get("/api/owner/clientDetails");
      if (data.success) setBookings(data.bookings);
      else toast.error(data.message);
    } catch (err) {
      toast.error(err.message);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <div className="px-4 pt-10 md:px-10 w-full">
      <h2 className="text-xl font-semibold mb-6">Manage Bookings</h2>
      <div className="rounded-md overflow-hidden border border-gray-200">
        <table className="w-full border-collapse text-left text-sm text-gray-600">
          <thead className="text-gray-500 bg-gray-50">
            <tr>
              <th className="p-3">Vehicle</th>
              <th className="p-3">User</th>
              <th className="p-3">Contact</th>
              <th className="p-3">Booking Dates</th>
              <th className="p-3">Price</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b, i) => (
              <tr key={i} className="border-t">
                <td className="p-3">{b.car?.brand} {b.car?.model}</td>
                <td className="p-3">{b.user?.name}</td>
                <td className="p-3">{b.user?.email}<br />{b.user?.phone}</td>
                <td className="p-3">
                  {new Date(b.pickupDate).toLocaleDateString()} - {new Date(b.returnDate).toLocaleDateString()}
                </td>
                <td className="p-3">${b.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DetailsUserBooked;
