import React from 'react'
import { Link } from 'react-router-dom'
import { AsideLeft } from './AsideLeft'
function Alternative() {
  return (
    <div className='flex'>
      <AsideLeft />
      <main className='container m-15'>
        <header className='flex justify-between '>
            <div>
                <h1 className='h1-trending text-purple-700'>Trending</h1>
            </div>
                <ul className='flex justify-center items-center'>
                    <li className=' trending-li'>
                        <Link to='/dashboard' > All Genres</Link>
                    </li>
                    <li className=' trending-li'>
                        <Link to='/electronic'>Electronic</Link>
                    </li>
                    <li className='trending-li'>
                        <Link to='/hiphoprap'>HipHop-Rap</Link>
                    </li>
                    <li className='selected-li trending-li'>
                        <Link to='/alternative'>Alternative</Link>
                    </li>
                </ul>
        </header>
      </main>
    </div>
  )
}

export default Alternative
