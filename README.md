
# Elevator Design Studio

A React-based desktop application for configuring and visualizing passenger elevator interiors.

## Features
- Real-time 3D CSS rendering
- Google Gemini AI integration for photorealistic previews
- Customizable walls, floors, ceilings, and accessories

## Getting Started

1. **Install dependencies**
   ```bash
   npm install
   # Note: You can ignore "npm warn deprecated node-domexception" warnings.
   ```

2. **Set up API Key**
   Create a `.env` file in the root directory.
   
   If using **Create React App**:
   ```env
   REACT_APP_API_KEY=AIzaSy...
   ```
   
   If using **Vite**:
   ```env
   VITE_API_KEY=AIzaSy...
   ```

3. **Run locally**
   ```bash
   npm start
   ```

## Deploying to GitHub

1. Initialize Git: `git init`
2. Add files: `git add .`
3. Commit: `git commit -m "Initial commit"`
4. Add remote: `git remote add origin <your-repo-url>`
5. Push: `git push -u origin main`

## Hosting

This app can be deployed to Vercel, Netlify, or GitHub Pages.
Ensure you add your API Key in the hosting provider's "Environment Variables" settings.
