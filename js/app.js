


// Get window width
var windowWidth = document.documentElement.clientWidth;
var windowHeight = document.documentElement.clientHeight;



/* QUERY STRINGS

These are all optional, but can be added at the back end of the URL to express them in MapMaker.

centerLat    center latitude for map's poition
centerLng    center longitude for map's position
zoom         zoom level for map; integer
width        map's width
height       map's height
attribution  credit for map
mapzenapi    mapzen api key
colWidth     pixel width for print columns
gutterWidth  pixel width for print gutters
slugStart    file export slugging convention
returnImage  will return an image if set to true

*/

// split query string
function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split('&');
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=');
        if (decodeURIComponent(pair[0]) == variable) {
            return decodeURIComponent(pair[1]);
        }
    }
}


// check if config options are done
var attribution;
if (typeof configOptions !== 'undefined') {
    attribution = (typeof configOptions.attribution !== 'undefined') ? configOptions.attribution : '';
} else {
    attribution = '';
}

// replace attribution with anything in the url
if (getQueryVariable('attribution')) {
    attribution = getQueryVariable('attribution') + ', ';
}


var slugStart;
if (getQueryVariable('slugStart')) {
    slugStart = getQueryVariable('slugStart') + '-';
} else {
    slugStart = 'la-';
}

// user map options
// this stores all the user's map edits so they can be reloaded
var userOptions = {};
var mapSlug = slugStart + "mapmaker-";


// print sizes
var colwidth = 330,
    colgutter = 26;

// build the map's ruler
function createGrid(size) {
    // set the maximum width of these grid areas
    var ratioW = 1700/size,
        ratioH = 1700/size;

    var parent = $('<div />', {
        class: 'grid',
        width: ratioW  * size,
        height: ratioH  * size
    }).addClass('grid' + ' grid'+size).appendTo('#grid_holder');

    for (var i = 0; i < ratioH; i++) {
        for(var p = 0; p < ratioW; p++){
            $('<div />', {
                width: size - 1, // 1 is the width of the border line (or gridline)
                height: size - 1
            }).appendTo(parent);
        }
    }
}

// set up top pixel ruler
for (var i = 0; i < 1600; i++) {
    if (i % 100 === 0 && i > 0) {
        var text = "<span class='px_measure'>"+(i-100)+"px</span>";
        $("#pixel_ruler").append(text);
    }

}

createGrid(50);
createGrid(100);

/* add commas to numbers*/
function commafy(num) {
    var s = String(num).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return s;
}

var initCords, initZoom;

if (typeof configOptions !== 'undefined') {
    initCoords = (typeof configOptions.initCoords !== 'undefined') ? configOptions.initCoords : [34.0425, -118.24];

    initZoom = (typeof configOptions.initZoom !== 'undefined') ? configOptions.initZoom : 10;
} else {
    initCoords = [34.0425, -118.24];
    initZoom = 10;
}

// revert to URL if that's there
if (getQueryVariable('centerLat') && getQueryVariable('centerLng')) {
    initCoords = [getQueryVariable('centerLat'),getQueryVariable('centerLng')];
}

if (getQueryVariable('zoom')) {
    initZoom = getQueryVariable('zoom');
}

// jQuery map reference
var map = L.map('map', {
    attributionControl: true,
    center: initCoords,
    zoom: initZoom,
    detectRetina: true,
    minZoom: 2,
    maxZoom: 19,
    closePopupOnClick: false,
    zoomControl: false
});



map.attributionControl.setPrefix(attribution+'Nextzen, OpenStreetMap');
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

// resize if in query string
if (getQueryVariable('width')) {
    document.getElementById('map_holder').style.width=(+getQueryVariable('width')+10)+'px';
}
if (getQueryVariable('height')) {
    document.getElementById('map_holder').style.height=getQueryVariable('height')+'px';
}

// add map's size
var mapSize = $("#map").width() + 'x' + $("#map").height();
$("#map_size").text(mapSize);


// show and hide variables
var buildingsVisible;


// set init zoom
var zoomRounded = Math.floor(map.getZoom()*10) / 10;
$("#zoom_level").text(zoomRounded.toFixed(1));

// and update it!
map.on('zoom', function() {

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
        $("#buildings_border_visible").parent().addClass("unavailable"); // update btn opacity
    } else {
        $("#buildings_visible").parent().removeClass("unavailable"); // update btn opacity
        $("#buildings_border_visible").parent().removeClass("unavailable"); // update btn opacity
    }

    // transit unavailable less than 11 zoom
    if (zoomRounded < 11) {
        $("#transit_visible").parent().addClass("unavailable"); // update btn opacity
        $("#rail_visible").parent().addClass("unavailable"); // update btn opacity
    } else {
        $("#transit_visible").parent().removeClass("unavailable"); // update btn opacity
        $("#rail_visible").parent().removeClass("unavailable"); // update btn opacity
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
    if (zoomRounded <= 6) {
        $("#labels_visible_highway_shields").parent().addClass("unavailable");
    } else {
        $("#labels_visible_highway_shields").parent().removeClass("unavailable");
    }

    // major road labels
    if (zoomRounded < 12) {
        $("#labels_visible_major_roads").parent().addClass("unavailable");
    } else {
        $("#labels_visible_major_roads").parent().removeClass("unavailable");
    }

    // major road labels
    if (zoomRounded < 13) {
        $("#labels_visible_minor_roads").parent().addClass("unavailable");
    } else {
        $("#labels_visible_minor_roads").parent().removeClass("unavailable");
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
    if (zoomRounded < 13) {
        $("#roads_visible_minor").parent().addClass("unavailable");
        $("#roads_visible_paths").parent().addClass("unavailable");
    } else {
        $("#roads_visible_minor").parent().removeClass("unavailable");
        $("#roads_visible_paths").parent().removeClass("unavailable");
    }

    // service roads
    if (zoomRounded < 16) {
        $("#roads_visible_service").parent().addClass("unavailable");
    } else {
        $("#roads_visible_service").parent().removeClass("unavailable");
    }

    // airport roads
    if (zoomRounded < 9) {
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

    // ferry routes
    if (zoomRounded < 8) {
        $("#roads_visible_ferry_route").parent().addClass("unavailable");
    } else {
        $("#roads_visible_ferry_route").parent().removeClass("unavailable");
    }

});

// function to fire after map's parent is resized
$("#map_holder").resize(function(){
    // get map's size
    var mapHeight = $("#map").height(),
        mapWidth = $("#map").width()

    // update map's size
    $("#map_size").text(mapWidth + 'x' + mapHeight);

    // get dropdown size value
    var selectedSize = document.getElementById('preset_sizes').value;

    // change size to custom unless already print
    if (selectedSize.substr(0,3) != "col") {
        if (mapWidth + 'x' + mapHeight == '1920x1080') {
            document.getElementById('preset_sizes').value = 'video';
        } else if (mapWidth + 'x' + mapHeight == '1300x730') {
            document.getElementById('preset_sizes').value = 'web_large';
        } else if (mapWidth + 'x' + mapHeight == '400x450') {
            document.getElementById('preset_sizes').value = 'web_small';
        } else {
            document.getElementById('preset_sizes').value = 'custom';
        }
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
        $(".rotate_handle").hide();
        $(".remove_label").hide();

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



                // if there's a popup
                if ($(".large-popup").length > 0) {
                    // swap out negative left with a margin-left for a moment
                    // this breaks html2canvas
                    var popupLeft = +$(".large-popup").css("left").slice(0,$(".large-popup").css("left").length-2);
                    var popupBottom = +$(".large-popup").css("bottom").slice(0,$(".large-popup").css("bottom").length-2);

                    var popupTranslate = $(".large-popup").css("transform");
                    var transNumStart = popupTranslate.indexOf("("),
                        transNumEnd = popupTranslate.indexOf(")");
                    var transNums = popupTranslate.substring(transNumStart+1,transNumEnd).split(",");
                    var transleft = +transNums[4];
                    var transRight = +transNums[5];
                    // update values because translate3d causes problems with Tangram
                    $(".large-popup").css("transform","");
                    $(".large-popup").css("left",popupLeft+transleft+"px"); // translate left
                    $(".large-popup").css("bottom",popupBottom-transRight+"px"); // translate right
                }

                // any popup text layers and other html like the source and ruler
                html2canvas($("#map"), {

                    onrendered: function(canvas) {


                        ctx.drawImage(canvas,0,0, mapSize[0], mapSize[1]);
                        $("#map").css("background","#ddd"); // bring back map's background
                        $(".rotate_handle").show();
                        $(".remove_label").show();

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

                        var canvas = document.getElementById("canvas");

                        if (canvas.msToBlob) { //for IE
                            var blob = canvas.msToBlob();
                            window.navigator.msSaveBlob(blob, mapSlug + datetime + '.png');
                        } else {
                            //other browsers

                            // create an off-screen anchor tag
                            var lnk = document.createElement('a'),
                                e;
                                lnk.href = canvas.toDataURL();
                                lnk.download = mapSlug + datetime + '.png';

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
    $("#map_holder").width(706);
    $("#map_holder").height(700);
} else if (option.value == 'col3') {
    $("#map_holder").width(1072);
    $("#map_holder").height(700);
} else if (option.value == 'col4') {
    $("#map_holder").width(1438);
    $("#map_holder").height(700);
} else if (option.value == 'twitter') {
    $("#map_holder").width(810);
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


// Apple's Magic Mouse is a little finicky--prevent scroll when mouse is down on map
$("#map").mousedown(function() {
    map.scrollWheelZoom.disable();
});
$("#map").mouseup(function() {
    if (!frozenZoom) {
        map.scrollWheelZoom.enable();
    }
});

// collect features
var pointFeatures = [],
    lineFeatures = [],
    polygonFeatures = [];

// styles for geojson pulled from v1.0
var lineStyle = {'color':'#cd7139','weight': 4,'opacity': 1, 'lineJoin':'round', 'className':'line-feature'};
var polyStyle = {'color': '#cd7139','weight': 4,'opacity': 1,'fillOpacity': 0, 'lineJoin':'round', 'className':'polygon-feature'};
var pointStyle = { radius: 10.5, fillColor: '#cd7139',color: '#fff',weight: 1,opacity: 0.3,fillOpacity: 0.8, className: 'point-feature'};

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
            var geojson = L.geoJson(parsedJSON, {
                style: function(feature) {
                // add element to array for later vector export
                    if (feature.geometry.type === 'Polygon' || feature.geometry.type === 'MultiPolygon') {
                        polygonFeatures.push(feature);
                    } else if (feature.geometry.type === 'LineString') {
                        lineFeatures.push(feature);
                    } else if (feature.geometry.type === 'Point') {
                        pointFeatures.push(feature);
                    }
                    return addStyle(feature);
                },
                pointToLayer: function (feature, latlng) {
                    return L.circleMarker(latlng, pointStyle);
                }
            });
            geojson.addTo(map);

            // add link text to zoom to uploaded file
            $("#zoom_to_geojson").css("display","block");
            $("#zoom_to_geojson").click(function(){
                map.fitBounds(geojson.getBounds(), {padding: [100, 100]});
                $("#zoom_to_geojson").css("display","none");
            });
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
            map.panTo(item.geocodePoints[0].coordinates);

            // check for popup text
            var userPopupText = $("#popupText").val();

            // remove any old markers and popups
            $(".popupMarker").remove();
            $(".large-popup").remove();

            // add a hidden marker
            popupMarker = L.circleMarker(item.geocodePoints[0].coordinates,{
                fillOpacity: 0,
                opacity: 0,
                className: 'popupMarker'
            }).bindPopup(userPopupText,{'className':'large-popup'}).addTo(map);
            if (userPopupText.length > 0) {
                popupMarker.openPopup();
            }
        }
    });

    // replace placeholder text if no bing api
    if (typeof configOptions.bingAPI == 'undefined' || configOptions.bingAPI.length === 0) {
        $("#bing-geocodifier-form input").attr('placeholder','34.052, -118.245');
    }

    document.getElementById('popupText').onkeyup=function() {

        // grab popup text
        var userPopupText = $("#popupText").val();
        mapSlug = slugStart + "mapmaker-" + slugify($("#popupText").val());

        if (popupMarker !== undefined && userPopupText.length <= 40) {
            // update popup
            popupMarker._popup.setContent(userPopupText);
            popupMarker.openPopup();
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
        $("#download_img").html('Map loading...<img src="images/preloader.gif" alt="Preloader" class="map_loader" />');
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

// fire when map is done loading
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
    'sources' : [],
    'terrain_visible': [],
    'buildings_visible': [],
    'buildings_border_visible': [],
    'transit_visible': [],
    'rail_visible': [],
    'labels_visible': ['countries','states','cities','neighborhoods','highway_shields','major_roads','minor_roads','points_of_interest','water'],
    'roads_visible': ['highways','highway_ramps','major','minor','service','ferry_route','taxi_and_runways','paths'],
    'borders_visible': ['countries','disputed','states','counties'],
    'landuse_visible': ['airports','beach','cemetery','college','forest','hospital','military','park','prison','resort','school','stadium','wetland'],
    'water_visible': ['ocean','inland_water','swimming_pools']
}

// add list to html
Object.keys(layers).forEach(function(key) {
    // looping by key
    var keyName = key.replace('_visible','').replace(/_/g, ' ');
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

        // loop through layers list
        Object.keys(layers).forEach(function(key) {
            // loop through the sublayers
            for (var i = 0; i < layers[key].length; i++) {
                var sublayer = key + "_" + layers[key][i];
                $("#"+sublayer).attr("checked",scene.config.global[sublayer]);
            }
        });
        parentChecks(); // check which parents need selecting

    }
});

// set sources to be checked
$("#sources").attr("checked",true);
// rail too
$("#rail_visible").attr("checked",true);




// set what layers are visible based on zoom
if (initZoom < 14) { $("#buildings_visible").parent().addClass("unavailable"); }
if (initZoom < 14) { $("#buildings_border_visible").parent().addClass("unavailable"); }

if (initZoom < 11) {
    $("#transit_visible").parent().addClass("unavailable");
    $("#rail_visible").parent().addClass("unavailable");
}

if (initZoom > 9 || initZoom < 5) { $("#labels_visible_states").parent().addClass("unavailable"); }

if (initZoom > 9 || initZoom < 2) { $("#labels_visible_countries").parent().addClass("unavailable"); }

if (initZoom < 12) { $("#roads_visible_minor").parent().addClass("unavailable"); }

if (initZoom < 13) { $("#roads_visible_paths").parent().addClass("unavailable"); }

if (initZoom < 16) { $("#roads_visible_service").parent().addClass("unavailable"); }

if (initZoom < 16) { $("#water_visible_swimming_pools").parent().addClass("unavailable"); }

if (initZoom < 12) { $("#labels_visible_major_roads").parent().addClass("unavailable"); }

if (initZoom < 13) { $("#labels_visible_minor_roads").parent().addClass("unavailable"); }

var expanded = false;

function showCheckboxes() {

    var checkboxes = document.getElementById("checkboxes");

    if (!expanded) {
        checkboxes.style.display = "block";
        expanded = true;
        // toggle layer focus style
        $(".overSelect").css("border","2px solid #797979");
        $(".selectBox select").css("color","#797979");

    } else {
        checkboxes.style.display = "none";
        expanded = false;
        // toggle layer focus style
        $(".overSelect").css("border","2px solid #b5b5b5");
        $(".selectBox select").css("color","#acacac");

    }

}

// close the layers palette when clicking somewhere else
$('#checkboxes').on('click', function(e) {
    e.stopPropagation();
});
$('.selectBox').on('click', function(e) {
    e.stopPropagation();
});
$(document).on('click', function (e) {
    checkboxes.style.display = "none";
    expanded = false;
    // toggle layer focus style
    $(".overSelect").css("border","2px solid #b5b5b5");
    $(".selectBox select").css("color","#acacac");

});

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
    } else if (thisID == 'sources') {
        if ($("#"+thisID).prop("checked")) {
            $(".leaflet-control-attribution").css("display","block");
        } else {
            $(".leaflet-control-attribution").css("display","none");
        }

    } else if (thisID === 'buildings_border_visible' && status === 'checked' && !$("#buildings_visible").prop('checked')) {
    // if turning on building borders and buildings aren't already on
        scene.config.global.buildings_visible = true;
        scene.config.global.buildings_border_visible = true;
        $("#buildings_visible").prop('checked',true);
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

    scene.updateConfig(); // update config

});

// a function to switch global variables to show/hide layers
function switchLayer(layer) {
    if (scene.config.global[layer]) {
        scene.config.global[layer] = false;
    } else {
        scene.config.global[layer] = true;
    }
}

// this updates live while user is moving slider
document.getElementById('zoom-slider').addEventListener("input", function() {
    if (!frozenZoom) {
        var zoomValue = parseFloat($(this).val());

        // update zoom value
        // using flyTo instead of setZoom because it is smoother
        map.flyTo(map.getCenter(),zoomValue,{animate:true,duration:0.1});
    }
});

// when zoom is done
map.on('zoomend',function(){
    var zoomRounded = Math.floor(map.getZoom()*10) / 10;
    $("#zoom_level").text(zoomRounded.toFixed(1));

    // update slider position
    document.getElementById("zoom-slider").value = map.getZoom();
});

// freeze zoom

function zoomFreeze() {
    if ($("#zoom_lock").hasClass('fa-lock')) {
        // enable zooming
        $("#zoom_lock")
            .removeClass('fa-lock')
            .addClass('fa-unlock-alt');
        map.touchZoom.enable();
        map.doubleClickZoom.enable();
        map.scrollWheelZoom.enable();
        map.boxZoom.enable();
        map.keyboard.enable();
        frozenZoom = false;
        document.getElementById("zoom-slider").disabled = false;
        $("#zoom-slider").css("opacity","1");
    } else {
        // disable zooming
        $("#zoom_lock")
            .removeClass('fa-unlock-alt')
            .addClass('fa-lock');
        map.touchZoom.disable();
        map.doubleClickZoom.disable();
        map.scrollWheelZoom.disable();
        map.boxZoom.disable();
        map.keyboard.disable();
        frozenZoom = true;
        document.getElementById("zoom-slider").disabled = true;
        $("#zoom-slider").css("opacity","0.5");
    }
}

// count elements in obj
function countProperties(obj) {
    var count = 0;

    for (var prop in obj) {
        if(obj.hasOwnProperty(prop))
            ++count;
    }

    return count;
}

function lastId(array) {
    var lastId = 0;

    for (var i = 0; i < array.length; i++) {
        if (+array[i].options.icon.options.id.substr(12,3) > lastId) {
            lastId = +array[i].options.icon.options.id.substr(12,3);
        }
    }

    return lastId;
}

// setup object to hold all custom labels
var customLabels = [];

function addCustomLabel(size) {

    var thisID = lastId(customLabels) + 1;

    // text marker test
    var customLabel = L.marker(map.getCenter(), {draggable: true, icon: L.divIcon ({
        iconSize: [0, 0],
        iconAnchor: [0, 0],
        html: '<div class="custom_label '+size+'_label" id="custom_label'+thisID+'"><span class="display_text">Here\'s your label</span><textarea class="text_input" maxlength="100"></textarea><i class="fa fa-repeat rotate_handle" aria-hidden="true"></i> <i class="fa fa-times remove_label" aria-hidden="true"></i></div>',
        className: 'text-label ui-resizable',
        id: 'custom_label'+thisID
        })});

    // add label to the array of all labels
    customLabels.push(customLabel);

    // add label to map
    customLabel.addTo(map);
}

// edit text to swap in input and out
$('body').on('click', '.display_text', function() {
    // hide display text
    $(this).hide();
    var parentID = $(this).parent()[0].id;
    $("#"+parentID+" .text_input").val($(this).html().replace(/<br\s*[\/]?>/gi, "\n"));
    $("#"+parentID+" .text_input").show();
    $("#"+parentID+" .text_input").focus();
});

// on blur
$('body').on('blur', '.text_input', function() {
    $(this).hide();
    var parentID = $(this).parent()[0].id;

    $("#"+parentID+" .display_text").html($("#"+parentID+" .text_input").val().replace(/\n\r?/g, '<br />'));
    $("#"+parentID+" .display_text").css("display","block");
});

// delete label
$('body').on('click', '.remove_label', function() {
    var parentID = $(this).parent()[0].id;

    // loop through label list to find match
    for (var i = 0; i < customLabels.length; i++) {
        if (customLabels[i].options.icon.options.id == parentID) {
            map.removeLayer(customLabels[i]); // remove from map
            customLabels.splice(i, 1); // remove from list
        }
    }
});

$('body').on('mousedown', '.rotate_handle', function(e) {
    // get the right custom label from object
    for (var i = 0; i < customLabels.length; i++) {
        if (customLabels[i].options.icon.options.id == $(this).parent()[0].id) {
            var customLabel = customLabels[i]
        }
    }

    // temporarily freeze dragging
    customLabel.dragging.disable();
    map.dragging.disable();

    var target = $(this).parent(),
        originX = target.offset().left + target.width() / 2,
        originY = target.offset().top + target.height() / 2,
        dragging = true,
        startingDegrees = (typeof target[0].style.transform == 'undefined') ? 0 : target[0].style.transform.substr(7,target[0].style.transform.indexOf('deg')-7),
        lastDegrees = 0,
        currentDegrees = 0;


        mouseX = e.pageX;
        mouseY = e.pageY;
        radians = Math.atan2(mouseY - originY, mouseX - originX),
        startingDegrees = radians * (180 / Math.PI);


    $(document).mousemove(function(e) {
        var mouseX, mouseY, radians, degrees;

        if (!dragging) {
            return;
        }

        mouseX = e.pageX;
        mouseY = e.pageY;
        radians = Math.atan2(mouseY - originY, mouseX - originX),
        degrees = radians * (180 / Math.PI) - startingDegrees + lastDegrees;

        currentDegrees = degrees;

        // update to lock onto 0, 90, 270 if it rounds to it
        if (degrees <= 5 && degrees >= -5) {
            degrees = 0;
        } else if (degrees >= -275 && degrees <= -265) {
            degrees = -270;
        }

        target.css('-webkit-transform', 'rotate(' + degrees + 'deg)');
        target.css('-ms-transform', 'rotate(' + degrees + 'deg)');
        target.css('transform', 'rotate(' + degrees + 'deg)');
    }).mouseup(function() {
        lastDegrees = currentDegrees;
        dragging = false;

        // unfreeze dragging
        customLabel.dragging.enable();
        map.dragging.enable();

    });
});

function getDatetime() {
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

    return datetime;
}


// vector download
function downloadVector() {
    // show map loading
    $("#download_vector").html('Vector loading...<img src="images/preloader.gif" alt="Preloader" class="map_loader" />');
    $("#download_vector").addClass("gray");

    // create options object
    var mapOptions = {
        startLat: map.getBounds()._northEast.lat,
        startLon: map.getBounds()._northEast.lng,
        endLat: map.getBounds()._southWest.lat,
        endLon: map.getBounds()._southWest.lng,
        width: $("#map").width(),
        height: $("#map").height(),
        sizeDesc: $("#preset_sizes").val(),
        zoomLevel: Math.floor(map.getZoom()),
        layers_visible: [],
        custom_labels: [],
        lineFeatures: lineFeatures,
        pointFeatures: pointFeatures,
        polygonFeatures: polygonFeatures,
        backgroundImg: '',
        apikey:configOptions['mapzen-api'],
        'coord-submit': 'submit'
    }

    // loop through visible layers
    $("#checkboxes input").each(function(){
        // if checked and also not labels and also not half transparent
        if (($(this)[0].checked == true || $(this).prop('indeterminate') == true) && $(this)[0].id.indexOf('labels') == -1 && !$(this).parent().hasClass('unavailable')) {
            mapOptions['layers_visible'].push($(this)[0].id);
        }
    });

    // if terrain's visible, grab the blob!
    console.log(mapOptions);
    var terrainBlob;
    if (mapOptions['layers_visible'].indexOf("terrain_visible") > -1) {
        console.log("you want the terrain!");

        // remove old terrain
        $("#terrain-img").remove();

        // create list of labels to turn back on
        var onLabels = [];

        // turn off every layer except terrain
        // loop through visible layers
        $("#checkboxes input").each(function(){
            // if checked and also not labels and also not half transparent
            if (($(this)[0].checked == true || $(this).prop('indeterminate') == true)) {
                var idname = $(this)[0].id;
                onLabels.push(idname); // push into list to reactivate later
                $(this).attr("checked", false); // uncheck
                scene.config.global[idname] = false; // turn off



            }
        });

        parentChecks(); // check parent checks
        scene.updateConfig(); // update scene
        // map done loading


        // wait one second
        setTimeout(function() {
            scene.screenshot().then(function(screenshot) {

                // capture terrain and strap it to the page
                terrainBlob = screenshot.url;
                var baseIMG = new Image();
                baseIMG.src = screenshot.url;
                baseIMG.id = "terrain-img";
                $("body").append(baseIMG);

                // reset everything
                for (var i = 0; i < onLabels.length; i++) {
                    document.getElementById(onLabels[i]).checked = true;
                    scene.config.global[onLabels[i]] = true; // turn on
                }

                // do your update
                parentChecks(); // check parent checks
                scene.updateConfig(); // update scene

                // slam onto vector file
                goVector();

            });
        }, 1000);

    } else {
        // if no terrain selected
        goVector();
    }

    function goVector() {
        console.log("goVector");
        createVector(JSON.stringify(mapOptions),terrainBlob)
        .then((result) => {

                // $("#download_vector").html('Download vector');
                // $("#download_vector").removeClass("gray");
        }).catch((err) => {
            alert('Problem downloading file');
            console.log(err);

            $("#download_vector").html('Download vector');
            $("#download_vector").removeClass("gray");

        });
    }


}
