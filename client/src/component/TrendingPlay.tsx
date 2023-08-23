import React from 'react'
import { AsideLeft } from './AsideLeft'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faRetweet, faShare } from '@fortawesome/free-solid-svg-icons';
import PlaylistTrack from './PlaylistTrack';
import { FaCrown } from 'react-icons/fa';
function TrendingPlay() {
    const [data,setData] = React.useState<any[]>()
    const [playlist, setPlaylist] = React.useState<any[]>()
    
    React.useEffect(() => {
        const fetchData = async () => {
           try {
                const response = await fetch(`https://blockchange-audius-discovery-01.bdnodes.net/v1/playlists/trending?app_name=EXAMPLEAPP`, {
                    method: 'GET',

                });

                if(response.ok){
                    const data = await response.json()
                    setData(data.data)
                }
            } catch (error) {
                console.error(error) 
            }
        }
        fetchData()
    }, [])
    // React.useEffect(() => {
    //     const fetchData = async () => {
    //        try {
    //             const response = await fetch(`https://blockchange-audius-discovery-01.bdnodes.net/v1/playlists/DOPRl?app_name=EXAMPLEAPP`, {
    //                 method: 'GET',

    //             });

    //             if(response.ok){
    //                 const data = await response.json()
    //                 setData(data.data[0])
    //             }
    //         } catch (error) {
    //             console.error(error) 
    //         }
    //     }
    //     fetchData()
    // }, [])
    const trendingStyle = {
        boxShadow: 'rgba(87, 170, 255, 0.35) 0px 2px 8px -2px',
        background: 'linear-gradient(315deg, rgb(87, 171, 255) 0%, rgb(205, 152, 255) 100%)',
    };
    let trendingplay = true
    const widthStyle = trendingplay ? 'width-style' : null
    // tghe onlyn thing im doing here is adding the className conditional im talkigfn about the li

    // make a simple component to accept the first 5 of the playlist
    if(data){
        console.log(data[0].id)
    }
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
                        {/* {you have to add a boolen to the p} */}
                        <div className='lebronjames flex-col'>
                            <div className='flex'>
                                <div className='numberDiv flex flex-col'> 
                                    <FaCrown /> 
                                    1
                                </div>
                                <div className='artwork-li'>
                                    <div className='idkwhattocallthisdiv'>
                                        <img src={'https://tse2.mm.bing.net/th?id=OIP.X3OaS2xgmh60owB5jw2HhwHaGL&pid=Api&P=0&h=220'} alt="idk what im doing" />
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
                                </div>    
                            </div> 
                            <ol>

                            </ol>                                                    
                        </div>
                        <div>
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

