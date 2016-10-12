var needle = require('needle');
var opener = require('opener');

var exports = module.exports = {};

exports.fly = function (type, repo) {
	if (type === 'person') {
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
