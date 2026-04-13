#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const https = require('https');

const GITHUB_TOKEN = process.env.GITHUB_TOKEN || '';
const REPO = 'chandra372/eventhub';
const [OWNER, REPO_NAME] = REPO.split('/');

if (!GITHUB_TOKEN) {
    console.error('❌ Error: GITHUB_TOKEN environment variable not set');
    console.error('Set it with: $env:GITHUB_TOKEN = "your_github_token"');
    process.exit(1);
}

const BASE_PATH = __dirname;
const IGNORED = ['.git', 'node_modules', '.DS_Store', 'push-to-github.js', '.env'];

function isIgnored(filePath) {
    return IGNORED.some(ignore => filePath.includes(ignore));
}

function getAllFiles(dir, fileList = []) {
    const files = fs.readdirSync(dir);
    
    files.forEach(file => {
        const filePath = path.join(dir, file);
        const relativePath = path.relative(BASE_PATH, filePath);
        
        if (isIgnored(relativePath)) return;
        
        if (fs.statSync(filePath).isDirectory()) {
            getAllFiles(filePath, fileList);
        } else {
            fileList.push(relativePath);
        }
    });
    
    return fileList;
}

function makeGitHubRequest(method, path, body = null) {
    return new Promise((resolve, reject) => {
        const options = {
            hostname: 'api.github.com',
            port: 443,
            path: `/repos/${OWNER}/${REPO_NAME}${path}`,
            method: method,
            headers: {
                'User-Agent': 'EventHub-Pusher',
                'Authorization': `token ${GITHUB_TOKEN}`,
                'Accept': 'application/vnd.github.v3+json',
                'Content-Type': 'application/json'
            }
        };
        
        const req = https.request(options, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                try {
                    resolve({
                        status: res.statusCode,
                        data: data ? JSON.parse(data) : null
                    });
                } catch (e) {
                    resolve({
                        status: res.statusCode,
                        data: data
                    });
                }
            });
        });
        
        req.on('error', reject);
        if (body) req.write(JSON.stringify(body));
        req.end();
    });
}

async function getLatestCommit() {
    try {
        const result = await makeGitHubRequest('GET', '/commits?per_page=1');
        if (result.data && result.data[0]) {
            return result.data[0].sha;
        }
    } catch (e) {
        console.warn('Could not fetch latest commit:', e.message);
    }
    return null;
}

async function pushFile(filePath, commitMessage) {
    const content = fs.readFileSync(filePath, 'utf8');
    const base64Content = Buffer.from(content).toString('base64');
    
    const url = `/contents/${filePath.replace(/\\/g, '/')}`;
    
    const body = {
        message: commitMessage,
        content: base64Content,
        branch: 'main'
    };
    
    try {
        const result = await makeGitHubRequest('PUT', url, body);
        return result;
    } catch (e) {
        throw new Error(`Failed to push ${filePath}: ${e.message}`);
    }
}

async function main() {
    console.log('🚀 Starting GitHub push...\n');
    
    const files = getAllFiles(BASE_PATH);
    console.log(`📦 Found ${files.length} files to push\n`);
    
    let successful = 0;
    let failed = 0;
    
    for (const file of files) {
        try {
            const fullPath = path.join(BASE_PATH, file);
            console.log(`⬆️  Pushing: ${file}`);
            
            const result = await pushFile(fullPath, `Add: ${file}`);
            
            if (result.status === 201 || result.status === 200) {
                console.log(`   ✅ Success\n`);
                successful++;
            } else {
                console.log(`   ⚠️  Status: ${result.status}\n`);
                failed++;
            }
        } catch (e) {
            console.log(`   ❌ ${e.message}\n`);
            failed++;
        }
        
        // Rate limiting: GitHub API allows 5000 requests/hour
        await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    console.log(`\n✨ Push Complete!`);
    console.log(`✅ Successful: ${successful}`);
    console.log(`❌ Failed: ${failed}`);
    console.log(`\n📍 Repository: https://github.com/${REPO}`);
}

main().catch(console.error);
