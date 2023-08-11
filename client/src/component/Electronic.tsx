import React from 'react'
import { Link } from 'react-router-dom'
import { AsideLeft } from './AsideLeft'
function Electronic() {
    const [musicData, setMusicData] = React.useState<any[]>()

    React.useEffect(() => {
        async function fetchData(){
            try {
                const response = await fetch(`https://discoveryprovider.audius.co/v1/tracks/trending?app_name=drejmusicapp`, {
                    method: 'GET',
                })
                const data = await response.json()
                console.log(data)
            } catch (error) {
                console.log(error)
            }
        }

        fetchData()
    })
  return (
    <div className='flex'>
      <AsideLeft />
      <main className='container'>
        <header className='flex'>
            <div>
                <h1 className='trending-h1'>Trending</h1>
            </div>
                <ul className='flex justify-center items-center'>
                    <li className='trending-li'>
                        <Link to='/dashboard' > All Genres</Link>
                    </li>
                    <li className='selected-li trending-li'>
                        <Link to='/electronic'>Electronic</Link>
                    </li>
                    <li className='trending-li'>
                        <Link to='/hiphoprap'>HipHop-Rap</Link>
                    </li>
                    <li className='trending-li'>
                        <Link to='alternative'>Alternative</Link>
                    </li>
                </ul>
        </header>
      </main>
    </div>
  )
}

export default Electronic
