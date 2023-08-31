import React from 'react'
import { Link } from 'react-router-dom'
import { AsideLeft } from './AsideLeft'
import Track from './Track'
function Hiphop() {
    const [data, setData] = React.useState<any>()
    const [isActiveWeek, setIsActiveWeek] = React.useState<boolean>(false);
    const [isActiveMonth, setIsActiveMonth] = React.useState<boolean>(false);
    const [isActiveAllTime, setIsActiveAllTime] = React.useState<boolean>(true);
    const genre: boolean = false
    const isPlaylist: boolean = false
    const [likes, setLikes] = React.useState<string[]>([])
    React.useState(() => {
        const fetchData = async() => {
            try {
                const response = await fetch(`http://localhost:2014/checkuser/${localStorage.getItem('loginUser')}`, {
                    method: 'GET',
                    credentials: 'include',
                });

                if(response.ok){
                    const data = await response.json()
                    setLikes(data[0].likes)
                }
            } catch (error) {
                console.error(error) 
            }
        }

        fetchData()
    })
    React.useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(`https://discoveryprovider.audius.co/v1/tracks/trending?genre=${"Hip-Hop/Rap"}&time=${'allTime'}`, {
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
            setIsActiveWeek(true)
            setIsActiveMonth(false)
            setIsActiveAllTime(false)
        } else if(time === 'This month'){
            time = 'month'
            setIsActiveWeek(false)
            setIsActiveMonth(true)
            setIsActiveAllTime(false)
        } else if(time === 'All time') {
            time = 'allTime'
            setIsActiveWeek(false)
            setIsActiveMonth(false)
            setIsActiveAllTime(true)
        }
        try {
            const response = await fetch(`https://discoveryprovider.audius.co/v1/tracks/trending?genre=${"Hip-Hop/Rap"}&time=${time}`, {
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
    const myStyle = {
        top: '161px',
        left: '76px',
        width: '110px',
        transform: 'scale(1, 1)',
    };
    if (data) {
    console.log(data[0]);
}
const isWeekActive = isActiveWeek ? 'selected-time': null
const isMonthActive = isActiveMonth ? 'selected-time': null
const isAllTimeActive = isActiveAllTime ? 'selected-time': null
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
                        <li className='trending-li'>
                            <Link to='/dashboard' > All Genres</Link>
                        </li>
                        <li className='trending-li '>
                            <Link to='/electronic'>Electronic</Link>
                        </li>
                        <li className='trending-li selected-li'>
                            <Link to='/hiphoprap'>HipHop-Rap</Link>
                        </li>
                        <li className='trending-li'>
                            <Link to='/alternative'>Alternative</Link>
                        </li>
                    </ul>
            </header>
            <section className='time-container'>
                <ul className='flex section-ul'>
                    
                    <li className='time-li' onClick={handleClick}><div className={`time-div ${isWeekActive}`} style={myStyle}><div>This week</div></div></li>
                    <li className='time-li' onClick={handleClick}><div className={`time-div ${isMonthActive}`} ><div>This month</div></div></li>
                    <li className='time-li' onClick={handleClick}><div className={`time-div ${isAllTimeActive}`}>All time</div></li>
                </ul>
            </section>           
        </div>
        <div className='icant'></div>
        <section className='youdont section-track '> 
            {isActiveWeek && genre ? (
                <div className='flex justify-between idkidk banner'>
                    <div>$Audio Rewards</div>
                    <div>Top Five Tracks Each Week Win $Audio</div>
                    <div>LEARN MORE -&gt;</div>
                </div>               
            ) : null}
            <ol>
                {data && data !== null ? (
                    data.map((song:any, i:number ): JSX.Element => {
                        //a bunch of if statements abouta go here
                        let repost;
                        let favorites;
                        let plays;
                        const seconds = song.duration;
                        const minutes = Math.floor(seconds / 60);
                        const remainingSeconds = seconds % 60;

                        const formattedTime = `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
                        if(i === 5){
                            console.log(song)
                        }
                        if(song['repost_count'] <= 999){
                            repost = song['repost_count']
                        } else{
                            repost = `${(song['repost_count'] / 1000).toFixed(2)}K`
                        }

                        if(song['favorite_count'] <= 999){
                            favorites = song['favorite_count']
                        } else{
                            favorites = `${(song['favorite_count'] / 1000).toFixed(1)}K`
                        }  

                        if(song['play'] <= 999){
                            plays = song['play_count']
                        } else{
                            plays = `${(song['play_count'] / 1000).toFixed(1)}K`
                        } 
                        
                        let name = song.user.handle.split('').map((x:string) => x === '_' ? ' ': x).join('')
                        return (
                            <Track 
                                playlist={isPlaylist}
                                likes={likes}
                                id={song.id}
                                number={i + 1}
                                crown={isActiveWeek && genre ? true : false}
                                artwork={song.artwork["150x150"]}
                                timeOfSong={formattedTime}
                                artistofsong={name}
                                artistLink={song.permalink}
                                repostCount={repost}
                                favoriteCount={favorites}
                                plays={plays}
                                title={song.title}
                                artistId = {song.user.id}
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

export default Hiphop
