# IOS Walker (Catch 'em all!)

Small tool to emulate "walking" on IOS. It consists of two parts:

* gpxwriter (generates the GPS coordinates and writes them into a file)
* ios (empty application which is used to simulate location on the device)

## Requirements

* node (v4/v6)
* XCode
* IPhone


## Instructions

### Starting point?

Check your starting point with Google Maps. Copy over LAT/LONG and edit it in the walker/walker.js file.
If you don't do it, you will start somewhere in Munich :-)

### Accessibility

Go to "System Settings" | "Security & Privacy" | "Privacy" | "Accessibility" and add "Terminal.app" there. 

This is needed to allow the NodeJS application to remote control XCode.


### Walker 

```bash
cd walker
npm install
node walker.js
```

The tool will start at the location hardcoded into walker.js. After initial start it will continue from the last known coordinate. 

If you want to reset to other coordinates: quit walker.js and

* either change the coordinates in walker.js and delete the .gpx file
* or edit in the gpx file directly

If this is your first start, don't press any key yet, complete the other steps first.


### IOS

Open the IOS project.

Run it on your device (fix any licensing issue as you go).

Click "Debug | Simulate location | Autolocation" (this is important as the software might not be able to find the menu item if you did not click it before)

### Validate

Open Google Maps on your device. Your "location" should now be set to the new coordinates.

### Control position (in the NodeJS application)

The valid keys are listed when starting. "D" will stop talking, all other keys resemble a compass. 

Yep, could be more user friendly. Don't care right now.


# License

MIT