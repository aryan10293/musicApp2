import React from 'react'
import { Fragment } from 'react'
import { Link } from 'react-router-dom'
function PlaylistTrack(props: any) {
  const [data,setData] = React.useState<any[]>([])
  const [playlistSongs,setPlaylistSongs] = React.useState<any[]>([])
  const [idk,setIdk] = React.useState<any[]>([])
  // const [artwork, setArtwork] = React.useState<string>('')
  // const [playlistName, setPlaylistName] = React.useState<string>('')
  // const [creatorName, setCreatorName] = React.useState<string>('')
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://blockchange-audius-discovery-01.bdnodes.net/v1/playlists/${props.playlistId}?app_name=drejapp`, {
          method: 'GET',
        })
          if (!response.ok) {
              throw new Error(`Network response was not ok: ${response.status} ${response.statusText}`);
          }

          const data = await response.json();
          setPlaylistSongs(data.data[0].playlist_contents)

          const songsWithAsyncData = await Promise.all(
            data.data[0].playlist_contents.map(async (song: any) => {
              const asyncDataResponse = await fetch(`https://blockchange-audius-discovery-01.bdnodes.net/v1/tracks/${song.track_id}??app_name=drejapp`);
              const asyncData = await asyncDataResponse.json();
              return { asyncData };
            })
          )
            setIdk(songsWithAsyncData)
          // setArtwork(data.data[0].artwork['150x150'])
          // setPlaylistName(data.data[0].playlist_name)
          // setCreatorName(data.data[0].user.name)
      } catch (error) {
        console.error(error)
      }
    }
    fetchData()
  }, [])
//   function fetchData(){
//     playlistSongs.slice(0,5).forEach(async (song: any) => {
//       const response = await fetch(`https://blockchange-audius-discovery-01.bdnodes.net/v1/tracks/${song.track_id}?app_name=EXAMPLEAPP`, {
//         method: 'GET',
//       })

//       let data = await response.json()

//       iSuckAtThisShit.push(data.data)
      
//     })
//     setIdk(iSuckAtThisShit)
//   }
//   fetchData()
// console.log(idk)
  return (
    <>
      {data && data !== null ? (
        idk.slice(0,5).map(( song: any, i:number) => {
            const seconds = song.asyncData.data.duration;
            const minutes = Math.floor(seconds / 60);
            const remainingSeconds = seconds % 60;

            const formattedTime = `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    
          return (
            <div  key={i} className='playlist-track flex'>
        {false ? <img src={`song.asyncData.data.artwork[]`} alt="playlist cover" className='empty-div bg-red-700'></img> : <span className='empty-div bg-white-700'></span>}
            <div className='flex justify-between playlist-song w-full'>
                <div className='number '>{i + 1} <span>{song.asyncData.data.title}<span> by {song.asyncData.data.user.name}</span></span></div>
                <div className='playlist-track-time mr-3 '>{formattedTime}</div>
            </div>
        </div>
          )
        })
      ) : null}
      

        
    </>
  )
}

export default PlaylistTrack
