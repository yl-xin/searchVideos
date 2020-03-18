import React from 'react';
import VideoItem from './VideoItem';

const VideoList = (props)=>{
    // destructure the props
    const videos = props.videos;
    const onVideoSelect = props.onVideoSelect; // the reference of callback from app
    const renderedList = videos.map((video)=>{return <VideoItem video={video} onVideoSelect={onVideoSelect} />});
    return <div className="ui relaxed divided list">
        {renderedList}
        </div>
};

export default VideoList;