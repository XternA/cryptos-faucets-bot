const select = require ('puppeteer-select');
const system = require('./system');
const sites = require('./sites');

(async () => {
    const email = system.email;
    const pass = system.pass;
    const websites = sites.websites;

    console.log('----[ CRYPTO BOT ]---------------------------------');
    console.log('Email:   ' + email);

    while (true) {
        const browser = await system.browser();
        const page = await browser.newPage();
        await system.useInterceptor(page);
        await page.setViewport({width: 1800, height: 750});
    
        console.log('\n----[ ATTEMPTING ROLLS ]---------------------------');
        console.log('Attempt: ' + getCurrentTime() + '\n');

        let failedAttempt = false;
        let someClaimed = false;
        let awaitTimer = 0;
        for (let i = 0; i < websites.length; ++i) {
            const website = system.getJustSite(websites[i]);
            try {
                await page.goto(websites[i], {waitUntil: 'domcontentloaded'});
                await sleep(6300);
                console.log('Website: ' + website);

                // Login
                await page.type('input[name=email]', email, {delay: 0.3});
                await page.type('input[name=password]', pass, {delay: 0.3});
                const element = await select(page).getElement('button:contains(LOGIN!)');
                await sleep(500);
                await element.click();
                
                // Roll
                await page.waitForNavigation();
                await closeAds(page);
                const canRoll = await page.evaluate(() => document.querySelector('.roll-wrapper').style.display !== 'none');
                console.log('Time:    ' + getCurrentTime(true));
                
                if (canRoll) {
                    const element_roll = await select(page).getElement('button:contains(ROLL!)');
                    await element_roll.click();
                    await sleep(3000);

                    console.log(await getBalance(page));
                    console.log('\n\n SUCCESS! Coin claimed.\n');
                } else {
                    console.log(await getBalance(page));
                    console.log('\n\n Coin already claimed.\n');
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

function getCurrentTime(includeSecs=false) {
    function format(source) {return source < 10 ? '0' + source : source}
    const today = new Date();
    const time = format(today.getHours()) + ':' + format(today.getMinutes());
    return includeSecs ? (time + ':' + format(today.getSeconds())) : time;
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
