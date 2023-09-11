import React from 'react'
import { AsideLeft } from './AsideLeft'
import { useParams } from 'react-router-dom';
import { FaMusic, FaRetweet } from 'react-icons/fa';
import { MdAlbum } from 'react-icons/md';
import {  faHeart, faRetweet, faShare } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';
import Track from './Track';
import { FaPlay } from 'react-icons/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
function Song() {
  const  id  = useParams().id;
  const [userData, setUserData] = React.useState<any>({})
  const [likes, setLikes] = React.useState<string[]>([])
  const [usertTracks, setUserTracks] = React.useState<any>([])
  //https://audius-discovery-8.cultur3stake.com/v1/users/nlGNe/tracks?app_name=EXAMPLEAPP
  React.useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`https://audius-discovery-8.cultur3stake.com/v1/tracks/${id}?app_name=EXAMPLEAPP`, {
        method: 'GET'
      })

      if(response.ok){
        const data = await response.json()
        setUserData(data.data)
      }
    }
    fetchData()
  }, [])

  React.useEffect(() => {
    const fetchData = async () => {
        const response = await fetch(`https://audius-discovery-8.cultur3stake.com/v1/users/${userData.user.id}/tracks?app_name=EXAMPLEAPP`, {
            method: 'GET'
        })

        if(response.ok){
            const data = await response.json()
            setUserTracks(data.data)
        }
    }
    if(Object.keys(userData).length !== 0) fetchData()
  }, [userData])

   const containerStyle = {

    backgroundImage: userData.artwork && userData.artwork['480x480'] ? `url(${userData.artwork['480x480']})` : `url(${'https://tse1.mm.bing.net/th?id=OIP.tsjL8meOsr0Inbkr9zi_yQHaFe&pid=Api&rs=1&c=1&qlt=95&w=151&h=111'})`,
    color: 'white',
    /* Other styles can go here */
  };
  function formatSecondsToTime(seconds: number) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const formattedTime = `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    return formattedTime;
  }

  function relaseDateFormat(date:string){
    let releaseDate = new Date(date)
    let numberOfMonth = releaseDate.getMonth() + 1
    let dayOfMonth = releaseDate.getDate()
    let year = releaseDate.getFullYear().toString()
    return `${numberOfMonth}/${dayOfMonth}/${year.slice(2)}`
  }
  if(userData) console.log(userData)
  return (
    <div className='flex'>
       <AsideLeft />
       <div className='max-h-[100vh] overflow-auto '>
            <div className='artist-img' style={containerStyle}></div>
            <div className=' songdiv '>
                <div className='flex'>
                    <div className='future future-img'>
                    {/* fix this width of the img div */}
                    <img src={userData.artwork && userData.artwork['150x150'] ? userData.artwork['150x150'] : 'https://tse1.mm.bing.net/th?id=OIP.tsjL8meOsr0Inbkr9zi_yQHaFe&pid=Api&rs=1&c=1&qlt=95&w=151&h=111'} className='songImage' alt="idk" />
                </div>
                <div className='future'>
                    <h3>TRACK</h3>
                    <h1 className='song-title'>{userData ? userData.title : null}</h1>
                    <h3 className='song-artist'>By <Link to={`/artist/${Object.keys(userData).length !== 0 ? userData.user.id : null}`}>{Object.keys(userData).length !== 0 ? userData.user.name : null}</Link></h3>
                    <div>
                        <div className='playbtn'>
                            <FaPlay className='inline-block' color='white'/>
                            {''}
                            Play  
                         </div>
                        <span className='stopthecount'>{' '}{Object.keys(userData).length !== 0 ? userData.play_count.toLocaleString() : null} Plays</span>
                    </div>
                    <div className='repostandlike flex'>
                        <div className='repost'>
                            <FontAwesomeIcon icon={faRetweet} />
                            {' '}
                            <span>{Object.keys(userData).length !== 0 ? userData['repost_count'] <= 999 ? `${userData['repost_count']} Repost` :`${(userData['repost_count'] / 1000).toFixed(2)}K Repost` : null}</span>
                        </div>
                        <div className='like'>
                           <FontAwesomeIcon icon={faHeart} />
                           {' '}
                            <span>{Object.keys(userData).length !== 0 ? userData['favorite_count'] <= 999 ? `${userData['favorite_count']} Favorites` :`${(userData['favorite_count'] / 1000).toFixed(2)}K Favortites` : null}</span> 
                        </div>
                    </div>
                    <div className='likerepostshare mt-8'>
                        <button>
                           <span><FontAwesomeIcon icon={faShare} /></span> Share
                        </button>
                         <button>
                           <span><FontAwesomeIcon icon={faRetweet} /></span> Repost
                        </button>
                         <button>
                           <span><FontAwesomeIcon icon={faHeart} /></span> Favorite
                        </button>
                    </div>
                    {/* <h3>{userData ? userData.play_count.toLocaleString() : null}</h3> */}
                </div>
                </div>
                <div className="song-line"></div>
                <div className='ugh-info'>
                    <div className='dontknowwhattocallthisone'>
                        <ul className='flex'>
                            <li className='mr-10'>
                                DURATION:{' '}{Object.keys(userData).length !== 0 ? formatSecondsToTime(userData.duration) : null}
                            </li>
                            <li className='mr-10'>
                                RELEASED: {' '}{Object.keys(userData).length !== 0 ? relaseDateFormat(userData.release_date) : null}
                            </li>
                            <li className='mr-10'>
                                GENRE:{' '}{Object.keys(userData).length !== 0 ? userData.genre : null}
                            </li>
                            <li className='mr-10'>
                                MOOD: {' '}{Object.keys(userData).length !== 0 ? userData.mood : null}
                            </li>
                        </ul>
                    </div>
                    <div className="songdescription">
                        <p>{Object.keys(userData).length !== 0 ? userData.description : null}</p>
                    </div>
                    <div className="songdownload">
                        <button>
                            <span><FontAwesomeIcon icon={faDownload} /></span> DOWNLOAD ORGINIAL
                        </button>
                        <button>
                            <span><FontAwesomeIcon icon={faDownload} /></span> {'Download Lead Vocals / A Capella'.toUpperCase()}
                        </button>
                    </div>
                </div>
            </div>
            {/* overflow-y-auto */}
             <main className='song-artist-content mt-20 '>

                <h2 >{`more by ${Object.keys(userData).length !== 0 ? userData.user.name : null}`.toLocaleUpperCase()}</h2>
                <ul className='listofsongs'>
                    {usertTracks && usertTracks !== null ? (
                        // keep trying to get the time from each playlist
                        usertTracks.slice(0,5).map((song:any, i:number): JSX.Element => {
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
                            return <Track
                                likes={likes}
                                id={song.id}
                                number={i + 1}
                                crown={false}
                                artwork={song.artwork["150x150"]}
                                timeOfSong={formattedTime}
                                artistofsong={song.user.name}
                                artistLink={song.permalink}
                                repostCount={repost}
                                favoriteCount={favorites}
                                plays={plays}
                                artistId = {song.user.id}
                                title={song.title} />;
                        })
                    )  :  <div>loading...</div>}
                </ul>
                    
            </main>
        </div>
    </div>
  )
}

export default Song 