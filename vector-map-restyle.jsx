/*
Adobe Illustrator Map Maker conversion script version 1.1

UPDATES: 
Faster: conversion takes one third of the time of the original script
Fixes problems with JSON upload colors
Adds document colors to swatches palette



Once a Map Maker SVG is opened in Illustrator, go to File > Scripts > Other Scripts and select this file. Data types are grouped by layer.

The script selects data by group and applys a series of styles that can be customized below, including:
• Colors set to specific CMYK values, ensuring there are no process blacks
• Define stroke and fills of each group 
• Define dashes and end caps for lines

The script also generates other items that can be customized based on your specs:
• 5 col and 6 col guides
• Text layer with some of our predefined map styles
• A second artboard in 16x9 ratio that we use for web maps

• It's still a little slow. Illustrator is not the greatest renderer of javascript. The larger the file, the longer it takes.
• Memory errors seem to be gone but occasionally seeing new errors that are not consistent. Please report any errors you get https://github.com/datadesk/web-map-maker/issues.
• This is my first Illustrator script. Illustrator employs a bastardized version of javascript with it's own document object model. In fact, I've employed some really weird hacks, including writing an Illustrator Action to your desktop, running it and then deleting it. If you have fixes, pass them on.
• It's incomplete. Given the problems with Illustrator we're probably going to switch to an Apache Batik conversion. We'll share the Batik solution when we get it working.

@lendegroot

Los Angeles Times
@latimesgraphics

*/


// define the doc
var doc = app.activeDocument;

app.executeMenuCommand("doc-color-cmyk");


// define "sources" font
var defaultFont = "BentonGothic-Regular";

// define colors
var highwayColor = new CMYKColor(); highwayColor.black = 40; highwayColor.cyan = 0; highwayColor.magenta = 0; highwayColor.yellow = 0;
var majorRoadColor = new CMYKColor(); majorRoadColor.black = 30; majorRoadColor.cyan = 0; majorRoadColor.magenta = 0; majorRoadColor.yellow = 0;
var minorRoadColor = new CMYKColor(); minorRoadColor.black = 20; minorRoadColor.cyan = 0; minorRoadColor.magenta = 0; minorRoadColor.yellow = 0;
var pathColor = new CMYKColor(); pathColor.black = 20; pathColor.cyan = 0; pathColor.magenta = 0; pathColor.yellow = 0;
var railColor = new CMYKColor(); railColor.black = 20; railColor.cyan = 0; railColor.magenta = 0; railColor.yellow = 0;
var runwayColor = new CMYKColor(); runwayColor.black = 15; runwayColor.cyan = 0; runwayColor.magenta = 0; runwayColor.yellow = 0;
var taxiwayColor = new CMYKColor(); taxiwayColor.black = 15; taxiwayColor.cyan = 0; taxiwayColor.magenta = 0; taxiwayColor.yellow = 0;
var ferryColor = new CMYKColor(); ferryColor.black = 0; ferryColor.cyan = 45; ferryColor.magenta = 20; ferryColor.yellow = 10;
// borders
var countryBorderColor = new CMYKColor(); countryBorderColor.black = 50; countryBorderColor.cyan = 0; countryBorderColor.magenta = 0; countryBorderColor.yellow = 0;
var otherBorderColor = new CMYKColor(); otherBorderColor.black = 30; otherBorderColor.cyan = 0; otherBorderColor.magenta = 0; otherBorderColor.yellow = 0;

// define land use colors
var earthColor = new CMYKColor(); earthColor.black = 0; earthColor.cyan = 0; earthColor.magenta = 0; earthColor.yellow = 0;
var waterColor = new CMYKColor(); waterColor.black = 0; waterColor.cyan = 30; waterColor.magenta = 0; waterColor.yellow = 5;
var airportColor = new CMYKColor(); airportColor.black = 6; airportColor.cyan = 5; airportColor.magenta = 0; airportColor.yellow = 0;
var beachColor = new CMYKColor(); beachColor.black = 0; beachColor.cyan = 0; beachColor.magenta = 0; beachColor.yellow = 13;
var cemeteryColor = new CMYKColor(); cemeteryColor.black = 0; cemeteryColor.cyan = 7; cemeteryColor.magenta = 5; cemeteryColor.yellow = 9;
var forestColor = new CMYKColor(); forestColor.black = 0; forestColor.cyan = 9; forestColor.magenta = 0; forestColor.yellow = 16;
var hospitalColor = new CMYKColor(); hospitalColor.black = 6; hospitalColor.cyan = 5; hospitalColor.magenta = 0; hospitalColor.yellow = 0;
var militaryColor = new CMYKColor(); militaryColor.black = 6; militaryColor.cyan = 5; militaryColor.magenta = 0; militaryColor.yellow = 0;
var parkColor = new CMYKColor(); parkColor.black = 0; parkColor.cyan = 9; parkColor.magenta = 0; parkColor.yellow = 16;
var resortColor = new CMYKColor(); resortColor.black = 0; resortColor.cyan = 0; resortColor.magenta = 0; resortColor.yellow = 13;
var schoolColor = new CMYKColor(); schoolColor.black = 6; schoolColor.cyan = 5; schoolColor.magenta = 0; schoolColor.yellow = 0;
var stadiumColor = new CMYKColor(); stadiumColor.black = 0; stadiumColor.cyan = 0; stadiumColor.magenta = 0; stadiumColor.yellow = 13;
var prisonColor = new CMYKColor(); prisonColor.black = 6; prisonColor.cyan = 5; prisonColor.magenta = 0; prisonColor.yellow = 0;
var wetlandColor = new CMYKColor(); wetlandColor.black = 0; wetlandColor.cyan = 11; wetlandColor.magenta = 3; wetlandColor.yellow = 15;
var buildingColor = new CMYKColor(); buildingColor.black = 10; buildingColor.cyan = 0; buildingColor.magenta = 0; buildingColor.yellow = 0;
// farm?
// json upload features
var geojsonColor = new CMYKColor(); geojsonColor.black = 10; geojsonColor.cyan = 7; geojsonColor.magenta = 61; geojsonColor.yellow = 88;


var textBlack = new CMYKColor(); textBlack.black = 10; textBlack.cyan = 7; textBlack.magenta = 61; textBlack.yellow = 88;
var textGray = new CMYKColor(); textGray.black = 60; textGray.cyan = 0; textGray.magenta = 0; textGray.yellow = 0;

// ***** add used colors to swatches ***** 

// write an Illustrator Action to the desktop
var actionString = [
  "/version 3",
  "/name [ 14",
  " 637573746f6d20616374696f6e73",
  "]",
  "/isOpen 1",
  "/actionCount 1",
  "/action-1 {",
  " /name [ 12",
  "  616464207377617463686573",
  " ]",
  " /keyIndex 0",
  " /colorIndex 0",
  " /isOpen 1",
  " /eventCount 1",
  " /event-1 {",
  "  /useRulersIn1stQuadrant 0",
  "  /internalName (ai_plugin_swatches)",
  "  /localizedName [ 8",
  "   5377617463686573",
  "  ]",
  "  /isOpen 1",
  "  /isOn 1",
  "  /hasDialog 0",
  "  /parameterCount 2",
  "  /parameter-1 {",
  "   /key 1835363957",
  "   /showInPalette 4294967295",
  "   /type (enumerated)",
  "   /name [ 15",
  "    416464205573656420436f6c6f7273",
  "   ]",
  "   /value 9",
  "  }",
  "  /parameter-2 {",
  "   /key 1634495605",
  "   /showInPalette 4294967295",
  "   /type (boolean)",
  "   /value 1",
  "  }",
  " }",
  "}"
].join("\n");

function writeFile(fileDestStr, contents){   
    var newFile = File(fileDestStr);   
    newFile.open('w');   
    newFile.write(contents);   
    newFile.close();   
  };

var actionFileDestStr = Folder.desktop + "/add_used_colors.aia"; 

writeFile(actionFileDestStr, actionString);   
var actionFile = File(actionFileDestStr);   
app.loadAction(actionFile);   
app.doScript("add swatches", "custom actions");

//clean up  
actionFile.remove();  
app.unloadAction("custom actions", ''); // NOT WORKING?????

function swatchExist(swatchName){
  try{
    doc.spots.getByName(swatchName);
    }catch(e){return false;}
    return true;
};

// change swatch colors
if ( swatchExist("C=37 M=30 Y=31 K=0")){ doc.spots ['C=37 M=30 Y=31 K=0'].color = highwayColor;};
if ( swatchExist("C=26 M=20 Y=20 K=0")){ doc.spots ['C=26 M=20 Y=20 K=0'].color = majorRoadColor;};
if ( swatchExist("C=19 M=13 Y=14 K=0")){ doc.spots ['C=19 M=13 Y=14 K=0'].color = minorRoadColor;}; // includes rail, runway, taxiway
if ( swatchExist("C=46 M=20 Y=10 K=0")){ doc.spots ['C=46 M=20 Y=10 K=0'].color = ferryColor;};
// if ( swatchExist("C=80 M=82 Y=17 K=4")){ doc.spots ['C=80 M=82 Y=17 K=4'].color = countryBorderColor;};  
if ( swatchExist("C=49 M=49 Y=46 K=11")){ doc.spots ['C=49 M=49 Y=46 K=11'].color = otherBorderColor;};
if ( swatchExist("C=0 M=0 Y=0 K=0")){ doc.spots ['C=0 M=0 Y=0 K=0'].color = earthColor;};
if ( swatchExist("C=31 M=4 Y=0 K=0")){ doc.spots ['C=31 M=4 Y=0 K=0'].color = waterColor;};
if ( swatchExist("C=2 M=2 Y=12 K=0")){ doc.spots ['C=2 M=2 Y=12 K=0'].color = beachColor;};
if ( swatchExist("C=10 M=6 Y=16 K=0")){ doc.spots ['C=10 M=6 Y=16 K=0'].color = cemeteryColor;};
if ( swatchExist("C=10 M=2 Y=4 K=0")){ doc.spots ['C=10 M=2 Y=4 K=0'].color = hospitalColor;};
if ( swatchExist("C=5 M=3 Y=4 K=0")){ doc.spots ['C=5 M=3 Y=4 K=0'].color = militaryColor;}; // includes airport, prison
if ( swatchExist("C=10 M=0 Y=26 K=0")){ doc.spots ['C=10 M=0 Y=26 K=0'].color = parkColor;}; // includes forest
if ( swatchExist("C=4 M=3 Y=8 K=0")){ doc.spots ['C=4 M=3 Y=8 K=0'].color = schoolColor;};// university duplicates school
if ( swatchExist("C=60 M=51 Y=51 K=20")){ doc.spots ['C=2 M=2 Y=18 K=0'].color = stadiumColor;};
if ( swatchExist("C=11 M=3 Y=15 K=0")){ doc.spots ['C=11 M=3 Y=15 K=0'].color = wetlandColor;};
if ( swatchExist("C=2 M=1 Y=0 K=0")){ doc.spots ['C=2 M=1 Y=0 K=0'].color = buildingColor;};
if ( swatchExist("C=16 M=64 Y=88 K=3")){ doc.spots ['C=16 M=64 Y=88 K=3'].color = geojsonColor;};



// change swatch names
for (var i = 0; i < doc.swatches.length; i++) {
  //doc.swatches[i].name = doc.swatches[i].name.split('C=75 M=68 Y=67 K=90').join('100K');
    doc.swatches[i].name = doc.swatches[i].name.replace('C=37 M=30 Y=31 K=0', 'highway');
    doc.swatches[i].name = doc.swatches[i].name.replace('C=26 M=20 Y=20 K=0', 'majorRoad');
    doc.swatches[i].name = doc.swatches[i].name.replace('C=19 M=13 Y=14 K=0', 'minor road, runway, taxiway, rail');
    doc.swatches[i].name = doc.swatches[i].name.replace('C=46 M=20 Y=10 K=0', 'ferry');
    doc.swatches[i].name = doc.swatches[i].name.replace('C=49 M=49 Y=46 K=11', 'borders, boundaries');
    // doc.swatches[i].name = doc.swatches[i].name.replace('C=36 M=53 Y=98 K=19', 'country border');
    doc.swatches[i].name = doc.swatches[i].name.replace('C=0 M=0 Y=0 K=0', 'earth');
    doc.swatches[i].name = doc.swatches[i].name.replace('C=31 M=4 Y=0 K=0', 'water');
    doc.swatches[i].name = doc.swatches[i].name.replace('C=2 M=2 Y=12 K=0', 'beach');
    doc.swatches[i].name = doc.swatches[i].name.replace('C=10 M=6 Y=16 K=0', 'cemetery');
    doc.swatches[i].name = doc.swatches[i].name.replace('C=10 M=2 Y=4 K=0', 'hospital');
    doc.swatches[i].name = doc.swatches[i].name.replace('C=5 M=3 Y=4 K=0', 'airport, military, prison');
    doc.swatches[i].name = doc.swatches[i].name.replace('C=10 M=0 Y=26 K=0', 'park, forest');
    doc.swatches[i].name = doc.swatches[i].name.replace('C=4 M=3 Y=8 K=0', 'school, university');
    doc.swatches[i].name = doc.swatches[i].name.replace('C=2 M=2 Y=18 K=0', 'resort, stadium');
    doc.swatches[i].name = doc.swatches[i].name.replace('C=11 M=3 Y=15 K=0', 'wetland');
    doc.swatches[i].name = doc.swatches[i].name.replace('C=2 M=1 Y=0 K=0', 'building');
    doc.swatches[i].name = doc.swatches[i].name.replace('C=16 M=64 Y=88 K=3', 'geojson upload');
}


// make sure layer exists before running any conversions
function groupExist(groupName) {
  try {
    doc.pageItems.getByName(groupName);
  } catch (e) {
    return false;
  }
  return true;
};


if( groupExist('stadium')){doc.pageItems.getByName('stadium').blendingMode = BlendModes.MULTIPLY;}
if( groupExist('university')){doc.pageItems.getByName('university').blendingMode = BlendModes.MULTIPLY;}
if( groupExist('school')){doc.pageItems.getByName('school').blendingMode = BlendModes.MULTIPLY;}
if( groupExist('resort')){doc.pageItems.getByName('resort').blendingMode = BlendModes.MULTIPLY;}
if( groupExist('park')){doc.pageItems.getByName('park').blendingMode = BlendModes.DARKEN;}
if( groupExist('military')){doc.pageItems.getByName('military').blendingMode = BlendModes.MULTIPLY;}
if( groupExist('hospital')){doc.pageItems.getByName('hospital').blendingMode = BlendModes.MULTIPLY;}
if( groupExist('forest')){doc.pageItems.getByName('forest').blendingMode = BlendModes.DARKEN;}
if( groupExist('cemetery')){doc.pageItems.getByName('cemetery').blendingMode = BlendModes.MULTIPLY;}
if( groupExist('airport')){doc.pageItems.getByName('airport').blendingMode = BlendModes.MULTIPLY;}
if( groupExist('prison')){doc.pageItems.getByName('prison').blendingMode = BlendModes.MULTIPLY;}
if( groupExist('wetland')){doc.pageItems.getByName('wetland').blendingMode = BlendModes.MULTIPLY;}
if( groupExist('building')){doc.pageItems.getByName('building').blendingMode = BlendModes.MULTIPLY;}
if( groupExist('park')){doc.pageItems.getByName('park').blendingMode = BlendModes.MULTIPLY;}
if( groupExist('polygonFeatures')){doc.pageItems.getByName('polygonFeatures').blendingMode = BlendModes.MULTIPLY;}

if( groupExist('polygonFeatures')){doc.pageItems.getByName('polygonFeatures').opacity = 80;}


// fix lines, borders with clunky conditionals for easier editing


//set line dashes
function changeLineDash(group) {
  if(group == "highway") { return []; }
  else if (group == "highwaylink") { return []; }
  else if (group == "majorroad") { return []; }
  else if (group == "minorroad") { return []; }
  else if (group == "path") { return [1,1]; }
  else if (group == "rail") { return [1,1]; }
  else if (group == "runway") { return []; }
  else if (group == "taxiway") { return []; }
  else if (group == "ferry") { return [1,1]; }
  //boundries
  else if (group == "country") { return []; }
  else if (group == "disputed") { return [2,2]; }
  else if (group == "indefinite") { return []; }
  else if (group == "interminate") { return []; }
  else if (group == "region") { return []; }
  else if (group == "county") { return [12,2,2,2]; }

}

function changeEndCap(group) {
  if(group == "highway") { return StrokeCap.ROUNDENDCAP; }
  else if (group == "highwaylink") { return StrokeCap.ROUNDENDCAP; }
  else if (group == "majorroad") { return StrokeCap.ROUNDENDCAP; }
  else if (group == "minorroad") { return StrokeCap.ROUNDENDCAP; }
  else if (group == "path") { return StrokeCap.ROUNDENDCAP; }
  else if (group == "rail") { return StrokeCap.BUTTENDCAP; }
  else if (group == "runway") { return StrokeCap.ROUNDENDCAP; }
  else if (group == "taxiway") { return StrokeCap.ROUNDENDCAP; }
  else if (group == "ferry") { return StrokeCap.BUTTENDCAP; }

  //boundries
  else if (group == "country") { return StrokeCap.ROUNDENDCAP; }
  else if (group == "disputed") { return StrokeCap.BUTTENDCAP; }
  else if (group == "indefinite") { return StrokeCap.BUTTENDCAP; }
  else if (group == "interminate") { return StrokeCap.BUTTENDCAP; }
  else if (group == "region") { return StrokeCap.BUTTENDCAP; }
  else if (group == "county") { return StrokeCap.BUTTENDCAP; }

}

$.sleep(100);
//
function convertForPrint(group) {
  var pItem = doc.pageItems.getByName(group);
  if (pItem.pathItems.length > 0) {
    for (var i = 0; i < pItem.pathItems.length; i++) {
      pathRef = pItem.pathItems[i];
      pathRef.strokeDashes = changeLineDash(group);
      pathRef.strokeJoin = StrokeJoin.ROUNDENDJOIN;
      pathRef.strokeCap = changeEndCap(group);
    }
  }
  
  if (pItem.compoundPathItems.length > 0) {
    var compoundPaths = pItem.compoundPathItems;
    for (i = 0; i < compoundPaths.length; i++) {
      var compoundPath = compoundPaths[i];
      var pathItems = compoundPath.pathItems;
      for (j = 0; j < pathItems.length; j++) {
        var pathItem = pathItems[j];
        pathItem.strokeDashes = changeLineDash(group);
        pathItem.strokeJoin = StrokeJoin.ROUNDENDJOIN;
        pathItem.strokeCap = changeEndCap(group);
      }
    }
  }
}




if( groupExist("highway")){ convertForPrint("highway"); }
if( groupExist("highwaylink")){ convertForPrint("highwaylink"); }
if( groupExist("majorroad")){ convertForPrint("majorroad"); }
if( groupExist("minorroad")){ convertForPrint("minorroad"); }
if( groupExist("path")){ convertForPrint("path"); }
if( groupExist("rail")){ convertForPrint("rail"); }
if( groupExist("runway")){ convertForPrint("runway"); }
if( groupExist("taxiway")){ convertForPrint("taxiway"); }
if( groupExist("ferry")){ convertForPrint("ferry"); }
//
if( groupExist("country")){ convertForPrint("country"); }
if( groupExist("disputed")){ convertForPrint("disputed"); }
if( groupExist("indefinite")){ convertForPrint("indefinite"); }
if( groupExist("interminate")){ convertForPrint("interminate"); }
if( groupExist("region")){ convertForPrint("region"); }
if( groupExist("county")){ convertForPrint("county"); }



$.sleep(100);



var rasterizeOptions = new RasterizeOptions();
// rasterizeOptions.transparency = false ;
rasterizeOptions.colorModel = RasterizationColorModel.GRAYSCALE;
rasterizeOptions.resolution = 72.0;


function grayscaleRasterProcess (item) {
    $.writeln(item.name);
    if (/^terrainimg/.exec(item.name)) {
        app.activeDocument.rasterize(item, null, rasterizeOptions).name="terrainbase";
    } else {
        if (item.layers) {
            for (var i = 0; i < item.layers.length; i++) {
                grayscaleRasterProcess(item.layers[i]);
            }
        }
        if (item.groupItems) {
            for (var i = 0; i < item.groupItems.length; i++) {
                grayscaleRasterProcess(item.groupItems[i]);

            }
        }
    }
}

grayscaleRasterProcess(app.activeDocument);

app.activeDocument.rasterItems.getByName("terrainbase").duplicate().name="terrainmultiply";
app.activeDocument.rasterItems.getByName("terrainmultiply").blendingMode=BlendModes.MULTIPLY;
app.activeDocument.rasterItems.getByName("terrainmultiply").opacity=50;



