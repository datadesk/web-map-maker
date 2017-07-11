// var fs = require('fs');
// var jsdom = require('jsdom');

// var d3 = require('d3');
// var XMLHttpRequest = require('xhr2')
window.addEventListener('unhandledrejection', event => {
    // Prevent error output on the console:
    event.preventDefault();
    console.log('Reason: ' + event.reason);
});
window.addEventListener('rejectionhandled', event => {
    console.log('REJECTIONHANDLED');
});



    // set up land use groups for LAT
    var landusePark = ['national_park', 'battlefield', 'protected_area', 'nature_reserve', 'park', 'golf_course', 'recreation_ground', 'camp_site', 'garden', 'allotments', 'pitch', 'meadow', 'village_green', 'farmland', 'playground', 'attraction', 'artwork', 'wilderness_hut', 'hanami'],
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
            }
            if (mapObject.options.layers_visible.indexOf('water_visible_swimming_pools') != -1) {
                formattedJson['water']['swimming_pool'] = { features: [] }
            }

            // need etc to grab other water
            formattedJson['water']['wateretc'] = { features: [] }
        }

        // buildings
        if (mapObject.options.layers_visible.indexOf('buildings_visible') != -1) {
            formattedJson['buildings'] = {
                building: {
                    features: []
                }
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

        } // roads

        // check for uploaded features
        // put into one parent of jsonupload
        if (mapObject.options['polygonFeatures'].length > 0 || mapObject.options['lineFeatures'].length > 0 || mapObject.options['pointFeatures'].length > 0) {
            formattedJson['jsonupload'] = {};
        }

        if (mapObject.options['polygonFeatures'].length > 0) {
            formattedJson['jsonupload'] = {
                polygonFeatures: {
                    features: mapObject.options['polygonFeatures']
                }
            }
        }
        if (mapObject.options['lineFeatures'].length > 0) {
            formattedJson['jsonupload'] = {
                lineFeatures: {
                    features: mapObject.options['lineFeatures']
                }
            }
        }
        if (mapObject.options['pointFeatures'].length > 0) {
            formattedJson['jsonupload'] = {
                pointFeatures: {
                    features: mapObject.options['pointFeatures']
                }
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
        if (newMap.options.layers_visible.indexOf('water_visible_ocean') != -1) newMap.dKinds.push('ocean');
        newMap.dKinds.push('earth');
        if (newMap.options.layers_visible.indexOf('borders_visible') != -1) newMap.dKinds.push('boundaries');
        if (newMap.options.layers_visible.indexOf('landuse_visible') != -1) newMap.dKinds.push('landuse');
        if (newMap.options.layers_visible.indexOf('water_visible') != -1) newMap.dKinds.push('water');
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
                var tileURL = "https://tile.mapzen.com/mapzen/vector/v1/all/"+newMap.zoom+"/"+newMap.tilesToFetch[i][j].lon + "/" + newMap.tilesToFetch[i][j].lat + ".json?api_key="+newMap.key;

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
                        } else if (geojsonToReform[response].hasOwnProperty('etc') && response == 'water') {
                            geojsonToReform['water']['wateretc'].features.push(feature);
                        } else if (response == 'water') {
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
                // window.d3 = d3.select(window.document);

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
                                    subG.append('path')
                                    .attr('d', previewFeature)
                                    .attr('fill','none')
                                    .attr('stroke','black')
                                }
                            }
                        }
                    }
                }

                // // combine all earth tiles
                // var earthTiles = "";
                // d3.selectAll("#earth path").each(function(){
                //     earthTiles += d3.select(this).attr("d");
                // });
                // d3.selectAll("#earth").append("path").attr("d",earthTiles);

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


                // // combine all riverbank tiles
                // var riverbankPaths = "";
                // d3.selectAll("#riverbank path").each(function(){
                //     riverbankPaths += d3.select(this).attr("d");
                //     d3.select(this).remove();
                // });
                // d3.selectAll("#riverbank").append("path").attr("d",riverbankPaths);




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

                // update size if columb based
                if (mapObject.options.sizeDesc.indexOf('col') === 0) {
                    // figure out many columns
                    var columnCount = mapObject.options.sizeDesc[mapObject.options.sizeDesc.length -1];

                    // be sure to set a "columnWidth" and "gutterWidth" in your config.js file
                    // set new width based on those columns (Los Angeles Times column sizes for six-column page)
                    var svgWidth = (configOptions.columnWidth * columnCount) + ((columnCount-1) * configOptions.gutterWidth);

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
                $('#layergroup').append($("svg g#ocean"));
                $('#layergroup').append($("svg g#earth"));
                $('#layergroup').append($("svg g#boundaries"));
                $('#layergroup').append($("svg g#landuse"));
                $('#layergroup').append($("svg g#water"));
                $('#layergroup').append($("svg g#roads"));
                $('#layergroup').append($("svg g#buildings"));
                $('#layergroup').append($("svg g#jsonupload"));



                /* restyle anything in groups */

                // roads
                console.log('collecting #highway path')
                d3.selectAll('#highway path')
                    .attr('stroke','#A6A6A6')
                    .attr('stroke-width','2px');

                console.log('collecting #highwaylink path')
                d3.selectAll('#highwaylink path')
                    .attr('stroke','#BCBEC0')
                    .attr('stroke-width','1px');

                console.log('collecting #majorroad path')
                d3.selectAll('#majorroad path')
                    .attr('stroke','#BCBEC0')
                    .attr('stroke-width','1px');

                console.log('collecting #minorroad path')
                d3.selectAll('#minorroad path')
                    .attr('stroke','#CDCFD0')
                    .attr('stroke-width','0.65px');

                console.log('collecting #service path')
                d3.selectAll('#service path')
                    .attr('stroke','#CDCFD0')
                    .attr('stroke-width','0.65px');

                console.log('collecting #path path')
                d3.selectAll('#path path')
                    .attr('stroke','none')
                    .attr('stroke-width','0');

                console.log('collecting #rail path')
                d3.selectAll('#rail path')
                    .attr('stroke','#CDCFD0')
                    .attr('stroke-width','0.65px');

                console.log('collecting #aerialway path')
                d3.selectAll('#aerialway path')
                    .attr('stroke','#CDCFD0')
                    .attr('stroke-width','0.65px');

                console.log('collecting #ferry path')
                d3.selectAll('#ferry path')
                    .attr('stroke','#8AB1CD')
                    .attr('stroke-width','0.5px')
                    .attr('stroke-dasharray','1,1');

                console.log('collecting #etc path')
                d3.selectAll('#etc path')
                    .attr('stroke','#CDCFD0')
                    .attr('stroke-width','0.65px');

                console.log('collecting #runway path')
                d3.selectAll('#runway path')
                    .attr('stroke','#CDCFD0')
                    .attr('stroke-width','2px');

                console.log('collecting #taxiway path')
                d3.selectAll('#taxiway path')
                    .attr('stroke','#CDCFD0')
                    .attr('stroke-width','0.65px');

                // landuse styles
                console.log('collecting #university path')
                d3.selectAll('#university path')
                    .attr('fill','#F2F0E7')
                    .attr('stroke','#fff')
                    .attr('stroke-width','0px');
                    console.log('collecting #stadium path')
                d3.selectAll('#stadium path')
                    .attr('fill','#F9F3D6')
                    .attr('stroke','#fff')
                    .attr('stroke-width','0px');
                    console.log('collecting #school path')
                d3.selectAll('#school path')
                    .attr('fill','#F2F0E7')
                    .attr('stroke','#fff')
                    .attr('stroke-width','0px');
                    console.log('collecting #resort path')
                d3.selectAll('#resort path')
                    .attr('fill','#F9F3D6')
                    .attr('stroke','#fff')
                    .attr('stroke-width','0px');
                    console.log('collecting #park path')
                d3.selectAll('#park path')
                    .attr('fill','#E7F1CA')
                    .attr('stroke','#fff')
                    .attr('stroke-width','0px');
                    console.log('collecting #wetland path')
                d3.selectAll('#wetland path')
                    .attr('fill','#e1e9db')
                    .attr('stroke','#fff')
                    .attr('stroke-width','0px');                        
                    console.log('collecting #military path')
                d3.selectAll('#military path')
                    .attr('fill','#eff0ef')
                    .attr('stroke','#fff')
                    .attr('stroke-width','0px');
                    console.log('collecting #prison path')
                d3.selectAll('#prison path')
                    .attr('fill','#eff0ef')
                    .attr('stroke','#fff')
                    .attr('stroke-width','0px');                        
                    console.log('collecting #hospital path')
                d3.selectAll('#hospital path')
                    .attr('fill','#E2EDEF')
                    .attr('stroke','#fff')
                    .attr('stroke-width','0px');
                    console.log('collecting #forest path')
                d3.selectAll('#forest path')
                    .attr('fill','#E7F1CA')
                    .attr('stroke','#fff')
                    .attr('stroke-width','0px');
                    console.log('collecting #cemetery path')
                d3.selectAll('#cemetery path')
                    .attr('fill','#E4E4D5')
                    .attr('stroke','#fff')
                    .attr('stroke-width','0px');
                    console.log('collecting #beach path')
                d3.selectAll('#beach path')
                    .attr('fill','#F8F4E1')
                    .attr('stroke','#fff')
                    .attr('stroke-width','0px');
                    console.log('collecting #airport path')
                d3.selectAll('#airport path')
                    .attr('fill','#eff0ef')
                    .attr('stroke','#fff')
                    .attr('stroke-width','0px');
                    console.log('collecting #etc path')
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
                    .attr('stroke','#A9D7F4')
                    .attr('stroke-width','0.5px');
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

    //         //jsdom done function done
    //         }
    //     })
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

            saveData(svgString, 'map-' + getDatetime() + '.svg');
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