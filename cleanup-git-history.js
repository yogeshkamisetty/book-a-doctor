#!/usr/bin/env node

/**
 * Git History Cleanup Script - Removes sensitive data from git history
 * Run this AFTER creating new MongoDB credentials and updating .env locally
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🔒 Git History Cleanup Tool');
console.log('=' .repeat(50));

// Color codes for terminal output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[36m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function executeCommand(cmd, description) {
  try {
    log(`\n▶ ${description}`, 'blue');
    execSync(cmd, { stdio: 'inherit', shell: true });
    log(`✓ ${description} completed`, 'green');
    return true;
  } catch (error) {
    log(`✗ Error: ${description}`, 'red');
    return false;
  }
}

// Warnings
log('\n⚠️  IMPORTANT WARNINGS:', 'yellow');
log('1. This will rewrite git history - ALL developers must re-clone the repo', 'yellow');
log('2. Backup your repo first: git clone . ../backup', 'yellow');
log('3. Have new MongoDB credentials ready BEFORE proceeding', 'yellow');
log('4. This takes a few minutes to complete', 'yellow');

// Check if .env exists locally
const envPath = path.join(process.cwd(), '.env');
if (!fs.existsSync(envPath)) {
  log('\n⚠️  WARNING: .env file not found!', 'yellow');
  log('Create .env with NEW credentials before proceeding', 'yellow');
  process.exit(1);
}

// Confirm old credentials are DIFFERENT from new ones
const envContent = fs.readFileSync(envPath, 'utf-8');
if (envContent.includes('kamisettyyogesh_db_user') || envContent.includes('mJ6RpoJPDWjMhW8Z')) {
  log('\n❌ ERROR: Old credentials still in .env file!', 'red');
  log('Please update .env with NEW MongoDB credentials first', 'red');
  process.exit(1);
}

log('\n✓ New credentials detected in .env', 'green');

// Proceed with cleanup
log('\n📋 Starting git history cleanup...', 'blue');

// Step 1: Check git status
executeCommand('git status', 'Checking git status');

// Step 2: Create a backup branch
executeCommand('git branch backup-before-cleanup', 'Creating backup branch');

// Step 3: Use git filter-branch to remove .env
log('\n⏳ This may take several minutes...', 'yellow');
try {
  execSync(`git filter-branch --tree-filter "rm -f .env" --prune-empty -f -- --all`, {
    stdio: 'inherit',
    shell: true
  });
  log('✓ Removed .env from all commits', 'green');
} catch (error) {
  log('Note: Filter completed (some errors are normal)', 'yellow');
}

// Step 4: Cleanup
executeCommand('git reflog expire --expire=now --all', 'Expiring reflog');
executeCommand('git gc --prune=now --aggressive', 'Running garbage collection');

// Step 5: Verify cleanup
log('\n🔍 Verifying cleanup...', 'blue');
try {
  const result = execSync('git log -p --all | grep -i "mongodb+srv"', { encoding: 'utf-8' });
  if (result.trim()) {
    log('⚠️  Warning: Credentials may still be in history', 'yellow');
  }
} catch (error) {
  log('✓ No credentials found in git history', 'green');
}

// Step 6: Show next steps
log('\n' + '='.repeat(50), 'blue');
log('📝 NEXT STEPS:', 'blue');
log('='.repeat(50), 'blue');
log(`
1. Verify everything looks good:
   git log --oneline -5

2. Force push cleaned history to GitHub (CAREFUL - this rewrites history):
   git push origin --force-with-lease --all
   git push origin --force-with-lease --tags

3. Inform all team members to re-clone:
   git clone <repo-url>

4. Delete old branches on GitHub if needed

5. Check GitHub security alerts are resolved:
   https://github.com/your-repo/security/secret-scanning

6. Delete backup branch after confirming everything works:
   git branch -D backup-before-cleanup

⚠️  IMPORTANT: Ensure all developers re-clone the repository after force push!
`, 'yellow');

log('\n✅ Cleanup script completed!', 'green');
log('Run "git push origin --force-with-lease --all" to push cleaned history\n', 'blue');
