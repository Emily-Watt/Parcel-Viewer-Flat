export const function initMap() {
            parser.parse();

            var boundingBox = new Extent(-122.303, 37.50, -121.45, 37.85, new SpatialReference({ wkid:4326 }));
    
         
            //create a map
            map = new Map("map", {
                extent: boundingBox,
                basemap: "streets",  
            });

            gsvc = new esri.tasks.GeometryService("https://utility.arcgisonline.com/ArcGIS/rest/services/Geometry/GeometryServer");

            map.on("click", getLL);
            

            // Extent/Bounding Box
            var previousExtent = map.extent.getExtent();
            map.on("extent-change", function(){
                let currentExtent = map.extent.getExtent();
                if (boundingBox.contains(map.extent.getCenter())){
                // Update previous extent
                    previousExtent = map.extent.getExtent();
                }
                else {
                // if new extent is not in bounding box then reset to previous extent.
                    map.setExtent(previousExtent);
                }
            })
            map.infoWindow.set("popupWindow", false);

            function getLL(coord) {
                let { mapPoint } = coord;
                let { x, y } = mapPoint;
                var normalizedVal = webMercatorUtils.xyToLngLat(x, y);
                ex = normalizedVal[0]; //returns 19.226, 11.78
                why = normalizedVal[1];
                console.log("in getLL: " + ex + " and " + why);
                let coordPair = {x: ex, y: why};
                let ex = coordPair.x;
                let why = coordPair.y;
                return coordPair;
            }//end doBuffer

            

            //Buffer
            function doBuffer(evt) {
                map.graphics.clear();
                var params = new esri.tasks.BufferParameters();
                params.geometries = [ evt.mapPoint ];

              //buffer in linear units such as meters, km, miles etc.
                params.distances = [ document.getElementById("distance").value];
                var i = document.getElementById("units");
                params.unit = i.options[i.selectedIndex].value;
                params.outSpatialReference = map.spatialReference;

                gsvc.buffer(params, showBuffer);
            }//end doBuffer

            function showBuffer(geometries) {
                var symbol = new esri.symbol.SimpleFillSymbol(
                    esri.symbol.SimpleFillSymbol.STYLE_SOLID,
                    new esri.symbol.SimpleLineSymbol(
                        esri.symbol.SimpleLineSymbol.STYLE_SOLID,
                        new dojo.Color([0,0,255,0.65]), 2
                    ),
                    new dojo.Color([0,0,255,0.35])
                );

                dojo.forEach(geometries, function(geometry) {
                    var graphic = new esri.Graphic(geometry,symbol);
                    map.graphics.add(graphic);
                });
            }//end showBuffer

            //Google Maps Street View Interactive
            var panorama;
            function initialize() {
                var map = new google.maps.Map(document.getElementById('map'), {
                    zoom: 14
                });
                panorama = new google.maps.StreetViewPanorama(
                    document.getElementById('street-view'), {
                    position: {lat: 37.869260, lng: -122.254811},
                    pov: {heading: 165, pitch: 0},
                    zoom: 1
                });
            };//end initialize

            console.log(panorama)
            
            
            //Get x and y coordinates
            function getLatLong(polygon){
                polygon = new Polygon(new SpatialReference({wiki:4326}));
                var mapPoint = polygon.getCentroid();
             };//end x and y coor

}