import React from 'react'
import { Fragment } from 'react'
import { Link } from 'react-router-dom'
function PlaylistTrack(props: any) {
  return (
    <>
        <div className='playlist-track flex'>
        {false ? <img src={'https://tse2.mm.bing.net/th?id=OIP.X3OaS2xgmh60owB5jw2HhwHaGL&pid=Api&P=0&h=220'} alt="idk what im doing" className='empty-div bg-red-700'></img> : <span className='empty-div bg-white-700'></span>}
            <div className='flex justify-between playlist-song w-full'>
                <div className='number '>1 <span>lebron james<span> by travis scott</span></span></div>
                <div className='playlist-track-time mr-3 '>4:23</div>
            </div>
        </div>

        <Link to='/moretracks' className='more-tracks p-2'>4 More Tracks</Link>
    </>
  )
}

export default PlaylistTrack
