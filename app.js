
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var site = require('./routes/site');
var host = require('./routes/host');
var http = require('http');
var path = require('path');

var database = require('./database');

var app = express();

// prevent node from exiting on uncaught exceptions
process.on('uncaughtException', function (err) {
  console.error(err);
  console.log("Node NOT Exiting...");
});

// all environments
app.set('port', process.env.PORT || 31337);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', site.index);
app.get('/sites', site.index);
app.get('/sites/:term', site.detail);
app.get('/hosts', host.index);
app.get('/hosts/:term', host.detail);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

var pcap = require('pcap'),
    tcp_tracker = new pcap.TCP_tracker(),
    pcap_session = pcap.createSession("em2", "ip proto \\tcp");

console.log("Echelon listening on " + pcap_session.device_name);

tcp_tracker.on('http request', function(session, http) {
    //console.log('http');
    var date = new Date();
    var source = session.src_name.split(':')[0];
    var dest = session.dst_name.split(':')[0];
    
    values =  "'" + date.toISOString() + "', '" + source + "', '" + source + "'";
    values += ", '" + dest + "', '" + dest + "'";
    values += ", '" + http.request.headers.Host + "', '" + http.request.url + "'" ;
    qs = "INSERT INTO history(timestamp, source_ip, source_host, dest_ip, dest_host, site_host, site_url) VALUES(" + values + ");";
    database.query(qs, function(err, results) {
        if (err) throw err;
    });
});

pcap_session.on('packet', function (raw_packet) {
    var packet = pcap.decode.packet(raw_packet);
    tcp_tracker.track_packet(packet);
});
