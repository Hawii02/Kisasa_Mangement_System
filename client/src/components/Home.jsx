import React from 'react'
import Footer from './Footer'

function Home() {
  return (
    <div className='grid grid-cols-2 gap-4 items-center w-full '>
      <div className='flex flex-col h-screen w-full d rounded-lg items-center '>
        <div className='flex flex-col mb-[30px] mt-[90px]  items-center justify-center w-full text-5xl font-bold'>
        <h1 className='text-center'> Banking made</h1>
        <h1 className='text-center'> Easy, aytime</h1>
        <h1 className='text-center text-[#f59e0b] hover:text-inherit'> Every Time</h1>
        </div>
        <div className=' w-full flex  items-center justify-center '>
          <p className='text-center text-sm items-center w-full'>
            "Empowering your financial journey<br /> with personalized solutions and expert guidance.<br/>
             Securely managing your money while helping you achieve your goals. "</p>
        </div>
        <div className='flex w-full h-screen  gap-11 items-center justify-center'>
          <button className='text-white bg-[#022c22] p-3 w-[130px] rounded-full font-bold hover:bg-[#f59e0b] hover:text-inherit'>Learn more</button>
          <button className='text-inherit bg-[#f59e0b] p-3 w-[130px] rounded-full font-bold hover:bg-[#022c22] hover:text-white'>Dashboard</button>
        </div>
       
      </div>

      <div className='flex h-full custom_bg_home  rounded-lg items-center justify-center'>
        <h1 className=' w-full h-full '></h1>
      </div>
      <div className='col-span-2'>
      <Footer />
      </div>
    </div>
  )
}

export default Home