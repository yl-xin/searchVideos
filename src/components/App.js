import React from 'react';
import SearchBar from './SearchBar';
import youtube from '../apis/youtube';
import VideoList from './VideoList';
import VideoDetail from './VideoDetail';

class App extends React.Component{
    state = {videos:[],selectedVideo:null}; 
    
    componentDidMount(){
        this.onTermSubmit('cat');
    }
    
    // when user submit form, this fucntion is called
    onTermSubmit=async (term)=>{
        // console.log(term);
       const response =await youtube.get('search',{
            params:{
                q:term
            }
        });
        // console.log(response);
        // assign response items list to videos
        this.setState({
            videos: response.data.items,
            selectedVideo:response.data.items[0]
        });

    };

    onVideoSelect = (video)=>{
        // console.log('Method From App',video);
        this.setState({selectedVideo:video});
    }

    render(){
        return (
            <div className="ui container">
                <SearchBar onFormSubmit={this.onTermSubmit}/>
                <div className="ui grid">
                    <div className="ui row">
                        <div className="eleven wide column">
                            <VideoDetail video={this.state.selectedVideo}/>
                        </div>
                        <div className="five wide column">
                            <VideoList videos={this.state.videos} onVideoSelect={this.onVideoSelect}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;