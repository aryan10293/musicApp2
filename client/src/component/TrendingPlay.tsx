import React from 'react'
import { AsideLeft } from './AsideLeft'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faRetweet, faShare } from '@fortawesome/free-solid-svg-icons';
import Track from './Track';
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
                <Track 
                    playlist={false}
                    likes={[]}
                    id={1312}
                    number={1}
                    crown={false}
                    artwork={'https://th.bing.com/th/id/OIP.X95IL0tvdw_WZ4gQqTNpzAHaFS?w=264&h=189&c=7&r=0&o=5&dpr=2&pid=1.7'}
                    timeOfSong={'3:26'}
                    artistofsong={'lebron'}
                    artistLink={'song.permalink'}
                    repostCount={12}
                    favoriteCount={15}
                    plays={400}
                    title={'song.title'}
                />
            </main>
        </div>
    </div>
  )
}

export default TrendingPlay
//https://blockchange-audius-discovery-01.bdnodes.net/v1/playlists/MY00Y3j/tracks?app_name=EXAMPLEAPP

