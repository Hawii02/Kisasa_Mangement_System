import React from 'react';
import { Link } from 'react-router-dom';
import LadyBossVideo from '../assets/lady_boss.mp4'; 

function About() {
  return (
    <div className='flex flex-col lg:grid grid-cols-2 w-full   lg:gap-4'>
        <div className='flex h-[300px] sm:h-[600px] md:h-[700px] lg:h-[550px]  lg:overflow-hidden w-full shadow-md lg:rounded-lg lg:mb-7 lg:mt-5'>
          <video className='w-full lg:h-full object-cover lg:rounded-lg' autoPlay muted loop>
            <source src={LadyBossVideo} type='video/mp4' />
          </video> 
        </div>
        <div className='flex flex-col items-center md:h-[400px] lg:h-[550px] w-full shadow-md rounded-lg lg:mb-3 lg:mt-3'>
          <div className='flex items-center lg:mb-5 lg:mt-12 p-5 lg:ml-5 justify-center w-full text-3xl font-bold'>
            <h1 className='text-center flex'>Learn About</h1> <h1 className='lg:ml-3 text-[#f59e0b]'>Us</h1> 
          </div>
          <div className='flex p-5 items-center w-full lg:h-screen  flex-col'>
            <p className='text-start font-bold'>
              Kisasa Software revolutionizes banking operations by offering a user-friendly, scalable solution for managing transaction data.
              With centralized oversight and real-time tracking, Kisasa empowers banks to efficiently handle growing volumes and adapt to evolving needs and technology.
            </p>
            <p className='text-start  mt-7 font-bold'>
              By mitigating risks associated with outdated systems, Kisasa ensures seamless service delivery and enables banks to stay ahead in the rapidly changing financial landscape.
            </p>
          </div>
          <div>
            <Link to="/">
              <button className='p-1 lg:p-3 w-[100px] mb-4 lg:w-[130px] flex items-center rounded-full bg-[#022c22]
              text-white hover:bg-[#f59e0b] hover:text-[#022c22] justify-center font-bold'>
                Home
              </button>
            </Link>
          </div>
        </div>
    </div>
  );
}

export default About;
