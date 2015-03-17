#!/usr/bin/env node

var irc = require("irc");
var shell = require("shelljs");
var config = require("./config.json");
var second = 1000;
var minute = second * 60;
config.customParams.channels = config.channels;

var bot = new irc.Client(config.server, config.name, config.customParams);

var meme = config.meme != false && shell.exec('which meme').code == 0;

console.log("Connecting " + config.name + " to " + config.server + "...");

if (meme)
    for (i in config.meme)
	config.meme[i].current = 1;

bot.sayAll = function(msg) {
    for (i in config.channels)
	bot.say(config.channels[i], msg);
}

bot.response = function(channel, message) {
    var timeout = config.responseTime instanceof Array ? Math.random() * (config.responseTime[1] - config.responseTime[0]) + config.responseTime[0] : config.responseTime || 0;
    setTimeout(function() {
	bot.say(channel, message)
    }, timeout * second);
}

bot.addListener("join", function(channel, who) {
    if (config.welcomeMessage != false && who !== config.name)
	bot.say(channel, config.welcomeMessage.replace("%s", who));
    if (who === config.name && config["42"] == true) {
	initSay42(channel);
	config["42"] = false;
    }
});

bot.addListener("quit", function(who, reason, channels) {
    if (config.goodbyeMessage != false)
	bot.say(channels[0], config.goodbyeMessage.replace("%s", who));
});

bot.addListener('message', function (from, to, message) {
    if (config.history)
	console.log(from + ' => ' + to + ': ' + message);
    if (message.indexOf(config.name) >= 0)
	for (i in config.talkAboutMe)
	    if (message.indexOf(i) >= 0)
		bot.response(to, config.talkAboutMe[i]);
    for (i in config.react)
	if (message.indexOf(i) >= 0)
	    bot.response(to, config.react[i]);
    if (meme) {
	for (i in config.meme) {
	    if (config.meme[i].user === from) {
		if (config.meme[i].current == config.meme[i].interval) {
		    config.meme[i].current = 1;
		    bot.response(to, shell.exec("meme --text " + config.meme[i].meme + " '" + message.replace(/'/g, "\\'") + "'" + " ' '").output);
		}
		else
		    ++config.meme[i].current;
	    }
	}
    }
});

bot.addListener('pm', function (from, message) {
    for (i in config.master)
	if (config.master[i] === from)
	    bot.say(config.primaryChan, message);
});

bot.addListener('error', function(message) {
    console.error('error: ', message);
});

function initSay42(channel) {
    var now = new Date();
    var minutesLeft;
    var secondsLeft;

    minutesLeft = (42 - now.getMinutes() + 59) % 60;
    secondsLeft = (60 - now.getSeconds()) % 61;
    setTimeout(function() {
	initSay42(channel);
	console.log('42');
	bot.say(channel, "42 !");
    }, minutesLeft * minute + secondsLeft * second);
    console.log('Next call in ' + minutesLeft + ' minutes and ' + secondsLeft + ' seconds');
}
