define([
    'dojo/_base/declare',
    'dijit/_WidgetBase',
    'dijit/registry',
    'dijit/layout/ContentPane',
    'dojo/topic',
    'esri/toolbars/draw',
     'esri/symbols/SimpleLineSymbol',
     'esri/symbols/CartographicLineSymbol',
     'esri/graphic',
     'esri/units',
     'esri/dijit/ElevationProfile',
     'esri/Color',
     'dojo/dom',
     'dojo/on',
     'dojo/_base/lang',
     'dojo/query',
     'dojo/domReady!'

], function (declare, _WidgetBase, registry, ContentPane, topic, Draw,
    SimpleLineSymbol, CartographicLineSymbol, Graphic, Units, ElevationProfile, Color, dom, on, lang, query
    ) {return declare([_WidgetBase], {

        postCreate: function () {
            this.inherited(arguments);
            
        },
        
        startup: function () {
            this.inherited(arguments);
            
            var tabsid = query(".attributesTabContainer")[0].id;
            var tabs = registry.byId(tabsid);

            var pane = new ContentPane({ title: "Elevation Table", content: '<div id="profileChartNode"></div>' });
            
            tabs.addChild(pane);
            tabs.selectChild(pane);


            var map = this.map;

            tb = new Draw(map);


            var chartOptions = {
                title: "Elevation Profile",
                chartTitleFontSize: 14,
                axisTitleFontSize: 11,
                axisLabelFontSize: 9,
                //indicatorFontColor: '#eee',
                indicatorFontColor: '#000000',
                indicatorFillColor: '#666',
                //titleFontColor: '#eee',
                titleFontColor: '#000000',
                //axisFontColor: '#ccc',
                axisFontColor: '#000000',
                axisMajorTickColor: '#333',
                skyTopColor: "#B0E0E6",
                skyBottomColor: "#4682B4",
                waterLineColor: "#eee",
                waterTopColor: "#ADD8E6",
                waterBottomColor: "#0000FF",
                elevationLineColor: "#D2B48C",
                elevationTopColor: "#8B4513",
                elevationBottomColor: "#CD853F"
            };

            lineSymbol = new CartographicLineSymbol(
                            CartographicLineSymbol.STYLE_SOLID,
                            new Color([255, 0, 0]), 2,
                            CartographicLineSymbol.CAP_ROUND,
                            CartographicLineSymbol.JOIN_MITER, 2
                    );

            var elevationProfile = new ElevationProfile({
                map: map,
                profileTaskUrl: "http://elevation.arcgis.com/arcgis/rest/services/Tools/ElevationSync/GPServer",
                scalebarUnits: Units.MILES,
                chartOptions: chartOptions
            }, dom.byId("profileChartNode"));

            elevationProfile.startup();
            
            topic.subscribe("elevation/polylineclick", function () {
                
                initToolbar(arguments[0]);

            });
 

            topic.subscribe("elevation/measureUnits", function () {
                elevationProfile.set("measureUnits", arguments[0]);

            });
            
            topic.subscribe("elevation/deactivate", function () {
                
                tb.deactivate();
                map.graphics.clear();
                elevationProfile.clearProfile();
            });
            
            function initToolbar(toolName) {
                elevationProfile.clearProfile(); //Clear profile

                map.graphics.clear();

                tb.on("draw-end", addGraphic);
                tb.activate(toolName);
                map.disableMapNavigation();
            }

            function addGraphic(evt) {
                //deactivate the toolbar and clear existing graphics
                tb.deactivate();
                map.enableMapNavigation();
                var symbol = lineSymbol;
                map.graphics.add(new Graphic(evt.geometry, symbol));
                elevationProfile.set("profileGeometry", evt.geometry);

                var sel = dom.byId("unitsSelect");
                if (sel) {
                    var val = sel.options[sel.selectedIndex].value;
                    elevationProfile.set("measureUnits", val);
                }
            }
            

        },

        
    });
});