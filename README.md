# HAL42

The IRC bot for the **Equilibre** organization.

## Installation

```bash
npm install --python=python2
mv config.json.default config.json
```

Then, you have to modify the `config.json` file

## Usage

This is an example of a configuration file:

```javascript
{
    "name": "HAL42",
    "channels": ["#equilibre", "#4242"],
    "primaryChan": "#4242", // the channel to forward master's messages
	"customParams": { // this parameters will be used at the connection
		"userName": "HAL42",
		"realName": "HAL42",
		"password": "",
		"sasl": true
    },
    "server": "irc.freenode.net",
    "master": ["Alpha14", "Emeraude"], // the bot will forward their private messages
	"welcomeMessage": "Bienvenue %s !" // welcome message, "%s" will be replaced by the name of the user
	"goodbyeMessage": "À la prochaine %s !" // same as welcomeMessage, but when a user logout
	"responseTime": [2, 5], // will answer between 2 and 5 seconds later (an int could also be used)
	"maxReponses": 2, // the bot will not answer more than twices per messages (set to -1 to made it unlimited)
    "react": { // the bot will response if one on the words "bocal", "php", "ubuntu" or " windows" is said
		" bocal": "https://i.imgur.com/Qg1SrLe.png",
		" php": "https://i.imgur.com/vlpkkUM.jpg"
		" ubuntu": "http://cdn.meme.am/instances/54738442.jpg",
		" windows": "http://cdn.meme.am/instances/57260052.jpg"
    },
    "talkAboutMe": { // the bot will response if one on the words "merci" or "bot", and the name of the bot is said
		"merci": "de rien :)",
		" bot": "Je ne suis pas un bot !"
	},
	"searchEngine": { // The bot will response to !ddg with a search on ddg
		"ddg": "https://duckduckgo.com/?q=%s" // '%s' will be replaced by the message
	},
	"meme": [
		{ // each 10 messages, doctor will receive it's last message as a meme using Ancient-aliens image
			"user": "Doctor",
			"meme": "Ancient-aliens",
			"interval": 10
		}
	],
    "history": true, // write all the messages said in stdout
	"42": true // say 42 each hour
}
```

If you want to use the memes, you need to install the official [Equilibre Meme Gem](https://github.com/Equilibre/meme).  
You can change config with this type of command:
```
!config var.name value
```

### Contributors

Alpha14  
Emeraude
