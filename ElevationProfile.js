define([
    'dojo/_base/declare',
    'dijit/_WidgetBase',
    'dijit/_TemplatedMixin',
    'dijit/_WidgetsInTemplateMixin',
    'dojo/text!./Elevation/templates/Elevation.html',
   'esri/dijit/ElevationProfile',
   'dojo/dom',
    'dojo/on',
    'dojo/topic',
    'xstyle/css!./Elevation/css/Draw.css'
], function (
    declare,
    _WidgetBase,
    _TemplatedMixin,
    _WidgetsInTemplateMixin,
    template,
    ElevationProfile,
    dom,
    on, topic
) {

    return declare([_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin], {

        widgetsInTemplate: true,
        templateString: template,

        postCreate: function () {
            this.inherited(arguments);
        },

        startup: function () {

            on(dijit.byId("elevunitsSelect"), "change", function (value) {
                topic.publish('elevation/measureUnits', value);
            })

        },

        drawLine: function() {
            topic.publish('elevation/polylineclick', 'polyline');
        },
        drawFreehandLine: function() {
            topic.publish('elevation/polylineclick', 'freehandpolyline');
        },
        clearGraphics: function(){
            topic.publish('elevation/deactivate', 'click');
        }

    })

});