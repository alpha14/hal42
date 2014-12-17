var moment = require("moment");
var irc = require("irc");
var config = require("./config.json");
var second = 1000;
var minute = second * 60;
// configuration
var server = config.server;
var name = config.name;
config.customParams.channels = config.channels;

// Create the bot name
var bot = new irc.Client(server, name, config.customParams)

bot.sayAll = function(msg) {
    for (i in config.channels)
	bot.say(config.channels[i], msg);
}

bot.addListener("join", function(channel, who) {
    if (who.substring(0,name.length) != name)
	bot.say(channel, "Bienvenue " + who +" !");
    if (who === config.name) {
	initSay42(channel);
    }
});

bot.addListener('message', function (from, to, message) {
    if (config.history)
	console.log(from + ' => ' + to + ': ' + message);
    if (message.indexOf(name) >= 0)
	for (i in config.talkAboutMe)
	    if (message.indexOf(i) >= 0)
		bot.say(to, config.talkAboutMe[i]);
    for (i in config.react)
	if (message.indexOf(i) >= 0)
	    bot.say(to, config.react[i]);
});

bot.addListener('pm', function (from, message) {
    console.log(from + ' => ME: ' + message);
    for (i in config.master)
	if (config.master[i] === from)
	bot.say(config.primaryChan, message);
});

bot.addListener('error', function(message) {
    console.log('error: ', message);
});

function initSay42(channel) {
    var getSeconds = moment().seconds()
    var getMinutes = moment().minutes();
    var minutesLeft;
    var secondsLeft;
    var interval;

    if (getMinutes < 42)
	minutesLeft = (42 - getMinutes) - 1;
    else if (getMinutes > 42)
	minutesLeft = (60 - getMinutes) + 42 - 1;
    else
	minutesLeft = 0;
    if (getSeconds === 0)
	secondsLeft = 0;
    else
	secondsLeft = 60 - getSeconds;
    interval = (minutesLeft * minute) + (secondsLeft * second);
    setTimeout(function() {
	say42(channel);
    }, interval);
    console.log(moment().format());
    console.log('First call in ' + minutesLeft + ' minutes and ' + secondsLeft + ' seconds');
}

function say42(channel) {
    setTimeout(function() {
	say42(channel);
    }, minute * 60);
    console.log('42');
    bot.say(channel, "42 !");
}
