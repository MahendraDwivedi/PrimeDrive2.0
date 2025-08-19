import React, { useEffect, useState } from "react";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import toast from "react-hot-toast";
import { useAppContext } from "../context/AppContext";


const Card = ({ children, className }) => (
  <div className={`bg-white rounded-2xl shadow-md ${className}`}>{children}</div>
);
const CardContent = ({ children, className }) => (
  <div className={`p-4 ${className}`}>{children}</div>
);

const StatsChart = () => {
  const { isOwner, axios ,isDark } = useAppContext();
  const [stats, setStats] = useState([]);

  const fetchStats = async () => {
    try {
      const { data } = await axios.get(isOwner ? "/api/stats/owner" : "/api/stats/overall");
      if (data.success) {
        setStats(data.stats);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchStats();
  }, [isOwner]);

  return (
    <div className={`w-full p-30 ${isDark ? 'bg-dark text-light' : 'bg-light text-dark'}`}>
      <Card className="shadow-lg rounded-2xl">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-4">
            {isOwner ? "Your Vehicles - Monthly Bookings & Revenue" : "Overall Monthly Bookings"}
          </h2>

          <ResponsiveContainer width="100%" height={350}>
            {isOwner ? (
              <LineChart data={stats}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="bookings" stroke="#3b82f6" strokeWidth={2} />
                <Line type="monotone" dataKey="revenue" stroke="#22c55e" strokeWidth={2} />
              </LineChart>
            ) : (
              <BarChart data={stats}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="bookings" fill="#3b82f6" radius={[8, 8, 0, 0]} />
              </BarChart>
            )}
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatsChart;
