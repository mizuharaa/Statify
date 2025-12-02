# 💾 How to Save Changes & Restart Servers

## 📝 Saving Files

### In Your IDE (Cursor/VS Code):
- **Auto-save**: Most IDEs auto-save when you switch tabs or after a few seconds
- **Manual save**: Press `Ctrl + S` (Windows) or `Cmd + S` (Mac)
- **Save all**: Press `Ctrl + K, S` (Windows) or `Cmd + Option + S` (Mac)

---

## 🔄 Do You Need to Restart Servers?

### ✅ Frontend (React/Vite) - **NO RESTART NEEDED!**
- **Hot Module Replacement (HMR)** is enabled
- Changes are **automatically detected** and **reloaded in the browser**
- Just save the file (`Ctrl + S`) and the browser will update automatically
- You might see the page refresh or components update instantly

### ⚠️ Backend (Node.js) - **DEPENDS ON HOW YOU STARTED IT**

#### If you used `npm start`:
- ❌ **Manual restart required**
- Stop the server: Press `Ctrl + C` in the terminal
- Start again: `npm start`

#### If you used `npm run dev` (with nodemon):
- ✅ **Auto-restart enabled**
- Changes are detected automatically
- Server restarts itself when you save backend files
- No manual restart needed!

---

## 🚀 Recommended Workflow

### For Development (Best Experience):

**Backend:**
```powershell
cd backend
npm run dev    # Uses nodemon - auto-restarts on changes
```

**Frontend:**
```powershell
cd frontend
npm run dev    # Vite HMR - auto-reloads in browser
```

### For Production/Testing:

**Backend:**
```powershell
cd backend
npm start      # Manual restart needed
```

---

## 📋 Quick Reference

| File Type | Save Action | Restart Needed? |
|-----------|------------|-----------------|
| Frontend React/TSX | `Ctrl + S` | ❌ No (auto-reload) |
| Frontend CSS | `Ctrl + S` | ❌ No (auto-reload) |
| Backend JS (with `npm run dev`) | `Ctrl + S` | ❌ No (auto-restart) |
| Backend JS (with `npm start`) | `Ctrl + S` | ✅ Yes (stop & restart) |
| Config files (configs.env) | `Ctrl + S` | ✅ Yes (always restart) |

---

## 🔧 When You MUST Restart

### Always restart when you change:
1. **Environment variables** (`configs.env`)
   - Stop both servers
   - Update `configs.env`
   - Restart both servers

2. **Package dependencies** (after `npm install`)
   - Restart the server that uses those packages

3. **Backend server code** (if using `npm start` instead of `npm run dev`)
   - Stop: `Ctrl + C`
   - Start: `npm start`

---

## 💡 Pro Tips

1. **Use `npm run dev` for both** during development:
   - Backend auto-restarts on file changes
   - Frontend auto-reloads in browser
   - Best developer experience!

2. **Check your terminal**:
   - If you see "Server restarted" or "File changed" messages, auto-restart is working
   - If nothing happens after saving, you might need to manually restart

3. **Browser console**:
   - If frontend changes don't appear, check browser console for errors
   - Sometimes a hard refresh (`Ctrl + Shift + R`) helps

---

## 🐛 Troubleshooting

### Changes not appearing?

**Frontend:**
- Check if Vite dev server is running
- Look for "HMR" messages in terminal
- Try hard refresh: `Ctrl + Shift + R`

**Backend:**
- Check if you're using `npm run dev` (auto-restart) or `npm start` (manual)
- Look for "restarting" messages in terminal
- Check for errors in terminal

### Still not working?
- Stop both servers (`Ctrl + C`)
- Restart both servers
- Clear browser cache if needed

