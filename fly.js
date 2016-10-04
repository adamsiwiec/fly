#! /usr/bin/env node


var request = require('request');
var opener = require('opener');


console.log('This is fly!');
console.log('');


var repoSlice = process.argv.slice(2);
var repo = repoSlice[0];


if (!repo) {
    console.log("You have to give me a repo to look for!");
    console.log("Try 'fly adamsiwiec/fly' ");
    process.exit();
}






request('https://github.com/' + repo, function(err, res, body) {
    if (!err && res.statusCode == 200) {
        var link = "https://github.com/" + repo;
        opener(link);
        process.exit();

    }

    console.log('This repo or person does not exist');
    process.exit();

});
