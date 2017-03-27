#!/usr/bin/env node

const fly = require('./fly.js');
const pack = require('./package.json');

if (process.argv.indexOf('--version') > 0 || process.argv.indexOf('-v') > 0) {
	console.log(pack.version);
	process.exit();
}

console.log('');

const repoSlice = process.argv.slice(2);
const repo = repoSlice[0];

if (!repo) {
	console.log('You have to give me a repo to look for!');
	console.log('Try \'fly adamsiwiec/fly\' ');
	process.exit();
}

if (repo.indexOf('/') > 0) {
	fly.fly('repo', repo);
} else {
	fly.fly('person', repo);
}
