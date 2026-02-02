
const https = require('https');

const checkUrl = (url) => {
    return new Promise((resolve) => {
        const req = https.get(url, (res) => {
            console.log(`Checking: ${url}`);
            console.log(`Status: ${res.statusCode}`);
            console.log(`Type: ${res.headers['content-type']}`);
            console.log(`Length: ${res.headers['content-length']}`);
            res.resume();
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
    await checkUrl("https://pollinations.ai/p/cat.jpg?width=1024&height=1024&nologo=true");
    await checkUrl("https://pollinations.ai/p/cat.jpg?width=1024&height=1024");
    await checkUrl("https://pollinations.ai/p/cat?width=1024&height=1024");
    await checkUrl("https://image.pollinations.ai/prompt/cat?width=1024&height=1024");
}

run();
