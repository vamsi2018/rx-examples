const express = require('express')
const app = express()
app.use(express.static('public'))

var request = require('request');

var https = require('https');

var getGithubIssues = function(repo,project,res){

	var options = {
	    host: 'api.github.com',
	    path: '/repos/'+repo+'/'+project+'/issues',
	    method: 'GET',
	    headers: {'user-agent': 'node.js'}
	};


	var request = https.request(options, function(response){
		var body = '';
		response.on("data", function(chunk){
		    body += chunk.toString('utf8');
		});

		response.on("end", function(){
			var githubResponse = JSON.parse(body)
		    res.send(githubResponse);
	    });
	});

	request.end();

	
}

app.get('/:repo/:project', function (req, res) {
  // res.send('Hello World!')
  var repo = req.param('repo')
  var project = req.param('project')
  getGithubIssues(repo,project,res);
  //res.send("chunk");
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})