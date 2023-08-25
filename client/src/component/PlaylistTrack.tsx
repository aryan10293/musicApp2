import React from 'react'
import { Fragment } from 'react'
import { Link } from 'react-router-dom'
function PlaylistTrack(props: any) {
  const [data,setData] = React.useState<any[]>([])
  const [playlistSongs,setPlaylistSongs] = React.useState<any[]>([])
  const [artwork, setArtwork] = React.useState<string>('')
  const [playlistName, setPlaylistName] = React.useState<string>('')
  const [creatorName, setCreatorName] = React.useState<string>('')
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
          setData(data.data)
          setPlaylistSongs(data.data[0].playlist_contents)
          setArtwork(data.data[0].artwork['150x150'])
          setPlaylistName(data.data[0].playlist_name)
          setCreatorName(data.data[0].user.name)
           console.log(data.data[0].playlist_name)
      } catch (error) {
        console.error(error)
      }
    }
    fetchData()
  }, [])
  if( data){
    console.log(artwork)
  }
  return (
    <>
        {/* <div className='playlist-track flex'>
        {false ? <img src={`${artwork}`} alt="playlist cover" className='empty-div bg-red-700'></img> : <span className='empty-div bg-white-700'></span>}
            <div className='flex justify-between playlist-song w-full'>
                <div className='number '>1 <span>{name}<span> by {creatorName}</span></span></div>
                <div className='playlist-track-time mr-3 '>4:23 play tiem</div>
            </div>
        </div>

        <Link to='/moretracks' className='more-tracks p-2'>4 More Tracks</Link> */}
    </>
  )
}

export default PlaylistTrack
