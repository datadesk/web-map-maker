
// check if config options are done
if (typeof configOptions !== 'undefined') {
    var attribution = (typeof configOptions.attribution !== 'undefined') ? configOptions.attribution : '';
} else {
    var attribution = '';
}

// Get window width
var windowWidth = document.documentElement.clientWidth;
var windowHeight = document.documentElement.clientHeight;

// user map options
// this stores all the user's map edits so they can be reloaded
var userOptions = {};
var mapSlug = "la-mapmaker-";

// build the map's ruler
function createGrid(size) {
    // magic number: why 1600?
    var ratioW = 1600/size,
        ratioH = 1600/size;

    var parent = $('<div />', {
        class: 'grid',
        width: ratioW  * size,
        height: ratioH  * size
    }).addClass('grid' + ' grid'+size).appendTo('#grid_holder');

    for (var i = 0; i < ratioH; i++) {
        for(var p = 0; p < ratioW; p++){
            $('<div />', {
                width: size - 1,
                height: size - 1
            }).appendTo(parent);
        }
    }
}

// magic number: why 1500 here? What does that mean?
for (var i = 0; i < 1500; i+=10) {
    // checks if fits for print or web columns
    if (i % 330 === 0) {
        var text = "<span class='px_measure'>"+i/330+" col</span>";
        $("#col_ruler").append(text);
    } else if (i % 100 === 0 && i <= 1400) {
        var text = "<span class='px_measure'>"+(i-100)+"px</span>";
        $("#pixel_ruler").append(text);
    }
}

createGrid(50);
createGrid(100);
createGrid(330);

/* add commas to numbers*/
function commafy(num) {
    var s = String(num).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return s;
}

if (typeof configOptions !== 'undefined') {
    var initCoords = (typeof configOptions.initCoords !== 'undefined') ? configOptions.initCoords : [34.0425, -118.24];

    var initZoom = (typeof configOptions.initZoom !== 'undefined') ? configOptions.initZoom : 10;
} else {
    var initCoords = [34.0425, -118.24];

    var initZoom = 10;
}



// jQuery map reference
var $map = $('#map');
var map = L.map('map', {
    attributionControl: true,
    center: initCoords,
    zoom: 10,
    detectRetina: true,
    minZoom: 1.5,
    maxZoom: 19,
    closePopupOnClick: false
});


map.attributionControl.setPrefix(attribution+'Mapzen, OpenStreetMap');
var quietLAlayer = Tangram.leafletLayer({
    scene: 'map-styles.yaml',
    events: {
        // click: function(selection) { console.log('Click!', selection); }
    }
});

quietLAlayer.addTo(map);
// L.control.scale().addTo(map);
var scene = quietLAlayer.scene;


// make map resizable after load
quietLAlayer.on("load",function(){
    $( function() {
        $( "#map_holder" ).resizable({grid:10});
    } );
});

// add map's size
var mapSize = $("#map").width() + 'x' + $("#map").height();
$("#map_size").text(mapSize);

// var geocoder = L.control.geocoder('search-JvsyzTW', {
//     placeholder: 'Search for a location',
//     panToPoint: false,
//     markers: false,
//     expanded: false,
//     position: 'topleft',
//     attribution: ''
// }).addTo(map);

// show and hide variables
var buildingsVisible;


// set init zoom
var zoomRounded = Math.floor(map.getZoom()*10) / 10;
$("#zoom_level").text(zoomRounded.toFixed(1));

// and update it!
map.on('zoomend', function() {

    zoomRounded = Math.floor(map.getZoom()*10) / 10;

    // warning for too close of a zoom
    if (zoomRounded >= 16) {
        $("#warning_msg").text("WARNING: The map is zoomed in very close. Are major roads or freeways visible for reference?");
    } else {
        $("#warning_msg").text("");
    }

    $("#zoom_level").text(zoomRounded.toFixed(1));

    // buildings out under 14 zoom
    if (zoomRounded < 13) {
        $("#buildings_btn").removeClass("active"); // no buildings at zoom
        $("#buildings_btn").css("opacity","0.5"); // update btn opacity
    } else if (buildingsVisible) {
        $("#buildings_btn").addClass("active"); // no buildings at zoom
    }

    if (zoomRounded >= 13) {
        $("#buildings_btn").css("opacity","1"); // update btn opacity
    }



    // transit wont show outside 11 zoom
    if (zoomRounded < 11) {
        $("#transit_btn").removeClass("active"); // update button
        $("#transit_btn").css("opacity","0.5"); // update btn opacity
    } else if (transitVisible) {
        $("#transit_btn").addClass("active"); // update button
    }

    if (zoomRounded >= 11) {
        $("#transit_btn").css("opacity","1"); // update btn opacity
    }


});

// function to fire after map's parent is resized
$("#map_holder").resize(function(){
    // get map's size
    var mapHeight = $("#map").height(),
        mapWidth = $("#map").width()

    // update map's size
    $("#map_size").text(mapWidth + 'x' + mapHeight);

    // change size to custom
    if (mapWidth + 'x' + mapHeight == '1920x1080') {
        document.getElementById('preset_sizes').value = 'video';
    } else if (mapWidth + 'x' + mapHeight == '1300x730') {
        document.getElementById('preset_sizes').value = 'web_large';
    } else if (mapWidth + 'x' + mapHeight == '400x450') {
        document.getElementById('preset_sizes').value = 'web_small';
    } else if (mapWidth % 330 === 0) {
        document.getElementById('preset_sizes').value = 'col' + $("#map").width()/330;
    } else {
        document.getElementById('preset_sizes').value = 'custom';
    }


    setTimeout(
        function(){
            // add mo' map
            map.invalidateSize({ pan: false });
        }, 400
    );
});

scene.container.onmousemove = handleMouseMove;

function handleMouseMove(event) {
    var dot, eventDoc, doc, body, pageX, pageY;

    event = event || window.event; // IE-ism

    var pixel = {
        x: event.clientX - $map.offset().left,
        y: event.clientY - $map.offset().top + $(window).scrollTop()
    };
    scene.getFeatureAt(pixel).then(function(selection) {
        // console.log(pixel);
        if (!selection) {
            return;
        }
        var feature = selection.feature;
        if (feature !== null) {
            if (feature.properties !== null) {
                // console.log(feature);

                if (feature.properties.kind == 'highway'){
                    // console.log(feature.properties.ref);
                } else {
                    // console.log(feature.properties.name);
                }
            }
        }
    });
}


function slugify(v){
    var slug = v.toLowerCase();
    // Switch spaces to slugs
    slug = slug.replace(/\s/g, "-");
    // Trim special characters
    slug = slug.replace(/[^\w-]+/g, "");
    return slug;
}

function downloadIMG() {
    if (!mapLoadAction) {

        var canvas = document.getElementById("canvas");
        var ctx = canvas.getContext("2d");

        var mapSize = [$("#map").width(),$("#map").height()];

        // update the canvas' size
        $("#canvas").attr("width",mapSize[0]);
        $("#canvas").attr("height",mapSize[1]);

        var canvasSize = [$("#canvas").width(),$("#canvas").height()];

        // wipe the canvas clean
        ctx.clearRect(0, 0, canvasSize[0], canvasSize[1]);

        // hide map controls buttons
        $("#map").css("background","none");
        $(".leaflet-control-zoom").hide();

        // basemap
        scene.screenshot().then(function(screenshot) {

            // store map size
            // store svg viewbox info (for later offsetting)

            var baseIMG = new Image();
            baseIMG.src = screenshot.url;

            baseIMG.onload = function() {
                ctx.drawImage(baseIMG,0,0, mapSize[0], mapSize[1]);


                // add svg elements (like geojson objects)
                if ($("#map svg").length > 0) {

                    // Super hacky solution to SVG drawing problem: change zoom level then put it back
                    // This is here to patch a bug where a small pan of the map will result in
                    // geojson/svg objects being cut off in the downloaded image
                    // Someday we might have a real solution to the problem but until then ¯\_(ツ)_/¯
                    map.setZoom(map.getZoom() - 0.5);
                    map.setZoom(map.getZoom() + 0.5);

                    var svgString = new XMLSerializer().serializeToString(document.querySelector('svg'));
                    var DOMURL = self.URL || self.webkitURL || self;
                    var img = new Image();
                    var svg = new Blob([svgString], {type: "image/svg+xml;charset=utf-8"});
                    var url = DOMURL.createObjectURL(svg);

                    img.onload = function() {
                        // be sure to offset it
                        var svg1 = document.querySelector('svg');
                        var box = svg1.getAttribute('viewBox');
                        var svgOffset = box.split(/\s+|,/);

                        var svgSize = [$("#map svg").width(),$("#map svg").height()];
                        ctx.drawImage(img, (+svgOffset[0]*-1)-((svgSize[0]-mapSize[0])/2), (+svgOffset[1]*-1)-((svgSize[1]-mapSize[1])/2), svgSize[0], svgSize[1]);
                    };
                    img.src = url;
                }

                // any popup text layers and other html like the source and ruler
                html2canvas($("#map"), {

                    onrendered: function(canvas) {

                        ctx.drawImage(canvas,0,0, mapSize[0], mapSize[1]);
                        $(".leaflet-control-zoom").show(); // show zoom again
                        $("#map").css("background","#ddd"); // bring back map's background

                        // create an off-screen anchor tag
                        var lnk = document.createElement('a'),
                            e;

                        // get current datetime
                        var currentdate = new Date();

                        var hours = (currentdate.getHours() > 12) ? currentdate.getHours() + 12 : currentdate.getHours();
                        hours = (hours.toString().length == 1) ? '0' + hours : hours;

                        var datetime =  ("0" + (currentdate.getMonth() + 1)).slice(-2) + "-" +
                                        ("0" + currentdate.getDate()).slice(-2) + "-" +
                                        currentdate.getFullYear() + "-"
                                        + hours + "-" +
                                        + currentdate.getMinutes() + "-" +
                                        currentdate.getSeconds();

                        lnk.download = mapSlug + datetime + '.png';

                        // compress down canvas
                        var canvas = document.getElementById("canvas");
                        var image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");

                        // fire if sendToS3 exists
                        if (typeof sendToS3 !== "undefined") { 
                            sendToS3(mapSlug + datetime + ".png", image)
                                .then(sendToP2P(mapSlug + datetime))
                                .then(function() {
                                    console.log("great success!");
                                }).catch(function() {
                                    console.log("womp womp");
                                });
                        }

                        lnk.href = image;
                        // window.location.href=image;
                        if (document.createEvent) {

                            e = document.createEvent("MouseEvents");
                            e.initMouseEvent("click", true, true, window,
                                             0, 0, 0, 0, 0, false, false, false,
                                             false, 0, null);

                            lnk.dispatchEvent(e);

                        } else if (lnk.fireEvent) {
                            lnk.fireEvent("onclick");
                        }
                    }
                });
            }





        });

    }

} // downloadIMG();


var frozenZoom = false;

function zoomFreeze() {
if ($("#zoom_lock").hasClass('active')) {
    $('.leaflet-control-zoom').css('display','block');
    map.touchZoom.enable();
    map.doubleClickZoom.enable();
    map.scrollWheelZoom.enable();
    map.boxZoom.enable();
    map.keyboard.enable();
    $("#zoom_lock").removeClass('active');
    frozenZoom = false;
} else {
    $('.leaflet-control-zoom').css('display','none');
    map.touchZoom.disable();
    map.doubleClickZoom.disable();
    map.scrollWheelZoom.disable();
    map.boxZoom.disable();
    map.keyboard.disable();
    $("#zoom_lock").addClass('active');
    frozenZoom = true;
}

}

function panFreeze() {
if ($("#pan_lock").hasClass('active')) {
    map.dragging.enable();
    map.options.scrollWheelZoom = '';
    $("#pan_lock").removeClass('active');
} else {
    map.dragging.disable();
    map.options.scrollWheelZoom = 'center';
    $("#pan_lock").addClass('active');
}
}

function findFirstDescendant(parent, tagname) {
parent = document.getElementById(parent);
var descendants = parent.getElementsByTagName(tagname);
if ( descendants.length )
  return descendants[0];
return null;
}

var transitVisible = false;
var labelsVisible = true;
var terrainVisible = false;


function showTerrain() {
// store landuse parent
var landuse = scene.config.layers.landuse;
mapLoading();
if (terrainVisible) {

    // change earth to terrain
    scene.config.layers.earth.draw.polygons.visible = true;
    scene.config.layers.earth.draw.terrain.visible = false;


    // update base landuse
    scene.config.global.landuse_style = 'polygons';

    scene.updateConfig(); // update config
    $("#terrain_btn").removeClass("active"); // update button

    terrainVisible = false;
} else {

    // change earth to terrain
    scene.config.layers.earth.draw.polygons.visible = false;
    scene.config.layers.earth.draw.terrain.visible = true;

    // update base landuse

    scene.config.global.landuse_style = 'terrain';

    scene.updateConfig(); // update config
    terrainVisible = true;
    $("#terrain_btn").addClass("active"); // update button
}
}

function showTransit() {
// check zoom
if (map.getZoom() >= 11) {
    if (transitVisible) {
        // remove transit
        scene.config.layers.transit.visible = false;
        scene.config.layers['transit-overlay-station-labels'].visible = false;
        scene.updateConfig(); // update config
        $("#transit_btn").removeClass("active"); // update button
        transitVisible = false;
    } else {
        // add transit layer
        scene.config.layers.transit.visible = true;
        scene.config.layers['transit-overlay-station-labels'].visible = true;
        scene.updateConfig(); // update config
        $("#transit_btn").addClass("active"); // update button
        transitVisible = true;
    }
}
}

// auto labels
function showLabels() {

// check current status
if (labelsVisible) {
    // turn all these label layers hidden
    scene.config.global.labels_visible = false;

    labelsVisible = false;

    scene.updateConfig(); // update config
    $("#auto_labels_btn").removeClass("active"); // update button
} else {
    // turn all these label layers visible
    scene.config.global.labels_visible = true;

    scene.updateConfig(); // update config
    $("#auto_labels_btn").addClass("active"); // update button

    labelsVisible = true;
}


}

// shows and hides buildings and swimming pools
function showBuildings() {
// check zoom
if (map.getZoom() >= 13) {
    if (buildingsVisible) {
        // remove buildings
        scene.config.layers.buildings.draw.lines.visible = false;
        scene.config.layers.buildings.draw.polygons.visible = false;
        scene.config.layers["swimming-pools"].draw.polygons.visible = false; // pools
        scene.updateConfig(); // update config
        $("#buildings_btn").removeClass("active"); // update button
        buildingsVisible = false;
    } else {
        mapLoading();
        // add buildings
        scene.config.layers.buildings.draw.lines.visible = true;
        scene.config.layers.buildings.draw.polygons.visible = true;
        scene.config.layers["swimming-pools"].draw.polygons.visible = true; // pools
        scene.updateConfig(); // update config
        $("#buildings_btn").addClass("active"); // update button
        buildingsVisible = true;
    }
}
} // showBuildings()

// watching for anytime the size preset dropdown fires
var sizeChange = function(option) {
if (option.value == 'video') {
    $("#map_holder").width(1930); // these have to be 10 over to compensate for resizable
    $("#map_holder").height(1080);
} else if (option.value == 'web_large') {
    $("#map_holder").width(1310);
    $("#map_holder").height(730);
} else if (option.value == 'web_small') {
    $("#map_holder").width(410);
    $("#map_holder").height(450);
} else if (option.value == 'col1') {
    $("#map_holder").width(340);
    $("#map_holder").height(700);
} else if (option.value == 'col2') {
    $("#map_holder").width(670);
    $("#map_holder").height(700);
} else if (option.value == 'col3') {
    $("#map_holder").width(1000);
    $("#map_holder").height(700);
} else if (option.value == 'col4') {
    $("#map_holder").width(1330);
    $("#map_holder").height(700);
} else if (option.value == 'twitter') {
    $("#map_holder").width(800);
    $("#map_holder").height(400);
}



// end resizable
// $("#map_holder").resizable("destroy");

// update map's size
mapSize = $("#map").width() + 'x' + $("#map").height();
$("#map_size").text(mapSize);

setTimeout(
    function(){
        // add mo' map
        map.invalidateSize({ pan: false });
        // $( "#map_holder" ).resizable({grid:10});
    }, 400
);

};

function showPrint() {
    // swap to print color
    scene.config.global.road_color = '#98a5ac';

    // bump up size of major roads
    scene.config.layers.roads.major_road.draw.lines.width[3][1] = '1.5px';
    scene.config.layers.roads.major_road.draw.lines.width[4][1] = '2.5px';
    scene.config.layers.roads.major_road.draw.lines.width[5][1] = '3.5px';
    scene.config.layers.roads.major_road.draw.lines.width[6][1] = '10m';

    // bump up size of minor roads
    scene.config.layers.roads.minor_road.draw.lines.width[1][1] = '0.5px';
    scene.config.layers.roads.minor_road.draw.lines.width[2][1] = '0.5px';

    // make water darker
    scene.config.global.water_color = '#a6bcd3';

    // turn off labels
    labelsVisible = true;
    showLabels();

    scene.updateConfig(); // update config

    // update buttons
    $("#print_btn").addClass("active");
    $("#web_btn").removeClass("active");

    // hide attribution
    $(".leaflet-control-attribution").hide();

}

function showWeb() {
    scene.load('map-styles.yaml');
    buildingsVisible = false;
    // update buttons
    $("#print_btn").removeClass("active");
    $("#web_btn").addClass("active");
    $("#auto_labels_btn").addClass("active");
    labelsVisible = true;

    // bring back attribution
    $(".leaflet-control-attribution").show();


}

// Apple's Magic Mouse is a little finicky--prevent scroll when mouse is down on map
$("#map").mousedown(function() {
    map.scrollWheelZoom.disable();
});
$("#map").mouseup(function() {
    if (!frozenZoom) {
        map.scrollWheelZoom.enable();
    }
});


// styles for geojson pulled from v1.0
var lineStyle = {'color':'#cd7139','weight': 4,'opacity': 1, 'lineJoin':'round'};
var polyStyle = {'color': '#000','weight': 2,'opacity': 0.65,'fillOpacity': 0, 'lineJoin':'round'};
var pointStyle = { radius: 10.5, fillColor: '#cd7139',color: '#fff',weight: 1,opacity: 0.3,fillOpacity: 0.8};

function addStyle(feature){
    switch (feature.geometry.type) {
        case 'MultiPolygon': return polyStyle;
        case 'Polygon': return polyStyle;
        case 'MultiLineString': return lineStyle;
        case 'LineString': return lineStyle;
        case 'Point': return pointStyle;
    }
}

function handleFileSelect(evt) {
    // add multiple files to the map
    for (var i = 0; i <  evt.target.files.length; i++) {

        var f = evt.target.files[i];

        var r = new FileReader();
        r.onload = function(e) {

            var contents = e.target.result;
            // turn string into json object
            var parsedJSON = jQuery.parseJSON(contents);

            // add GeoJSON to map
            L.geoJson(parsedJSON, {
                style: function(feature) {return addStyle(feature);},
                pointToLayer: function (feature, latlng) {
                    return L.circleMarker(latlng, pointStyle);
                }
            }).addTo(map);
        };
        r.readAsText(f);
    }


}

// listen for file uploader
document.getElementById('geo_files').addEventListener('change', handleFileSelect, false);
// geocode is broken if no Bing API key
if (typeof configOptions !== 'undefined') {
    var popupMarker;
    // Initialize on a div element with an ID of "geocodifier"
    var geocoder = new BingGeocodifier('geocodifier', {
        key: configOptions.bingAPI,
        onClick: function(item, coords) {
            console.log(item);
            map.panTo(item.geocodePoints[0].coordinates);

            // check for popup text
            var userPopupText = $("#popupText").val();

            if (userPopupText.length > 0) {
                popupMarker = L.circleMarker(item.geocodePoints[0].coordinates,{
                    'fillOpacity': 0,
                    'opacity': 0
                }).bindPopup(userPopupText).addTo(map).openPopup();
            }
        }
    });

    document.getElementById('popupText').onkeyup=function() {

        // grab popup text
        var userPopupText = $("#popupText").val();
        mapSlug = "la-mapmaker-" + slugify($("#popupText").val());

        if (popupMarker !== undefined && userPopupText.length <= 40) {
            // update popup
            popupMarker._popup.setContent(userPopupText);
        }

    };

    // prevent page refresh when hitting enter
    $("#bing-geocodifier-form").submit(function(e) {
        e.preventDefault();
    });

} else {
    alert('Please put your Bing API key into config.js for search to work.');
    $("#popupContainer").hide();
}

var mapLoadAction = true;

// show that map is still loading
function mapLoading() {
    if (scene.tile_manager.isLoadingVisibleTiles()) {
        $("#download_img").html('Image loading...<img src="images/preloader.gif" alt="Preloader" id="map_loader" />');
        $("#download_img").addClass("gray");
        mapLoadAction = true;
    }
}

// listen for anything causing a possible map update
scene.subscribe({
    move: function () {
        mapLoading();
    }
});

// fire when map is down loading
scene.subscribe({
    view_complete: function () {
        $("#download_img").html("Download image");
        $("#download_img").removeClass("gray");
        mapLoadAction = false;
    },
    error: function (e) {
        console.log('scene error:', e);
    },
    warning: function (e) {
        console.log('scene warning:', e);
    }
});