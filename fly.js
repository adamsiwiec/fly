	const needle = require('needle');
	const opener = require('opener');
	const GitHubApi = require('github');

	module.exports.fly = function(type, repo) {
	    const github = new GitHubApi({
	        // Optional args

	        protocol: 'https',
	        host: 'api.github.com', // Should be api.github.com for GitHub
	        headers: {
	            'user-agent': 'adamsiwiec' // GitHub is happy with a unique user agent
	        },
	        followRedirects: false, // Default: true; there's currently an issue with non-get redirects, so allow ability to disable follow-redirects
	        timeout: 5000
	    });

	    if (type === 'person') {
	        github.users.getForUser({
	            username: repo
	        }, (err, res) => {
	            if (err) {
	                console.log(err);
	            }
	            const user = JSON.stringify(res);
	        });
	        var person = type;
	        var requestUrl = 'users';
	    } else if (type === 'repo') {
	        var person = type;
	        var requestUrl = 'repos';
	    }
	    const url = 'https://api.github.com/' + requestUrl + '/' + repo;

	    needle.get(url, (err, res) => {
	        if (!err && res.statusCode === 200) {
	            const link = 'https://github.com/' + repo;
	            opener(link);

	            process.exit();
	        } else {
	            console.log('This ' + person + ' does not exist');

	            process.exit();
	        }
	    });

	    return true;
	};
