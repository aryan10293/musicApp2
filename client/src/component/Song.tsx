import React from 'react'
import { AsideLeft } from './AsideLeft'
import { useParams } from 'react-router-dom';
import { FaMusic, FaRetweet } from 'react-icons/fa';
import { MdAlbum } from 'react-icons/md';
import {  faRetweet } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';
import Track from './Track';
import { FaPlay } from 'react-icons/fa';
function Song() {
  const  id  = useParams().id;
  const [userData, setUserData] = React.useState<any>({})
  const [likes, setLikes] = React.useState<string[]>([])
  const [usertTracks, setUserTracks] = React.useState<any>([])
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

   const containerStyle = {

    backgroundImage: userData.artwork && userData.artwork['480x480'] ? `url(${userData.artwork['480x480']})` : `url(${'https://tse1.mm.bing.net/th?id=OIP.tsjL8meOsr0Inbkr9zi_yQHaFe&pid=Api&rs=1&c=1&qlt=95&w=151&h=111'})`,
    color: 'white',
    /* Other styles can go here */
  };
  if(userData) console.log(userData)
  return (
    <div className='flex'>
       <AsideLeft />
       <div className='max-h-[100vh] overflow-y-auto'>
            <div className='artist-img' style={containerStyle}></div>
            <div className=' songdiv '>
                <div className='future'>
                    <img src={userData.artwork && userData.artwork['150x150'] ? userData.artwork['150x150'] : 'https://tse1.mm.bing.net/th?id=OIP.tsjL8meOsr0Inbkr9zi_yQHaFe&pid=Api&rs=1&c=1&qlt=95&w=151&h=111'} className='songImage' alt="idk" />
                </div>
                <div className='future'>
                    <h3>TRACK</h3>
                    <h1>{userData ? userData.title : null}</h1>
                    <h3>By <Link to='idkyetleavemealone'>{userData ? userData.user.name : null}</Link></h3>
                    <div className='playbtn'>
                        <FaPlay className='inline-block' color='white'/>
                        {' '}
                        Play
                    </div>
                    {/* <h3>{userData ? userData.play_count.toLocaleString() : null}</h3> */}
                </div>
            </div>
             <main className='song-artist-content'>
                {usertTracks && usertTracks !== null ? (
                        // keep trying to get the time from each playlist
                        usertTracks.map((song:any, i:number): JSX.Element => {
                            let repost;
                            let favorites;
                            let plays;
                            const seconds = song.item.duration;
                            const minutes = Math.floor(seconds / 60);
                            const remainingSeconds = seconds % 60;

                            const formattedTime = `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
                            if(i === 5){
                                console.log(song)
                            }
                            if(song['repost_count'] <= 999){
                                repost = song.item['repost_count']
                            } else{
                                repost = `${(song.item['repost_count'] / 1000).toFixed(2)}K`
                            }

                            if(song['favorite_count'] <= 999){
                                favorites = song.item['favorite_count']
                            } else{
                                favorites = `${(song.item['favorite_count'] / 1000).toFixed(1)}K`
                            }  

                            if(song['play'] <= 999){
                                plays = song.item['play_count']
                            } else{
                                plays = `${(song.item['play_count'] / 1000).toFixed(1)}K`
                            }
                            return <Track
                                likes={likes}
                                id={song.id}
                                number={i + 1}
                                crown={false}
                                artwork={song.item.artwork["150x150"]}
                                timeOfSong={formattedTime}
                                artistofsong={song.item.user.name}
                                artistLink={song.item.permalink}
                                repostCount={repost}
                                favoriteCount={favorites}
                                plays={plays}
                                artistId = {song.item.user.id}
                                title={song.item.title} />;
                        })
                    )  :  <div>loading...</div>}
                    
            </main>
        </div>
    </div>
  )
}

export default Song 