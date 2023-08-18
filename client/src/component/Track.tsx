import { faHeart, faRetweet, faShare } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { FaCrown } from 'react-icons/fa'
import { Link } from 'react-router-dom'

function Track(props:any) {
//     artwork={data[0].artwork["150x150"]}
//     timing={'alltime'}
//     timeOfSong={`${Math.floor(data[0].duration/60)}:${data[0].duration%60}`}
//     artistofsong={data[0].user.handle}
//     artistLink={data[0].permalink}
//     repostCount={(data[0]['repost_count'] / 1000).toFixed(2)}
//     favoriteCount={(data[0]['favorite_count'] / 1000).toFixed(1)}
//     plays={(data[0]['play_count'] / 1000).toFixed(1)}
 return (
    <li className='li-track'>
        <div>
            <div className='playlist'>
                <div className='numberDiv flex flex-col'> 
                {props.timing === 'week' && props.number <= 5 ?  <FaCrown /> : null}
                {props.number}
                </div>
                <div className='artwork-li'>
                    <div className='idkwhattocallthisdiv'>
                        <img src={props.artwork} alt="idk what im doing" />
                    </div>
                </div>
                <div className="maintrackcontent">
                    <div className="timeofsong">    
                        <p>{props.timeOfSong}</p>
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
                            <div className='heartreposticon'><span> <FontAwesomeIcon icon={faRetweet} />   {props.repostCount}K Repost </span></div>
                            {' '}
                            <div className='heartreposticon'><span> <FontAwesomeIcon icon={faHeart} />   {props.favoriteCount}K Favorites </span></div>
                        </div>
                        <div>
                            <p>{props.plays}K Plays</p>
                        </div>
                    </>
                    </div>   
                    <div className='line'></div>   
                    <div className='activtybuttons'>
                        <FontAwesomeIcon icon={faRetweet}  className='icons'/>
                        <FontAwesomeIcon icon={faHeart} className='icons'/>
                        <FontAwesomeIcon icon={faShare} className='icons'/>
                    </div>                                                        
                </div>
            </div>
        </div>
    </li>
  )
}

export default Track
