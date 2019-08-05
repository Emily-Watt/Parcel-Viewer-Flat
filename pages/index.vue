<template>
   <b-container :id="mapViewWindow" data-dojo-type="dijit/layout/BorderContainer" data-dojo-props="design:'headline',gutters:false">
      <b-row >
        <b-col cols="2">
          <Sidebar />
        </b-col>
        <b-col cols="10">
          <Map />
        </b-col>
    </b-row> 
  </b-container>   
</template>

<script>
import Sidebar from '../components/Sidebar'
import Map from '../components/Map'

import { loadModules } from 'esri-loader';


export default {
    head: {
      bodyAttrs: {
        class: 'claro'
      }
  },
    components: {
      Sidebar,
      Map
    },
    data(){
        return {
            baseLayerOptions: {                  
                  layerName: 'baseLayer',
                  layerLink: "https://services5.arcgis.com/ROBnTHSNjoZ2Wm1P/arcgis/rest/services/Parcels/FeatureServer/0",
                  moduleType: 'FeatureLayer',
                  options: {                     
                    mode: 1,
                    outFields: ["*"],
                  }
            },
            addedMapLayers: [],
            mapViewWindow: 'mainWindow',
            esriOptions: { version: '3.29' },
            esriModules : [
                            "dojo/ready",
                            "dojo/on",
                            "dojo/dom",
                            "dojo/dom-construct",
                            "dojo/parser",
                            "dijit/registry",
                            "dijit/layout/BorderContainer",
                            "dijit/layout/ContentPane",
                            "esri/map",
                            "esri/arcgis/utils",
                            "esri/domUtils",
                            "esri/dijit/Popup",
                            "esri/tasks/BufferParameters",
                            "esri/tasks/GeometryService",
                            "esri/geometry/webMercatorUtils",
                            "esri/geometry/Geometry",
                            "esri/geometry/Polygon", 
                            "esri/geometry/Extent",
                            "esri/SpatialReference",
                            "esri/dijit/Search",
                            "esri/layers/FeatureLayer",
                            "esri/InfoTemplate",
                            "esri/layers/ArcGISTiledMapServiceLayer",
                            "dojo/domReady!"
                          ],
            mapLayers: [             

            {
              layerName: 'countyBoundary',
              layerLink: `https://services5.arcgis.com/ROBnTHSNjoZ2Wm1P/arcgis/rest/services/County_Boundary/FeatureServer/0`,
              options: { moduleType: 'FeatureLayer',  }
            },
              

            {
              layerName: 'tiledLayer',
              layerLink: `https://tiles.arcgis.com/tiles/ROBnTHSNjoZ2Wm1P/arcgis/rest/services/Parcel_Labels/MapServer`,
              options: { moduleType: 'ArcGISTiledMapServiceLayer',  }
            },
              

            {
              layerName: 'parcel_boundaries',
              layerLink: `https://tiles.arcgis.com/tiles/ROBnTHSNjoZ2Wm1P/arcgis/rest/services/Parcel_Boundaries/MapServer`,
              options: { moduleType: 'ArcGISTiledMapServiceLayer',  }
            }
             
          ]
           


        }
    },
    methods: {
        initMap() {
                        
          loadModules(this.esriModules, this.esriOptions)
          .then( ([ ready,
                    on,
                    dom,
                    domConstruct,
                    parser,
                    registry,
                    BorderContainer,
                    ContentPane,
                    Map,
                    arcgisUtils,
                    domUtils,
                    Popup,
                    BufferParameters,
                    GeometryService,
                    webMercatorUtils,
                    Geometry,
                    Polygon,
                    Extent,   
                    SpatialReference,
                    Search,
                    FeatureLayer,
                    InfoTemplate,
                    ArcGISTiledMapServiceLayer]) => {

            // CONTENTS OF ready() function

            // BUILDS BASE PARCEL MAP
            const boundingBox = this.getBoundingBox(Extent, SpatialReference)
            const ParcelMap = this.buildMap(
              ParcelMap, 
              Map, 
              Extent, 
              FeatureLayer, 
              SpatialReference, 
              ArcGISTiledMapServiceLayer,
              boundingBox);
            

            const GeoService = new GeometryService("https://utility.arcgisonline.com/ArcGIS/rest/services/Geometry/GeometryServer");

            let previousExtent = ParcelMap.extent.getExtent(); // PARAMETER TO HELP DEFINE MAP BOUNDARIES
            this.mapOnExtentChange(ParcelMap, boundingBox, previousExtent) // HANDLER TO RESTRICT MAP TO BOUNDING BOX
            this.initializeSidebar(ParcelMap, dom, domUtils) 
            ParcelMap.on("click", this.getLatLong)

           


          /*
            // Extent/Bounding Box
            let previousExtent = ParcelMap.extent.getExtent();

            ParcelMap.on("extent-change", function(){

                let currentExtent = ParcelMap.extent.getExtent();
                if (boundingBox.contains(ParcelMap.extent.getCenter())){
                // Update previous extent
                    previousExtent = ParcelMap.extent.getExtent();
                }
                else {
                // if new extent is not in bounding box then reset to previous extent.
                    ParcelMap.setExtent(previousExtent);
                }
            })
            
          */





            // GET LAT LONG POINTS
      /*
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
      */
            
      /*
            //Buffer
            function doBuffer(evt, MapName) {
                MapName.graphics.clear();
                var params = new esri.tasks.BufferParameters();
                params.geometries = [ evt.mapPoint ];

              //buffer in linear units such as meters, km, miles etc.
                params.distances = [ document.getElementById("distance").value];
                var i = document.getElementById("units");
                params.unit = i.options[i.selectedIndex].value;
                params.outSpatialReference = MapName.spatialReference;

                GeoService.buffer(params, showBuffer);
            } 
            //end doBuffer
      */
        

        /*
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

        */

            //Google Maps Street View Interactive

        /*
            
            function initialize() {
                let googleMap = new google.maps.Map(document.getElementById('map'), {
                    zoom: 14
                });
                let panorama = new google.maps.StreetViewPanorama(
                    document.getElementById('street-view'), {
                    position: {lat: 37.869260, lng: -122.254811},
                    pov: {heading: 165, pitch: 0},
                    zoom: 1
                });
            };//end initialize
            
        */

        /*
            //Get x and y coordinates
            function getLatLong(polygon){
                polygon = new Polygon(new SpatialReference({wiki:4326}));
                var mapPoint = polygon.getCentroid();
             };  //end x and y coor
        */
              


           /*

            //Search
            var search = new Search({
                enableButtonMode: false, //this enables the search widget to display as a single button
                enableLabel: false,
                enableInfoWindow: true,
                showInfoWindowOnSelect: false,
                map: map}, 
                "search");

          */
         

            


           /*

            //Search
            var search = new Search({
                enableButtonMode: false, //this enables the search widget to display as a single button
                enableLabel: false,
                enableInfoWindow: true,
                showInfoWindowOnSelect: false,
                map: map}, 
                "search");

            var sources = [];

            //Street Address Search
            sources.push({
                featureLayer: new FeatureLayer("https://services5.arcgis.com/ROBnTHSNjoZ2Wm1P/arcgis/rest/services/Parcels/FeatureServer/0"),
                searchFields: ["SitusAddress"],
                displayField: "SitusAddress",
                exactMatch: false,
                name: "Street Address",
                outFields: ["*"],
                placeholder: "Street Address",
                maxResults: 6,
                maxSuggestions: 6,

                infoTemplate: new InfoTemplate(
                    `
                    <hr><a href='https://maps.googleapis.com/maps/api/streetview?size=600x400&location=${SitusAddress}&heading=360&fov=120&pitch=-5&sensor=false&key=AIzaSyAtsysKdAwT9jbKdgDJJPlaPVBm2wZRR2c' target='_blank'><b><img src='https://maps.googleapis.com/maps/api/streetview?size=350x250&location=${SitusAddress}&fov=120&pitch=-5&sensor=false&key=AIzaSyAtsysKdAwT9jbKdgDJJPlaPVBm2wZRR2c'></b></a> 

                    <hr>APN Book No: <b>${BOOK}</b> 

                    <hr>APN Page No: <b>${PAGE}</b> 
                    
                    <hr>APN Parcel No: <b>${APN}</b> 

                    <hr>APN Sub Parcel No: <b>${SUB_PARCEL}</b> 

                    <hr>Sort Parcel: <b>${SORT_APN}</b> 

                    <hr>Parcel No: <b>${PARCEL}</b> 

                    <hr>Year Built: <b>${YearBuilt}</b> 

                    <hr>TRA Primary (City): <b>${TRAPrimary}</b> 

                    <hr>TRA Secondary: <b>${TRASecondary}</b> 

                    <hr>Land Value: <b>${Land}</b> 

                    <hr>Improvement Value: <b>${Imps}</b> 

                    <hr>CLCA Land Value: <b>${CLCALand}</b> 

                    <hr>CLCA Improvement Value: <b>${CLCAImps}</b> 

                    <hr>Homeowner's Exemption: <b>${HOEX}</b> 

                    <hr>Other Exemption: <b>${OTEX}</b> 

                    <hr>Total Net Value: <b>${TotalNetValue}</b> 

                    <hr>Latest Document Prefix: <b>${LatestDocument_Prefix}</b> 

                    <hr>Latest Document Series: <b>${LatestDocumentSeries}</b> 

                    <hr>Latest Document Date: <b>${LatestDocumentDate}</b> 

                    <hr>Use Code: <b>${UseCode}</b> 

                    <hr>Economic Unit Flag: <b>${EconUnit}</b> 
                    
                    <hr>Situs Address: <b>${SitusAddress}</b> 

                    <hr>Mailing Address: <b>${MailingAddress}</b> 
                    
                    <hr> View Assessor's Map: <a href=http://www.acgov.org/MS/prop/index.aspx?PRINT_PARCEL=${APN} target='_blank'><b>View Parcel Info</b></a> 
                    
                    <hr> View Assessor's Map: <a href=https://www.acgov.org/ptax_pub_app/RealSearchInit.do?searchByParcel=true&parcelNumber=${APN} target='_blank'><b>View Tax Info</b></a>
                    `
                ),

                enableSuggestions: true,
                minCharacters: 0
            });// end Street Address Search

            //APN Search
            sources.push({
                featureLayer: new FeatureLayer("https://services5.arcgis.com/ROBnTHSNjoZ2Wm1P/arcgis/rest/services/Parcels/FeatureServer/0"),
                searchFields: ["APN", "BOOK", "PAGE"],
                displayField: "APN",
                exactMatch: false,
                name: "APN",
                outFields: ["*"],
                placeholder: "APN Number",
                maxResults: 6,
                maxSuggestions: 6,

                infoTemplate: new InfoTemplate(
                    `
                    <hr><a href='https://maps.googleapis.com/maps/api/streetview?size=600x400&location=${SitusAddress}&heading=360&fov=120&pitch=-5&sensor=false&key=AIzaSyAtsysKdAwT9jbKdgDJJPlaPVBm2wZRR2c' target='_blank'><b><img src='https://maps.googleapis.com/maps/api/streetview?size=350x250&location=${SitusAddress}&fov=120&pitch=-5&sensor=false&key=AIzaSyAtsysKdAwT9jbKdgDJJPlaPVBm2wZRR2c'></b></a> 
                    
                    <hr>APN Book No: <b>${BOOK}</b> 

                    <hr>APN Page No: <b>${PAGE}</b> 
                    
                    <hr>APN Parcel No: <b>${APN}</b> 

                    <hr>APN Sub Parcel No: <b>${SUB_PARCEL}</b> 

                    <hr>Sort Parcel: <b>${SORT_APN}</b> 

                    <hr>Parcel No: <b>${PARCEL}</b> 

                    <hr>Year Built: <b>${YearBuilt}</b> 

                    <hr>TRA Primary (City): <b>${TRAPrimary}</b> 

                    <hr>TRA Secondary: <b>${TRASecondary}</b> 

                    <hr>Land Value: <b>${Land}</b> 

                    <hr>Improvement Value: <b>${Imps}</b> 

                    <hr>CLCA Land Value: <b>${CLCALand}</b> 

                    <hr>CLCA Improvement Value: <b>${CLCAImps}</b> 

                    <hr>Homeowner's Exemption: <b>${HOEX}</b> 

                    <hr>Other Exemption: <b>${OTEX}</b> 

                    <hr>Total Net Value: <b>${TotalNetValue}</b> 

                    <hr>Latest Document Prefix: <b>${LatestDocument_Prefix}</b> 

                    <hr>Latest Document Series: <b>${LatestDocumentSeries}</b> 

                    <hr>Latest Document Date: <b>${LatestDocumentDate}</b> 

                    <hr>Use Code: <b>${UseCode}</b> 

                    <hr>Economic Unit Flag: <b>${EconUnit}</b> 
                    
                    <hr>Situs Address: <b>${SitusAddress}</b> 

                    <hr>Mailing Address: <b>${MailingAddress}</b> 
                    
                    <hr> View Assessor's Map: <a href=http://www.acgov.org/MS/prop/index.aspx?PRINT_PARCEL=${APN} target='_blank'><b>View Parcel Info</b></a> 
                    
                    <hr> View Assessor's Map: <a href=https://www.acgov.org/ptax_pub_app/RealSearchInit.do?searchByParcel=true&parcelNumber=${APN} target='_blank'><b>View Tax Info</b></a>
                    `
                ),

                enableSuggestions: true,
                minCharacters: 0
            });

              */
            // END OF ready() function

            //Set the sources above to the search widget
            // search.set("sources", sources);
            // search.startup();

          }) // END OF .then()
          .catch(err => {
            // handle any script or module loading errors
            console.error(err);
          });
        },
        getBoundingBox( Extent, SpatialReference ){
            return new Extent(-122.303, 37.50, -121.45, 37.85, 
                      new SpatialReference({ wkid:4326 })
                      ); 
        },
        buildMap(MapName, Map, Extent, FeatureLayer, SpatialReference, ArcGISTiledMapServiceLayer, boundingBox) {


          try {

            // console.log('IN --->', MapName)

            MapName = new Map("parcel-map", {
                extent: boundingBox,
                basemap: "streets",  
            });
          
          MapName.on('load', () => {
              MapName.infoWindow.set("popupWindow", false);
              const MapFeatureLayers = this.createFeatureLayersArray(FeatureLayer, ArcGISTiledMapServiceLayer);
              this.addLayersToBase(MapName, MapFeatureLayers) 
          })
           

            // console.log('OUT--->', MapName)

            return MapName
            
          } catch (error) {
            console.error('-------->>>>',error)
          }

        },
        createFeatureLayersArray( FeatureLayer, ArcGISTiledMapServiceLayer) {

          
            let scaleOptions = {maxScale:0, minScale:4000};

              try {
                const baseLayer = new FeatureLayer("https://services5.arcgis.com/ROBnTHSNjoZ2Wm1P/arcgis/rest/services/Parcels/FeatureServer/0", {
                mode: FeatureLayer.MODE_ONDEMAND,
                outFields: ["*"],
                });
                // COUNTY BOUNDARY
                const countyBoundary = new FeatureLayer("https://services5.arcgis.com/ROBnTHSNjoZ2Wm1P/arcgis/rest/services/County_Boundary/FeatureServer/0");
                // ADDS APN NUMBERS
                const tiledLayer = new ArcGISTiledMapServiceLayer("https://tiles.arcgis.com/tiles/ROBnTHSNjoZ2Wm1P/arcgis/rest/services/Parcel_Labels/MapServer", scaleOptions);
                // PARCEL BOUNDARIES
                const parcel_boundaries = new ArcGISTiledMapServiceLayer("https://tiles.arcgis.com/tiles/ROBnTHSNjoZ2Wm1P/arcgis/rest/services/Parcel_Boundaries/MapServer", scaleOptions);

                
                return this.addedMapLayers = [baseLayer, countyBoundary, tiledLayer, parcel_boundaries]
                

              } 
              catch (error) {
                console.log(error)
              }           
            
        },
        addLayersToBase(mapName, layerArray) {
          return mapName.addLayers(layerArray)
        },
        initializeSidebar(MapName, dom, domUtils) {
           const popup = MapName.infoWindow;
            //when the selection changes update the side panel to display the popup info for the
            //currently selected feature.
            popup.on("SelectionChange", function() {
              this.displayPopupContent(popup.getSelectedFeature());
            });
            //when the selection is cleared remove the popup content from the side panel.
            popup.on("ClearFeatures", function() {
              dom.byId("featureCount").innerHTML = "Click to select feature(s)";
              registry.byId("leftPane").set("content", "");
              domUtils.hide(dom.byId("pager"));
            });
            //When features are associated with the  map's info window update the sidebar with the new content.
            popup.on("SetFeatures", function() {
              this.displayPopupContent(popup.getSelectedFeature());
              dom.byId("featureCount").innerHTML = popup.features.length + " feature(s) selected";
              //Enable navigation if more than one feature is selected
              popup.features.length > 1 ? domUtils.show(dom.byId("pager")) : domUtils.hide(dom.byId("pager"));
            });

            return popup
        },        
        displayPopupContent(feature) {
            if (feature) {
                var content = feature.getContent();
                registry.byId("leftPane").set("content", content);
            }
        },  
        getLatLong(event) {

            console.log('--->','getLatLong TRIGGERED', event)
            

                // let { mapPoint } = coord;
                // let { x, y } = mapPoint;
                // var normalizedVal = webMercatorUtils.xyToLngLat(x, y);
                // ex = normalizedVal[0]; //returns 19.226, 11.78
                // why = normalizedVal[1];
                // console.log("in getLL: " + ex + " and " + why);
                // let coordPair = {x: ex, y: why};
                // let ex = coordPair.x;
                // let why = coordPair.y;
                // return coordPair;
        },
        mapOnExtentChange(MapName, boundingBox, previousExtent) {
              
              MapName.on("extent-change", () => {
                let currentExtent = MapName.extent.getExtent();
                if (boundingBox.contains(MapName.extent.getCenter())){
                // Update previous extent
                    return previousExtent = MapName.extent.getExtent();
                }
                else {
                // if new extent is not in bounding box then reset to previous extent.
                    return MapName.setExtent(previousExtent);
                }
                  
              })
        },      
    },
    mounted() {
      this.initMap();
    }
 
}
</script>

<style>
html, body {
	height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
}

  #map {
  height: 100%;
  width: 100%;
  padding: 0;
}

#leftPane {
  color:#000;
  width: 20%;
  padding-bottom:15px;
  margin: 0;
  border: none;
}

#search {
  display: block;
  position: absolute;
  z-index: 2;
  top: 20px;
  left: 74px;
}

.arcgisSearch .searchBtn {
  display: flex !important;
}

#header {
  text-align: center;
  height: 30%;
  border-bottom: solid 1px #ccc;
  margin: 0 auto;
}

#featureCount, #Buffer {
  margin: 2%;
  font-size: 18px;
}

</style>
