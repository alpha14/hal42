var moment = require("moment");
var irc = require("irc");
var config = require("./config.json");
var second = 1000;
var minute = second * 60;
// configuration
var server = config.server;
var name = config.name;
var chan = '#equilibre';
var data = {
    userName: config.name,
    realName: config.name,
    channels: config.channels,
    password: config.password,
    sasl: config.sasl
};
// Create the bot name
var bot = new irc.Client(server, name, data);

bot.addListener("join", function(channel, who) {
    if(who.substring(0,name.length) != name)
	bot.say(channel, "Bienvenue " + who +" !");
});

bot.addListener('message', function (from, to, message) {
    console.log(from + ' => ' + to + ': ' + message);
    if ((message.indexOf(name)>=0) && (message.indexOf("bot")>=0))
	bot.say(to, "Je ne suis pas un bot !");
    else if ((message.indexOf(name)>=0) && (message.indexOf("merci")>=0))
	bot.say(to, "de rien :)");
    else if ((message.indexOf(" bocal")>=0) || (message.indexOf("#bocal")>=0))
	bot.say(to, "https://i.imgur.com/Qg1SrLe.png");
    else
	if ((message.indexOf(" php")>=0) || (message.indexOf("#php")>=0))
	    bot.say(to, "https://i.imgur.com/vlpkkUM.jpg");

});

bot.addListener('pm', function (from, message) {
    console.log(from + ' => ME: ' + message);
    if (from === 'Alpha14')
	bot.say(chan, message);
});

bot.addListener('error', function(message) {
    console.log('error: ', message);
});

function initSay42() {
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
    setTimeout(say42, interval);
    console.log(moment().format());
    console.log('First call in ' + minutesLeft + ' minutes and ' + secondsLeft + ' seconds');
}

function say42() {
    setTimeout(say42, minute * 60);
    console.log('42');
    bot.say(chan, "42 !");
}

initSay42();
