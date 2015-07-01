// Copyright (c) Visual Data Solutions, Inc. All rights reserved. This source code is distributed under the terms of the MIT license. See LICENSE file in the project root for complete license information.

/*jshint expr: true*/

var chai = require('chai');
var expect = chai.expect;
var Model = require('dynel-data').Model;
var DT = require('dynel-data').DataTypes;
var IdentityClient = require('../lib/identityClient.js');

var baseUrl = 'http://dynel-node.azurewebsites.net';

describe('IdentityClient', function() {
    this.timeout(15000);

    it('should fire success on successful login', function(done) {

        var client = new IdentityClient({baseUrl: baseUrl});
        client.authenticate({
            username: 'admin',
            password: 'password',
            context: this,
            success: function(token) {
                console.log('token: ' + token);
                done();
            },
            error: function(err) {
                console.log('error: ' + err);
                throw err;
            }
        });
    });

    it('should fire error on unsuccessful login', function(done) {

        var client = new IdentityClient({baseUrl: baseUrl});
        client.authenticate({
            username: 'admin',
            password: 'password2',
            context: null,
            success: function(token) {
                console.log('token: ' + token);
                throw 'should not get success call here';
            },
            error: function(err) {
                console.log('error: ' + err.message);
                done();
            }
        });
    });
});

