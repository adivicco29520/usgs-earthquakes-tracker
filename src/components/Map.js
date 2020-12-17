import React, { useState, useRef, useCallback } from 'react';
import MapGL, { Marker,
    GeolocateControl,
    FullscreenControl,
    ScaleControl,
    NavigationControl
} from 'react-map-gl';
import Geocoder from "react-map-gl-geocoder";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBolt } from '@fortawesome/free-solid-svg-icons';
// import { Icon } from '@iconify/react';


// Set API Key from your Mapbox Account 
const MAPBOX_TOKEN = 'pk.eyJ1IjoiYWRpdmljY28iLCJhIjoiY2toN2d0cnJkMGFkMTJ5bzhxbTB5eDJmeCJ9.KfuAOmzRFSOf9dI1R4Mz2w'; // Set your mapbox token here

const EventMarker = ({ onClick }) => {
    return (
        <div className='event-marker' onClick={onClick}>
            {/* <Icon icon={wildfireIcon} className='wildfire-icon'/> */}
            <FontAwesomeIcon icon={faBolt}  className="event-icon"/>
        </div>
    )
}

const Map = ({ data }) => {

    // const [locationInfo, setLocationInfo] = useState(null)
    
    const [viewport, setViewport] = useState({
        latitude: 10,
        longitude: 0,
        zoom: 2,
        bearing: 0,
        pitch: 0
    })

    const mapRef = useRef();
    const handleViewportChange = useCallback(
    (newViewport) => setViewport(newViewport),
    []
    );
    // if you are happy with Geocoder default settings, you can just use handleViewportChange directly
    const handleGeocoderViewportChange = useCallback(
        (newViewport) => {
            const geocoderDefaultOverrides = { transitionDuration: 1000 };

    return handleViewportChange({
        ...newViewport,
        ...geocoderDefaultOverrides
    });
    },
    [handleViewportChange]
    );
    // Pass data from EONET API to variables
    const markers = data.map(e => {
        return(
            <Marker key = {e.id} latitude={e.geometry.coordinates[1]} longitude = {e.geometry.coordinates[0]}>
                <EventMarker/>
            </Marker>
        )
        // console.log(e.geometry.coordinates[1])
        
    })
    // console.log(markers)
    //     if(e.categories[0].id === 8) {
    //             return (
    //             <Marker key = {e.id} latitude={e.geometries[0].coordinates[1]} longitude = {e.geometries[0].coordinates[0]}>
    //                 <WildfireMarker onClick = {() => {setLocationInfo({ id:e.id, title: e.title, date:new Date(e.geometries[0].date), url:e.sources[0].url })}}/>
    //             </Marker>
    //             )}
    //             return null
    //         })

    return (
        <div className="map">
            <MapGL
            ref={mapRef}
            {...viewport}
            width= "100vw"
            height= "100vh"
            mapStyle="mapbox://styles/adivicco/ckhrh5efl1u4819qt2053jnyv"
                    //"mapbox://styles/adivicco/ckhrh61yw20b719ke3jy81f5d"
                    //"mapbox://styles/adivicco/ckhr7iaop1ckj19mp4sl2bbj3"  
                    //"mapbox://styles/adivicco/ck92z7q8b2ndc1ioc8nc1vxf3"
            onViewportChange={nextViewport => setViewport(nextViewport)}
            mapboxApiAccessToken= {MAPBOX_TOKEN}
            mapOptions = {{
                // customAttribution: '<a href="https://github.com/geovicco/react-natural-events-tracker">© Github</a>'
            }} 
            >
                <Geocoder className="geocoder-control"
                mapRef={mapRef}
                onViewportChange={handleGeocoderViewportChange}
                mapboxApiAccessToken={MAPBOX_TOKEN}
                position="top-right"
                />
                {/* Add Navigation Control Plugin */}
                <NavigationControl className="nav-control" />

                {/* Add a Geolocation Control Plugin */}
                <GeolocateControl className="geolocate-control" 
                                positionOptions={{enableHighAccuracy: true}} 
                                trackUserLocation={true}
                                label="Find My Location"
                                />
                {/* Add a Fullscreen Control Plugin */}
                <FullscreenControl className="fullscreen-control" container={document.querySelector('body')}/>

                {/* Add a Scale Control Plugin */}
                <div className="scale-control" >
                    <ScaleControl maxWidth={200} unit={"metric"}/>
                </div>

                {markers}
            </MapGL>
        </div>
    )
}

export default Map;