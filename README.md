echelon
=======

This is a simple interface to log and audit http traffic on your network using pcap.

Running
-----

    git clone git@github.com:gregbuehler/echelon.git
    createdb echelon; psql echelon < database.sql
    npm install
    npm install -g nodemon
    sudo nodemon app.js