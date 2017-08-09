```
 _     _  _______  _______    __   __  _______  _______    __   __  _______  ___   _  _______  ______   
| | _ | ||       ||  _    |  |  |_|  ||   _   ||       |  |  |_|  ||   _   ||   | | ||       ||    _ |  
| || || ||    ___|| |_|   |  |       ||  |_|  ||    _  |  |       ||  |_|  ||   |_| ||    ___||   | ||  
|       ||   |___ |       |  |       ||       ||   |_| |  |       ||       ||      _||   |___ |   |_||_
|       ||    ___||  _   |   |       ||       ||    ___|  |       ||       ||     |_ |    ___||    __  |
|   _   ||   |___ | |_|   |  | ||_|| ||   _   ||   |      | ||_|| ||   _   ||    _  ||   |___ |   |  | |
|__| |__||_______||_______|  |_|   |_||__| |__||___|      |_|   |_||__| |__||___| |_||_______||___|  |_|
```

We make a lot of maps at the Los Angeles Times. So we made this tool to help us make them faster. It uses [Mapzen's Tangram mapping engine](https://mapzen.com/products/tangram/) to render OpenStreetMap and Mapzen data as an image or vector file.

![Fire interrupts Blue and Expo lines](http://www.trbimg.com/img-5979f222/turbine/la-1501164063-xsuwa8dl0a-snap-image/1000)

This tool is still very much a work in progress, so please [give us feedback](https://github.com/datadesk/web-map-maker/issues) if you find something amiss.

## Live preview

[See that here.](http://datadesk.github.io/web-map-maker/)

## Getting started

You don't need much to get up and running. Download this repo and make a config.js file (we provided a template [here](https://github.com/datadesk/web-map-maker/tree/master/js/config.js-TEMPLATE)). You'll also need to create a config.yaml file and leave it in the main directory.

A Bing API key isn't necessary to use the map maker; only for geocoding and location search. You can also define initial coordinates or zoom so you can start the map in your preferred location each time.

The gutter and columnWidth are the pixel equivelants for the Times' print 6-column layout.

You also need a [Mapzen key](https://mapzen.com/developers/sign_in). That key needs to be placed both in the config.js file and the config.yaml file.

Your config.js file should look like this:
```js
var configOptions = {
    'bingAPI': 'Your API here',
    'attribution': 'Your name, ',
    'initCoords': [34.0425, -118.24],
    'initZoom': 14,
    'mapzen-api': 'mapzen-KEYHERE',
    'columnWidth': 110.45,
    'gutterWidth': 12
}
```

Your config.yaml file should look like this:
```yaml
global:
    # Sign up for a Mapzen API key to enjoy higher rate limits
    # https://mapzen.com/documentation/overview/#developer-accounts-and-api-keys
    sdk_mapzen_api_key: 'mapzen-KEYHERE'
```

Then you're ready to run the mapmaker. The easiest way is to fire up a simple python server (obviously you'll need python) with this command:

```sh
python -m SimpleHTTPServer 8000
```

The app will be hosted at `localhost:8000` by default.

## What you need to know

Because we've developed this as an internal tool for use at the Los Angeles Times, it's  geared toward our use as far as styles and workflow. But it should be customizable and we're open to suggestions that would help make it better for others to use, too.

Chrome and Firefox are supported.

## Vector files for print
Because we make maps for web and print, if you select a column size from the drop-down you'll get a map with the column-equivelant for our six-column layout. The vector paths exported from "download vector" can then be converted to CMYK.

You can then run the `vector-map-restyle.jsx` script in Adobe Illustrator to convert all the layers to values of CMYK. Watch a [tutorial here](http://latimes-graphics-media.s3.amazonaws.com/assets/video/map-maker-script-explainer.mp4).

## Make this better

Have any ideas? File an issue, fork this repo or contact jon@latimes.com with thoughts, concerns or questions.
