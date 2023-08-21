import React from 'react'
import { AsideLeft } from './AsideLeft'
function Explore() {
  return (
    <div className='flex'>
        <AsideLeft />
        <div className=' mt-5 w-full '>
            <header className=' header pl-8'>
                <div className='header-div '>
                    <h1 className='h1-trending text-purple-700 text-left'>Explore</h1>
                </div>
            </header>
            <main className='youdont section-track '>
                <section className='bg-white-700 w-full explore-section'>
                    <h2 className='h1-trending text-purple-700 text-left w-full' style={{ fontSize: '28px' }}>Just For You</h2>
                </section>
            </main>
        </div>
    </div>
  )
}

export default Explore
