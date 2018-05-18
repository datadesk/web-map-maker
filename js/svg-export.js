window.addEventListener('unhandledrejection', event => {
    // Prevent error output on the console:
    event.preventDefault();
    console.log('Reason: ' + event.reason);
});
window.addEventListener('rejectionhandled', event => {
    console.log('REJECTIONHANDLED');
});


    // set up land use groups for LAT
    var landusePark = ['national_park', 'battlefield', 'protected_area', 'nature_reserve', 'park', 'golf_course', 'recreation_ground', 'camp_site', 'garden', 'allotments', 'pitch', 'meadow', 'village_green', 'playground', 'attraction', 'artwork', 'wilderness_hut', 'hanami'],
        landuseForest = ['forest', 'wood', 'natural_wood', 'natural_forest'],
        landuseAirport = ['aerodrome'],
        landuseMilitary = ['military'],
        landuseUniversity = ['university', 'college'],
        landuseSchool = ['school'],
        landuseCemetery = ['cemetery', 'place_of_worship'],
        landuseHospital = ['hospital'],
        landuseStadium = ['stadium'],
        landuseResort = ['theme_park', 'resort', 'aquarium', 'winery', 'maze'],
        landuseBeach = ['beach'];

    function setupJson(mapObject) {
        console.info('setupJson()')
        console.log(mapObject);

        var formattedJson = {};
        var dataKind = mapObject.dKinds.join(',');

        // ocean
        if (mapObject.options.layers_visible.indexOf('water_visible_ocean') != -1) {
            formattedJson['ocean'] = {
                oceanwater: {
                    features: []
                }
            }
        }

        // earth
        formattedJson['earth'] = {
            earthland: {
                features: []
            }
        }

        formattedJson['terrain'] = {
            terrainimg: {
                features: []
            }
        }


        // piers need to be their own thing to sit on top of ocean
        formattedJson['piers'] = {
            pierland: {
                features: []
            }
        }

        // landuse
        if (mapObject.options.layers_visible.indexOf('landuse_visible') != -1) {
            formattedJson['landuse'] = {}

            if (mapObject.options.layers_visible.indexOf('landuse_visible_airports') != -1) {
                formattedJson['landuse']['airport'] = { features: [] }
            }
            if (mapObject.options.layers_visible.indexOf('landuse_visible_beach') != -1) {
                formattedJson['landuse']['beach'] = { features: [] }
            }
            if (mapObject.options.layers_visible.indexOf('landuse_visible_cemetery') != -1) {
                formattedJson['landuse']['cemetery'] = { features: [] }
            }
            if (mapObject.options.layers_visible.indexOf('landuse_visible_college') != -1) {
                formattedJson['landuse']['university'] = { features: [] }
            }
            if (mapObject.options.layers_visible.indexOf('landuse_visible_forest') != -1) {
                formattedJson['landuse']['forest'] = { features: [] }
            }
            if (mapObject.options.layers_visible.indexOf('landuse_visible_hospital') != -1) {
                formattedJson['landuse']['hospital'] = { features: [] }
            }
            if (mapObject.options.layers_visible.indexOf('landuse_visible_military') != -1) {
                formattedJson['landuse']['military'] = { features: [] }
            }
            if (mapObject.options.layers_visible.indexOf('landuse_visible_park') != -1) {
                formattedJson['landuse']['park'] = { features: [] }
            }
            if (mapObject.options.layers_visible.indexOf('landuse_visible_resort') != -1) {
                formattedJson['landuse']['resort'] = { features: [] }
            }
            if (mapObject.options.layers_visible.indexOf('landuse_visible_school') != -1) {
                formattedJson['landuse']['school'] = { features: [] }
            }
            if (mapObject.options.layers_visible.indexOf('landuse_visible_stadium') != -1) {
                formattedJson['landuse']['stadium'] = { features: [] }
            }
            if (mapObject.options.layers_visible.indexOf('landuse_visible_prison') != -1) {
                formattedJson['landuse']['prison'] = { features: [] }
            }
            if (mapObject.options.layers_visible.indexOf('landuse_visible_wetland') != -1) {
                formattedJson['landuse']['wetland'] = { features: [] }
            }
            formattedJson['landuse']['pier'] = { features: [] }
        } // landuse

        // borders
        if (mapObject.options.layers_visible.indexOf('borders_visible') != -1) {
            formattedJson['boundaries'] = {}

            if (mapObject.options.layers_visible.indexOf('borders_visible_countries') != -1) {
                formattedJson['boundaries']['country'] = { features: [] }
            }
            if (mapObject.options.layers_visible.indexOf('borders_visible_disputed') != -1) {
                formattedJson['boundaries']['disputed'] = { features: [] }
                formattedJson['boundaries']['indefinite'] = { features: [] }
                formattedJson['boundaries']['interminate'] = { features: [] }
            }
            if (mapObject.options.layers_visible.indexOf('borders_visible_states') != -1) {
                formattedJson['boundaries']['region'] = { features: [] }
            }
            if (mapObject.options.layers_visible.indexOf('borders_visible_counties') != -1) {
                formattedJson['boundaries']['county'] = { features: [] }
            }
        }

        // water
        if (mapObject.options.layers_visible.indexOf('water_visible') != -1) {
            formattedJson['water'] = {}

            if (mapObject.options.layers_visible.indexOf('water_visible_inland_water') != -1) {
                formattedJson['water']['bay'] = { features: [] }
                formattedJson['water']['lake'] = { features: [] }
                formattedJson['water']['river'] = { features: [] }
                formattedJson['water']['riverbank'] = { features: [] }
                formattedJson['water']['stream'] = { features: [] }
                // need etc to grab other water
                formattedJson['water']['wateretc'] = { features: [] }
            }
            if (mapObject.options.layers_visible.indexOf('water_visible_swimming_pools') != -1) {
                formattedJson['water']['swimming_pool'] = { features: [] }
            }


        }

        // buildings
        if (mapObject.options.layers_visible.indexOf('buildings_visible') != -1) {
            formattedJson['buildings'] = {
                building: {
                    features: []
                }
            }
        }

        // transit
        if (mapObject.options.layers_visible.indexOf('transit_visible') != -1 ||
            mapObject.options.layers_visible.indexOf('rail_visible') != -1) {
            formattedJson['transit'] = {}

            if (mapObject.options.layers_visible.indexOf('transit_visible') != -1) {
                formattedJson['transit']['light_rail'] = { features: [] }
                formattedJson['transit']['subway'] = { features: [] }
                formattedJson['transit']['station'] = { features: [] }
            }
            if (mapObject.options.layers_visible.indexOf('rail_visible') != -1) {
                formattedJson['transit']['rail'] = { features: [] }
            }
        }

        // roads
        if (mapObject.options.layers_visible.indexOf('roads_visible') != -1) {
            formattedJson['roads'] = {}

            if (mapObject.options.layers_visible.indexOf('roads_visible_ferry_route') != -1) {
                formattedJson['roads']['ferry'] = { features: [] }
            }
            if (mapObject.options.layers_visible.indexOf('roads_visible_taxi_and_runways') != -1) {
                formattedJson['roads']['taxiway'] = { features: [] }
                formattedJson['roads']['runway'] = { features: [] }
            }
            if (mapObject.options.layers_visible.indexOf('roads_visible_service') != -1) {
                formattedJson['roads']['service'] = { features: [] }
            }
            if (mapObject.options.layers_visible.indexOf('roads_visible_minor') != -1) {
                formattedJson['roads']['minor_road'] = { features: [] }
            }
            if (mapObject.options.layers_visible.indexOf('roads_visible_major') != -1) {
                formattedJson['roads']['major_road'] = { features: [] }
            }
            if (mapObject.options.layers_visible.indexOf('roads_visible_highway_ramps') != -1) {
                formattedJson['roads']['highway_link'] = { features: [] }
            }
            if (mapObject.options.layers_visible.indexOf('roads_visible_highways') != -1) {
                formattedJson['roads']['highway'] = { features: [] }
            }
            if (mapObject.options.layers_visible.indexOf('roads_visible_paths') != -1) {
                formattedJson['roads']['path'] = { features: [] }
                formattedJson['roads']['track'] = { features: [] }
            }
            formattedJson['roads']['pier'] = { features: [] }

        } // roads

        // check for uploaded features
        // put into one parent of jsonupload
        if (mapObject.options['polygonFeatures'].length > 0 || mapObject.options['lineFeatures'].length > 0 || mapObject.options['pointFeatures'].length > 0) {
            formattedJson['jsonupload'] = {};
        }

        if (mapObject.options['polygonFeatures'].length > 0) {
            formattedJson['jsonupload']['polygonFeatures'] = {
                features: mapObject.options['polygonFeatures']
            }
        }
        if (mapObject.options['lineFeatures'].length > 0) {
            formattedJson['jsonupload']['lineFeatures'] = {
                features: mapObject.options['lineFeatures']
            }
        }
        if (mapObject.options['pointFeatures'].length > 0) {
            formattedJson['jsonupload']['pointFeatures'] = {
                features: mapObject.options['pointFeatures']
            }
        }

        // clipping path with view of map
        formattedJson['clippingpath'] = {
            clippingpath: {
                features: [
                    {
                        "type": "Feature",
                        "properties": {"name":"clippingpath"},
                        "geometry": {
                            "type": "Polygon",
                            "coordinates": [
                                [
                                    [mapObject.options.endLon, mapObject.options.endLat], // southwest
                                    [mapObject.options.endLon, mapObject.options.startLat], // northwest
                                    [mapObject.options.startLon, mapObject.options.startLat], // northeast
                                    [mapObject.options.startLon, mapObject.options.endLat], // southeast
                                    [mapObject.options.endLon, mapObject.options.endLat] // southwest
                                ]
                            ]
                        }
                    }
                ]
            }
        }

        return formattedJson;
    } // setupJson()

    function getTilesToFetch(startLat, endLat, startLon, endLon) {
        const tilesToFetch = [];
        // for(let i = startLon; i <= endLon; i++) lonArr.push(i);
        for(let j = startLat; j <= endLat; j++) {
            const coords = [];
            for(let i = startLon; i <= endLon; i++) {
                coords.push({
                    lat: j,
                    lon: i
                });
            }
            tilesToFetch.push(coords);
        }
        return tilesToFetch;
    }


// function to fire up tile maker based on json options
function parseJSON(req) {
    return new Promise((resolve, reject) => {
        console.info('parseJSON()');
        var newMap = {};
        newMap.options = JSON.parse(req);


        newMap.zoom = parseInt(newMap.options.zoomLevel);

        newMap.lat1 = lat2tile(parseFloat(newMap.options.startLat), newMap.zoom)
        newMap.lat2 = lat2tile(parseFloat(newMap.options.endLat), newMap.zoom)

        newMap.lon1 = long2tile(parseFloat(newMap.options.startLon), newMap.zoom)
        newMap.lon2 = long2tile(parseFloat(newMap.options.endLon), newMap.zoom)

        if(newMap.lat1 > newMap.lat2) {
            newMap.startLat = newMap.lat2;
            newMap.endLat = newMap.lat1;
        } else {
            newMap.startLat = newMap.lat1;
            newMap.endLat = newMap.lat2;
        }

        if(newMap.lon1 > newMap.lon2) {
            newMap.startLon = newMap.lon2;
            newMap.endLon = newMap.lon1;
        } else {
            newMap.startLon = newMap.lon1;
            newMap.endLon = newMap.lon2;
        }

        newMap.tileWidth = 100;

        // set up list of layers
        newMap.dKinds = [];

        // push parent layers into array
        newMap.dKinds.push('earth');
        newMap.dKinds.push('terrain');
        if (newMap.options.layers_visible.indexOf('borders_visible') != -1) newMap.dKinds.push('boundaries');
        if (newMap.options.layers_visible.indexOf('landuse_visible') != -1) newMap.dKinds.push('landuse');
        if (newMap.options.layers_visible.indexOf('water_visible_ocean') != -1) newMap.dKinds.push('ocean');
        if (newMap.options.layers_visible.indexOf('water_visible') != -1) newMap.dKinds.push('water');
        newMap.dKinds.push('piers');
        if (newMap.options.layers_visible.indexOf('transit_visible') != -1 || newMap.options.layers_visible.indexOf('rail_visible') != -1 ) newMap.dKinds.push('transit');
        if (newMap.options.layers_visible.indexOf('roads_visible') != -1) newMap.dKinds.push('roads');
        if (newMap.options.layers_visible.indexOf('buildings_visible') != -1) newMap.dKinds.push('buildings');
        newMap.dKinds.push('clipping');

        newMap.tilesToFetch = getTilesToFetch(newMap.startLat, newMap.endLat, newMap.startLon, newMap.endLon);

        newMap.key = newMap.options.apikey;
        if(typeof(newMap.key) === 'undefined'){
            reject(new Error('No Mapzen API key :('));
        }

        newMap.delayTime = 100;

        newMap.outputLocation = 'svgmap'+ newMap.tilesToFetch[0][0].lon +'-'+newMap.tilesToFetch[0][0].lat +'-'+newMap.zoom +'.svg';

        newMap.data;

        newMap.xCount = newMap.tilesToFetch.length-1;//latArr.length - 1;
        newMap.yCount = newMap.tilesToFetch[0].length-1;//lonArr.length - 1;
        newMap.originalYCount = newMap.yCount;


        newMap.jsonArray = [];
        // console.log(newMap)
        resolve(newMap);
    });
}

function makeSVGCall(newMap) {
    console.info("makeSVGCall()")

    return new Promise((resolve, reject) => {
        var tilesLoaded = false;
        var tiles = [];
        var tileURLs = [];

        // create list of tile URLs
        for (var i = 0; i < newMap.tilesToFetch.length; i++) {
            for (var j = 0; j < newMap.tilesToFetch[i].length; j++) {
                var tileURL = "https://d.tiles.nextzen.org/tilezen/vector/v1/256/all/"+newMap.zoom+"/"+newMap.tilesToFetch[i][j].lon + "/" + newMap.tilesToFetch[i][j].lat + ".json?api_key="+newMap.key;

                tileURLs.push(tileURL);
            }
        }

        console.log('tileURLs.length: ' + tileURLs.length);


        // get the tiles!
        var i = 0; // start value
        function tileLoop() {
            setTimeout(function() {
                var tileData;
                console.log(tileURLs[i]);

                $.get(tileURLs[i], function(data) {
                    tileData = data;
                })
                .done(function() {
                    tiles.push(tileData);

                    // check if done or not
                    if (i < tileURLs.length-1) {
                        i++;
                        tileLoop();
                    } else {
                        console.log('tiles are done!');
                        console.log('tiles.length: ' + tiles.length);
                        console.log(tiles);


                        return Promise.all(tiles)
                        .then(values => {
                            console.log(values)
                            for(var x = 0; x < values.length; x++){
                                newMap.jsonArray.push(values[x]);
                            }
                            resolve(newMap)
                        })

                    }

                });



            }, newMap.delayTime);
        }
        tileLoop();

    });

} // makeSVGCall()




function bakeJson(mapObject) {
    return new Promise((resolve,reject) => {
        var resultArray = mapObject.jsonArray
        var dKinds = mapObject.dKinds;
        console.log(resultArray)

        var ids = [];

        console.info('bakeJson()');
        var geojsonToReform = setupJson(mapObject);
        console.log(geojsonToReform);
        // console.log(geojsonToReform);
        // response geojson array
        for (let result of resultArray) {
            // inside of one object
            for (let response in result) {
                // console.log(response)
                // if the property is one of dataKinds that user selected
                if (dKinds.indexOf(response) > -1) {
                    let responseResult = result[response];
                    for (let feature of responseResult.features) {
                        // console.log(feature.properties);

                        // skip if a water tunnel or water intermittent
                        if (feature.properties.kind == 'stream' || feature.properties.kind == 'river') {
                            if (feature.properties.intermittent == true || feature.properties.is_tunnel == true) {
                                break;
                            }
                        }

                        // segment off motorway_link
                        if (feature.properties.kind_detail == "motorway_link") {
                            var dataKindTitle = 'highway_link';
                        } else if (feature.properties.kind_detail == "service") {
                        // segment off service roads
                            var dataKindTitle = 'service';
                        } else if (feature.properties.kind_detail == "runway") {
                            // aeroway roads
                            var dataKindTitle = 'runway';
                        } else if (feature.properties.kind_detail == "taxiway") {
                            var dataKindTitle = 'taxiway';
                        } else if (feature.properties.kind_detail === "pier") {
                            var dataKindTitle = 'pier';
                        } else if (feature.properties.kind_detail === "track") {
                            var dataKindTitle = 'track';
                        } else if (feature.properties.kind == "train") {
                            var dataKindTitle = 'rail';
                        } else if (landusePark.indexOf(feature.properties.kind) !== -1 ) {
                        // land uses
                            var dataKindTitle = 'park';
                        } else if (landuseForest.indexOf(feature.properties.kind) !== -1 ) {
                            var dataKindTitle = 'forest';
                        } else if (landuseAirport.indexOf(feature.properties.kind) !== -1 ) {
                            var dataKindTitle = 'airport';
                        } else if (landuseMilitary.indexOf(feature.properties.kind) !== -1 ) {
                            var dataKindTitle = 'military';
                        } else if (landuseUniversity.indexOf(feature.properties.kind) !== -1 ) {
                            var dataKindTitle = 'university';
                        } else if (landuseSchool.indexOf(feature.properties.kind) !== -1 ) {
                            var dataKindTitle = 'school';
                        } else if (landuseCemetery.indexOf(feature.properties.kind) !== -1 ) {
                            var dataKindTitle = 'cemetery';
                        } else if (landuseHospital.indexOf(feature.properties.kind) !== -1 ) {
                            var dataKindTitle = 'hospital';
                        } else if (landuseStadium.indexOf(feature.properties.kind) !== -1 ) {
                            var dataKindTitle = 'stadium';
                        } else if (landuseResort.indexOf(feature.properties.kind) !== -1 ) {
                            var dataKindTitle = 'resort';
                        } else if (landuseBeach.indexOf(feature.properties.kind) !== -1 ) {
                            var dataKindTitle = 'beach';
                        } else {
                            var dataKindTitle = feature.properties.kind;
                        }

                        if (geojsonToReform[response].hasOwnProperty(dataKindTitle)) {
                            geojsonToReform[response][dataKindTitle].features.push(feature);
                        } else if (feature.properties.kind == 'ocean') {
                            geojsonToReform['ocean']['oceanwater'].features.push(feature);
                        } else if (geojsonToReform[response].hasOwnProperty('etc') && response == 'water' && mapObject.options.layers_visible.indexOf('water_visible_inland_water') != -1) {
                            geojsonToReform['water']['wateretc'].features.push(feature);
                        } else if (response == 'water' && feature.properties.kind != 'swimming_pool' && mapObject.options.layers_visible.indexOf('water_visible_inland_water') != -1) {
                            geojsonToReform['water']['wateretc'].features.push(feature);
                        } else if (response == 'earth') {
                            geojsonToReform['earth']['earthland'].features.push(feature);
                        }
                        // else {
                        //     geojsonToReform[response]['etc'].features.push(feature)
                        // }
                    }
                }
            }
        }
        mapObject.reformedJson = geojsonToReform;
        resolve(mapObject);
    });
}

function writeSVGFile(mapObject) {
    return new Promise((resolve, reject) => {

        console.info('writeSVGFile()');
        var reformedJson = mapObject.reformedJson;
        console.log(reformedJson)

        // remove any old svgs
        d3.select("#export-container").remove();
                var svg = d3.select('body')
                            .append('div').attr('id','export-container') //make a container div to ease the saving process
                            .append('svg')
                            .attr({
                                xmlns: 'http://www.w3.org/2000/svg',
                                width: mapObject.tileWidth * mapObject.tilesToFetch[0].length,
                                height: mapObject.tileWidth* mapObject.tilesToFetch.length
                            });

                var previewProjection = d3.geo.mercator()
                                            .center([tile2Lon(mapObject.startLon, mapObject.zoom), tile2Lat(mapObject.startLat, mapObject.zoom)])
                                            //this are carved based on zoom 16, fit into 100px * 100px rect
                                            .scale(600000* mapObject.tileWidth/57.5 * Math.pow(2,(mapObject.zoom-16)))
                                            .precision(.0)
                                            .translate([0, 0])

                var previewPath = d3.geo.path().projection(previewProjection);

                for (var dataK in reformedJson) {
                    console.log('adding ' + dataK)
                    let oneDataKind = reformedJson[dataK];
                    let g = svg.append('g')
                    g.attr('id',dataK)

                    for(let subKinds in oneDataKind) {
                        let tempSubK = oneDataKind[subKinds]
                        let subG = g.append('g')
                        subG.attr('id',subKinds.replace('_',''))
                        for(let f in tempSubK.features) {
                            let geoFeature = tempSubK.features[f]
                            // check if point upload
                            if (dataK === 'jsonupload' && geoFeature.geometry.type === "Point" ) {
                                subG.append("circle")
                                    .attr("r",5)
                                    .attr("transform",function(d){
                                        return "translate(" + previewProjection([
                                            geoFeature.geometry.coordinates[0],
                                            geoFeature.geometry.coordinates[1]
                                            ]) + ")";
                                    });
                            } else {
                                // otherwise if path
                                let previewFeature = previewPath(geoFeature);

                                if(previewFeature && previewFeature.indexOf('a') > 0) ;
                                else {
                                    // pull stroke if subway or light rail
                                    var strokeColor = "#000000";
                                    if (geoFeature.properties.kind === "light_rail" || geoFeature.properties.kind === "subway") {
                                        strokeColor = geoFeature.properties.colour;
                                    }
                                    subG.append('path')
                                    .attr('d', previewFeature)
                                    .attr('fill','none')
                                    .attr('stroke',strokeColor);
                                }
                            }
                        }
                    }
                }

                // remove all non-closing riverbank tiles
                $("#riverbank path").each(function(){
                    var pathD = $(this).attr("d");
                    if (pathD.substr(pathD.length - 1) != 'Z') {
                        $(this).remove();
                    }
                });

                // remove all non-closing wateretc tiles
                $("#wateretc path").each(function(){
                    var pathD = $(this).attr("d");
                    if (pathD.substr(pathD.length - 1) != 'Z') {
                        $(this).remove();
                    }
                });

                // remove all non-closing lake tiles
                $("#lake path").each(function(){
                    var pathD = $(this).attr("d");
                    if (pathD.substr(pathD.length - 1) != 'Z') {
                        $(this).remove();
                    }
                });


                // remove all non-closing ocean tiles
                $("#oceanwater path").each(function(){
                    var pathD = $(this).attr("d");
                    if (pathD.substr(pathD.length - 1) != 'Z') {
                        $(this).remove();
                    }
                });

                // clip based on view
                var viewClip = d3.select("#clippingpath path").attr("d");

                // figure out widths and viewport based on clipping path
                var svgX = parseFloat(viewClip.split(',')[0].substring(1,20)).toFixed(3);
                var svgY = parseFloat(viewClip.split(',')[2].split('L')[0]).toFixed(3);
                var svgWidth = parseFloat(viewClip.split(',')[2].split('L')[1] - svgX).toFixed(3);
                var svgHeight = parseFloat(viewClip.split(',')[1].split('L')[0] - svgY).toFixed(3);

                // these are pulled from the mapmaker pixels if not a column selected from dropdown
                var fileWidth = mapObject.options.width;
                var fileHeight = mapObject.options.height;

                var origSVGWidth = svgWidth,
                    origSVGHeight = svgHeight;

                // if colWidth in the URL string
                var colWidth;
                // replace attribution with anything in the url
                if (getQueryVariable('colWidth')) {
                    colWidth = getQueryVariable('colWidth');
                } else {
                    colWidth = configOptions.columnWidth;
                }


                // update size if columb based
                if (mapObject.options.sizeDesc.indexOf('col') === 0) {
                    // figure out many columns
                    var columnCount = mapObject.options.sizeDesc[mapObject.options.sizeDesc.length -1];

                    // be sure to set a "columnWidth" and "gutterWidth" in your config.js file
                    // set new width based on those columns (Los Angeles Times column sizes for six-column page)
                    var svgWidth = (colWidth * columnCount) + ((columnCount-1) * configOptions.gutterWidth);

                    // set new sizes
                    svgHeight = parseFloat((svgWidth / origSVGWidth)*svgHeight).toFixed(3);
                    svg.attr('viewBox',svgX+ ' ' + svgY + ' '+origSVGWidth+' '+origSVGHeight);

                    fileWidth = svgWidth;
                    fileHeight = svgHeight;
                }

                // set 'em
                // svg.attr('width',svgWidth+'px');
                svg.attr('width',fileWidth+'px');
                // svg.attr('height',svgHeight+'px');
                svg.attr('height',fileHeight+'px');
                svg.attr('xml:space','preserve');
                svg.attr('x','0px');
                svg.attr('y','0px');
                svg.attr('version','1.1');
                svg.attr('viewBox',svgX+ ' ' + svgY + ' '+origSVGWidth+' '+origSVGHeight);

                // remove the clipping path
                d3.select("#clippingpath").remove();
                svg.append('defs')
                    .append('clipPath').attr('id','view-clip')
                    .append('path').attr('d',viewClip);

                // make a copy and put them in a new clipping group
                svg.append('g')
                    .attr('id','layergroup')
                    .attr('style','fill: none; clip-path: url(#view-clip);');
                    // .attr('transform','translate(' + -svgX*(origSVGWidth/svgWidth) + ' ' + -svgY*(origSVGWidth/svgWidth) + ')'); // translate over by x and y

                // move parent layers into clip group
                // this sets the order of layers in the SVG
                $('#layergroup').append($("svg g#earth"));
                $('#layergroup').append($("svg g#terrain"));
                $('#layergroup').append($("svg g#boundaries"));
                $('#layergroup').append($("svg g#landuse"));
                $('#layergroup').append($("svg g#ocean"));
                $('#layergroup').append($("svg g#piers"));
                $('#layergroup').append($("svg g#water"));
                $('#layergroup').append($("svg g#transit"));
                $('#layergroup').append($("svg g#roads"));
                $('#layergroup').append($("svg g#buildings"));
                $('#layergroup').append($("svg g#jsonupload"));




                /* restyle anything in groups if size not print/columns */
                // pulling from scene.config

                var highwayWidth = getLineWidth(scene.config.layers.roads.highway);

                // move piers
                $("#landuse #pier path").appendTo("#pierland");

                d3.selectAll('#pierland path')
                    .attr('fill','#fff')
                    .attr('stroke','#fff')
                    .attr('stroke-width','0px');

                $("#landuse #pier").remove();

                // roads
                // widths based on L.A. Times print styles
                d3.selectAll('#highway path')
                    .attr('stroke','#a7a9ac')
                    .attr('stroke-width','2px');
                d3.selectAll('#highwaylink path')
                    .attr('stroke','#bcbec0')
                    .attr('stroke-width','1px');
                d3.selectAll('#majorroad path')
                    .attr('stroke','#bcbec0')
                    .attr('stroke-width','1px');
                d3.selectAll('#minorroad path')
                    .attr('stroke','#bcbec0')
                    .attr('stroke-width','0.65px');
                d3.selectAll('#service path')
                    .attr('stroke','#d1d3d4')
                    .attr('stroke-width','0.65px');

                d3.selectAll('#path path')
                    .attr('stroke','#CDCFD0')
                    .attr('stroke-width','0.65px')
                    .attr('stroke-dasharray','1,1');
                d3.selectAll('#track path')
                    .attr('stroke','#CDCFD0')
                    .attr('stroke-width','1px')
                    .attr('stroke-dasharray','1,1');
                d3.selectAll('#rail path')
                    .attr('stroke','#CDCFD0')
                    .attr('stroke-width','0.65px');

                d3.selectAll('#aerialway path')
                    .attr('stroke','#CDCFD0')
                    .attr('stroke-width','0.65px');

                d3.selectAll('#ferry path')
                    .attr('stroke','#8bb1cd')
                    .attr('stroke-width','0.75px')
                    .attr('stroke-dasharray','1,1');

                d3.selectAll('#etc path')
                    .attr('stroke','#CDCFD0')
                    .attr('stroke-width','0.65px');

                d3.selectAll('#runway path')
                    .attr('stroke','#CDCFD0')
                    .attr('stroke-width','2px');

                d3.selectAll('#taxiway path')
                    .attr('stroke','#CDCFD0')
                    .attr('stroke-width','0.65px');

                d3.selectAll('#roads #pier path')
                    .attr('stroke','#fff')
                    .attr('stroke-width','1px');

                // landuse styles
                d3.selectAll('#university path')
                    .attr('fill','#F2F0E7')
                    .attr('stroke','#fff')
                    .attr('stroke-width','0px');
                d3.selectAll('#stadium path')
                    .attr('fill','#F9F3D6')
                    .attr('stroke','#fff')
                    .attr('stroke-width','0px');
                d3.selectAll('#school path')
                    .attr('fill','#F2F0E7')
                    .attr('stroke','#fff')
                    .attr('stroke-width','0px');
                d3.selectAll('#resort path')
                    .attr('fill','#F9F3D6')
                    .attr('stroke','#fff')
                    .attr('stroke-width','0px');
                d3.selectAll('#park path')
                    .attr('fill','#E7F1CA')
                    .attr('stroke','#fff')
                    .attr('stroke-width','0px');
                d3.selectAll('#wetland path')
                    .attr('fill','#e1e9db')
                    .attr('stroke','#fff')
                    .attr('stroke-width','0px');
                d3.selectAll('#military path')
                    .attr('fill','#eff0ef')
                    .attr('stroke','#fff')
                    .attr('stroke-width','0px');
                d3.selectAll('#prison path')
                    .attr('fill','#eff0ef')
                    .attr('stroke','#fff')
                    .attr('stroke-width','0px');
                d3.selectAll('#hospital path')
                    .attr('fill','#E2EDEF')
                    .attr('stroke','#fff')
                    .attr('stroke-width','0px');
                d3.selectAll('#forest path')
                    .attr('fill','#E7F1CA')
                    .attr('stroke','#fff')
                    .attr('stroke-width','0px');
                d3.selectAll('#cemetery path')
                    .attr('fill','#E4E4D5')
                    .attr('stroke','#fff')
                    .attr('stroke-width','0px');
                d3.selectAll('#beach path')
                    .attr('fill','#F8F4E1')
                    .attr('stroke','#fff')
                    .attr('stroke-width','0px');
                d3.selectAll('#airport path')
                    .attr('fill','#eff0ef')
                    .attr('stroke','#fff')
                    .attr('stroke-width','0px');
                d3.selectAll('#etc path')
                    .attr('fill','none')
                    .attr('stroke','#fff')
                    .attr('stroke-width','0px');

                // water
                console.log('collecting #water path')
                d3.selectAll('#water path')
                    .attr('fill','#A9D7F4')
                    .attr('stroke','#fff')
                    .attr('stroke-width','0px');
                console.log('collecting #ocean path')
                d3.selectAll('#ocean path')
                    .attr('fill','#A9D7F4')
                    .attr('stroke','#fff')
                    .attr('stroke-width','0px');
                console.log('collecting #riverbank path')
                d3.selectAll('#riverbank path')
                    .attr('fill','#A9D7F4')
                    .attr('stroke','#fff')
                    .attr('stroke-width','0px');
                console.log('collecting #river path')
                d3.selectAll('#river path')
                    .attr('fill','none')
                    .attr('stroke','#abd7f3')
                    .attr('stroke-width','1px');
                console.log('collecting #stream path')
                d3.selectAll('#stream path')
                    .attr('fill','none')
                    .attr('stroke','#A9D7F4')
                    .attr('stroke-width','0.35px');

                // earth
                console.log('collecting #earth #earthland path')
                d3.selectAll('#earth #earthland path')
                    .attr('fill','#fff')
                    .attr('stroke','#fff')
                    .attr('stroke-width','0px');

                // terrain
                d3.selectAll("#layergroup #terrain #terrainimg")
                    .append("image")
                        .attr("x","0")
                        .attr("y","0")
                        .attr("height","730px")
                        .attr("width","1300px")
                        .attr("href","data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABRQAAALaCAYAAABAo9+iAAAgAElEQVR4Xozd15NtVfX28T7mnHNOKEFKbvDC8kL/em8oFEURBBUVwYAKKEHQ86vvLj5dD/PtY71d1bV7rzXDmCM+Y8y5Vt969dVXb//73/++esc73nH1pz/96erxxx+/es973nP1xS9+8aqfv/zlL1evvvrq1fve976r//znP1e17d6nP/3pS5/bt29f7r/22mtXzz333NUrr7xy9dJLL13ad//tb3/7ZbzXX3/96r///e/V+9///kubF1988dKm33e/+91X73znOy/j93Pr1q2r3/3ud1cf//jHrz70oQ9d+r3xxhuXeRqnOaOjvvUz/tve9rYLDe9973svv3//+98vfd71rnddfj/ykY9cxupe87/88stX3/rWt64+8IEPXMbsXrT9+Mc/vrTvWmN3rbnq969//evqn//85+V7P93v765Fy4c//OGrD37wg5c1ofsf//jHZY7GbI1d7zfe1D6+x7N+8YlM+t648TK+xId4/dGPfvQig36ir/utv7aNq23ztc7GaczW0LXa1qb1dK9rraXvn/rUp64+//nPX9bfeLXDnz4bL742Ht5ZS+P0W79obZ2N/8QTT1zo7toPf/jDy7VoaDw/xsVrc8WX5mrN8bZx/vCHP1z6Nldrav3xoZ/a/fa3v73+/pnPfObqE5/4xIXPf/vb3y6y+epXv3rh0wsvvHDp22fzREPjpXef/exnL/M2X+sg7+TY9eg3fzTHk3Su336aK/70/WMf+9hlzelg9PVb/+eff/6ii41Xu/ifTsSnfhs3mpo/eXctnU1Wzd0a0MYumvupp566jNVP4zYmeUV/6+t+n2yuda/ONje9aZ7uoyWetobapx/90Ds+IVrpYXM3b23ifzzvJ57xI9kJfc/22UljtFbt4hu96rN7tWkt8Tw62UH3ss3u53v6nqxrR4e711qiK/lYS7JLJ/ix9KDvjdNamqOx+9taW3t6WN/obL3ssv791KYx+c2+N3c/jalf19n72nRtah9P+YnG4tvSjca46YctG7tPMkIrG+76roG91qe18It8RP3YNfk2hnHQWHvzum/trYFPWJ6am0/BL76s+cQP+sE/NGYy6jNbY3vRr23jJte+J1PX08loxPN4lF10P97XzzzWgsfdq32//GE8qK/4wWb5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%E2%80%A6")


                // buildings
                console.log('collecting #buildings #building path')
                d3.selectAll('#buildings #building path')
                    .attr('fill','#f7f9fc')
                    .attr('stroke','none');


                // uploaded geojson polygons
                window.d3.selectAll('#polygonFeatures path')
                    .attr('fill','none')
                    .attr('stroke','#cd7139')
                    .attr('stroke-width','1px');

                // uploaded geojson polylines
                window.d3.selectAll('#lineFeatures path')
                    .attr('fill','none')
                    .attr('stroke','#cd7139')
                    .attr('stroke-width','1px');

                // uploaded geojson points
                window.d3.selectAll('#pointFeatures circle')
                    .attr('fill','#cd7139')
                    .attr('stroke','#ffffff')
                    .attr('stroke-width','1px');

                // boundaries
                window.d3.selectAll("#boundaries path")
                    .attr('fill','none')
                    .attr('stroke','#827676')
                    .attr('stroke-width','0.5px');

                // mask landuse with another earth
                // svg.append('defs').append('clipPath').attr('id','earth-clip');
                // d3.select('#earth-clip').append('path').attr('d',earthTiles);

                // d3.select('#landuse').attr('clip-path','url(#earth-clip)');



                // /tmp
                // fs.writeFile(outputLocation, d3.select('.container').html(),(err)=> {
                //     if(err) throw err;
                //     console.log('yess svg is there')
                // })

                resolve(d3.select('#export-container').html());
    })
} // writeSVG()

var saveData = (function () {
    var a = document.createElement("a");
    document.body.appendChild(a);
    a.style = "display: none";
    return function (data, fileName) {
        var blob = new Blob([data], {type: "octet/stream"}),
            url = window.URL.createObjectURL(blob);
        a.href = url;
        a.download = fileName;
        a.click();
        window.URL.revokeObjectURL(url);
    };
}());

function createVector(options){
    console.log("NEW");
    console.log(options);
    return new Promise((resolve, reject) => {
        parseJSON(options)
        .then(makeSVGCall)
        .then(bakeJson)
        .then(writeSVGFile)
        .then((svgString) => {

            saveData(svgString, slugStart + 'mapmaker-' + getDatetime() + '.svg');
            $("#download_vector").html('Download vector');
            $("#download_vector").removeClass("gray");

        });
    });
}


// here all maps spells are!
// convert lat/lon to mercator style number or reverse.
function long2tile(lon,zoom) {
    return (Math.floor((lon+180)/360*Math.pow(2,zoom)));
}
function lat2tile(lat,zoom)  {
    return (Math.floor((1-Math.log(Math.tan(lat*Math.PI/180) + 1/Math.cos(lat*Math.PI/180))/Math.PI)/2 *Math.pow(2,zoom)));
}

function tile2Lon(tileLon, zoom) {
    return (tileLon*360/Math.pow(2,zoom)-180).toFixed(10);
}

function tile2Lat(tileLat, zoom) {
    return ((360/Math.PI) * Math.atan(Math.pow( Math.E, (Math.PI - 2*Math.PI*tileLat/(Math.pow(2,zoom)))))-90).toFixed(10);
}

function slugify(str) {
    return str.replace(/[\s]|[,\s]+/g, '-').replace(/[^a-zA-Z-]/g, '').toLowerCase();
}

function getClosest(array, target) {
    console.log('getClosest');
    var tuples = _.map(array, function(val) {
        return [val, Math.abs(val - target)];
    });
    return _.reduce(tuples, function(memo, val) {
        return (memo[1] < val[1]) ? memo : val;
    }, [-1, 999])[0];
}

// digs through the yaml scene config for width info
// has to be feature.draw.lines.width (so no dashed lines)
function getLineWidth(feature) {
    console.log(feature);
    var widthArray = [];
    for (var i = 0; i < feature.draw.lines.width.length; i++) {
        console.log(i);

        // push in zoom number
        widthArray.push(feature.draw.lines.width[i][0]);
    }
    var closestWidth = getClosest(widthArray,map.getZoom());

    // return width
    var lineWidth = '2px';
    for (var i = 0; i < feature.draw.lines.width.length; i++) {
        // if closeWidth match and not meters
        console.log(closestWidth + " closestWidth");
        console.log()
        if (feature.draw.lines.width[i][0] === closestWidth && feature.draw.lines.width[i][1].indexOf('px') != -1) {
            lineWidth = feature.draw.lines.width[i][1];
        }
    }

}
