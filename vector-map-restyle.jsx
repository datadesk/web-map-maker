/*
Adobe Illustrator Map Maker conversion script

Once a Map Maker SVG is opened in Illustrator, go to File > Scripts > Other Scripts and select this file. Data types are grouped by layer.

The script selects data by group and applys a series of styles that can be customized below, including:
• Colors set to specific CMYK values, ensuring there are no process blacks
• Define stroke and fills of each group 
• Define dashes and end caps for lines

The script also generates other items that can be customized based on your specs:
• 5 col and 6 col guides
• Text layer with some of our predefined map styles. You will need to add your fonts and uncomment
• A second artboard in 16x9 ratio that we use for web maps

CAVEATS
• It's sloooooow. Illustrator is not the greatest renderer of javascript. The larger the file, the slower it gets.
• It occasionally errors out (out of memory is our best guess). Quiting Illustrator and rerunning usually allows the script to finish.
• This is my first Illutrator script. Illustrator employs a bastardized version of javascript with it's own document model so this may not be written in the most efficent way. If you have fixes, pass them on.
• It's incomplete. Given the problems with Illustrator we're probably going to switch to an Apache Batik conversion. As a result, I haven't spent much time on optimization. We'll share the Batik solotion when we get it working.
• Include Mapzen and OpenStreetMap as sources. It's in the TOS if you want to use this product

@lendegroot

Los Angeles Times
@latimesgraphics

*/


// define the doc
var doc = app.activeDocument;

app.executeMenuCommand("doc-color-cmyk");


// define "sources" font
// var defaultFont = "BentonGothic Regular";

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
var disputedBorderColor = new CMYKColor(); disputedBorderColor.black = 30; disputedBorderColor.cyan = 0; disputedBorderColor.magenta = 0; disputedBorderColor.yellow = 0;
var indefiniteBorderColor = new CMYKColor(); indefiniteBorderColor.black = 30; indefiniteBorderColor.cyan = 0; indefiniteBorderColor.magenta = 0; indefiniteBorderColor.yellow = 0;
var interminateBorderColor = new CMYKColor(); interminateBorderColor.black = 30; interminateBorderColor.cyan = 0; interminateBorderColor.magenta = 0; interminateBorderColor.yellow = 0;
var stateBorderColor = new CMYKColor(); stateBorderColor.black = 30; stateBorderColor.cyan = 0; stateBorderColor.magenta = 0; stateBorderColor.yellow = 0;
var countyBorderColor = new CMYKColor(); countyBorderColor.black = 30; countyBorderColor.cyan = 0; countyBorderColor.magenta = 0; countyBorderColor.yellow = 0;

// define land use colors
var earthColor = new CMYKColor(); earthColor.black = 0; earthColor.cyan = 0; earthColor.magenta = 0; earthColor.yellow = 0;
var waterColor = new CMYKColor(); waterColor.black = 0; waterColor.cyan = 25; waterColor.magenta = 0; waterColor.yellow = 5;
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
var polygonColor = new CMYKColor(); polygonColor.black = 10; polygonColor.cyan = 7; polygonColor.magenta = 61; polygonColor.yellow = 88;
var lineColor = new CMYKColor(); polygonColor.black = 10; polygonColor.cyan = 7; polygonColor.magenta = 61; polygonColor.yellow = 88;
var pointColor = new CMYKColor(); polygonColor.black = 10; polygonColor.cyan = 7; polygonColor.magenta = 61; polygonColor.yellow = 88;

var textBlack = new CMYKColor(); textBlack.black = 10; textBlack.cyan = 7; textBlack.magenta = 61; textBlack.yellow = 88;
var textGray = new CMYKColor(); textGray.black = 60; textGray.cyan = 0; textGray.magenta = 0; textGray.yellow = 0;



// clunky conditionals for easier editing

// define if it has a fill
function isFilled(group) {
  //roads
  if(group == "highway") { return false; }
  else if (group == "highwaylink") { return false; }
  else if (group == "majorroad") { return false; }
  else if (group == "minorroad") { return false; }
  else if (group == "path") { return false; }
  else if (group == "rail") { return false; }
  else if (group == "runway") { return false; }
  else if (group == "taxiway") { return false; }
  else if (group == "ferry") { return false; }
  //landuse
  else if (group == "earth") { return true; }
  else if (group == "university") { return true; }
  else if (group == "stadium") { return true; }
  else if (group == "school") { return true; }
  else if (group == "resort") { return true; }
  else if (group == "park") { return true; }
  else if (group == "military") { return true; }
  else if (group == "hospital") { return true; }
  else if (group == "forest") { return true; }
  else if (group == "cemetery") { return true; }
  else if (group == "beach") { return true; }
  else if (group == "airport") { return true; }
  else if (group == "prison") { return true; }
  else if (group == "wetland") { return true; }
  else if (group == "building") { return true; }
  //boundries
  else if (group == "country") { return false; }
  else if (group == "disputed") { return false; }
  else if (group == "indefinite") { return false; }
  else if (group == "interminate") { return false; }
  else if (group == "region") { return false; }
  else if (group == "county") { return false; }
  //water
  else if (group == "oceanwater") { return true; }
  else if (group == "basin") { return true; }
  else if (group == "bay") { return true; }
  else if (group == "lake") { return true; }
  else if (group == "river") { return false; }
  else if (group == "riverbank") { return true; }
  else if (group == "stream") { return false; }
  else if (group == "swimmingpool") { return true; }
  else if (group == "dock") { return true; }
  else if (group == "wateretc") { return true; }
  // json features
  else if (group == "polygonFeatures") { return true; }
  else if (group == "lineFeatures") { return false; }
  else if (group == "pointFeatures") { return false; }
}

// define if it has a color
function hasFillcolor(group) {
  if(group == "highway") { return highwayColor; }
  else if (group == "highwaylink") { return highwayColor; }
  else if (group == "majorroad") { return majorRoadColor; }
  else if (group == "minorroad") { return minorRoadColor; }
  else if (group == "path") { return pathColor; }
  else if (group == "rail") { return railColor; }
  else if (group == "runway") { return runwayColor; }
  else if (group == "taxiway") { return taxiwayColor; }
  else if (group == "ferry") { return ferryColor; }
  //landuse
  else if (group == "earth") { return earthColor; }
  else if (group == "university") { return schoolColor; }
  else if (group == "stadium") { return stadiumColor; }
  else if (group == "school") { return schoolColor; }
  else if (group == "resort") { return resortColor; }
  else if (group == "park") { return parkColor; }
  else if (group == "military") { return militaryColor; }
  else if (group == "hospital") { return hospitalColor; }
  else if (group == "forest") { return forestColor; }
  else if (group == "cemetery") { return cemeteryColor; }
  else if (group == "beach") { return beachColor; }
  else if (group == "airport") { return airportColor; }
  else if (group == "prison") { return prisonColor; }
  else if (group == "wetland") { return wetlandColor; }
  else if (group == "building") { return buildingColor; }
  //boundries
  else if (group == "country") { return countyBorderColor; }
  else if (group == "disputed") { return disputedBorderColor; }
  else if (group == "indefinite") { return indefiniteBorderColor; }
  else if (group == "interminate") { return interminateBorderColor; }
  else if (group == "region") { return stateBorderColor; }
  else if (group == "county") { return countyBorderColor; }
  //water
  else if (group == "oceanwater") { return waterColor; }
  else if (group == "basin") { return waterColor; }
  else if (group == "bay") { return waterColor; }
  else if (group == "lake") { return waterColor; }
  else if (group == "river") { return waterColor; }
  else if (group == "riverbank") { return waterColor; }
  else if (group == "stream") { return waterColor; }
  else if (group == "swimmingpool") { return waterColor; }
  else if (group == "dock") { return earthColor; }
  else if (group == "wateretc") { return waterColor; }
  // json features
  else if (group == "polygonFeatures") { return polygonColor; }
  else if (group == "lineFeatures") { return lineColor; }
  else if (group == "pointFeatures") { return pointColor; }
}

// define if it has a line
function isStroked(group) {
  if(group == "highway") { return true; }
  else if (group == "highwaylink") { return true; }
  else if (group == "majorroad") { return true; }
  else if (group == "minorroad") { return true; }
  else if (group == "path") { return true; }
  else if (group == "rail") { return true; }
  else if (group == "runway") { return true; }
  else if (group == "taxiway") { return true; }
  else if (group == "ferry") { return true; }
  //landuse
  else if (group == "earth") { return false; }
  else if (group == "university") { return false; }
  else if (group == "stadium") { return false; }
  else if (group == "school") { return false; }
  else if (group == "resort") { return false; }
  else if (group == "park") { return false; }
  else if (group == "military") { return false; }
  else if (group == "hospital") { return false; }
  else if (group == "forest") { return false; }
  else if (group == "cemetery") { return false; }
  else if (group == "beach") { return false; }
  else if (group == "airport") { return false; }
  else if (group == "prison") { return false; }
  else if (group == "wetland") { return false; }
  else if (group == "building") { return false; }
  //boundries
  else if (group == "country") { return true; }
  else if (group == "disputed") { return true; }
  else if (group == "indefinite") { return true; }
  else if (group == "interminate") { return true; }
  else if (group == "region") { return true; }
  else if (group == "county") { return true; }
  //water
  else if (group == "oceanwater") { return false; }
  else if (group == "basin") { return false; }
  else if (group == "bay") { return false; }
  else if (group == "lake") { return false; }
  else if (group == "river") { return true; }
  else if (group == "riverbank") { return false; }
  else if (group == "stream") { return true; }
  else if (group == "swimmingpool") { return false; }
  else if (group == "dock") { return false; }
  else if (group == "wateretc") { return false; }
  // json features
  else if (group == "polygonFeatures") { return false; }
  else if (group == "lineFeatures") { return true; }
  else if (group == "pointFeatures") { return true; }

}

// set the line color
function hasStrokeColor(group) {
  if(group == "highway") { return highwayColor; }
  else if (group == "highwaylink") { return highwayColor; }
  else if (group == "majorroad") { return majorRoadColor; }
  else if (group == "minorroad") { return minorRoadColor; }
  else if (group == "path") { return pathColor; }
  else if (group == "rail") { return railColor; }
  else if (group == "runway") { return runwayColor; }
  else if (group == "taxiway") { return taxiwayColor; }
  else if (group == "ferry") { return ferryColor; }
  //landuse
  else if (group == "earth") { return earthColor; }
  else if (group == "university") { return schoolColor; }
  else if (group == "stadium") { return stadiumColor; }
  else if (group == "school") { return schoolColor; }
  else if (group == "resort") { return resortColor; }
  else if (group == "park") { return parkColor; }
  else if (group == "military") { return militaryColor; }
  else if (group == "hospital") { return hospitalColor; }
  else if (group == "forest") { return forestColor; }
  else if (group == "cemetery") { return cemeteryColor; }
  else if (group == "beach") { return beachColor; }
  else if (group == "airport") { return airportColor; }
  else if (group == "prison") { return prisonColor; }
  else if (group == "wetland") { return wetlandColor; }
  else if (group == "building") { return buildingColor; }
  //boundries
  else if (group == "country") { return countyBorderColor; }
  else if (group == "disputed") { return disputedBorderColor; }
  else if (group == "indefinite") { return indefiniteBorderColor; }
  else if (group == "interminate") { return interminateBorderColor; }
  else if (group == "region") { return stateBorderColor; }
  else if (group == "county") { return countyBorderColor; }
  //water
  else if (group == "oceanwater") { return waterColor; }
  else if (group == "basin") { return waterColor; }
  else if (group == "bay") { return waterColor; }
  else if (group == "lake") { return waterColor; }
  else if (group == "river") { return waterColor; }
  else if (group == "riverbank") { return waterColor; }
  else if (group == "stream") { return waterColor; }
  else if (group == "swimmingpool") { return waterColor; }
  else if (group == "dock") { return earthColor; }
  else if (group == "wateretc") { return waterColor; }
  // json features
  else if (group == "polygonFeatures") { return polygonColor; }
  else if (group == "lineFeatures") { return lineColor; }
  else if (group == "pointFeatures") { return pointColor; }
}

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
  //landuse
  else if (group == "earth") { return []; }
  else if (group == "university") { return []; }
  else if (group == "stadium") { return []; }
  else if (group == "school") { return []; }
  else if (group == "resort") { return []; }
  else if (group == "park") { return []; }
  else if (group == "military") { return []; }
  else if (group == "hospital") { return []; }
  else if (group == "forest") { return []; }
  else if (group == "cemetery") { return []; }
  else if (group == "beach") { return []; }
  else if (group == "airport") { return []; }
  else if (group == "prison") { return []; }
  else if (group == "wetland") { return []; }
  else if (group == "building") { return []; }
  //boundries
  else if (group == "country") { return []; }
  else if (group == "disputed") { return [2,2]; }
  else if (group == "indefinite") { return []; }
  else if (group == "interminate") { return []; }
  else if (group == "region") { return []; }
  else if (group == "county") { return [12,2,2,2]; }
  //water
  else if (group == "oceanwater") { return []; }
  else if (group == "basin") { return []; }
  else if (group == "bay") { return []; }
  else if (group == "lake") { return []; }
  else if (group == "river") { return []; }
  else if (group == "riverbank") { return []; }
  else if (group == "stream") { return []; }
  else if (group == "swimmingpool") { return []; }
  else if (group == "dock") { return []; }
  else if (group == "wateretc") { return []; }
  // json features
  else if (group == "polygonFeatures") { return []; }
  else if (group == "lineFeatures") { return []; }
  else if (group == "pointFeatures") { return []; }
}

function changeEndCap(group) {
  if(group == "highway") { return StrokeCap.ROUNDENDCAP; }
  else if (group == "highwaylink") { return StrokeCap.ROUNDENDCAP; }
  else if (group == "majorroad") { return StrokeCap.ROUNDENDCAP; }
  else if (group == "minorroad") { return StrokeCap.ROUNDENDCAP; }
  else if (group == "path") { return StrokeCap.ROUNDENDCAP; }
  else if (group == "rail") { return StrokeCap.PROJECTION; }
  else if (group == "runway") { return StrokeCap.ROUNDENDCAP; }
  else if (group == "taxiway") { return StrokeCap.ROUNDENDCAP; }
  else if (group == "ferry") { return StrokeCap.PROJECTION; }
  //landuse
  else if (group == "earth") { return StrokeCap.BUTTENDCAP; }
  else if (group == "university") { return StrokeCap.BUTTENDCAP; }
  else if (group == "stadium") { return StrokeCap.BUTTENDCAP; }
  else if (group == "school") { return StrokeCap.BUTTENDCAP; }
  else if (group == "resort") { return StrokeCap.BUTTENDCAP; }
  else if (group == "park") { return StrokeCap.BUTTENDCAP; }
  else if (group == "military") { return StrokeCap.BUTTENDCAP; }
  else if (group == "hospital") { return StrokeCap.BUTTENDCAP; }
  else if (group == "forest") { return StrokeCap.BUTTENDCAP; }
  else if (group == "cemetery") { return StrokeCap.BUTTENDCAP; }
  else if (group == "beach") { return StrokeCap.BUTTENDCAP; }
  else if (group == "airport") { return StrokeCap.BUTTENDCAP; }
  else if (group == "prison") { return StrokeCap.BUTTENDCAP; }
  else if (group == "wetland") { return StrokeCap.BUTTENDCAP; }
  else if (group == "building") { return StrokeCap.BUTTENDCAP; }
  //boundries
  else if (group == "country") { return StrokeCap.BUTTENDCAP; }
  else if (group == "disputed") { return StrokeCap.PROJECTION; }
  else if (group == "indefinite") { return StrokeCap.BUTTENDCAP; }
  else if (group == "interminate") { return StrokeCap.BUTTENDCAP; }
  else if (group == "region") { return StrokeCap.BUTTENDCAP; }
  else if (group == "county") { return StrokeCap.PROJECTION; }
  //water
  else if (group == "oceanwater") { return StrokeCap.BUTTENDCAP; }
  else if (group == "basin") { return StrokeCap.BUTTENDCAP; }
  else if (group == "bay") { return StrokeCap.BUTTENDCAP; }
  else if (group == "lake") { return StrokeCap.BUTTENDCAP; }
  else if (group == "river") { return StrokeCap.BUTTENDCAP; }
  else if (group == "riverbank") { return StrokeCap.BUTTENDCAP; }
  else if (group == "stream") { return StrokeCap.BUTTENDCAP; }
  else if (group == "swimmingpool") { return StrokeCap.BUTTENDCAP; }
  else if (group == "dock") { return StrokeCap.BUTTENDCAP; }
  else if (group == "wateretc") { return StrokeCap.BUTTENDCAP; }
  // json features
  else if (group == "polygonFeatures") { return StrokeCap.BUTTENDCAP; }
  else if (group == "lineFeatures") { return StrokeCap.BUTTENDCAP; }
  else if (group == "pointFeatures") { return StrokeCap.BUTTENDCAP; }
}


//
function convertForPrint(group) {
  var pItem = doc.pageItems.getByName(group);
  if (pItem.pathItems.length > 0) {
    for (var i = 0; i < pItem.pathItems.length; i++) {
      pathRef = pItem.pathItems[i];
      pathRef.fillColor = hasFillcolor(group);
      pathRef.filled = isFilled(group);
      pathRef.strokeColor = hasStrokeColor(group);
      pathRef.stroked = isStroked(group);
      pathRef.strokeDashes = changeLineDash(group);
      pathRef.strokeJoin = StrokeJoin.ROUNDENDJOIN;
      pathRef.strokeCap = changeEndCap(group);
    }
  }
  // $.sleep(100);
  if (pItem.compoundPathItems.length > 0) {
    var compoundPaths = pItem.compoundPathItems;
    for (i = 0; i < compoundPaths.length; i++) {
      var compoundPath = compoundPaths[i];
      var pathItems = compoundPath.pathItems;
      for (j = 0; j < pathItems.length; j++) {
        var pathItem = pathItems[j];
        pathItem.fillColor = hasFillcolor(group);
        pathItem.filled = isFilled(group);
        pathItem.strokeColor = hasStrokeColor(group);
        pathItem.stroked = isStroked(group);
        pathItem.strokeDashes = changeLineDash(group);
        pathItem.strokeJoin = StrokeJoin.ROUNDENDJOIN;
        pathItem.strokeCap = changeEndCap(group);
      }
    }
  }
}

// make sure layer exists before running the conversion
function groupExist(groupName) {
  try {
    doc.pageItems.getByName(groupName);
  } catch (e) {
    return false;
  }
  return true;
};


if( groupExist("highway")){ convertForPrint("highway"); } 
// $.sleep(100);
if( groupExist("highwaylink")){ convertForPrint("highwaylink"); }
if( groupExist("majorroad")){ convertForPrint("majorroad"); }
if( groupExist("minorroad")){ convertForPrint("minorroad"); }
if( groupExist("path")){ convertForPrint("path"); }
if( groupExist("rail")){ convertForPrint("rail"); }
if( groupExist("runway")){ convertForPrint("runway"); }
if( groupExist("taxiway")){ convertForPrint("taxiway"); }
if( groupExist("ferry")){ convertForPrint("ferry"); }

if( groupExist("earth")){ convertForPrint("earth"); }
if( groupExist("university")){ convertForPrint("university"); }
if( groupExist("stadium")){ convertForPrint("stadium"); }
if( groupExist("school")){ convertForPrint("school"); }
if( groupExist("resort")){ convertForPrint("resort"); }
// $.sleep(100);
if( groupExist("park")){ convertForPrint("park"); }
if( groupExist("military")){ convertForPrint("military"); }
if( groupExist("hospital")){ convertForPrint("hospital"); }
if( groupExist("forest")){ convertForPrint("forest"); }
if( groupExist("cemetery")){ convertForPrint("cemetery"); }
if( groupExist("beach")){ convertForPrint("beach"); }
if( groupExist("airport")){ convertForPrint("airport"); }
if( groupExist("prison")){ convertForPrint("prison"); }
if( groupExist("wetland")){ convertForPrint("wetland"); }
if( groupExist("building")){ convertForPrint("building"); }

if( groupExist("country")){ convertForPrint("country"); }
if( groupExist("disputed")){ convertForPrint("disputed"); }
if( groupExist("indefinite")){ convertForPrint("indefinite"); }
if( groupExist("interminate")){ convertForPrint("interminate"); }
if( groupExist("region")){ convertForPrint("region"); }
if( groupExist("county")){ convertForPrint("county"); }

if( groupExist("oceanwater")){ convertForPrint("oceanwater"); }
if( groupExist("basin")){ convertForPrint("basin"); }
if( groupExist("bay")){ convertForPrint("bay"); }
if( groupExist("lake")){ convertForPrint("lake"); }
if( groupExist("river")){ convertForPrint("river"); }
if( groupExist("riverbank")){ convertForPrint("riverbank"); }
if( groupExist("stream")){ convertForPrint("stream"); }
if( groupExist("swimmingpool")){ convertForPrint("swimmingpool"); }
if( groupExist("dock")){ convertForPrint("dock"); }
if( groupExist("wateretc")){ convertForPrint("wateretc"); }

if( groupExist("polygonFeatures")){ convertForPrint("polygonFeatures"); }
if( groupExist("lineFeatures")){ convertForPrint("lineFeatures"); }
if( groupExist("pointFeatures")){ convertForPrint("pointFeatures"); }



// *****  resize artboard  *****

// resizes artboard to clipping path if needed
var clippingBounds;

function clipScan () {
    for (i=doc.pageItems.length-1;i>=0;i--) {
        if (doc.pageItems[i].clipping == true){
            doc.pageItems[i].selected = true;
            doc.fitArtboardToSelectedArt(0);
            clippingBounds= doc.pageItems[i].visibleBounds;
            doc.selection = null;
        }
    }
};

clipScan();

// *****   add guides relative to the artboard placement  *****

function guides6() {
  var sixColGuide = doc.layers.add();
  sixColGuide.name = "guides_6_col";
  var newGuide61 = app.activeDocument.pathItems.add(); newGuide61.setEntirePath(Array(Array(clippingBounds[0], 1000), Array(clippingBounds[0], -1000))); newGuide61.guides = true;
  var newGuide62 = app.activeDocument.pathItems.add(); newGuide62.setEntirePath(Array(Array(clippingBounds[0] + 110.25, 1000), Array(clippingBounds[0] + 110.25, -1000))); newGuide62.guides = true;
  var newGuide63 = app.activeDocument.pathItems.add(); newGuide63.setEntirePath(Array(Array(clippingBounds[0] + 122.25, 1000), Array(clippingBounds[0] + 122.25, -1000))); newGuide63.guides = true;
  var newGuide64 = app.activeDocument.pathItems.add(); newGuide64.setEntirePath(Array(Array(clippingBounds[0] + 232.9, 1000), Array(clippingBounds[0] + 232.9, -1000))); newGuide64.guides = true;
  var newGuide65 = app.activeDocument.pathItems.add(); newGuide65.setEntirePath(Array(Array(clippingBounds[0] + 244.9, 1000), Array(clippingBounds[0] + 244.9, -1000))); newGuide65.guides = true;
  var newGuide66 = app.activeDocument.pathItems.add(); newGuide66.setEntirePath(Array(Array(clippingBounds[0] + 355.35, 1000), Array(clippingBounds[0] + 355.35, -1000))); newGuide66.guides = true;
  var newGuide67 = app.activeDocument.pathItems.add(); newGuide67.setEntirePath(Array(Array(clippingBounds[0] + 367.35, 1000), Array(clippingBounds[0] + 367.35, -1000))); newGuide67.guides = true;
  var newGuide68 = app.activeDocument.pathItems.add(); newGuide68.setEntirePath(Array(Array(clippingBounds[0] + 477.8, 1000), Array(clippingBounds[0] + 477.8, -1000))); newGuide68.guides = true;
  var newGuide69 = app.activeDocument.pathItems.add(); newGuide69.setEntirePath(Array(Array(clippingBounds[0] + 489.8, 1000), Array(clippingBounds[0] + 489.8, -1000))); newGuide69.guides = true;
  var newGuide70 = app.activeDocument.pathItems.add(); newGuide70.setEntirePath(Array(Array(clippingBounds[0] + 600.25, 1000), Array(clippingBounds[0] + 600.25, -1000))); newGuide70.guides = true;
  var newGuide71 = app.activeDocument.pathItems.add(); newGuide71.setEntirePath(Array(Array(clippingBounds[0] + 612.25, 1000), Array(clippingBounds[0] + 612.25, -1000))); newGuide71.guides = true;
  var newGuide72 = app.activeDocument.pathItems.add(); newGuide72.setEntirePath(Array(Array(clippingBounds[0] + 722.7, 1000), Array(clippingBounds[0] + 722.7, -1000))); newGuide72.guides = true;
  for (var i = doc.layers.length - 1; i >= 1; i--) {
    doc.layers[i].move(sixColGuide, ElementPlacement.PLACEBEFORE)
  };
}

guides6();


function guides5(){
  var fiveColGuide = doc.layers.add();   
  fiveColGuide.name = "guides_5_col";
  var newGuide51 = app.activeDocument.pathItems.add(); newGuide51.setEntirePath( Array( Array(clippingBounds[0], 1000), Array(clippingBounds[0], -1000) ) ); newGuide51.guides = true;
  var newGuide52 = app.activeDocument.pathItems.add(); newGuide52.setEntirePath( Array( Array(clippingBounds[0]+134.94, 1000), Array(clippingBounds[0]+134.94, -1000) ) ); newGuide52.guides = true;
  var newGuide53 = app.activeDocument.pathItems.add(); newGuide53.setEntirePath( Array( Array(clippingBounds[0]+146.94, 1000), Array(clippingBounds[0]+146.94, -1000) ) ); newGuide53.guides = true;
  var newGuide54 = app.activeDocument.pathItems.add(); newGuide54.setEntirePath( Array( Array(clippingBounds[0]+281.7, 1000), Array(clippingBounds[0]+281.7, -1000) ) ); newGuide54.guides = true;
  var newGuide55 = app.activeDocument.pathItems.add(); newGuide55.setEntirePath( Array( Array(clippingBounds[0]+293.7, 1000), Array(clippingBounds[0]+293.7, -1000) ) ); newGuide55.guides = true;
  var newGuide56 = app.activeDocument.pathItems.add(); newGuide56.setEntirePath( Array( Array(clippingBounds[0]+428.82, 1000), Array(clippingBounds[0]+428.82, -1000) ) ); newGuide56.guides = true;
  var newGuide57 = app.activeDocument.pathItems.add(); newGuide57.setEntirePath( Array( Array(clippingBounds[0]+440.82, 1000), Array(clippingBounds[0]+440.82, -1000) ) ); newGuide57.guides = true;
  var newGuide58 = app.activeDocument.pathItems.add(); newGuide58.setEntirePath( Array( Array(clippingBounds[0]+575.76, 1000), Array(clippingBounds[0]+575.76, -1000) ) ); newGuide58.guides = true;
  var newGuide59 = app.activeDocument.pathItems.add(); newGuide59.setEntirePath( Array( Array(clippingBounds[0]+587.76, 1000), Array(clippingBounds[0]+587.76, -1000) ) ); newGuide59.guides = true;
  var newGuide50 = app.activeDocument.pathItems.add(); newGuide50.setEntirePath( Array( Array(clippingBounds[0]+722.7, 1000), Array(clippingBounds[0]+722.7, -1000) ) ); newGuide50.guides = true;
  for ( var  i = doc.layers.length-1; i >= 1; i-- ) {  
    doc.layers[i].move( fiveColGuide, ElementPlacement.PLACEBEFORE )  
  };
fiveColGuide.visible = false;
}
guides5();

// ***** add web artboard  *****

var newRect = function(x, y, width, height) {
    var l = 0;
    var t = 1;
    var r = 2;
    var b = 3;
 
    var rect = [];
 
    rect[l] = x;
    rect[t] = -y;
    rect[r] = width + x;
    rect[b] = -(height - rect[t]);
 
    return rect;
};

var artboards = app.activeDocument.artboards;
var artboard = artboards.add(newRect(1400,-731,1300,731));
    artboard.name = "web";


// ***** add text and metadata layers  *****

// var textLayer = doc.layers.add();
// textLayer.name = "Text"
//
// // print text lables
// var bendayColor = new CMYKColor(); bendayColor.black = 50; bendayColor.cyan = 0; bendayColor.magenta = 0; bendayColor.yellow = 0;
// var bendayBar = app.activeDocument.pathItems.add(); bendayBar.setEntirePath( Array( Array(clippingBounds[0], clippingBounds[1]+60), Array(clippingBounds[0]+232.9, clippingBounds[1]+60) ) ); bendayBar.guides = false;
// bendayBar.stroked = true;
// bendayBar.strokeColor = bendayColor;
// bendayBar.strokeWidth = 6;
//
//
// var headText = doc.textFrames.add();
// headText.contents = "1-3C 12pt, 4C+ 14pt Bel. bld";
// headText.top = clippingBounds[1]+50;
// headText.left = clippingBounds[0];
// headText.textRange.characterAttributes.textFont = app.textFonts.getByName("Belizio-Bold");
// headText.textRange.characterAttributes.size = 12;
// headText.textRange.characterAttributes.leading = 14;
//
// var chatterText = doc.textFrames.add();
// chatterText.contents = "Intro text is 8pt./9.5pt. lead. Be direct and to the point.";
// chatterText.top = clippingBounds[1]+38;
// chatterText.left = clippingBounds[0];
// chatterText.textRange.characterAttributes.textFont = app.textFonts.getByName("LAText-Roman");
// chatterText.textRange.characterAttributes.size = 8;
// chatterText.textRange.characterAttributes.leading = 9.5;
//
// var sourceText = doc.textFrames.add();
// sourceText.contents = "Sources: Mapzen, OpenStreetMap";
// sourceText.top = -1;
// sourceText.left = 200;
// sourceText.textRange.characterAttributes.textFont = app.textFonts.getByName(defaultFont);
// sourceText.textRange.characterAttributes.size = 6;
//
// var creditText = doc.textFrames.add();
// creditText.contents = "Los Angeles Times";
// creditText.top = -1;
// creditText.left = 330;
// creditText.textRange.characterAttributes.textFont = app.textFonts.getByName("LAText-Roman");
// creditText.textRange.characterAttributes.size = 6;
//
// var countryHighlighted = doc.textFrames.add();
// countryHighlighted.contents = "COUNTRIES, STATES OR COUNTIES (HIGHLIGHTed)";
// countryHighlighted.top = -40;
// countryHighlighted.left = 200;
// countryHighlighted.textRange.characterAttributes.textFont = app.textFonts.getByName("BentonGothic-Bold");
// countryHighlighted.textRange.characterAttributes.size = 6.5;
// countryHighlighted.textRange.characterAttributes.overprintFill = true;
// countryHighlighted.textRange.changeCaseTo(CaseChangeType.UPPERCASE);
//
// var countryRegular = doc.textFrames.add();
// countryRegular.contents = "COUNTRIES, STATES OR COUNTIES (regular)";
// countryRegular.top = -50;
// countryRegular.left = 200;
// countryRegular.textRange.characterAttributes.textFont = app.textFonts.getByName("BentonGothic-Regular");
// countryRegular.textRange.characterAttributes.size = 6.5;
// countryRegular.textRange.characterAttributes.overprintFill = true;
// countryRegular.textRange.changeCaseTo(CaseChangeType.UPPERCASE);
//
// var citiesHighlighted = doc.textFrames.add();
// citiesHighlighted.contents = "Cities (highlighted)";
// citiesHighlighted.top = -65;
// citiesHighlighted.left = 200;
// citiesHighlighted.textRange.characterAttributes.textFont = app.textFonts.getByName("BentonGothic-Bold");
// citiesHighlighted.textRange.characterAttributes.size = 7;
// citiesHighlighted.textRange.characterAttributes.overprintFill = true;
//
// var citiesRegular = doc.textFrames.add();
// citiesRegular.contents = "Cities (regular)";
// citiesRegular.top = -65;
// citiesRegular.left = 300;
// citiesRegular.textRange.characterAttributes.textFont = app.textFonts.getByName("BentonGothic-Regular");
// citiesRegular.textRange.characterAttributes.size = 7;
// citiesRegular.textRange.characterAttributes.overprintFill = true;
//
// var places = doc.textFrames.add();
// places.contents = "Communities, Parks, Forests, Beaches, Islands";
// places.top = -80;
// places.left = 200;
// places.textRange.characterAttributes.textFont = app.textFonts.getByName("BentonGothic-RegularItalic");
// places.textRange.characterAttributes.size = 6.5;
// places.textRange.characterAttributes.overprintFill = true;
//
// var streetLabels = doc.textFrames.add();
// streetLabels.contents = "Street labels";
// streetLabels.top = -95;
// streetLabels.left = 200;
// streetLabels.textRange.characterAttributes.textFont = app.textFonts.getByName("BentonGothic-Regular");
// streetLabels.textRange.characterAttributes.size = 6.5;
// streetLabels.textRange.characterAttributes.overprintFill = true;
//
// var landmarkLabels = doc.textFrames.add();
// landmarkLabels.contents = "LANDMARKS OR STRUCTURES";
// landmarkLabels.top = -105;
// landmarkLabels.left = 200;
// landmarkLabels.textRange.characterAttributes.textFont = app.textFonts.getByName("BentonGothic-Regular");
// landmarkLabels.textRange.characterAttributes.size = 5.5;
// landmarkLabels.textRange.characterAttributes.overprintFill = true;
// landmarkLabels.textRange.changeCaseTo(CaseChangeType.UPPERCASE);
//
// var waterLabels = doc.textFrames.add();
// waterLabels.contents = "Water bodies (Lakes, Oceans, etc.)";
// waterLabels.top = -120;
// waterLabels.left = 200;
// waterLabels.textRange.characterAttributes.textFont = app.textFonts.getByName("BentonGothic-MediumItalic");
// waterLabels.textRange.characterAttributes.size = 6.5;
// waterLabels.textRange.characterAttributes.overprintFill = true;
//
// var areaLabels = doc.textFrames.add();
// areaLabels.contents = "Area label as a headline";
// areaLabels.top = -135;
// areaLabels.left = 200;
// areaLabels.textRange.characterAttributes.textFont = app.textFonts.getByName("BentonGothic-BlackItalic");
// areaLabels.textRange.characterAttributes.size = 7.5;
// areaLabels.textRange.characterAttributes.overprintFill = true;
//
// //  ******* web lables *******
//
// var headlinetW = doc.textFrames.add();
// headlinetW.contents = "Your headline";
// headlinetW.top = 685;
// headlinetW.left = 1403;
// headlinetW.textRange.characterAttributes.textFont = app.textFonts.getByName("BentonGothic-Bold");
// headlinetW.textRange.characterAttributes.size = 58;
//
// var sourceTextW = doc.textFrames.add();
// sourceTextW.contents = "Sources: Mapzen, OpenStreetMap";
// sourceTextW.top = 20;
// sourceTextW.left = 1403;
// sourceTextW.textRange.characterAttributes.textFont = app.textFonts.getByName(defaultFont);
// sourceTextW.textRange.characterAttributes.size = 32;
// sourceTextW.textRange.characterAttributes.fillColor = textGray;
//
// var creditTextW = doc.textFrames.add();
// creditTextW.contents = "Your Name @latimesgraphics";
// creditTextW.top = 20;
// creditTextW.left = 2660;
// creditTextW.textRange.characterAttributes.textFont = app.textFonts.getByName(defaultFont);
// creditTextW.textRange.characterAttributes.size = 32;
// creditTextW.textRange.characterAttributes.fillColor = textGray;
//
//
// var countryHighlightedW = doc.textFrames.add();
// countryHighlightedW.contents = "COUNTRIES, STATES OR COUNTIES (HIGHLIGHTed)";
// countryHighlightedW.top = -100;
// countryHighlightedW.left = 1600;
// countryHighlightedW.textRange.characterAttributes.textFont = app.textFonts.getByName("BentonGothic-Bold");
// countryHighlightedW.textRange.characterAttributes.size = 34;
// countryHighlightedW.textRange.changeCaseTo(CaseChangeType.UPPERCASE);
//
// var countryRegularW = doc.textFrames.add();
// countryRegularW.contents = "COUNTRIES, STATES OR COUNTIES (regular)";
// countryRegularW.top = -200;
// countryRegularW.left = 1600;
// countryRegularW.textRange.characterAttributes.textFont = app.textFonts.getByName("BentonGothic-Regular");
// countryRegularW.textRange.characterAttributes.size = 34;
// countryRegularW.textRange.changeCaseTo(CaseChangeType.UPPERCASE);
//
// var citiesHighlightedW = doc.textFrames.add();
// citiesHighlightedW.contents = "Cities (highlighted)";
// citiesHighlightedW.top = -300;
// citiesHighlightedW.left = 1600;
// citiesHighlightedW.textRange.characterAttributes.textFont = app.textFonts.getByName("BentonGothic-Bold");
// citiesHighlightedW.textRange.characterAttributes.size = 34;
//
// var citiesRegularW = doc.textFrames.add();
// citiesRegularW.contents = "Cities (regular)";
// citiesRegularW.top = -300;
// citiesRegularW.left = 1600;
// citiesRegularW.textRange.characterAttributes.textFont = app.textFonts.getByName("BentonGothic-Regular");
// citiesRegularW.textRange.characterAttributes.size = 34;
//
// var placesW = doc.textFrames.add();
// placesW.contents = "Communities, Parks, Forests, Beaches, Islands";
// placesW.top = -400;
// placesW.left = 1600;
// placesW.textRange.characterAttributes.textFont = app.textFonts.getByName("BentonGothic-RegularItalic");
// placesW.textRange.characterAttributes.size = 34;
//
// var streetLabelsW = doc.textFrames.add();
// streetLabelsW.contents = "Street labels";
// streetLabelsW.top = -500;
// streetLabelsW.left = 1600;
// streetLabelsW.textRange.characterAttributes.textFont = app.textFonts.getByName("BentonGothic-Regular");
// streetLabelsW.textRange.characterAttributes.size = 32;
//
// var landmarkLabelsW = doc.textFrames.add();
// landmarkLabels.contents = "LANDMARKS OR STRUCTURES";
// landmarkLabels.top = -600;
// landmarkLabels.left = 1600;
// landmarkLabels.textRange.characterAttributes.textFont = app.textFonts.getByName("BentonGothic-Regular");
// landmarkLabels.textRange.characterAttributes.size = 32;
// countryRegular.textRange.changeCaseTo(CaseChangeType.UPPERCASE);
//
// var waterLabelsW = doc.textFrames.add();
// waterLabelsW.contents = "Water bodies (Lakes, Oceans, etc.)";
// waterLabelsW.top = -700;
// waterLabelsW.left = 1600;
// waterLabelsW.textRange.characterAttributes.textFont = app.textFonts.getByName("BentonGothic-MediumItalic");
// waterLabelsW.textRange.characterAttributes.size = 32;
//
// var areaLabelsW = doc.textFrames.add();
// areaLabelsW.contents = "Area label as a headline";
// areaLabelsW.top = -800;
// areaLabelsW.left = 1600;
// areaLabelsW.textRange.characterAttributes.textFont = app.textFonts.getByName("BentonGothic-BlackItalic");
// areaLabelsW.textRange.characterAttributes.size = 38;
//
// var metadataLayer = doc.layers.add();
// metadataLayer.name = "Metadata"
//
// var metadataText = doc.textFrames.add();
// metadataText.contents = "File name: la-\rSection: \rRun date: XX-XX-17\rArtist: Name Here X77192\rSize: \rReporter approved: \rEditor approved: ";
// metadataText.top = -20;
// metadataText.left = clippingBounds[0];
// metadataText.textRange.characterAttributes.textFont = app.textFonts.getByName(defaultFont);
// metadataText.textRange.characterAttributes.size = 9;