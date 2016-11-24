var needle = require('needle');
var opener = require('opener');
var GitHubApi = require('github');

var exports = module.exports = {};

exports.fly = function (type, repo) {
	var github = new GitHubApi({
	    // optional args

	    protocol: 'https',
	    host: 'api.github.com', // should be api.github.com for GitHub
	    headers: {
	        'user-agent': 'adamsiwiec' // GitHub is happy with a unique user agent
	    },
	    followRedirects: false, // default: true; there's currently an issue with non-get redirects, so allow ability to disable follow-redirects
	    timeout: 5000
	});

	if (type === 'person') {

		github.users.getForUser({
    user: repo
}, function(err, res) {
	if (err) {
		console.log(err);
	}
	var user = JSON.stringify(res);
    console.log(user);
});
		var person = type;
		var requestUrl = 'users';
	} else if (type === 'repo') {
		var person = type;
		var requestUrl = 'repos';
	}
	var url = 'https://api.github.com/' + requestUrl + '/' + repo;

	needle.get(url, function (err, res) {
		if (!err && res.statusCode === 200) {
			var link = 'https://github.com/' + repo;
			opener(link);

			process.exit();
		} else {
			console.log('This ' + person + ' does not exist');

			process.exit();
		}
	});

	return true;
};
