import React from 'react';
import SearchBar from './SearchBar';
import youtube from '../apis/youtube';

class App extends React.Component{
    state = {videos:[]}; 
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
        this.setState({videos: response.data.items})

    };

    render(){
        return (
            <div className="ui container">
                <SearchBar onFormSubmit={this.onTermSubmit}/>
                I have {this.state.videos.length} videos
            </div>
        );
    }
}

export default App;