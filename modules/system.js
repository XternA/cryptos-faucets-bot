const propertiesReader = require('properties-reader');
const configs = propertiesReader('./config.ini');
const puppeteer = require('puppeteer');

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

    if (notEmpty(browserpath)) {
        return await puppeteer.launch({headless: true, executablePath: browserpath, args: args});
    }
    return await puppeteer.launch({headless: true, args: args});
}

function getJustSite(link) {
    return link.includes('/?') ? link.substring(link, (link.lastIndexOf('/?'))) : link;
}

async function useInterceptor(page, useInterceptor=true) {
    await page.setRequestInterception(useInterceptor);
    if (useInterceptor) {
        page.on('request', request => {
            if (request.resourceType() === 'image' || request.resourceType() === 'stylesheet') {
                request.abort();
                return;
            }
            request.continue();
        });
    }
    return useInterceptor;
}


exports.email = email;
exports.pass = pass;
exports.browser = browser;
exports.puppeteer = puppeteer;
exports.getJustSite = getJustSite;
exports.useInterceptor = useInterceptor;