import Sidebar from '@/components/ui/custom/Sidebar'
import React from 'react'

function AiRelated() {
  return (
    <div className='flex'>
      <Sidebar />
      <div className='flex flex-col items-center mx-44 gap-9'>
        <h1
          className='font-bold text-[60px] text-center mt-28'
        >
          Nothing to show here for the moment...<br /><span className='text-[#f56551]'>AI is working</span>
        </h1>
        <p
          className='text-2xl text-gray-700 text-center'
        >
          AI predictions will be shown here after creating bills for some time. Thank You. 
        </p>
        <h1
          className='font-bold text-[60px] text-center mt-5 text-[#f56551]'
        >
          Happy Billing !
        </h1>
      </div>
    </div>
  )
}

export default AiRelated