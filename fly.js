#! /usr/bin/env node

var needle = require('needle');
var opener = require('opener');
var pack = require('./package.json');


function fly(type, repo) {

    if (type === "person") {
        var person = type;
        var requestUrl = "users";
    } else if (type === "repo") {
        var person = type;
        var requestUrl = "repos";
    }
    var url = "https://api.github.com/" + requestUrl + "/" + repo;


    needle.get(url, function(err, res) {
        if (!err && res.statusCode === 200) {

            var link = "https://github.com/" + repo;
            opener(link);
            process.exit();

        } else {
            console.log('This ' + person + ' does not exist');
            process.exit();
        }

    });

}


if (process.argv.indexOf('--version') != -1 || process.argv.indexOf('-v') != -1) {
    console.log(pack.version);
    process.exit();
}


console.log('');


var repoSlice = process.argv.slice(2);
var repo = repoSlice[0];

if (!repo) {
    console.log("You have to give me a repo to look for!");
    console.log("Try 'fly adamsiwiec/fly' ");
    process.exit();
}

if (repo.indexOf('/') !== -1) {

    fly("repo", repo);

} else {
    fly("person", repo);
}
