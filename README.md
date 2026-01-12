# SpiderMem Frontend – Quick Start Guide

## Prerequisites

* **Git** installed
* **PowerShell** (Windows default)
* **Docker Desktop** (or Podman: https://podman.io/)

---

## 1. Clone the Repository

```bash
git clone https://github.com/martrzeciak/spider-mem-frontend.git
cd spider-mem-frontend
```

---

## 2. Install Node.js

Enter the site: https://nodejs.org/en/download
Click button "Windows Installer (.msi)"
Install with marked checkbox "Add to PATH"

---

## 3. Verify Setup

```powershell
node --version
# Should show: 24.12.0
npm --version
# Should show: 11.6.2
```

---

## 4. Run the Application

### Dependency installation

```sh
npm install
```

### Compile and Hot-Reload project launch

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

✅ Frontend will start at:

* [http://localhost:5174/](http://localhost:5174/)

---

## 5. Docker

```bash
docker compose up -d
```

---

## Project Structure
