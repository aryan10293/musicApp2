import React from 'react'
import { AsideLeft } from './AsideLeft'
import { Link } from 'react-router-dom';
import Track from './Track';
function Dashboard() {
    const [data, setData] = React.useState<any>()
    React.useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(`https://discoveryprovider.audius.co/v1/tracks/trending?time=${'allTime'}`, {
                    method: 'GET',
                });

                if (!response.ok) {
                    throw new Error(`Network response was not ok: ${response.status} ${response.statusText}`);
                }

                const data = await response.json();
                setData([...data.data])
            } catch (error) {
                console.error('Fetch error:', error);
            }
        }
        fetchData()

    }, []);
    const handleClick = async (e:any) => {
         let time  = e.target.innerHTML
        console.log(time)
        if(time === 'This week'){
            time = 'week'
        } else if(time === 'This month'){
            time = 'month'
        } else if(time === 'All time') {
            time = 'allTime'
        }
        try {
            const response = await fetch(`https://discoveryprovider.audius.co/v1/tracks/trending?time=${time}`, {
                method: 'GET',
            });

            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();
            alert(`displaying ${time}`)
            setData([...data.data])
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
    if (data) {
    console.log(data[0]);
}
  return (
    <div className='flex'>
      <AsideLeft />
      <main className='container m-15'>
        <div className='fixed main-div'>
            <header className='flex justify-between header'>
                <div className='header-div'>
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
                <ul className='flex section-ul'>
                    <div className='selected-lol '></div>
                    <li className='time-li' onClick={handleClick}><div className='time-div selected-time' style={myStyle}><div>This week</div></div></li>
                    <li className='time-li' onClick={handleClick}><div className='time-div'><div>This month</div></div></li>
                    <li className='time-li' onClick={handleClick}><div className='time-div'>All time</div></li>
                </ul>
            </section>           
        </div>
        <div className='icant'></div>
        <section className='youdont section-track '> 
            <div className='flex justify-between idkidk banner'>
                <div>$Audio Rewards</div>
                <div>Top Five Tracks Each Week Win $Audio</div>
                <div>LEARN MORE -&gt;</div>
            </div>
            <ol>
                {data && data !== null ? (
                    data.map((song:any, i:number ): JSX.Element => {
                        //a bunch of if statements abouta go here

                        return (
                            <Track 
                            number={i + 1}
                            artwork={song.artwork["150x150"]}
                            timeOfSong={`${Math.floor(song.duration/60)}:${song.duration%60}`}
                            artistofsong={song.user.handle}
                            artistLink={song.permalink}
                            repostCount={(song['repost_count'] / 1000).toFixed(2)}
                            favoriteCount={(song['favorite_count'] / 1000).toFixed(1)}
                            plays={(song['play_count'] / 1000).toFixed(1)}
                            title={song.title}
                            />                         
                        )
                    })
                ): <div>loading...</div>}
            </ol>
      </section>
      </main>
    </div>
  )
}

export default Dashboard
// const seconds = 350; // Replace this with the number of seconds you have
// const minutes = Math.floor(seconds / 60); // Get the whole minutes
// const remainingSeconds = seconds % 60