## About This Project
A faucet company offering free crypto rolls every hour from Cryptos Faucets. The aim of this script is to automate the rolls and collect the free cryptos.

This was a project developed for personal use and better left ran unattended. You can run this on your computer or server, wherever you choose to run it.

The current coins that's claimed is: **BTC  ETH  LTC  BNB  USDT  USDC  TRON  LINK  ADA  DOGE  NEO  DASH  NEM  XRP**

The bot also is capable of applying promo codes that **[Crypto Faucets](https://twitter.com/cryptosfaucets)** occasically publishes, provided the code hasn't been applied to the account before. This allows the account to gain additional coin claims and reset the wait counter.

## Getting Started
In order to run the script, you will require Node.js to be pre-installed first. The script uses a combination of [Node.js](https://nodejs.org/en), [Puppeteer](https://github.com/puppeteer/puppeteer) and [Chromium](https://www.chromium.org).

### Prerequisites
Install Node.js: https://nodejs.org/en/download/

Once installed, using the `Terminal` (Linux/macOS) or `Command Prompt` (Windows), simply execute `npm i` or `npm install` in the directory of this project. Node.js's package manager will then automatically install all the required dependencies from `package.json`.

## Usage
With all the pre-requisites setup and completed the rest is pretty straightforward.

A brief note in case you're not familiar with command line or terminal usage. On Windows, you can simply run the `.bat` file or via Command Prompt by typing in the command.
On Linux and macOS, you will need to run the `.sh` file via a Terminal.

### 1. Bot Configuration
You need to first edit the `config.ini` and supply an email and password. The email and password will be used to sign up and login to claim the rewards across the sites.

#### Credentials
Replace the section `<email>` and `<pass>` with your chosen credentials.
```ini
[user]
email=<email>
pass=<pass>
```
Rest assured, I'm not interested in your credentials as this is only used by the bot to run locally to automate a human interaction as you would do so manually.

#### Browser
This is not required if the bot works for you. Definately required if you plan to run on a Raspberry Pi.

For instances where the bot fails to run the bundled Chromium browser, you will need to supply a path to a browser, e.g. running on a Raspberry Pi requires it's own compiled version of the Chromium browser so the path has to be supplied.

To supply the browser can be done as example syntax:  
**Note: Your browser path may differ.**
```ini
### Windows ###
browserpath=C:\Program Files (x86)\Google\Chrome\Application\chrome.exe

### Linux ###
browserpath=/usr/bin/chromium-browser
```

### 2. Signing Up
You need to first sign up to the Faucet site with an account before you can start claiming the coins.

To make life simpler, there is a `signup.sh/.bat` script that will automatically do the registering for you. It will read the configuration file `config.ini` for the credentials you've provided. All you have to do is just execute the script. 

Once the script bot signed up to all the sites, you just need to check your mail box for the email you've used in the `config.ini` and confirm the account creation otherwise the bot won't be able to claim the rewards.

#### Windows
```console
signup.bat
```

#### Linux | macOS
Make sure that the script is executable if it isn't.
```console
chmod +x signup.sh
sh signup.sh
```

### 3. Running the Bot
Running the bot is as simple as executing the `shell (Unix)` or `batch (Windows)` script.

#### Windows
```console
crypto-bot.bat
```

#### Linux | macOS
Make sure that the script is executable if it isn't.
```console
chmod +x crypto-bot.sh
sh crypto-bot.sh
```

### 4. Updating
When changes have been pushed out, you can update the bots to the latest from this repository by invoking `git pull` from the main directory. 

In the event that the command failed due to your local changes conflicting, you will need to reset the local changes to default and then pull the latest changes. You can do this with `git reset --hard`. This will revert all changes and you can proceed with pulling the new changes. Note that resetting means you need to re-configure your `config.ini` again.

If after updating, the bot fails when attempting to run, simply remove the `node_modules` completely and re-install the required modules with `npm i`.

To remove the node modules from `Terminal` or `Command Prompt`, invoke:

#### Linux | macOS
```console
rm -rf node_modules
```

#### Windows
```console
rd /q/s node_modules
```

#### New Faucets Added
In addition to updates, there may occasionally be new faucets added. If that's the case, after you've update the bots, you can simply run the `signup-bot.sh/bat` script to register any new faucets that have been added.

## Running Unattended
Because it's a script that's ran on console level, you can set the script to run at startup. There are various ways to achieve this.

### Windows
You can use Windows' built-in Task Scheduler to make the script run at startup. You can find out how to do that **[here](https://www.thewindowsclub.com/run-batch-files-silently-on-windows)**.

### Linux | macOS
On UNIX type systems you could use a combination of **[crontab](https://help.dreamhost.com/hc/en-us/articles/215767047-Creating-a-custom-Cron-Job)** and **[screen](https://linuxize.com/post/how-to-use-linux-screen/)** to create a cron job to run on startup. You can choose not to use `screen` if you like.


## Support & Donations
If you choose to register the sites manually instead and or to support the project, kindly register with my referral links. You can also share the links and the bot with others.

**I also accept crypto donations:**  
BTC - bc1qjrlzpy4hjhnj6436fwkmzmr2a36r29s0ngy9cu  
ETH - 0xE03f7BDAC29D0095a1DD07133731C91b100f0999  
LTC - LNUtbLV4CLYJUCPfRm4pooaeHASBRaKnnP  

#### Referrals to Faucet
[![BTC](https://freebitcoin.io/img/freebitcoin/banners/Banner468x60.jpg)](https://freebitcoin.io/?ref=366602)  
**BTC- https://freebitcoin.io/?ref=366602**

[![ETH](https://freeethereum.com/img/freeethereum/banners/Banner468x60.jpg)](https://freeethereum.com/?ref=96650)  
**ETH - https://freeethereum.com/?ref=96650**

[![LTC](https://free-ltc.com/img/freelitecoin/banners/Banner468x60.jpg)](https://free-ltc.com/?ref=27952)  
**LTC - https://free-ltc.com/?ref=27952**  

[![USDT](https://freetether.com/img/freetether/banners/Banner468x60.jpg)](https://freetether.com/?ref=114067)  
**USDT - https://freetether.com/?ref=114067**  

[![USDC](https://freeusdcoin.com/img/freeusdcoin/banners/Banner468x60.jpg)](https://freeusdcoin.com/?ref=75332)  
**USDC - https://freeusdcoin.com/?ref=75332**  

[![BNB](https://freebinancecoin.com/img/freebinancecoin/banners/Banner468x60.jpg)](https://freebinancecoin.com/?ref=72163)  
**BNB - https://freebinancecoin.com/?ref=72163**  

[![LINK](https://freechainlink.io/img/freechain/banners/Banner468x60.jpg)](https://freechainlink.io/?ref=34381)  
**LINK - https://freechainlink.io/?ref=34381**  

[![NEO](https://freeneo.io/img/freeneo/banners/Banner468x60.jpg)](https://freeneo.io/?ref=39047)  
**NEO - https://freeneo.io/?ref=39047**  

[![ADA](https://freecardano.com/img/freecardano/banners/Banner468x60.jpg)](https://freecardano.com/?ref=249042)  
**ADA - https://freecardano.com/?ref=249042**  

[![DOGE](https://free-doge.com/img/freedoge/banners/Banner468x60.jpg)](https://free-doge.com/?ref=14646)  
**DOGE - https://freecardano.com/?ref=249042**  

[![TRON](https://free-tron.com/img/freetron/banners/Banner468x60.jpg)](https://free-tron.com/?ref=100636)  
**TRON - https://free-tron.com/?ref=100636**  

[![DASH](https://freedash.io/img/freedash/banners/Banner468x60.jpg)](https://freedash.io/?ref=54242)  
**DASH - https://freedash.io/?ref=54242**  

[![XRP](https://coinfaucet.io/img/coinfaucet/banners/Banner468x60.jpg)](https://coinfaucet.io/?ref=698164)  
**XRP - https://coinfaucet.io/?ref=698164**  

[![NEO](https://freenem.com/img/freenem/banners/Banner468x60.jpg)](https://freenem.com/?ref=251426)  
**NEM - https://freenem.com/?ref=251426**  
