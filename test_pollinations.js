
const https = require('https');

const urls = [
    "https://image.pollinations.ai/prompt/cat?width=1024&height=1024&nologo=true",
    "https://gen.pollinations.ai/image/cat?width=1024&height=1024&nologo=true",
    "https://pollinations.ai/p/cat?width=1024&height=1024&nologo=true"
];

urls.forEach(url => {
    https.get(url, (res) => {
        console.log(`URL: ${url}`);
        console.log(`Status: ${res.statusCode}`);
        console.log(`Content-Type: ${res.headers['content-type']}`);
        if (res.statusCode >= 300 && res.statusCode < 400) {
            console.log(`Redirect location: ${res.headers.location}`);
        }
        console.log('---');
    }).on('error', (e) => {
        console.error(`Error fetching ${url}:`, e.message);
    });
});
