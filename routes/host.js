var database = require('../database');

exports.index = function(req, res){
  var req_title = 'hosts';
  database.query("select source_host, count(source_host) as requests from history group by source_host order by requests desc;", function(err, results) {
    res.render('hosts', { title: req_title, hosts: results.rows });
  });
};

exports.detail = function(req, res) {
  var host = req.params.term;
  var title = host;
  database.query("select * from history where source_host like '%" + host + "%'", function(err, results) {
    if (err) throw err;
    //console.log("host: ", results);
    res.render('host', { title: title, host: req.params.term, history: results.rows });
  });
}
