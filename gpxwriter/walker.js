var fs = require('fs');
var applescript = require('applescript');

var template = `<gpx creator="Xcode" version="1.1"><wpt lat="@LAT" lon="@LONG"><name>PokemonLocation</name></wpt></gpx>`;
var filename = "autolocation.gpx";

// you need to change your accessibility settings to make this work
// have fun figuring it out
var script = `tell application "System Events" to tell process "Xcode"
	tell menu item "Simulate Location" of menu 1 of menu bar item "Debug" of menu bar 1
		click menu item "autolocation" of menu 1
	end tell
end tell
`

// Munich - near Karlsplatz
// you should set these to YOUR home base
var lat = 48.14220430000027;
var long = 11.571617099999985;

// default GPS update interval
var waitMs = 2000;
var lat_move = 0;
var long_move = 0;

// read last coordinates (if any)
if (fs.existsSync(filename)) {
  var data = fs.readFileSync(filename, 'UTF8');
  var latrx = /lat="(.*?)"/ig;
  var longrx = /lon="(.*?)"/ig;

  console.log('Found existing data file, continuing with LAT:'+lat+' LONG:'+long);
  lat = +latrx.exec(data)[1];
  long = +longrx.exec(data)[1];
} else {
  generateGpx(lat, long);
}

// writes new lat/long to the gpx file
function generateGpx(lat, long) {

  console.log('Generating ' + filename + ' with LAT:'+lat+' and LONG:'+long);
  var data = template.replace('@LAT', lat).replace('@LONG', long);
  fs.writeFileSync(filename, data, 'UTF8');
}

// updates GPS position and updates XCode location simulation
function next() {

  if (lat_move == 0 && long_move == 0) {
    setTimeout(next, waitMs);
    return;
  }

  lat+=lat_move;
  long+=long_move;
  generateGpx(lat, long);

  applescript.execString(script, function(err) {
    if (err) {
      console.log('Error while trying to set location in XCode');
      console.log('Please click the menu | Debug | Simulate Location | autolocation. After that, try again')
    }
    setTimeout(next, waitMs);
  });
}

console.log('GPS Walker');
console.log(' W (E) R');
console.log('(S) D (F)');
console.log(' X (C) V');

var stdin = process.stdin;
stdin.setRawMode( true );
stdin.resume();
stdin.setEncoding( 'utf8' );

keyBindings = {};
keyBindings['q'] = function() {
  console.log('> QUIT');
  process.exit(0);
};

keyBindings['e'] = [0.0001, 0];
keyBindings['f'] = [0, 0.0001];
keyBindings['c'] = [-0.0001, 0];
keyBindings['s'] = [0, -0.0001];
keyBindings['r'] = [0.0001, 0.0001];
keyBindings['v'] = [-0.0001, 0.0001];
keyBindings['x'] = [-0.0001, -0.0001];
keyBindings['w'] = [0.0001, -0.0001];
keyBindings['d'] = [0,0];

stdin.on('data', function(chunk) {

  var item = keyBindings[chunk];
  if (item == null) {
    console.log("Unknown key, press 'q' to quit");
    return;
  }

  if (typeof item == 'function') {
    item();
    return;
  }

  lat_move = item[0];
  long_move = item[1];
  console.log('Moving vector lat/long --> ' + lat_move +'/'+long_move);
});

next();
