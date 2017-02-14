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

<img width="1216" alt="mapmaker-screenshot" src="https://cloud.githubusercontent.com/assets/695934/22846871/a5d57d04-ef9e-11e6-87ef-8c1bfb874b22.png">

We make a lot of maps at the Los Angeles Times. So we made this tool to help us make them faster. It uses [Mapzen's Tangram mapping engine](https://mapzen.com/products/tangram/) to render OpenStreetMap data as vector tiles. It then bakes out your map into an static image. 

This tool is still very much a work in progress — please report any bugs you find using GitHub issues!

## Getting started

You don't need much to get up and running. Download this repo and make a config.js file (we provided a template [here](https://github.com/datadesk/web-map-maker/tree/master/js/config.js-TEMPLATE))

It should look like this:
```
var configOptions = {
    'bingAPI': 'Your API here',
    'attribution': 'Author name, '
}
```

You should also [get a Mapzen key](https://mapzen.com/developers/sign_in) and update it int he [map-styles.yaml file](https://github.com/datadesk/web-map-maker/blob/master/map-styles.yaml#L54).

Then you're ready to run the mapmaker. The easiest way is to fire up a simple python server (obviously you'll need python) with this command:

```
python -m SimpleHTTPSever 8000
```

The app will be hosted at `localhost:8000` by default.

## What you need to know

Because we've developed this as an internal tool for use at the Los Angeles Times, it's really geared toward our use as far as styles and workflow. But it should be customizable and we're open to suggestions that would help make it better for others to use, too.

Chrome is the only supported browser right now.

Also check the [issues tab](https://github.com/datadesk/web-map-maker/issues).

## Make this better

Have any ideas? File an issue, fork this repo or contact jon@latimes.com with thoughts, concerns or questions.

