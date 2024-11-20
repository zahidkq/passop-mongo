import React from 'react'

const Navbar = () => {
  return (
    <div>
      <nav className='bg-slate-800 text-white'>
        <div className="mycontainer flex justify-between items-center px-4 h-14 py-5">

        <div className='logo font-bold text-2xl'>
            <span className='text-green-600'>&lt;</span>
            <span>Pass</span>
            <span className='text-green-600'>Op/&gt;</span>
        </div>
        {/* <ul>
            <li className='flex gap-4'>
                <a className='hover:font-bold' href="/">Home</a>
                <a className='hover:font-bold' href="#">About</a>
                <a className='hover:font-bold' href="#">Contact</a>
                <a className='hover:font-bold' href="#">Info</a>
            </li>
        </ul> */}
        <button className='bg-green-700 text-white flex justify-between items-center my-5 mx-2 rounded-full ring-white ring-1'>
          <img className='p-1 w-10 invert' src="/icons/github.svg" alt="github logo" />
          <span className='font-semibold px-2'>GitHub</span>
        </button>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
