import React from 'react'
import { AsideLeft } from './AsideLeft'
import { FaCrown } from 'react-icons/fa'
function Explore() {
  const trendingStyle = {
    boxShadow: 'rgba(87, 170, 255, 0.35) 0px 2px 8px -2px',
    background: 'linear-gradient(315deg, rgb(87, 171, 255) 0%, rgb(205, 152, 255) 100%)',
  };
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
                    <div className='w-full text-left'>
                        <p className='text-grey-700'>Content curated for you based on your likes,reposts, and follows. Refreshes often so if you like a track, favorite it.</p>
                    </div>

                    <section className='trending-big-card card ' style={trendingStyle}>
                        <div>
                            <h2>Trending playlist</h2>
                            <p>The top playlist of Audius right now</p>
                        </div>
                        <div className='rewards'>
                            <p><FaCrown className='inline mt-auto mb-auto'/>$Audius Rewards</p>
                        </div>
                    </section>
                </section>

            </main>
        </div>
    </div>
  )
}

export default Explore