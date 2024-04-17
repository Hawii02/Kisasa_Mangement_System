import React from 'react'
import Footer from './Footer'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className='flex flex-col   lg:grid lg:grid-cols-2 lg:gap-4 items-center w-full '>
      <div className='flex flex-col  md:h-full lg:h-screen w-full  rounded-lg items-center '>
        <div className='flex flex-col mb-[30px] mt-[30px] lg:mt-[90px]  items-center justify-center w-full text-3xl md:text-5xl font-bold'>
        <h1 className='text-center'> Banking made</h1>
        <h1 className='text-center'> Easy, anytime</h1>
        <h1 className='text-center text-[#f59e0b] hover:text-inherit'> Every Time</h1>
        </div>
        <div className=' w-full flex  items-center justify-center '>
          <p className='text-center text-sm items-center w-full'>
            "Empowering your financial journey<br /> with personalized solutions and expert guidance.<br/>
             Securely managing your money while helping you achieve your goals. "</p>
        </div>
        <div className='flex  f mb-4 h-full w-full lg:h-screen mt-5 lg:mt-6 gap-5 lg:gap-11 items-center justify-center'>
         <Link to="about" ><button className='text-white bg-[#022c22] p-1 md:p-3 w-[110px] md:w-[130px] rounded-full font-bold hover:bg-[#f59e0b] hover:text-inherit'>Learn more</button></Link> 
         <Link to="dashboard"> <button className='text-inherit bg-[#f59e0b]  p-1 md:p-3 w-[110px] md:w-[130px] rounded-full font-bold hover:bg-[#022c22] hover:text-white'>Dashboard</button></Link>
        </div>
       
      </div>

      <div className='flex w-full h-[300px] sm:h-[500px] md:h-[650px] lg:h-full custom_bg_home  lg:rounded-lg items-center lg:justify-center'>
       
      </div>
      <div className='w-full h-full lg:col-span-2'>
      <Footer />
      </div>
    </div>
  )
}

export default Home