/**
 * Copyright 2017 IBM Corp. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var LocalStrategy = require('passport-local').Strategy;
const users = {"bobbuilder@email.com" : {firstname:'Bob',lastname:'Builder',email:'bobbuilder@email.com'},
  "eddie@email.com" : {firstname:'Eddie',lastname:'Builder',email:'eddie@email.com'}
  };

module.exports = function(passport) {
    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user);
    });

    // used to deserialize the user
    passport.deserializeUser(function(user, done) {
        done(null, user);
    });

    passport.use('local', new LocalStrategy({
        passReqToCallback : true, // allows us to pass back the entire request to the callback
        // specify the attribute names to consider: you are not using default  username, password
        usernameField: 'email',
		    passwordField: 'password'
    },
      function( req, email, password, done) {
        var user = { email:email,password:password}

        console.log('Login call '+email);
        user = users[email];
        done(null,user);
      }
    ));
};
