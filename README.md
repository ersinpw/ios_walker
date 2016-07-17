# GPX Writer 

Small tool to emulate "walking" on IOS. It consists of two parts:

* gpxwriter (generates the GPS coordinates and writes them into a file)
* ios (empty application which is used to simulate location on the device)

## Instructions

### Starting point?

Check your starting point with Google Maps. Copy over LAT/LONG and edit it in the gpxwriter/mover.js file.
If you don't do it, you will start somewhere in Munich :-)

### Accessibility

(TODO)


### GPXWriter 

```bash
cd gpxwriter
npm install
node mover.js
```

The tool will start at the location hardcoded into mover.js. After initial start it will continue from the last known coordinate. 

If you want to reset to other coordinates: quit mover.js and

* either change the coordinates in mover.js and delete the .gpx file
* or edit in the gpx file directly


### IOS

Open the IOS project.

Run it on your device.

Click "Debug | Simulate location | Autolocation" (this is important as the software might not be able to find the menu item if you did not click it before)

### Control position

All keys around "D" change your location as if there was a compass. "D" itself stops walking.

"Q" quits the application.

The application will resume on your last position.


# License

MIT