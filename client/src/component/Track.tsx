import { faHeart, faRetweet, faShare } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { FaCrown } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import PlaylistTrack from './PlaylistTrack'
function Track(props:any) {
    const user = localStorage.getItem('loginUser')
    const [data,setData] = React.useState<any[]>([])
    const [userLikes, setUserLikes] = React.useState<string[]>(props.likes)
    const [playlistSongs,setPlaylistSongs] = React.useState<any[]>([])
    const [idk,setIdk] = React.useState<any[]>([])
    const [times, setTime] = React.useState<number[]>([])
    const [loading, setLoading] = React.useState<boolean>(true)
    const handleClick = async (e: any) => {
        let id = e.currentTarget.dataset.id;
        console.log(id)
        const action: string = userLikes?.includes(id || '') ? 'unlike' : 'like';
        console.log(action)
        try {
                const response = await fetch(`http://localhost:2014/${action}`, {
                    method: 'PUT',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({id, user})
                    })
                const data = await response.json()
            } catch (error) {
                console.log(error)
            }
            console.log(action)
        if(action === 'like'){
        if (id) {
            setUserLikes([...userLikes, id]);
        }
        } else {
        let newList = userLikes.filter(x => x !== id )
            setUserLikes(newList)
        }
    }
    React.useEffect(() => {
    const fetchData = async () => {
      try {
        let timeIdk: number[] = []
        const response = await fetch(`https://blockchange-audius-discovery-01.bdnodes.net/v1/playlists/${props.playlist}?app_name=drejapp`, {
          method: 'GET',
        })
          if (!response.ok) {
              throw new Error(`Network response was not ok: ${response.status} ${response.statusText}`);
          }

          const data = await response.json();
          setPlaylistSongs(data.data[0].playlist_contents)

          const songsWithAsyncData = await Promise.all(
            data.data[0].playlist_contents.map(async (song: any, i: number) => {
              const asyncDataResponse = await fetch(`https://blockchange-audius-discovery-01.bdnodes.net/v1/tracks/${song.track_id}??app_name=drejapp`);
              const asyncData = await asyncDataResponse.json()
                if(i < 5){
                 timeIdk.push(asyncData.data.duration)   
                }
              return { asyncData };
            })
          )
            setIdk(songsWithAsyncData)
            setTime(timeIdk)
            setLoading(false)
      } catch (error) {
        console.error(error)
      }
    }
    if(props.playlist) fetchData()
  }, [])
    let displayFlex = props.playlist ? 'flex flex-col' : null

    function getTimeOfPlaylist(){
       let totalSec: number =  times.reduce((a:any,b:any) => {return a + b}, 0)
       const minutes = Math.floor(totalSec / 60);
       const remainingSeconds = totalSec % 60;
       const formattedTime = `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
       return formattedTime
    }
 return (
    <li className={`li-track w-full `}>
        <div className={`${displayFlex}`}>
            <div className='lebronjames flex-col'>
            <div className='numberDiv flex'> 
                <div className="flex flex-col ml-2">
                    {props.crown && props.number <= 5 ?  <FaCrown /> : null}
                    {props.number}
                    </div>
                    <div className='artwork-li'>
                        <div className='idkwhattocallthisdiv'>
                            <img src={props.artwork} alt="idk what im doing" />
                        </div>
                    </div>
                    <div className="maintrackcontent">
                        <div className="timeofsong">    
                            <p>{props.playlist ? getTimeOfPlaylist() :props.timeOfSong}</p>
                        </div>
                        <div className='titleofsong'>
                            <Link to={props.artistLink}>{props.title}</Link>
                        </div>   
                        <div className='artistofsong'>
                            <Link to={props.artistLink}>{props.artistofsong}</Link>
                        </div>
                        <div className='dataofsong'>
                        <>
                            <div >
                                <div className='heartreposticon'><span> <FontAwesomeIcon icon={faRetweet} />   {props.repostCount} Repost</span></div>
                                {' '}
                                <div className='heartreposticon'><span> <FontAwesomeIcon icon={faHeart} />   {props.favoriteCount} Favorites </span></div>
                            </div>
                            <div>
                                <p>{props.plays} Plays</p>
                            </div>
                        </>
                        </div>   
                        <div className='line'></div>   
                        <div className='activtybuttons'>
                            <FontAwesomeIcon icon={faRetweet}  className='icons'/>
                            {userLikes.includes(props.id) ? (
                                <FontAwesomeIcon icon={faHeart} onClick={handleClick} data-id={props.id} className='icons liked'/>
                            ) : (
                            <FontAwesomeIcon icon={faHeart} onClick={handleClick} data-id={props.id} className='icons'/>
                            )}
                            <FontAwesomeIcon icon={faShare} className='icons'/>
                        </div>
                    </div>                                                 
                    </div>
                       {props.playlist && data && data !== null ? (
                            idk.slice(0,5).map(( song: any, i:number) => {
                            const seconds = song.asyncData.data.duration;
                            const minutes = Math.floor(seconds / 60);
                            const remainingSeconds = seconds % 60;

                            const formattedTime = `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
                    
                        return (
                            <div  key={i} className='playlist-track flex'>
                        {false ? <img src={`song.asyncData.data.artwork[]`} alt="playlist cover" className='empty-div bg-red-700'></img> : <span className='empty-div bg-white-700'></span>}
                            <div className='flex justify-between playlist-song w-full'>
                                <div className='number '>{i + 1} <span>{song.asyncData.data.title}<span>by <Link to={`/artist/${song.asyncData.data.user.id}`}>{song.asyncData.data.user.name}</Link></span></span></div>
                                <div className='playlist-track-time mr-3 '>{formattedTime}</div>
                            </div>
                        </div>
                        )
                        })
                         ) : null }  
                </div>
                {!loading ? <Link className='more-tracks' to='idkyet'>{idk.length-5} More Tracks {'->'}</Link> : null}
        </div>
    </li>
  )
}

export default Track
