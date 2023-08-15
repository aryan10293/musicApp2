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

    }, []);

    const handleClick = async (e:any) => {
        let timePeriod = e.target.innerHTML
        console.log(timePeriod)
        if(timePeriod === 'This week'){
            timePeriod = 'week'
        } else if(timePeriod === 'This month'){
            timePeriod = 'month'
        } else if(timePeriod === 'All time') {
            timePeriod = 'allTime'
        } else if(timePeriod === 'This year') {
            timePeriod = 'year'
        }
        try {
            const response = await fetch(`https://discoveryprovider.audius.co/v1/tracks/trending?time=${timePeriod}`, {
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
    const myStyle = {
        top: '161px',
        left: '76px',
        width: '110px',
        transform: 'scale(1, 1)',
    };
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
                <div className='selected-lol '></div>
                <li className='time-li' onClick={handleClick}><div className='time-div selected-time' style={myStyle}><div>This week</div></div></li>
                <li className='time-li' onClick={handleClick}><div className='time-div'><div>This month</div></div></li>
                <li className='time-li' onClick={handleClick}><div className='time-div'>All time</div></li>
            </ul>
        </section>
      </main>
    </div>
  )
}

export default Dashboard
