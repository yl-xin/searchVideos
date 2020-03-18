This project allows user to search Youtube videos.
## Axios is used to access Youtube API.  
1. install axios:
`npm install axios@0.18.1`
2. create a new instance of axios with a custom config with axios.create([config]) and export this instance
    ```
    export default axios.create({
        baseURL: 'https://www.googleapis.com/youtube/v3',
        params: {
        part: 'snippet', 
        type: 'video',
        maxResults: 5,
        key: process.env.REACT_APP_APIKey
    }
    })
    ```
[Get Youtube API](https://console.developers.google.com/) and
[Read YouTube API documentation](https://developers.google.com/youtube/v3/docs/search/list)

3. Import the axios instance in App component`import youtube from '../apis/youtube';`
4. Make a get request with axios.get(url[, config]) inside the function which is associated with the prop which was passed down to the SeachBar and got the search term. 
```
       const response =await youtube.get('search',{
            params:{
                q:term
            }
        });
```
5. use setSate() method to assign the results to a state property `this.setState({videos: response.data.items})`

Now the state object of the App component stores the list of videos of youtube.

## Render Videos 
Render videos with functional components VideoList and VideoItem.
1. In App component, **Passing State as Props** to the VideoList: `<VideoList videos={this.state.videos}/>` Now in VideoList component, we can access the list of videos by visiting `props.videos`. 

2. Pass videos separately to VideoItem component by using a mapping statement/ for loop.
```
    const VideoList = (props)=>{
        const videos = props.videos;
        const renderedList = videos.map((video)=>{return <VideoItem video={video} />});
        return <div>
            {renderedList}
            </div>
    };
```

3. In VideoItem, destructue props.video using {video} and print out each video
```
const VideoItem = ({video})=>{
    return (<div>
        <img src={video.snippet.thumbnails.medium.url}/>
        {video.snippet.title}
        </div>);
};
```