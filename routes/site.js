var database = require('../database');

exports.index = function(req, res){
  var req_title = 'sites';
  database.query("select site_host, count(site_host) as visits from history group by site_host order by visits desc;", function(err, results) {
    //console.log("results: %j", results.rows);
    res.render('sites', { title: req_title, sites: results.rows });
  });
};

exports.detail = function(req, res) {
  var site_host = req.params.term;
  var title = site_host;
  database.query("select * from history where site_host like '%" + site_host + "%'", function(err, results) {
    if (err) throw err;
    //console.log("site: ", results);
    res.render('site', { title: title, site: req.params.term, history: results.rows });
  });
}
