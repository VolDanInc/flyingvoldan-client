
import video from "../styles/video.mp4"

function HomeVideo() {
   
    return (
        <div className="video" >
            <div className='ratio ratio-16x9'>

                <video loop autoPlay muted allowFullScreen id="video">
                    <source src={video} type="video/mp4" />
                </video>
                <div className='content'>
                    <h1 id="headline" >THE SKY IS NOT THE LIMIT.</h1>
                    <p id="2nd-headline">EXPERIENCE FLYING LIKE NEVER BEFORE.</p>
                    {/* <p></p>
                    <button  className="btn btn-outline-warning"> EXPLORE</button> */}
                    </div>
            </div>
            
        </div>
    )
}

export default HomeVideo;
