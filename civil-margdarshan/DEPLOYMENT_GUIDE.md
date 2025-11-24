# How to Publish Civil Margdarshan to brainifyedu.com

Since you have the code and the domain, here are the steps to connect them using Vercel (a free, high-performance hosting provider for React apps).

## Step 1: Push Code to GitHub
1. Create a repository on GitHub (e.g., `civil-margdarshan`).
2. Upload all the files from this project to that repository.

## Step 2: Deploy to Vercel
1. Go to [vercel.com](https://vercel.com) and sign up.
2. Click **"Add New"** > **"Project"**.
3. Select your `civil-margdarshan` GitHub repository.
4. Vercel will detect `Vite` automatically.
5. Click **Deploy**.
   - *Note: Since we are using mock data by default (`USE_MOCK_DATA = true` in `services/api.ts`), the site will work immediately without a backend server.*

## Step 3: Connect Your Domain
1. Once deployed, go to the **Settings** tab of your project in Vercel.
2. Click on **Domains** in the left sidebar.
3. Enter `brainifyedu.com` in the input field and click **Add**.
4. Vercel will give you two DNS records (usually an **A Record** and a **CNAME Record**).

## Step 4: Configure DNS (Where you bought the domain)
1. Log in to your domain registrar (GoDaddy, Namecheap, BigRock, etc.).
2. Go to **DNS Management** for `brainifyedu.com`.
3. Add the records provided by Vercel:
   - **Type:** A | **Name:** @ | **Value:** 76.76.21.21 (Example, check Vercel for exact IP)
   - **Type:** CNAME | **Name:** www | **Value:** cname.vercel-dns.com
4. Save changes. It may take up to 24 hours to propagate, but usually happens in minutes.

## Congratulations!
Your site will be live at `https://brainifyedu.com`.
