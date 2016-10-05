#! /usr/bin/env node


var request = require('request');
var opener = require('opener');
var flags = require('flags');
var pack = require('./package.json');




flags.defineBoolean('version');
flags.parse();

if (flags.get('version')) {
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


if (repo.indexOf('/')) {

    request('https://api.github.com/repos/' + repo, function(err, res, body) {
        if (!err && res.statusCode == 200) {
            var link = "https://github.com/" + repo;
            opener(link);
            process.exit();

        }
        console.log('This repo does not exist');
        process.exit();

    });


}

else {

    request('https://api.github.com/users/' + repo, function(err, res, body) {
        if (!err && res.statusCode == 200) {
            var link = "https://github.com/" + repo;
            opener(link);
            process.exit();

        }
        console.log('This person does not exist');
        process.exit();

    });

}
