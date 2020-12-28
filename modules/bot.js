const select = require ('puppeteer-select');
const system = require('./system');
const sites = require('./sites');
const promo = require('./promo');

(async () => {
    const email = system.email;
    const pass = system.pass;
    const websites = sites.websites;

    console.log('----[ CRYPTO BOT ]---------------------------------');
    console.log('Email:   ' + email);

    while (true) {
        const browser = await system.browser();
        const promoCodes = await promo.getPromoCodes(await browser.newPage());
        const page = await browser.newPage();
        await system.useInterceptor(page);
        await page.setViewport({width: 1800, height: 750});
    
        console.log('\n----[ ATTEMPTING ROLLS ]---------------------------');
        console.log('Attempt: ' + system.getCurrentTime() + '\n');

        let failedAttempt = false;
        let someClaimed = false;
        let awaitTimer = 0;
        for (let i = 0; i < websites.length; ++i) {
            const website = system.getJustSite(websites[i]);
            try {
                await page.goto(websites[i], {waitUntil: 'domcontentloaded'});
                await sleep(700);
                console.log('Website: ' + website);

                // Login
                await page.waitForSelector('input[name=email]');
                await page.type('input[name=email]', email, {delay: 0.3});
                await page.type('input[name=password]', pass, {delay: 0.3});
                const element = await select(page).getElement('button:contains(LOGIN!)');
                await sleep(500);
                await element.click();
                
                // Roll
                await page.waitForNavigation();
                await closeAds(page);
                console.log('Time:    ' + system.getCurrentTime(true));
                
                if (await canRoll(page)) {
                    await roll(page);
                    console.log(await getBalance(page));
                    console.log('\n\n SUCCESS! Coin claimed.\n');
                    await attemptPromoCodes(page, promoCodes);
                } else {
                    console.log(await getBalance(page));
                    console.log('\n\n Coin already claimed.\n');
                    await attemptPromoCodes(page, promoCodes);
                    const waitTime = await getCountdownSeconds(page);
                    awaitTimer = (waitTime > awaitTimer) ? waitTime : awaitTimer;
                    someClaimed = true;
                }
            } catch (e) {
                console.log('\nError was encountered on: ' + website);
                console.error('Error: ' + e.message);
                console.log('\n\n FAILED! Coin not claimed.\n');
                failedAttempt = true;
            }
        }

        await page.close();
        await browser.close();
        if (failedAttempt) {
            console.log('### Error occured. Retrying in 1 mins #############\n\n');
            await sleep(60000);
        } else {
            console.log('### All coins collected succesfully ###############');
            if (someClaimed) {
                const time = awaitTimer > 60 ? `${parseInt(awaitTimer / 60)} min` : `${awaitTimer} seconds`;
                console.log('\n Restarting available claim in ' + time + '... zzz zz z\n\n');
                someClaimed = false;
                await sleep(awaitTimer * 1000);
            } else {
                console.log('\n Restarting claim in an hour... zzz zz z\n\n');
                await sleep(3600000);
            }
        }
    }
})();

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function getBalance(page) {
    return 'Balance: ' + await page.evaluate(() => document.querySelector('.navbar-coins').innerText);
}

async function getCountdownSeconds(page) {
    const countdownTimer = await page.evaluate(() => document.querySelector('.timeout-container').innerText.split(`\n`));
    return Math.floor(parseInt(countdownTimer[0]) * 60) + parseInt(countdownTimer[2]);
}

async function closeAds(page) {
    await page.evaluate(() => {
        document.querySelectorAll('div').forEach(div => {
            if (div.innerText === 'x') div.click();
        });
    });
    await sleep(2000);
}

async function roll(page) {
    const element_roll = await select(page).getElement('button:contains(ROLL!)');
    await element_roll.click();
    await sleep(3000);
}

async function canRoll(page) {
    return await page.evaluate(() => document.querySelector('.roll-wrapper').style.display !== 'none');
}

async function attemptPromoCodes(page, promoCodes) {
    if (promoCodes.length < 0) return;
    
    console.log(' Attempting promo codes.');

    const timestamp = Date.now();
    for (let codePair of promoCodes) {
        if (timestamp < codePair[1]) {
            await page.waitForSelector('input[name=hash]');
            await page.type('input[name=hash]', codePair[0], {delay: 0.3});
            
            const button = await select(page).getElement('button:contains(Go!)');
            await button.click();
            await page.waitForNavigation();
            await sleep(700);

            const homeLink = await select(page).getElement('a.nav-link');
            await homeLink.click();
            await page.waitForNavigation();
            await sleep(700);

            if (await canRoll(page)) await roll(page);
        }
    };
    console.log(' All promo codes attempted.\n');
    console.log('Final ' + await getBalance(page) + '\n');
}
