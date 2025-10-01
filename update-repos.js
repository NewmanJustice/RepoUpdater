#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { execSync, exec } = require('child_process');

const CONFIG_FILE = 'repos.json';

function prompt(question) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  return new Promise(resolve => rl.question(question, ans => {
    rl.close();
    resolve(ans);
  }));
}

async function updateRepo(repo) {
  const { folder, remoteUrl, branch } = repo;
  let error = null;
  try {
    if (!fs.existsSync(folder)) {
      throw new Error(`Folder does not exist: ${folder}`);
    }
    process.chdir(folder);
    // Set remote URL
    execSync(`git remote set-url origin "${remoteUrl}"`);
    // Check if repo is public or needs auth
    if (remoteUrl.startsWith('http')) {
      const isPublic = await prompt(`Is the repository at ${remoteUrl} public? (y/n): `);
      if (isPublic.trim().toLowerCase() !== 'y') {
        console.log('If authentication is required, please ensure your credentials are set up.');
      }
    }
    // Fetch and hard reset
    execSync(`git fetch origin ${branch}`);
    execSync(`git reset --hard origin/${branch}`);
    console.log(`Updated ${folder} to match ${remoteUrl} (${branch})`);
  } catch (err) {
    error = err.message;
    console.error(`Error updating ${folder}: ${error}`);
  }
  return { folder, error };
}

async function main() {
  let configPath = path.join(__dirname, CONFIG_FILE);
  if (!fs.existsSync(configPath)) {
    console.error(`Config file not found: ${configPath}`);
    process.exit(1);
  }
  const repos = JSON.parse(fs.readFileSync(configPath, 'utf8'));
  const results = [];
  for (const repo of repos) {
    // eslint-disable-next-line no-await-in-loop
    results.push(await updateRepo(repo));
  }
  const errors = results.filter(r => r.error);
  if (errors.length) {
    console.log('\nErrors encountered:');
    errors.forEach(e => console.log(`- ${e.folder}: ${e.error}`));
  }
  console.log('\nAll repositories processed. Completed.');
}

main();
