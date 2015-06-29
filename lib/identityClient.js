// Copyright (c) Visual Data Solutions, Inc. All rights reserved. This source code is distributed under the terms of the MIT license. See LICENSE file in the project root for complete license information.

var DynObject = require('dynel-core').DynObject;
var CoreObject = require('dynel-core').CoreObject;
var EventSource = require('dynel-core').EventSource;
var request = require('superagent');


module.exports = CoreObject.extend({
    className: 'IdentityClient',

   mixins: [
        EventSource
    ],

    init: function(data) {
        this.baseUrl = data.baseUrl;
    },

    authenticate: function(options) {
        var url = this.baseUrl + '/oauth/token';

        var data = {
            username: options.username,
            password: options.password,
            grant_type: 'password'
        };

        request
         .post(url)
         .send(data)
         .set('Accept', 'application/json')
         .type('form')
         .end(function (error, res) {

                if (error) {
                    var e = error;
                    if (options.error) {
                        options.error.call(options.context, e);
                    }
                }
                else if (options.success) {
                    console.log('got token: ' + res.body.access_token);
                    var token = res.body.access_token;
                    options.success.call(options.context, token);
                }
            });

    }
});


