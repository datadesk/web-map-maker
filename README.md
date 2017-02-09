# web-map-maker


```
 _     _  _______  _______    __   __  _______  _______    __   __  _______  ___   _  _______  ______   
| | _ | ||       ||  _    |  |  |_|  ||   _   ||       |  |  |_|  ||   _   ||   | | ||       ||    _ |  
| || || ||    ___|| |_|   |  |       ||  |_|  ||    _  |  |       ||  |_|  ||   |_| ||    ___||   | ||  
|       ||   |___ |       |  |       ||       ||   |_| |  |       ||       ||      _||   |___ |   |_||_ 
|       ||    ___||  _   |   |       ||       ||    ___|  |       ||       ||     |_ |    ___||    __  |
|   _   ||   |___ | |_|   |  | ||_|| ||   _   ||   |      | ||_|| ||   _   ||    _  ||   |___ |   |  | |
|__| |__||_______||_______|  |_|   |_||__| |__||___|      |_|   |_||__| |__||___| |_||_______||___|  |_|
```

We make a lot of maps at the Los Angeles Times. So we made this tool to help us make them faster.

This tool is still very much a work-in-progress. There are bugs. But we'll get there.

## Getting started

You don't need much to get up and running. Download this repo and add a `config.js` file to the `js` folder with this information:

```
var configOptions = {
    'bingAPI': 'Your API here',
    'attribution': 'Who's making the map here, '
}
```

cd into the folder and spin up a server

```
python -m SimpleHTTPSever 8000
```

You should be able to visit `localhost:8000` to access the map maker. Chrome is the only supported browser right now.

## Make this better

File an issue, fork this repo or contact jon@latimes.com with thoughts, concerns or questions.

