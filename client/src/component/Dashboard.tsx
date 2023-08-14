import React from 'react'
import { AsideLeft } from './AsideLeft'
import { Link } from 'react-router-dom';
function Dashboard() {
    const [data, setData] = React.useState<any>()

    React.useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(`https://discoveryprovider.audius.co/v1/tracks/trending?time=year`, {
                    method: 'GET',
                });

                if (!response.ok) {
                    throw new Error(`Network response was not ok: ${response.status} ${response.statusText}`);
                }

                const data = await response.json();
                console.log(data)
                setData(data)
            } catch (error) {
                console.error('Fetch error:', error);
            }
        }

        fetchData();
    }, []);

    const handleClick = (e:any) => {
        console.log(e.target.innerHTML)
    }
  return (
    <div className='flex'>
      <AsideLeft />
      <main className='container m-15'>
        <header className='flex justify-between '>
            <div>
                <h1 className='h1-trending text-purple-700'>Trending</h1>
            </div>
                <ul className='flex justify-center items-center'>
                    <li className='selected-li trending-li'>
                        <Link to='/dashboard' > All Genres</Link>
                    </li>
                    <li className='trending-li'>
                        <Link to='/electronic'>Electronic</Link>
                    </li>
                    <li className='trending-li'>
                        <Link to='/hiphoprap'>HipHop-Rap</Link>
                    </li>
                    <li className='trending-li'>
                        <Link to='/alternative'>Alternative</Link>
                    </li>
                </ul>
        </header>
        <section className='time-container'>
            <ul className='flex'>
                <li onClick={handleClick}>this week</li>
                <li onClick={handleClick}>this month</li>
                <li onClick={handleClick}>all time</li>
            </ul>
        </section>
      </main>
    </div>
  )
}

export default Dashboard
