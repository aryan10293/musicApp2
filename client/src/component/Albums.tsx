import React from 'react'
import Track from './Track'
import { useParams } from 'react-router-dom';
import { AsideLeft } from './AsideLeft';
import { Link } from 'react-router-dom';
import { FaMusic } from 'react-icons/fa';
import { FaRetweet } from 'react-icons/fa';
import { MdAlbum } from 'react-icons/md';
function Albums() {
  const  id  = useParams().id;
  const [userData, setUserData] = React.useState<any>({})
  const [likes, setLikes] = React.useState<string[]>([])
  const [usertTracks, setUserTracks] = React.useState<any>([])
  React.useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`https://audius-metadata-2.figment.io/v1/users/${id}?app_name=EXAMPLEAPP`, {
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
      const response = await fetch(`https://audius-metadata-2.figment.io/v1/users/${id}/tracks?app_name=EXAMPLEAPP`, {
        method: 'GET'
      })

      if(response.ok){
        const data = await response.json()
        setUserTracks(data.data)
      }
    }
    fetchData()
  }, [])
   const containerStyle = {

    backgroundImage: userData.cover_photo && userData.cover_photo['640x'] ? `url(${userData.cover_photo['640x']})` : `url(${'https://tse1.mm.bing.net/th?id=OIP.tsjL8meOsr0Inbkr9zi_yQHaFe&pid=Api&rs=1&c=1&qlt=95&w=151&h=111'})`,
    color: 'white',
    /* Other styles can go here */
  };
  if(userData) console.log(userData)
  return (
    <div className='flex'>
       <AsideLeft />
       <div className='max-h-[100vh] overflow-y-auto'>
        <div className='artist-img' style={containerStyle}>
            <div>
              <p>Artist</p>
              <h2>{userData.name}</h2>
              <h3>@{userData.handle}</h3>
            </div>
        </div>
        <div className='user-info'>
          <img src={userData.profile_picture && userData.profile_picture['150x150'] ? userData.profile_picture['150x150'] : 'https://tse1.mm.bing.net/th?id=OIP.tsjL8meOsr0Inbkr9zi_yQHaFe&pid=Api&rs=1&c=1&qlt=95&w=151&h=111'} className='profile-image' alt="idk" />
          <ul>
            <li>
                <p>{userData.track_count}</p>
              <h3>Tracks</h3>
            </li>
            <li>
              <p>{userData.followee_count}</p>
              <h3>Following</h3>
            </li>
            <li>
              <p>{userData.follower_count}</p>
              <h3>Followers</h3>
            </li>
          </ul>
        </div>
        <div className="user-music-data">
          <ul>
            <Link to ='' className='trending-li selected-li'>
              <li>
                <div><FaMusic size={20} color={'blue'}/></div>
                <span>Tracks</span>
              </li>
            </Link>
            <Link to='albums'>
              <li>
                <div><MdAlbum size={20} color={'blue'}/></div>
                <span>Albums</span>
              </li>
            </Link>
            <Link to='playlist'>
              <li>
                <div><FaMusic size={20} color={'blue'}/></div>
                <span>Playlist</span>
              </li>
            </Link>
            <Link to='repost'>
              <li>
                <div><FaRetweet size={20} color={'blue'}/></div>
                <span>Repost</span>
              </li>
            </Link>
          </ul>
        </div>
        <main className='artist-content'>
              {usertTracks && usertTracks !== null ? (
                    // keep trying to get the time from each playlist
                    usertTracks.map((song:any, i:number): JSX.Element => {
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
                            title={song.playlist_name} />;
                    })
                ) : <div>loading...</div>}
        </main>
       </div>
    </div>
  )
}

export default Albums
