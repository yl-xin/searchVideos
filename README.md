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
[Get Youtube API](https://console.developers.google.com/)
Read YouTube API [Search:list documentation](https://developers.google.com/youtube/v3/docs/search/list)

3. Import the axios instance in App component. 
4. Make a get request with axios.get(url[, config]) inside the function which is associated with the prop which was passed down to the SeachBar and got the search term. 
```
       const response =await youtube.get('search',{
            params:{
                q:term
            }
        });
```
5. use setSate() method to assign the results to a state property `this.setState({videos: response.data.items})`

