// import React from "react";
// import { assets } from "../assets/assets";
// import { Link } from "react-router-dom";

// const MainBanner = () => {
//   return (
//     <div className="w-full px-4 md:px-8 lg:px-16 mt-4">
//       <div className="relative overflow-hidden rounded-2xl shadow-md">
//         <img
//           src={assets.main_banner_bg}
//           alt="banner"
//           className="w-full hidden md:block object-cover"
//         />

//         <img
//           src={assets.main_banner_bg_sm}
//           alt="banner"
//           className="w-full md:hidden object-cover"
//         />

//         <div className="absolute  left-4 sm:left-6  sm:top-[70%] md:left-12 lg:left-20 transform -translate-y-1/2">
//           <h1 className="text-gray-800 text-lg sm:text-2xl md:text-4xl lg:text-5xl font-bold max-w-55 sm:max-w-md md:max-w-xl leading-snug">
//             Freshness you can Trust, Savings you’ll Love!
//           </h1>

//           <div className="flex mt-4 sm:mt-6">
//             <Link
//               to="/Products"
//               className="flex items-center gap-2 bg-primary text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full font-medium hover:bg-primary-dull transition text-sm sm:text-base"
//             >
//               Shop Now
//               <img
//                 src={assets.white_arrow_icon}
//                 alt="arrow"
//                 className="w-3 sm:w-4"
//               />
//             </Link>

//             <Link
//               to="/Products"
//               className="hidden sm:flex items-center gap-2 ml-4 bg-primary text-gray-800 px-6 py-3 rounded-full font-medium hover:bg-primary-dull transition"
//             >
//               Explore Deals
//               <img src={assets.black_arrow_icon} alt="arrow" className="w-4" />
//             </Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MainBanner;

import React from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'

const MainBanner = () => {
  return (
    <div className='relative' >
      <img src={assets.main_banner_bg} alt='banner' className='w-full hidden md:block '/>
      <img src={assets.main_banner_bg_sm} alt='banner' className='w-full  md:hidden '/>
    <div className='absolute inset-0 flex flex-col items-center md:items-start justify-end md:justify-center pb-24 md:pb-0 px-4 md:pl-18 lg:pl-24'>
        <h1 className='text-3xl md:text-4xl lg:text-5xl font-bold text-center md:text-left max-w-72 md:max-w-80 lg:md-w-105 leading-tight lg:leading-15 '>
          Freshness You can Trust, Savings You will Love!  
        </h1>
    

    <div className='flex items-center mt-6 font-medium'>
        <Link to={'/products'} className="group flex items-center gap-2 px-7 md:px-9 py-3 bg-primary hover:bg-primary-dull transition rounded text-white cursor-pointer">Shop now 
        <img src={assets.white_arrow_icon} alt="arrow" />
        </Link>
        <Link to={'/products'} className="group hidden md:flex items-center gap-2 px-9 py-3 cursor-pointer ">Explore deals 
        <img  className="transition group-hover:translate-x-1" src={assets.black_arrow_icon} alt="arrow" />
        </Link>

    </div>
    </div>
    </div>
  )
}

export default MainBanner