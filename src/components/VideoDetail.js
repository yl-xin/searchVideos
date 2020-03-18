import React from 'react';
//conditional rendering, video is initially set to null in App
const VideoDetail = ({video})=>{
    if(!video) {
        return <div>loading...</div>
    }
    // ES2015 template string put the value of video.id.videoId into this string.
    const embedSrc = `https://www.youtube.com/embed/${video.id.videoId}`;
    return (
        <div>
            <div className="ui embed">
                <iframe src={embedSrc} title="video player"/>
            </div>
            <div className="ui segment">
                <h4 className="ui header">{video.snippet.title}</h4>
                <p>{video.snippet.description}</p>
            </div>
        </div>
    );
};

export default VideoDetail;