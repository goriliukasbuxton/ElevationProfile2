# ElevationProfile2
Widget is based on the ESRI new Elevation Profile Dijit:
https://developers.arcgis.com/javascript/jsapi/elevationprofile-amd.html

Widget has two parts Control Widget (draws lines):
```

elevation: {
	include: true,
	id: 'elevationnew',
	type: 'titlePane',
	path: 'gis/dijit/ElevationProfile',
	canFloat: true,
	title: 'Elevation Profile',
	open: true,
	position: 20,
	options: {
                map: true
		}
	},
```
and the table widget, which works in conjunction with Attribute Widget on the bottom pane:
```	
			elevationtable: {
			    include: true,
			    id: 'elevationtable',
			    type: 'invisible',
			    placeAt: 'bottom',
			    path: 'gis/dijit/ElevationProfileTable',
			    title: 'Elevation',

			    options: {
			        map: true,
			        mapClickMode: true
			    }
			},
```
Demo:	
![alt tag](https://github.com/goriliukasbuxton/ElevationProfile2/blob/master/Elevation.png)	
