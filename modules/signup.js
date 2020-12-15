const select = require ('puppeteer-select');
const system = require('./system');
const sites = require('./sites');

(async () => {
    const email = system.email;
    const pass = system.pass;
    const websites = sites.websites;

    console.log('----[ SIGNUP BOT ]-----------------------------------');
    console.log('Email:   ' + email);
    console.log('Pass:    ' + pass);

    while (true) {
        const browser = await system.browser();
        const page = await browser.newPage();
        // await system.useInterceptor(page);
        await page.setViewport({width: 1800, height: 750});

        console.log('\n----[ ATTEMPTING SIGNUP ]----------------------------');
        console.log('Attempt: ' + getCurrentTime() + '\n');

        let failedAttempt = false;
        for (let i = 0; i < websites.length; ++i) {
            const website = system.getJustSite(websites[i]);
            try {
                await page.goto(websites[i]);
                await sleep(700);
                console.log('Website: ' + website);
                console.log('Time:    ' + getCurrentTime());

                // Register
                const register = await select(page).getElement('a.register-link');
                await register.click();
                await sleep(1000);

                const email_elem = await page.$$('input[name=email]');
                const pass_elem = await page.$$('input[name=password]');

                await email_elem[1].type(email, {delay: 1});
                await pass_elem[1].type(pass, {delay: 1});
                await page.type('input[name=confirm-password]', pass, {delay: 1});
                const element = await select(page).getElement('button:contains(REGISTER!)');
                await sleep(500);
                await element.click();
                
                await sleep(2000);
                if (await checkAccountExist(page)) {
                    console.log(`\n Email ${email} already registered.\n`);
                } else {
                    await page.waitForNavigation();
                    console.log(`\n Successfully registered ${email}\n`);
                }
            } catch (e) {
                const message = '\nError was encountered on: ' + website;
                console.log(message);
                console.error('Error: ' + e.message);
                console.log(`\n Failed to register ${email}\n`);
                failedAttempt = true;
            }
        }

        await page.close();
        await browser.close();
        if (failedAttempt) {
            console.log('### Error occured. Retrying... ####################\n\n');
            await sleep(500);
        } else {
            console.log('\n\nAll sites signed up successfully.');
            console.log('Check your email inbox and confirm the email before you can run the bot.\n');
            break;
        }
    }
})();

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function getCurrentTime() {
    function format(source) {return source < 10 ? '0' + source : source}
    const today = new Date();
    return format(today.getHours()) + ':' + format(today.getMinutes()) + ':' + format(today.getSeconds());
}

async function checkAccountExist(page) {
    return await page.evaluate(() => {
        const elem = document.querySelectorAll('.error');
        return elem.length ===0 ? false : elem[1].style.display === 'block';
    });
}
