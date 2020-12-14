## About This Project
A faucet company offering free crypto rolls every hour from Cryptos Faucets. The aim of this script is to automate the rolls and collect the free cryptos.

This was a project developed for personal use and better left ran unattended. You can run this on your computer or server, wherever you choose to run it.

The current coins that's claimed is: **`BTC  ETH  LTC  BNB  USDT  USDC  TRON  LINK  ADA  NEO  DASH  NEM  XRP`**

## Getting Started
In order to run the script, you will require Node.js to be pre-installed first. The script uses a combination of [Node.js](https://nodejs.org/en), [Puppeteer](https://github.com/puppeteer/puppeteer) and [Chromium](https://www.chromium.org).

### Prerequisites
Install Node.js: https://nodejs.org/en/download/

Once installed, simply execute `npm i` or `npm install` in the directory of this project. Node.js's package manager will then automatically install all the required dependencies from `package.json`.

## Usage
Running the bot is simple. First you will need to sign up to those faucet sites, then run the bot to claim the coins every hour.

### 1. Bot Configuration
You need to first edit the `config.ini` and supply an email and password. The email and password will be used to sign up and login to claim the rewards across the sites.

#### Credentials
Replace the section `<email>` and `<pass>` with your chosen credentials.
```
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
```
### Windows ###
browserpath=C:\Program Files (x86)\Google\Chrome\Application\chrome.exe

### Linux ###
browserpath=/usr/bin/chromium-browser
```

### 2. Signing Up
You need to first sign up to the Faucet site with an account before you can start claiming the coins.

To make life simpler, there is a `signup.sh/.bat` script that will automatically do the registering for you. All you have to do is just execute the script. 

Once the script bot signed up to all the sites, you just need to check your mail box for the email you've used in the `config.ini` and confirm the account creation otherwise the bot won't be able to claim the rewards.

#### Windows
```
signup.bat
```

#### Linux | macOS
Make sure that the script is executable if it isn't.
```
chmod +x signup.sh
sh signup.sh
```

### 3. Running the Bot
Running the bot is as simple as executing the `shell (Unix)` or `batch (Windows)` script.

#### Windows
```
crypto-bot.bat
```

#### Linux | macOS
Make sure that the script is executable if it isn't.
```
chmod +x crypto-bot.sh
sh crypto-bot.sh
```

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

[![LINK](https://freechain.link/img/freechain/banners/Banner468x60.jpg)](https://freechain.link/?ref=34381)  
**LINK - https://freechain.link/?ref=34381**  

[![NEO](https://freeneo.io/img/freeneo/banners/Banner468x60.jpg)](https://freeneo.io/?ref=39047)  
**NEO - https://freeneo.io/?ref=39047**  

[![ADA](https://freecardano.com/img/freecardano/banners/Banner468x60.jpg)](https://freecardano.com/?ref=249042)  
**ADA - https://freecardano.com/?ref=249042**  

[![TRON](https://free-tron.com/img/freetron/banners/Banner468x60.jpg)](https://free-tron.com/?ref=100636)  
**TRON - https://free-tron.com/?ref=100636**  

[![DASH](https://freedash.io/img/freedash/banners/Banner468x60.jpg)](https://freedash.io/?ref=54242)  
**DASH - https://freedash.io/?ref=54242**  

[![XRP](https://coinfaucet.io/img/coinfaucet/banners/Banner468x60.jpg)](https://coinfaucet.io/?ref=698164)  
**XRP - https://coinfaucet.io/?ref=698164**  

[![NEO](https://freenem.com/img/freenem/banners/Banner468x60.jpg)](https://freenem.com/?ref=251426)  
**NEM - https://freenem.com/?ref=251426**  
