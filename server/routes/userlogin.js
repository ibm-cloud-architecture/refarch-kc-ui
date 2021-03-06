/**
 * Copyright 2018 IBM Corp. All Rights Reserved.
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

module.exports = function(app, passport){
  app.get('/api/logout', function(req, res){
    if(req.user){
      console.log('logging out user:', req.user);
    }
    req.logout();
    req.session.destroy(function (err) {
        res.status(200).send({loggedOut: true});
    });
  })
  // { successRedirect: '/', failureRedirect: '/login'}
  app.post('/api/login', passport.authenticate('local', { failureFlash: 'Invalid username or password.' }), function(req, res) {
    console.log('User Authenticated Successfully:', req.user)
    res.status(200).send(req.user);
  })
}
