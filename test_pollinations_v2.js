
const https = require('https');

const checkUrl = (url) => {
    return new Promise((resolve) => {
        const req = https.get(url, (res) => {
            console.log(`Checking: ${url}`);
            console.log(`Status: ${res.statusCode}`);
            console.log(`Type: ${res.headers['content-type']}`);
            if (res.statusCode >= 300 && res.statusCode < 400) {
                console.log(`Redirect: ${res.headers.location}`);
            }
            res.resume(); // consume data
            console.log('---');
            resolve();
        });
        req.on('error', (e) => {
            console.log(`Error: ${e.message}`);
            resolve();
        });
    });
};

async function run() {
    await checkUrl("https://image.pollinations.ai/prompt/cat?width=1024&height=1024&nologo=true");
    await checkUrl("https://gen.pollinations.ai/image/cat?width=1024&height=1024&nologo=true");
    await checkUrl("https://pollinations.ai/p/cat?width=1024&height=1024&nologo=true");
}

run();
