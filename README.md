echelon
=======

This is a simple interface to log and audit http traffic on your network using pcap.

Running
-------

    git clone git@github.com:gregbuehler/echelon.git
    createdb echelon; psql echelon < database.psql
    npm install
    npm install -g nodemon
    sudo nodemon app.js

Notes
-----

echelon assumes you're using postgres with the included schema. Update