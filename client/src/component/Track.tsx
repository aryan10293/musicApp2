import { faHeart, faRetweet, faShare } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { FaCrown } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import PlaylistTrack from './PlaylistTrack'
function Track(props:any) {
    const user = localStorage.getItem('loginUser')
    const [userLikes, setUserLikes] = React.useState<string[]>(props.likes)
    const handleClick = async (e: any) => {
        let  id = e.currentTarget.dataset.id;
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
 return (
    <li className='li-track w-full'>
        <div>
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
                        {props.playlist ? (
                        <PlaylistTrack />
                        ) : null }                                                 
                    </div>
                </div>
        </div>
    </li>
  )
}

export default Track
