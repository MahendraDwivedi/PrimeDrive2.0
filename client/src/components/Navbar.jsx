import React, { useState } from 'react'
import { assets, menuLinks } from '../assets/assets'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { motion } from 'motion/react'
import { Sun, Moon } from 'lucide-react';


const Navbar = () => {

    const { setShowLogin, user, logout, isOwner, axios, setIsOwner, isDark, setIsDark } = useAppContext()

    const location = useLocation()
    const [open, setOpen] = useState(false);
    const navigate = useNavigate()

    const changeRole = async () => {
        try {
            const { data } = await axios.post('/api/owner/change-role')
            if (data.success) {
                setIsOwner(true)
                toast.success(data.message)
            }
            else {
                toast.error(error.message)
            }
        } catch (error) {
            console.log(error.message);

        }
    }


    return (
        <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className={`top-0 sticky left-0 z-10 flex items-center justify-between px-6 h-20 md:px-16 lg:px-24 xl:px-32 py-4 text-primary border-b border-borderColor relative transition-all ${location.pathname === "/" ? "bg-black/90" : "bg-white"}`}>
            <Link to="/">
                <motion.h1 whileHover={{ scale: 1.05 }} alt="logo" className={`font-semibold text-3xl bg-gradient-to-r from-indigo-500 via-purple-800 to-pink-700 bg-clip-text text-transparent italic`} >PRIMEDRIVE</motion.h1>
            </Link>

            <div className={`max-sm:fixed max-sm:h-screen max-sm:w-full max-sm:top-16 max-sm:border-t border-borderColor right-0 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8 max-sm:p-4 transition-all duration-300 z-50 ${location.pathname === "/" ? "" : "bg-white"} ${open ? "max-sm:translate-x-0" : "max-sm:translate-x-full"}`}>
                {menuLinks.map((link, index) => (
                    <Link key={index} to={link.path}>
                        <motion.p whileHover={{ scale: 1.1 }}> {link.name}</motion.p>

                    </Link>
                ))}


                <div className='flex max-sm:flex-col items-start sm:items-center gap-6'>
                    <motion.button whileHover={{ scale: 1.08 }} onClick={() => isOwner ? navigate('/owner') : changeRole()} className='cursor-pointer'>{isOwner ? 'Dashboard' : 'List cars'}</motion.button>
                    <button onClick={() => { user ? logout() : setShowLogin(true) }} className='cursor-pointer px-8 py-2 bg-primary hover:bg-primary-dull transition-all text-white rounded-lg'>{user ? 'Logout' : 'Login'}</button>
                    {location.pathname === "/" && <button className='hidden md:block' onClick={() => setIsDark(!isDark)}>{!isDark ? <Moon className="text-yellow-300" /> : <Sun className="text-orange-500" />}
                    </button>}
                </div>
            </div>

            <div className='flex'>
                {location.pathname === "/" && <button onClick={() => setIsDark(!isDark)}>{!isDark ? <Moon className="text-yellow-300  sm:hidden cursor-pointer m-2" /> : <Sun className="text-orange-300 m-2 sm:hidden cursor-pointer" />}
                </button>}
                <button className='sm:hidden cursor-pointer' aria-label="Menu" onClick={() => setOpen(!open)}>
                    <img src={open ? assets.close_icon : assets.menu_icon} alt="" />
                </button>
            </div>

        </motion.div>
    )
}

export default Navbar