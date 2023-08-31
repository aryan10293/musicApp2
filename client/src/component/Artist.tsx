import React from 'react'
import { AsideLeft } from './AsideLeft'
function Artist() {
  const containerStyle = {
    backgroundImage: `url(${'https://www.nj.com/resizer/Xp3OgWA3sKCtsyHUhDrM7IJ5jZo=/1280x0/smart/cloudfront-us-east-1.images.arcpublishing.com/advancelocal/YISHMCH7GZHN7IQPA3PVSV3CDU.jpg'})`,
    color: 'white',
    /* Other styles can go here */
  };
  return (
    <div className='flex'>
       <AsideLeft />
       <div>
        <div className='artist-img' style={containerStyle}>
            <p>Hooper</p>
            <h2>lebrin james</h2>
            <h3>@kingJames</h3>
        </div>
       </div>
    </div>
  )
}

export default Artist
