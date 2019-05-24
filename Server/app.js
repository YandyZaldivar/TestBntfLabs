'use strict';

var cors = require('cors');
var request = require('request');
var express = require('express');

var app = express();
app.use(cors());

const baseUrl = 'http://netzone.cl/bntf/api.users.prueba/skeleton/';
const commonTokenHeaderValue = '%ca7b=E]bV?t_M8C(Q]qU{qzQTPJOX/%AoKVv3S`Z`"Uxh]uwBfnooPJ%DW9)]m';

function httpGet(options, res, fromImage = false) {
    request.get(options, function (_err, _res, _body) {
        if (_err) {
            res.statusCode = 500;
            res.send(_err);
        }
        else if (_res.statusCode !== 200)
            res.statusCode = _res.statusCode;
        else if (!fromImage)
            res.send(_body);
        else {
            var base64Image = _body.toString('base64');
            res.send('{"base64Data":"' + base64Image + '"}');
        }
    });
}

app.get('/', function (req, res) {
    res.send('BNTFLabs Test');
});

app.get('/users', function (req, res) {
    var options = {
        baseUrl: baseUrl,
        uri: 'api/users',
        method: 'GET',
        gzip: true,
        headers: {
            'token': commonTokenHeaderValue,
            'Cache-Control': 'no-cache'
        }
    };

    httpGet(options, res);
});

app.get('/skills', function (req, res) {
    var options = {
        baseUrl: baseUrl,
        uri: 'api/skills',
        method: 'GET',
        gzip: true,
        headers: {
            'token': commonTokenHeaderValue,
            'Cache-Control': 'no-cache'
        }
    };

    httpGet(options, res);
});

app.get('/image/:iduser', function (req, res) {
    var options = {
        baseUrl: baseUrl,
        uri: 'api/image_perfil',
        method: 'GET',
        gzip: true,
        encoding: null,
        headers: {
            'token': commonTokenHeaderValue,
            'Cache-Control': 'no-cache',
            'iduser': req.params.iduser
        }
    };

    httpGet(options, res, true);
});

const port = 3000;
app.listen(port);
console.log('app ready on port ' + port);