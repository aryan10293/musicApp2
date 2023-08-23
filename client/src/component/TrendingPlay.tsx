import React from 'react'
import { AsideLeft } from './AsideLeft'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faRetweet, faShare } from '@fortawesome/free-solid-svg-icons';
function TrendingPlay() {
    const [data,setData] = React.useState<any[]>()
    const [isActive, setIsActive] = React.useState<boolean>(false)
    const handleMouseOver = () => {
        setIsActive(true);
        
    };

    const handleMouseOut = () => {
        setIsActive(false);
    };
    React.useEffect(() => {
        const fetchData = async () => {
           try {
                const response = await fetch(`https://blockchange-audius-discovery-01.bdnodes.net/v1/playlists/trending?app_name=EXAMPLEAPP`, {
                    method: 'GET',

                });

                if(response.ok){
                    const data = await response.json()
                    console.log(data)
                }
            } catch (error) {
                console.error(error) 
            }
        }
        fetchData()
    })
    const trendingStyle = {
        boxShadow: 'rgba(87, 170, 255, 0.35) 0px 2px 8px -2px',
        background: 'linear-gradient(315deg, rgb(87, 171, 255) 0%, rgb(205, 152, 255) 100%)',
    };
    let trendingplay = true
    const widthStyle = trendingplay ? 'width-style' : null
    // tghe onlyn thing im doing here is adding the className conditional im talkigfn about the li

    // make a simple component to accept the first 5 of the playlist
  return (
    <div className='flex'>
        <AsideLeft />
        <div className=' mt-5 w-full '>
            <header className=' header pl-8'>
                <div className='header-div '>
                    <h1 className='h1-trending text-purple-700 text-left'>Trending Playlist</h1>
                </div>
            </header>
            <main className='youdont section-track '>
                <div className='flex justify-between idkidk banner'>
                    <div>{'$Audio Rewards'.toLocaleUpperCase()}</div>
                    <div>{'Top Five Playlist Each Week Win $Audio'.toLocaleUpperCase()}</div>
                    <div>LEARN MORE -&gt;</div>
                </div>
                <li className={`li-track ${widthStyle}`}>
                    <div>
                        <div className='playlist'>
                            <div className='artwork-li'>
                                <div className='idkwhattocallthisdiv'>
                                    <img src={'props.artwork'} alt="idk what im doing" />
                                </div>
                            </div>
                            <div className="maintrackcontent">
                                <div className="timeofsong">    
                                    <p>{'props.timeOfSong'}</p>
                                </div>
                                <div className='titleofsong'>
                                    <Link to={'/props.artistLink'}>{'thegoat'}</Link>
                                </div>   
                                <div className='artistofsong'>
                                    <Link to={'props.artistLink'}>{'lebron'}</Link>
                                </div>
                                <div className='dataofsong'>
                                <>
                                    <div >
                                        <div className='heartreposticon'><span> <FontAwesomeIcon icon={faRetweet} />   {123} Repost</span></div>
                                        {' '}
                                        <div className='heartreposticon'><span> <FontAwesomeIcon icon={faHeart} />   {123} Favorites </span></div>
                                    </div>
                                    <div>
                                        <p>{123} Plays</p>
                                    </div>
                                </>
                                </div>   
                                <div className='line'></div>   
                                <div className='activtybuttons'>
                                    <FontAwesomeIcon icon={faRetweet}  className='icons'/>
                                    {true ? (
                                        <FontAwesomeIcon icon={faHeart}  data-id={123} className='icons liked'/>
                                    ) : (
                                    <FontAwesomeIcon icon={faHeart}   className='icons'/>
                                    )}
                                    <FontAwesomeIcon icon={faShare} className='icons'/>
                                </div>   

                                <div>
                                    <div className='playlist-track flex justify-between '
                                    onMouseOver={handleMouseOver}
                                    onMouseOut={handleMouseOut}
                                    >
                                        <div className='number'>1 <span>lebron james<span> by travis scott</span></span></div>
                                        <div className='playlist-track-time'>4:23</div>
                                    </div>
                                </div>                                                 
                            </div>
                        </div>
                    </div>
                </li>
            </main>
        </div>
    </div>
  )
}

export default TrendingPlay
//https://blockchange-audius-discovery-01.bdnodes.net/v1/playlists/MY00Y3j/tracks?app_name=EXAMPLEAPP