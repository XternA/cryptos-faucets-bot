const propertiesReader = require('properties-reader');
const configs = propertiesReader('./config.ini');
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');

const email = configs.get('user.email');
const pass = configs.get('user.pass');
const browserpath = configs.get('platform.browserpath');

function notEmpty(prop) {
    return !(prop === null || prop === 'none'.toLowerCase() || prop === '');
};

async function browser() {
    const args = [ 
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--disable-gpu'
    ];
    puppeteer.use(StealthPlugin());

    if (notEmpty(browserpath)) {
        return await puppeteer.launch({headless: true, executablePath: browserpath, args: args});
    }
    return await puppeteer.launch({headless: true, args: args});
}

function getJustSite(link) {
    return link.includes('/?') ? link.substring(link, (link.lastIndexOf('/?'))) : link;
}

async function useInterceptor(page, useInterceptor=true) {
    if (useInterceptor) {
        await page.setRequestInterception(true);
        page.on('request', request => {
            function intercept(type) {return request.resourceType() === type}

            if (intercept('image') || intercept('stylesheet') || intercept('media') || 
                intercept('font') || intercept('other') || intercept('fetch')) {
                request.abort();
                return;
            }
            request.continue();
        });
    }
    return useInterceptor;
}

function getCurrentTime(includeSecs=false) {
    function format(source) {return source < 10 ? '0' + source : source}
    const today = new Date();
    const time = format(today.getHours()) + ':' + format(today.getMinutes());
    return includeSecs ? (time + ':' + format(today.getSeconds())) : time;
}


exports.email = email;
exports.pass = pass;
exports.browser = browser;
exports.puppeteer = puppeteer;
exports.getJustSite = getJustSite;
exports.useInterceptor = useInterceptor;
exports.getCurrentTime = getCurrentTime