/**
 * Created by seanbrookes on 2014-01-28.
 */
/**
 * Created by rfeng on 11/19/13.
 */

var loopback = require('loopback');

var nodeEnv = process.env.NODE_ENV || 'development';
var config = require('rc')('loopback', {
  name: 'oilwreck',
  env: nodeEnv
});

console.log(config);

if (!config[nodeEnv]) {
  config[nodeEnv] = {};
}

// Use the memory connector by default.
var DB = (process.env.DB = process.env.DB || 'mongodb');

// Load the environmental settings for this database.
config = config[nodeEnv][DB];

if (!config) {
  config = {};
}

console.log('Using the %s connector.', DB);
console.log('To specify another connector:');
console.log('  DB=oracle node app');
console.log('  DB=mongodb node app');

switch (DB) {
  case 'oracle':
  case 'mongodb':
  case 'mysql':
    var m = 'loopback-connector-' + DB;
    try {
      config.connector = require(m);
    } catch (e) {
      console.log('could not require %s', m);
      console.log('make sure it is listed in package.json');
      console.log('then run');
      console.log('  npm install');

      throw e;
    }
    break;
  default:
    config.connector = loopback.Memory;
    break;
}

var ds = null;
try {
  ds = loopback.createDataSource(config);
} catch (e) {
  console.error('Error while initializing the data source:');
  console.error(e.stack);
  console.error('\nPlease check your configuration settings and try again.');
  process.exit(1);
}
//
//var Car = ds.createModel('Car', {
//  "id": {type: "string", id: true, length: 64},
//  "vin": {"type": "string"},
//  "dealerId": {"type": "string", "required": true},
//  "year": {"type": "number"},
//  "make": {"type": "string"},
//  "model": {"type": "string"},
//  "image": {"type": "string"},
//  "carClass": {"type": "string"},
//  "color": {"type": "string"},
//  "created": {"type": "date"},
//  "lastupdate": {"type": "date"}
//}, {
//  relations: {
//    "dealer": {
//      type: "belongsTo",
//      model: "Dealer",
//      foreignKey: "dealerId"
//    }
//  }
//});
//
//var Dealer = ds.createModel('Dealer', {
//  "id": {type: "string", id: true, length: 64},
//  "name": {"type": "string"},
//  "address": {"type": "string"},
//  "city": {"type": "string"},
//  "state": {"type": "string"},
//  "country": {"type": "string"},
//  "postalzip": {"type": "string"},
//  "phone": {"type": "string"},
//  "url": {"type": "string"},
//  "location": {type: "geopoint"},
//  "created": {"type": "date"},
//  "lastupdate": {"type": "date"}
//});

//var Location = ds.createModel('Location', {
//  "id": {type: "string", id: true},
//  "name": {"type": "string"},
//  "address": {"type": "string"},
//  "city": {"type": "string"},
//  "state": {"type": "string"},
//  "country": {"type": "string"},
//  "postalzip": {"type": "string"},
//  "lat": {"type": "number", "required": true},
//  "lng": {"type": "number", "required": true},
//  "created": {"type": "date"},
//  "lastupdate": {"type": "date"}
//});

//var User = ds.createModel('User', {
//  "id": {type: "string", id: true},
//  "firstname": {"type": "string"},
//  "lastname": {"type": "string"},
//  "email": {"type": "string"},
//  "username": {"type": "string"},
//  "password": {"type": "string"},
//  "phone": {"type": "string"},
//  "locations": {"type": "string"},
//  "created": {"type": "date"},
//  "lastupdate": {"type": "date"}
//});

//var Reservation = ds.createModel('Reservation', {
//  "id": {"type": "number", "id": true, "generated": true},
//  "customerId": {"type": "string", "required": true},
//  "dealerId": {"type": "string", "required": true},
//  "carId": {"type": String, "required": true},
//  "fromDate": {"type": "date", "required": true},
//  "toDate": {"type": "date", "required": true}
//});
//
//var Rate = ds.createModel('rate', {
//  "id": {"type": "number", "id": true, "generated": true},
//  "dealerId": {"type": "string", "required": true},
//  "carClass": {"type": "string"},
//  "rate": {"type": "number"}
//});

var Event = ds.createModel('event',{
      "date": {
        "type": "date"
      },
      "type": {
        "type": "string"
      },
      "nearestCity": {
        "type": "string"
      },
      "stateProv": {
        "type": "string"
      },
      "country": {
        "type": "string"
      },
      "blurb": {
        "type": "string"
      },
      "notes": {
        "type": "string"
      },
      "createdDate": {
        "type": "date"
      },
      "lastUpdate": {
        "type": "date"
      },
      "material": {
        "type": "string"
      }
});

//
//ds.automigrate('Reservation', function (err) {
//  if (err) {
//    console.log(err);
//    return;
//  }
//  console.log('CREATED RESERVATION TABLE');
//});

ds.automigrate(function (err) {
  if (err) {
    console.log(err);
    return;
  }
  console.log('CREATED Events TABLE');
  var events = require('./data.json');
  events.forEach(function (event) {
    // console.log(dealer);
    Event.create(event, console.log);
  });

//  var cars = require('./cardata.json');
//
//  cars.forEach(function(car) {
//    // console.log(car);
//    Car.create(car, console.log);
//  });

});