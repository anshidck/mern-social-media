import React from 'react'

function Advertisment() {
  return (
    <div className="w-full flex flex-col bg-black text-white rounded p-3 px-6 gap-4">
        <h1 className='flex justify-between'>Sponsored <span className='text-gray-500'>create Ad</span></h1>
        <img className='h-[250px]' src="https://logos-download.com/wp-content/uploads/2016/03/Lays_logo.png" alt="img" />
        <p className='text-2xl font-bold'>Lay's</p>
        <p className='text-xs -mt-3'>Wherever celebrations and good times happen, the LAY'S® brand will be there just as it has been for more than 75 years. With flavors almost as rich as our history,
             we have a chip or crisp flavor guaranteed to bring a smile on your face.</p>
    </div>
  )
}

export default Advertisment