import React from 'react'
import { assets } from '../../assets/assets'
import { Link } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import {motion} from 'motion/react'
const NavBarOwner = () => {

  const {user} = useAppContext()
  return (
    <div className='flex items-center justify-between px-6 md:px-10 py-4 text-gray-500 border-b border-borderColor relative transition-all'>
        <Link to="/">
        <motion.h1 whileHover={{ scale: 1.05 }} className="font-semibold text-2xl bg-gradient-to-r from-indigo-500 via-purple-800 to-pink-700 bg-clip-text text-transparent italic">
          PRIMEDRIVE
        </motion.h1>
      </Link>
        <p>Welcome , {user?.name || "Owner"}</p>
    </div>
  )
}

export default NavBarOwner