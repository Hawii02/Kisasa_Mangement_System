import React from 'react'

function Footer() {
  return (
    <div className='w-full h-[200px] lg:rounded-lg text-sm bg-[#022c22] text-white flex flex-col items-center justify-center'>
        <div className='flex items-center lg:mb-3 flex-col w-full'>
            <p>
                <span className='text-[#f59e0b]'>&copy; 2014</span> Kisasa ManagementCo. All rights reserved.
            </p>
            <p>Terms of Service | Privacy Policy</p>
        </div>
        <div>
      <p>Contact Us: support@yourbank.com</p>
    </div>
    </div>
  )
}

export default Footer