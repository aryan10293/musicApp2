import React from 'react'
import { AsideLeft } from './AsideLeft'
import { Link } from 'react-router-dom';
import { FaCrown } from 'react-icons/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRetweet, faShare } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FaShare } from 'react-icons/fa';
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
    if (data) {
    console.log(data[0]);
}
  return (
    <div className='flex'>
      <AsideLeft />
      <main className='container m-15'>
        <div className='fixed'>
            <header className='flex justify-between header'>
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
        </div>
        <div className='icant'></div>
        <section className='youdont section-track '> 
            <div className='flex justify-between idkidk banner'>
                <div>$Audio Rewards</div>
                <div>Top Five Tracks Each Week Win $Audio</div>
                <div>LEARN MORE -&gt;</div>
            </div>

            <ol>
                <li className='li-track'>
                    <div>
                        <div className='playlist'>
                            <div className='numberDiv flex flex-col'> 
                                <FaCrown />
                                1
                            </div>
                            <div className='artwork-li'>
                                <div className='idkwhattocallthisdiv'>
                                    { data ? (
                                        <img src={data[0].artwork['150x150']} alt="idk what im doing" />
                                    ) : null }
                                </div>
                            </div>
                            <div className="maintrackcontent">
                                <div className="timeofsong">    
                                    {data ? (
                                        <p>{Math.floor(data[0].duration/60)}:{data[0].duration%60}</p>
                                    ) : null}
                                </div>
                                <div className='titleofsong'>
                                    {data ? (
                                        <Link to={data[0].permalink}>{data[0].title}</Link>
                                    ) : null}
                                </div>   
                                <div className='artistofsong'>
                                    {data ? (
                                        <Link to={data[0].permalink}>{data[0].user.handle}</Link>
                                    ) : null}
                                </div>
                                <div className='dataofsong'>
                                    {data ? (
                                        <>
                                            <div >
                                                <div className='heartreposticon'><span> <FontAwesomeIcon icon={faRetweet} />   {(data[0]['repost_count'] / 1000).toFixed(2)}K Repost </span></div>
                                                {' '}
                                                <div className='heartreposticon'><span> <FontAwesomeIcon icon={faHeart} />   {(data[0]['favorite_count'] / 1000).toFixed(1)}K Favorites </span></div>
                                            </div>
                                            <div>
                                                <p>{(data[0]['play_count'] / 1000).toFixed(1)}K Plays</p>
                                            </div>
                                        </>
                                    ) : null}
                                </div>   
                                <div className='line'></div>   
                                <div className='activtybuttons'>
                                    <FontAwesomeIcon icon={faRetweet}  className='icons'/>
                                    <FontAwesomeIcon icon={faHeart} className='icons'/>
                                    <FontAwesomeIcon icon={faShare} className='icons'/>
                                </div>                                                        
                            </div>
                        </div>
                    </div>
                </li>
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