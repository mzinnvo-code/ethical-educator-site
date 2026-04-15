# The Ethical Educator — Matthew A. Zinn

A website exploring moral psychology, AI ethics, and education.

---

## How to Deploy to GitHub Pages (Step-by-Step)

### Prerequisites

You need two things installed on your computer:

1. **Git** — Download from https://git-scm.com/downloads
2. **Node.js** (version 18 or higher) — Download from https://nodejs.org (choose the LTS version)

To verify both are installed, open Terminal (Mac) or Command Prompt (Windows) and run:

```
git --version
node --version
npm --version
```

All three should return a version number. If any say "command not found", install that tool first.

---

### Step 1: Create a GitHub Account & Repository

1. Go to https://github.com and sign up for a free account (or log in if you have one)
2. Click the **+** icon in the top-right corner → **New repository**
3. Name it whatever you want (e.g., `ethical-educator-site` or `theethicaleducator.com`)
4. Set it to **Public**
5. Do NOT check "Add a README" (we already have one)
6. Click **Create repository**
7. You'll see a page with setup instructions — keep this tab open, you'll need the URL

---

### Step 2: Set Up the Project on Your Computer

Open Terminal (Mac) or Command Prompt (Windows) and run these commands one at a time:

```bash
# Navigate to where you want the project folder (e.g., your Desktop)
cd ~/Desktop

# Clone or copy this project folder there
# (If you downloaded it as a zip, unzip it and cd into the folder instead)

# Go into the project folder
cd ethical-educator-site

# Install all dependencies
npm install
```

The `npm install` step will take a minute. It downloads React, Vite, and all other tools the project needs.

---

### Step 3: Edit the CNAME File (Custom Domain)

Open the file `public/CNAME` in any text editor.

- **If you have a custom domain** (e.g., `theethicaleducator.com`): Replace the text with your exact domain name. No `https://`, no `www.`, just the domain.
- **If you do NOT have a custom domain yet**: Delete the `public/CNAME` file entirely. Your site will be available at `https://yourusername.github.io/your-repo-name/` and you'll also need to open `vite.config.js` and change the `base` value to `'/your-repo-name/'`.

---

### Step 4: Test Locally (Optional but Recommended)

Before deploying, you can preview the site on your own computer:

```bash
npm run dev
```

This starts a local server. Open your browser and go to `http://localhost:5173`. You should see the full website. Press `Ctrl+C` in the terminal to stop the server when you're done.

---

### Step 5: Push to GitHub

Run these commands in the terminal (still inside the project folder):

```bash
# Initialize git
git init

# Add all files
git add .

# Create the first commit
git commit -m "Initial site deployment"

# Set the branch name to main
git branch -M main

# Connect to your GitHub repository (replace the URL with yours from Step 1)
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git

# Push the code
git push -u origin main
```

Replace `YOUR-USERNAME` and `YOUR-REPO-NAME` with your actual GitHub username and the repository name you created in Step 1.

If prompted for credentials, enter your GitHub username and a Personal Access Token (not your password). To create a token: GitHub → Settings → Developer Settings → Personal Access Tokens → Tokens (classic) → Generate new token → check "repo" scope → Generate.

---

### Step 6: Enable GitHub Pages

1. Go to your repository on GitHub (https://github.com/YOUR-USERNAME/YOUR-REPO-NAME)
2. Click **Settings** (tab at the top)
3. In the left sidebar, click **Pages**
4. Under **Source**, select **GitHub Actions**
5. That's it — the workflow file we included will handle the rest

---

### Step 7: Wait for the Build

1. Click the **Actions** tab in your repository
2. You should see a workflow running called "Deploy to GitHub Pages"
3. Wait for it to finish (usually 1-2 minutes). A green checkmark means success.
4. Go back to **Settings → Pages** — you'll see your site URL at the top

---

### Step 8: Connect a Custom Domain (If You Have One)

If you purchased a domain (e.g., from Porkbun, Cloudflare, or Namecheap):

1. In GitHub: Go to **Settings → Pages → Custom domain** → type your domain → **Save**
2. Check **Enforce HTTPS**
3. In your domain registrar's DNS settings, add these records:

**For an apex domain (e.g., `theethicaleducator.com`):**

| Type | Name | Value |
|------|------|-------|
| A    | @    | 185.199.108.153 |
| A    | @    | 185.199.109.153 |
| A    | @    | 185.199.110.153 |
| A    | @    | 185.199.111.153 |

**For www subdomain:**

| Type  | Name | Value |
|-------|------|-------|
| CNAME | www  | YOUR-USERNAME.github.io |

DNS propagation takes anywhere from 5 minutes to 48 hours (usually under an hour).

---

## Making Changes Later

Whenever you want to update the site:

1. Edit the files on your computer (the main content is in `src/App.jsx`)
2. Run these commands:

```bash
git add .
git commit -m "Describe what you changed"
git push
```

3. GitHub Actions automatically rebuilds and redeploys. Your changes go live within 1-2 minutes.

---

## Project Structure

```
ethical-educator-site/
├── .github/
│   └── workflows/
│       └── deploy.yml        ← Auto-deploy to GitHub Pages
├── public/
│   ├── CNAME                 ← Your custom domain (edit or delete)
│   └── favicon.svg           ← Browser tab icon
├── src/
│   ├── App.jsx               ← ALL site content and components
│   └── main.jsx              ← React entry point (don't edit)
├── .gitignore
├── index.html                ← HTML shell with meta tags
├── package.json              ← Dependencies and scripts
├── vite.config.js            ← Build configuration
└── README.md                 ← This file
```

---

## Editing Content

All the website content lives in `src/App.jsx`. The file is organized into clearly labeled sections:

- **HERO** — The landing page headline and tagline
- **ABOUT** — Your bio and credentials
- **MORAL PSYCHOLOGY** — Thesis content, interactive trolley experiment, expandable sections
- **AI & ETHICS** — Blog content, ethics quiz, expandable deep-dives
- **AI IN EDUCATION** — Classroom tools, thought experiments, resource cards
- **RESOURCES** — Books, papers, organizations
- **CONNECT** — Footer with links

To change text, simply find the section and edit the strings. To add new expandable sections, copy an existing `<Expandable>` block and change the title and content.

---

## Troubleshooting

**"npm install" fails:**
Make sure Node.js version 18+ is installed. Run `node --version` to check.

**GitHub Actions build fails:**
Click on the failed run in the Actions tab to see the error log. Most common issue: a typo in the code.

**Site shows 404 after deploy:**
Check that the `base` in `vite.config.js` matches your setup. For custom domains it should be `'/'`. For github.io URLs it should be `'/repo-name/'`.

**Custom domain not working:**
DNS can take up to 48 hours to propagate. Verify your DNS records are correct using https://dnschecker.org.

**HTTPS not working:**
After adding the custom domain, check "Enforce HTTPS" in Settings → Pages. If it's grayed out, wait for the DNS to finish propagating and try again.
