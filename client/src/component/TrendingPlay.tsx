import React from 'react'
import { AsideLeft } from './AsideLeft'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faRetweet, faShare } from '@fortawesome/free-solid-svg-icons';
import Track from './Track';
import { FaCrown } from 'react-icons/fa';
import { MdFavorite } from 'react-icons/md';
function TrendingPlay() {
    const [data,setData] = React.useState<any[]>()
    const [playlist, setPlaylist] = React.useState<any[]>()
    const [playlistId, setPlaylistId] = React.useState<string[]>()
    const [likes, setLikes] = React.useState<string[]>([])
    const [isActiveWeek, setIsActiveWeek] = React.useState<boolean>(true);
    let playlistTime = []
    React.useEffect(() => {
        const fetchData = async () => {
           try {
                const response = await fetch(`https://blockchange-audius-discovery-01.bdnodes.net/v1/playlists/trending?app_name=EXAMPLEAPP`, {
                    method: 'GET',

                });

                if(response.ok){
                    const data = await response.json()
                    setData(data.data)
                    setPlaylistId(data.data.map((id:any):void => {
                       return id.id
                    }))
                }
                
            } catch (error) {
                console.error(error) 
            }
        }
        fetchData()
    }, [])
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
    async function getPlaylistTime(id: string){
        let response = await fetch(`https://audius-discovery-2.altego.net/v1/playlists/${id}?app_name=EXAMPLEAPP`, {method: 'GET',});
        let data = await response.json()
    }
    if(playlistId !== undefined){
        for(let i = 0; i<playlistId?.length; i++){


            getPlaylistTime(playlistId[i])
        }
    }
    console.log(data)
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
                {data && data !== null ? (
                    // keep trying to get the time from each playlist
                    data.slice(0,12).map((song:any, i:number): JSX.Element => {
                        let plays;
                        if(song['play'] <= 999){
                            plays = song['total_play_count']
                        } else{
                            plays = `${(song['total_play_count'] / 1000).toFixed(1)}K`
                        }
                        return <Track
                            playlist={data ? song.id : false}
                            likes={likes}
                            id={song.id}
                            number={i + 1}
                            crown={isActiveWeek ? true : false}
                            artwork={song.artwork["150x150"]}
                            timeOfSong={123456}
                            artistofsong={song.user.name}
                            artistLink={song.permalink}
                            repostCount={song.repost_count}
                            favoriteCount={song.favorite_count}
                            plays={plays}
                            artistId = {song.user.id}
                            title={song.playlist_name} />;
                    })
                ) : null}
            </main>
        </div>
    </div>
  )
}

export default TrendingPlay
//https://blockchange-audius-discovery-01.bdnodes.net/v1/playlists/MY00Y3j/tracks?app_name=EXAMPLEAPP

