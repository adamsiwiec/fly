#!/usr/bin/env node

var fly = require("./fly.js");
var pack = require("./package.json")

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

    fly.fly("repo", repo);

} else {
    fly.fly("person", repo);
}
