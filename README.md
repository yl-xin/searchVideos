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

### Styling the list
Use Semantic UI [list element](https://semantic-ui.com/elements/list.html) and [some css](./src/components/VideoItem.css) to style the list.

## Show VideoDetail in App
#### Passing selected video from child to parent by calling a callback function from parent with the video argument.
- add a selectedVideo property to the App state. Pass the selected video API to this selectedVideo property to tell the VideoDetail component what to show.
- Communicate from child to parent by passing a reference of a method in App component down to VideoList, then down to each VideoItem, though props. Then anytime user click VideoItem, it calls the callback function as well as pass the video object to the callback. By invoking the method in App with the video object, the App component can uodate selectedVideo property of state to this video object.
1. In App, create a new `selectedVideo` property for state `state = {videos:[],selectedVideo:null};`
2. In App, create a method to update `selectedVideo` property of state:
    ```
        onVideoSelect = (video)=>{
            console.log('Method From App',video);
            this.setState({selectedVideo:video})
        }
    ```
3. In App, Pass down this method to VideoList through a new prop `onVideoSelect`, note that the callback and prop name doesn't have to be the same:
`<VideoList videos={this.state.videos} onVideoSelect={this.onVideoSelect}/>`
4. In VideoList, destructure the props: 
`const onVideoSelect = props.onVideoSelect;`
Then pass down this method to VideoItem through props:
`<VideoItem video={video} onVideoSelect={onVideoSelect}`
5. In VideoItem, destructue the props, add an onClick event handler to pass the `video` to the `onVideoSelect` callback from App:
`onClick={()=>onVideoSelect(video)} `

#### Passing the selected Video object to VideoDetail through props
1. create a functional component VideoDetail. Because video is initially set to `null`, we need conditional Rendering:
    ```
    const VideoDetail = ({video})=>{
        if(!video) {
            return <div>loading...</div>
        }
        return <div>{video.snippet.title}</div>
    };
    ```
2. In App, inset `VideoDetail` component and pass down the selected video stored in state's `selectedVideo` property to VideoDetail through props: ` <VideoDetail video={this.state.selectedVideo}/>`

3. In VideoDetail, return more details of selected video:
```
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
```
4. Add default video section:
- update all state properties in App when we get API response:
```
        this.setState({
            videos: response.data.items,
            selectedVideo:response.data.items[0]
        });
```
- Set default search term with `componentDidMount` method:



#### Styling with [Semantic UI grid system](https://semantic-ui.com/collections/grid.html)
Semantic UI grid system has 16 default wide columns:
```
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
```