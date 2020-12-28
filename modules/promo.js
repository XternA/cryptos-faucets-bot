const system = require('./system');

async function getPromoCodes(page) {
    const website = 'https://twitter.com/cryptosfaucets';
    
    console.log('\n----[ CHECK FOR PROMO CODES ]----------------------');
    await page.goto(website, {waitUntil: 'networkidle2'});
    await sleep(700);
    console.log('Website: ' + website);
    console.log('Time:    ' + system.getCurrentTime() + '\n');
    
    return await page.evaluate(() => {
        const spans = document.querySelectorAll('span');
        const promoCodes = [];

        for (let item of spans) {
            let elem = item.innerText;
            if (elem.includes('FREE ROLL PROMO CODE')) {
                elem = elem.slice(59, elem.length).split('\nValid until ');
                elem[1] = Date.parse(elem[1].replace(/[(am)(pm)(GMT)]/g, '').trim());
                promoCodes.push(elem);
            }
        }
        return promoCodes;
    });
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


exports.getPromoCodes = getPromoCodes;