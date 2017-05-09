
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
    minZoom: 2,
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

    // buildings out under 13 zoom
    if (zoomRounded < 14) {
        $("#buildings_visible").parent().addClass("unavailable"); // update btn opacity
    } else {
        $("#buildings_visible").parent().removeClass("unavailable"); // update btn opacity
    }

    // transit unavailable less than 11 zoom
    if (zoomRounded < 11) {
        $("#transit_visible").parent().addClass("unavailable"); // update btn opacity
    } else {
        $("#transit_visible").parent().removeClass("unavailable"); // update btn opacity
    }

    // countries 
    if (zoomRounded > 9 || zoomRounded < 2) {
        $("#labels_visible_countries").parent().addClass("unavailable"); // update btn opacity
    } else {
        $("#labels_visible_countries").parent().removeClass("unavailable"); // update btn opacity
    }

    // states and regions
    if (zoomRounded > 9 || zoomRounded <= 5) {
        $("#labels_visible_states").parent().addClass("unavailable"); // update btn opacity
    } else {
        $("#labels_visible_states").parent().removeClass("unavailable"); // update btn opacity
    }

    // highway shields
    if (zoomRounded <= 7) {
        $("#labels_visible_highway_shields").parent().addClass("unavailable");
    } else {
        $("#labels_visible_highway_shields").parent().removeClass("unavailable");
    }

    // major road labels
    if (zoomRounded < 14) {
        $("#labels_visible_major_roads").parent().addClass("unavailable");
    } else {
        $("#labels_visible_major_roads").parent().removeClass("unavailable"); 
    }

    // highways
    if (zoomRounded < 6) {
        $("#roads_visible_highways").parent().addClass("unavailable");
    } else {
        $("#roads_visible_highways").parent().removeClass("unavailable"); 
    }

    // major roads
    if (zoomRounded < 8) {
        $("#roads_visible_major").parent().addClass("unavailable");
        $("#roads_visible_highway_ramps").parent().addClass("unavailable");
    } else {
        $("#roads_visible_major").parent().removeClass("unavailable"); 
        $("#roads_visible_highway_ramps").parent().removeClass("unavailable");
    }

    // minor roads
    if (zoomRounded < 12) { 
        $("#roads_visible_minor").parent().addClass("unavailable"); 
    } else {
        $("#roads_visible_minor").parent().removeClass("unavailable"); 
    }

    // service roads
    if (zoomRounded < 15) { 
        $("#roads_visible_service").parent().addClass("unavailable"); 
    } else {
        $("#roads_visible_service").parent().removeClass("unavailable"); 
    }

    // airport roads
    if (zoomRounded < 11) { 
        $("#roads_visible_taxi_and_runways").parent().addClass("unavailable"); 
    } else {
        $("#roads_visible_taxi_and_runways").parent().removeClass("unavailable"); 
    }


    // swimming pools
    if (zoomRounded < 16) {
        $("#water_visible_swimming_pools").parent().addClass("unavailable"); 
    } else {
        $("#water_visible_swimming_pools").parent().removeClass("unavailable"); 
    }

    // country borders
    if (zoomRounded < 10) {
        $("#borders_visible_counties").parent().addClass("unavailable"); 
    } else {
        $("#borders_visible_counties").parent().removeClass("unavailable"); 
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
                    map.setZoom(map.getZoom() - 0.5, {'animate': false});
                    map.setZoom(map.getZoom() + 0.5, {'animate': false});

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

                        lnk.href = image;

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

// function showPrint() {
//     // swap to print color
//     scene.config.global.road_color = '#98a5ac';

//     // bump up size of major roads
//     scene.config.layers.roads.major_road.draw.lines.width[3][1] = '1.5px';
//     scene.config.layers.roads.major_road.draw.lines.width[4][1] = '2.5px';
//     scene.config.layers.roads.major_road.draw.lines.width[5][1] = '3.5px';
//     scene.config.layers.roads.major_road.draw.lines.width[6][1] = '10m';

//     // bump up size of minor roads
//     scene.config.layers.roads.minor_road.draw.lines.width[1][1] = '0.5px';
//     scene.config.layers.roads.minor_road.draw.lines.width[2][1] = '0.5px';

//     // make water darker
//     scene.config.global.water_color = '#a6bcd3';

//     // turn off labels
//     labelsVisible = true;
//     showLabels();

//     scene.updateConfig(); // update config

//     // update buttons
//     $("#print_btn").addClass("active");
//     $("#web_btn").removeClass("active");

//     // hide attribution
//     $(".leaflet-control-attribution").hide();

// }

// function showWeb() {
//     scene.load('map-styles.yaml');
//     buildingsVisible = false;
//     // update buttons
//     $("#print_btn").removeClass("active");
//     $("#web_btn").addClass("active");
//     $("#auto_labels_btn").addClass("active");
//     labelsVisible = true;

//     // bring back attribution
//     $(".leaflet-control-attribution").show();
// }

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
            // console.log(item);
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
        $("#download_img").html('Map loading...<img src="images/preloader.gif" alt="Preloader" id="map_loader" />');
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

/* LAYERS DROPDOWN */
// list of layers to show/hide
var layers = {
    'terrain_visible': [],
    'buildings_visible': [],
    'transit_visible': [],
    'labels_visible': ['countries','states','cities','neighborhoods','highway_shields','major_roads','minor_roads','points_of_interest'],
    'roads_visible': ['highways','highway_ramps','major','minor','service','taxi_and_runways'],
    'borders_visible': ['countries','disputed','states','counties'],
    'landuse_visible': ['airports','beach','cemetery','college','forest','hospital','military','park','pier','prison','resort','stadium','wetland'],
    'water_visible': ['ocean','inland_water','swimming_pools']
}

// add list to html
Object.keys(layers).forEach(function(key) {
    // looping by key
    var keyName = key.replace('_visible','');
    $("#checkboxes").append('<label for="'+key+'"><input type="checkbox" id="'+key+'" name="layers" />'+keyName+'</label>');

    // loop through any sublayers
    for (var i = 0; i < layers[key].length; i++) {
        var layerName = layers[key][i].replace(/_/g, ' ');
        $("#checkboxes").append('<label for="'+key+"_"+layers[key][i]+'" class="inset"><input type="checkbox" id="'+key+"_"+layers[key][i]+'" name="layers" />'+layerName+'</label>');
    }
                              
});

// check what layers are available on init
scene.subscribe({
    load: function (e) {


        // console.log(scene.config);


        // loop through layers list
        Object.keys(layers).forEach(function(key) {
            // console.log(key);
            // $("#"+key).attr("checked",scene.config.global[key]);

            // loop through the sublayers
            for (var i = 0; i < layers[key].length; i++) {
                var sublayer = key + "_" + layers[key][i];
                $("#"+sublayer).attr("checked",scene.config.global[sublayer]);

                // console.log("  " + layers[key][i]);
            }
                                      
            // console.log(key, layers[key]);

        });
        parentChecks(); // check which parents need selecting

    }
});


// set what layers are visible based on zoom
if (initZoom < 14) { $("#buildings_visible").parent().addClass("unavailable"); }

if (initZoom < 11) { $("#transit_visible").parent().addClass("unavailable"); }

if (initZoom > 9 || initZoom < 5) { $("#labels_visible_states").parent().addClass("unavailable"); }

if (initZoom > 9 || initZoom < 2) { $("#labels_visible_countries").parent().addClass("unavailable"); }

if (initZoom < 12) { $("#roads_visible_minor").parent().addClass("unavailable"); }

if (initZoom < 15) { $("#roads_visible_service").parent().addClass("unavailable"); }

if (initZoom < 16) { $("#water_visible_swimming_pools").parent().addClass("unavailable"); }

if (initZoom < 10) { $("#borders_visible_counties").parent().addClass("unavailable"); }

if (initZoom < 14) { $("#labels_visible_major_roads").parent().addClass("unavailable"); }

var expanded = false;

function showCheckboxes() {
    var checkboxes = document.getElementById("checkboxes");

    if (!expanded) {
        checkboxes.style.display = "block";
        expanded = true;
    } else {
        checkboxes.style.display = "none";
        expanded = false;
    }

}


// function to check on parent checkboxes
function parentChecks() {
    var checkedBoxes = document.querySelectorAll('input[name=layers]:checked');
    var visibleLayers = [];
    for (var i = 0; i < checkedBoxes.length; i++) {
        visibleLayers.push(checkedBoxes[i].id);
    }




    // check labels
    containsCount('labels_visible');

    // check roads
    containsCount('roads_visible');

    // check borders
    containsCount('borders_visible');

    // check water
    containsCount('water_visible');

    // check landuse
    containsCount('landuse_visible');

    // figure out how strong a match count of layers
    function containsCount(id){
        var needles = layers[id];
        var matchCount = 0;
        for (var i = 0 , len = needles.length; i < len; i++){
            if($.inArray(id+"_"+needles[i], visibleLayers) != -1) matchCount++;
        }
        if (matchCount === needles.length) {
            $("#"+id).prop('indeterminate',false);
            $("#"+id).prop('checked',true);
        } else if (matchCount > 0) {
            $("#"+id).prop('checked',false);
            $("#"+id).prop('indeterminate',true);
        } else {
            $("#"+id).prop('checked',false);
            $("#"+id).prop('indeterminate',false);
        }

    }


    // if ("labels_")
    // console.log(visibleLayers);
}

// listen for checkbox click
$("#checkboxes label input").click(function(){

    var thisID = $(this).attr("id");

    // checkbox status
    var status = ($("#"+thisID).prop('indeterminate')) ? 'indeterminate' :
                 ($("#"+thisID).prop('checked')) ? 'checked' : 'unchecked';



    // if terrain
    if (thisID == 'terrain_visible') {
        if ($("#"+thisID).prop("checked")) {
            scene.config.global.landuse_style = 'terrain';
            scene.config.layers.earth.draw.polygons.visible = false;
            scene.config.layers.earth.draw.terrain.visible = true;
        } else {
            scene.config.global.landuse_style = 'polygons';
            scene.config.layers.earth.draw.polygons.visible = true;
            scene.config.layers.earth.draw.terrain.visible = false;
        }
    } else if (Array.isArray(layers[thisID]) && layers[thisID].length > 0) {
    // if any parent layer
        for (var i = 0; i < layers[thisID].length; i++) {
            var sublayer = thisID + '_' + layers[thisID][i];
            if (status == 'checked') {
                scene.config.global[sublayer] = true;
                $("#"+sublayer).prop('checked',true);
            } else if (status == 'unchecked') {
                $("#"+sublayer).prop('checked',false);
                scene.config.global[sublayer] = false;
            }
        }
    } else {
        switchLayer(thisID);
        parentChecks();
    }







    // grab all checked layers
    // var visibleLayers = [];
    // for (var i = 0; i < checkedBoxes.length; i++) {
    //     visibleLayers.push(checkedBoxes[i].id);
    // }

    // console.log(visibleLayers);
    // // loop through layers to show/hide
    // if (visibleLayers.indexOf('labels_visible') != -1) {
    //     scene.config.global['labels_visible'] = true;
    // } else {
    //     scene.config.global['labels_visible'] = false;
    //     // turn off child labels
    // }

    // // country labels
    // if (visibleLayers.indexOf('countries') != -1) {
    //     scene.config.global.countries_visible = scene.config.global['labels_visible'];
    // } else {
    //     scene.config.global.countries_visible = false;
    //     // turn off child labels
    // }

    // if (visibleLayers.indexOf('terrain_visible') != -1) {
    //     scene.config.global.landuse_style = 'terrain';
    //     scene.config.layers.earth.draw.polygons.visible = false;
    //     scene.config.layers.earth.draw.terrain.visible = true;
    // } else {
    //     scene.config.global.landuse_style = 'polygons';
    //     scene.config.layers.earth.draw.polygons.visible = true;
    //     scene.config.layers.earth.draw.terrain.visible = false;
    // }

    // if (visibleLayers.indexOf('buildings_visible') != -1) {
    //     scene.config.global['buildings_visible'] = true;
    // } else {
    //     scene.config.global['buildings_visible'] = false;
    // }

    // if (visibleLayers.indexOf(thisID) != -1) {
    // }


    scene.updateConfig(); // update config


    // $("#states").prop("indeterminate", true);
});

// a function to switch global variables to show/hide layers
function switchLayer(layer) {
    if (scene.config.global[layer]) {
        scene.config.global[layer] = false;
    } else {
        scene.config.global[layer] = true;
    }
}

// // text marker test
// L.marker([33.99548,-118.45990], {draggable: true, icon: L.divIcon ({
//     iconSize: [100, 15],
//     iconAnchor: [0, 0],
//     html: '<input type="text" value="Here\'s your label">',
//     className: 'text-label ui-resizable'
//     })}).addTo(map);

