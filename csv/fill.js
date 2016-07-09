var fs = require('fs'); 
var parse = require('csv-parse');
var request = require("request");
var moment = require("moment");

// PRODUCTION
//var apiEndpoint = 'https://devnetzone.cleverapps.io/api/v1/activities/';
// LOCAL ENV
var apiEndpoint = 'http://localhost:1337/api/v1/activities/';

var options = { method: 'POST',
    url: apiEndpoint,
    headers: 
    { 'authorization': 'Bearer ' + process.env.ACTIVITIES_TOKEN,
        'content-type': 'application/json' },
    json: true };

var days = ['sunday','monday','tuesday','wednesday','thursday','friday','saturday'];
function weekday(number) {
    return days[number];
}

function durationtominutes(duration) {
    var parsed = duration.split(' ');
    var coeff = 1;
    if (parsed[1] === "hours") {
        coeff = 60;
    } 
    return parsed[0]*coeff;
}

function computeCategory(type, room) {
    if (type === "Breakout Session") {
        return "Breakout";
    }
    if (room.startsWith("DevNet Workbench")) {
        return "Workshop";
    }
    if (room.startsWith("DevNet Workshop")) {
        return "Workshop";
    }

    return "Session";
}


function computeLocation(type, room) {
    if (type === "Breakout Session") {
        return room;
    }
    if (room.startsWith("DevNet Workshop")) {
        return "Mandalay Bay H, Level 2";
    }

    var splitted = room.split(' ');
    if (splitted[0] === "DevNet") {
        var result = splitted[1];
        if (splitted.length > 2) {
            result += " " + splitted[2];
        }
        return result;
    }

    return room;
}

function postActivity(csvrow) {

    // Enhance category & location
    var category = computeCategory(csvrow[5], csvrow[12]);
    var location= computeLocation(csvrow[5], csvrow[12]);

    // Compute begin / end dates with TZ
    var beginVegasTimeAsMillisec = Date.parse(csvrow[11]);
    if (!beginVegasTimeAsMillisec) {
        console.log("start time mal formatted for row: " + csvrow[2]);
        return;
    }
    var TZdiff = 0; // 9 when in France
    var beginVegasDate = new Date(beginVegasTimeAsMillisec); 
    var beginUTCDate = new Date(beginVegasTimeAsMillisec+TZdiff*3600000); 
    var beginDay = weekday(beginVegasDate.getDay());
    
    var duration = durationtominutes(csvrow[8]);
    var endUTCDate = new Date(beginVegasTimeAsMillisec+TZdiff*3600000 + duration*60000);
    var endVegasDate = new Date(beginVegasTimeAsMillisec + duration*60000);
    
    

    options.body =  { 
        // Unique id is CODE-BEGIN
        id: csvrow[2] + "-" + beginVegasDate.toISOString(),
        title: csvrow[3],
        url: 'http://www.ciscolive.com/us/learn/sessions/session-catalog/?search=' + csvrow[2],
        description: csvrow[4],
        beginDate: beginUTCDate.toISOString(),
        beginDay: beginDay,  
        beginTime: moment(beginVegasDate).format("h:mmA"),
        endDate: endUTCDate.toISOString(), 
        endDay: weekday(endVegasDate.getDay()),  
        endTime: moment(endVegasDate).format("h:mmA"),
        duration: csvrow[8], // in min or hours
        location: location,
        category: category, 
        technology: csvrow[7], // Add to the attribute
        speaker: csvrow[28],
        speaker_email: csvrow[29],
        speaker_url: 'http://www.ciscolive.com/us/learn/sessions/session-catalog/?search=%22' + encodeURIComponent(csvrow[28]) + '%22' // url encode here 
    }, 
    
    request(options, function (error, response, payload) {
        if (error) {
            console.log("error: " + error + " for row: " + csvrow[2]);        
        }
        
        if (response.statusCode != 201) {
            console.log("status: " + response.statusCode + " for row: " + csvrow[2]);
        }
    });
}

fs.createReadStream('input2.csv')
    .pipe(parse({delimiter: ';'}))
    .on('data', function(csvrow) {
        postActivity(csvrow);    
    })
    .on('end',function() {
    });