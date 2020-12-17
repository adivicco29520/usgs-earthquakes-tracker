const InfoBox = ({ info }) => {
    // console.log(new Date(info.time).toDateString())
    return (
        <div className="event-info">
            <h4><a href={info.url} add target="_blank" rel="noreferrer">{ info.eventName }</a></h4>
            {/* <h2>Event Information</h2> */}
            <ul>
                <li>Magnitude: <strong>{ info.magnitude }</strong></li>
                <li>Depth: <strong>{ info.depth.toFixed(2) } km</strong></li>
                <li>Date: <strong>{ new Date(info.time).toDateString() }</strong></li>
                <li>Time: <strong>{ new Date(info.time).toTimeString() }</strong></li> 
            </ul>
        </div>
    )
}

export default InfoBox