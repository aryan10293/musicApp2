import React from 'react'
import { AsideLeft } from './AsideLeft'
function Dashboard() {
    const [data, setData] = React.useState<any>()

    React.useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(`https://discoveryprovider.audius.co/v1/tracks/trending?app_name=drejmusicapp`, {
                    method: 'GET',
                });

                if (!response.ok) {
                    throw new Error(`Network response was not ok: ${response.status} ${response.statusText}`);
                }

                const data = await response.json(); // Don't forget to await this

                console.log(data);
            } catch (error) {
                console.error('Fetch error:', error);
            }
        }

        fetchData();
    }, []);
  return (
    <div>
      <AsideLeft />
      <div className='text-purple-700'>
        Trending
      </div>
    </div>
  )
}

export default Dashboard
