# 🔧 Git Setup Guide

## Current Issue
- Your local branch is called `master`
- You're trying to push to `main`
- No remote is configured

## Solutions

### Option 1: Push to Master (Quick Fix)
```powershell
git push origin master
```

### Option 2: Rename Branch to Main (Recommended)
```powershell
# Rename local branch
git branch -M main

# Push to main
git push origin main
```

### Option 3: Set Up Remote Repository

If you haven't created a remote repository yet:

1. **Create a new repository on GitHub/GitLab/etc.**
   - Don't initialize with README (you already have files)

2. **Add the remote:**
   ```powershell
   git remote add origin https://github.com/yourusername/statify.git
   ```

3. **Push your code:**
   ```powershell
   # If your remote uses 'main'
   git branch -M main
   git push -u origin main
   
   # OR if your remote uses 'master'
   git push -u origin master
   ```

## Check Your Current Setup

```powershell
# See your current branch
git branch

# See if remote is configured
git remote -v

# See your commits
git log --oneline
```

