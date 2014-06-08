var OAuth = require('oauth');

   
 var OAuth2 = OAuth.OAuth2;    
 var rdioConsumerKey = '6q535n9juuymj8bssexn8yc2';
 var rdioConsumerSecret = 'bSFvq3vwXY';
 var oauth2 = new OAuth2(
   rdioConsumerKey,
   rdioConsumerSecret, 
   'http://api.rdio.com/', 
   '',
   'oauth/request_token', 
   '');

 oauth2.getOAuthAccessToken(
   '',
   {'grant_type':'code'},
   function (e, access_token, refresh_token, results){
   		console.log(e);
   		console.log('access tokens: ', access_token);
   		console.log('refrresh tokens: ', refresh_token);
   		console.log('results: ', results);
   		
   });

/*
var OAuth = require('oauth');

  
    var oauth = new OAuth.OAuth(
      'http://api.rdio.com/oauth/request_token',
      'http://api.rdio.com/oauth/access_token',
      '6q535n9juuymj8bssexn8yc2',
      'bSFvq3vwXY',
      '1.0A',
      null,
      'HMAC-SHA1'
    );

    oauth.post(
      'http://api.rdio.com/1/',
      '6q535n9juuymj8bssexn8yc2', //test user token
      'bSFvq3vwXY', //test user secret            
      function (e, data, res){
        if (e) console.log(e);        
        console.log(data);
        console.log(res);   
      });    
  







var rdio = require('rdio')({});

rdio.api('6q535n9juuymj8bssexn8yc2', 'bSFvq3vwXY', {
    method: 'getTopCharts',
    type: 'Track',
    count: 10
}, function(err, data, response){
	console.log(err);
	console.log(data);
});*/