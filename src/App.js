import { useState, useEffect } from 'react';
import Map from './components/Map';
import Loader from './components/Loader';
import 'mapbox-gl/dist/mapbox-gl.css';

function App() {
  
    const [eventData, setEventData] = useState([])
    const [loading, setLoading] = useState(false)
  
    useEffect(() => {
      const fetchEvents = async () => {
        
        setLoading(true)
        const res = await fetch('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson')
        const { features } = await res.json()
        // console.log(features)
        setEventData(features)
        setLoading(false)
      }
      fetchEvents()
    }, [])
  
    return (
      <div>
          { !loading ? <Map data={eventData} /> : <Loader/>}
      </div>
    );
  }
  
  export default App;