
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
    console.log("--- WITH NOLOGO ---");
    await checkUrl("https://gen.pollinations.ai/image/cat?nologo=true");

    console.log("\n--- WITHOUT NOLOGO ---");
    await checkUrl("https://image.pollinations.ai/prompt/cat");
    await checkUrl("https://gen.pollinations.ai/image/cat");
    await checkUrl("https://pollinations.ai/p/cat");
}

run();
