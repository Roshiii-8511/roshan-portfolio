# Roshan Singh | AI & Automation Portfolio

This is a NextJS 15 portfolio site built with React, Tailwind CSS, and Firebase.

## Deployment Troubleshooting (IMPORTANT)

If the "Publish" button in Firebase Studio fails with "Something went wrong creating your App Hosting rollout", follow these steps to fix and publish:

### 1. Manual Rollout (BEST FIX)
If the automated button fails, you can connect your project manually:
1. Go to the [Firebase App Hosting Console](https://console.firebase.google.com/project/portfolio-abc19/apphosting).
2. Click **"Create a backend"**.
3. Connect your **GitHub repository** directly. This is the official way to deploy and bypasses the Studio "snag".

### 2. CLI Authentication & Deployment
If you get "not yet authenticated" or "No currently active project" in the terminal:
1. Run `firebase login --no-localhost` and follow the provided URL.
2. Run `firebase use portfolio-abc19` to set the active project.
3. Run `firebase deploy` to sync your rules and indexes.

### 3. Service Account Permissions
Ensure the "App Hosting" service account has proper permissions:
1. Go to [IAM & Admin](https://console.cloud.google.com/iam-admin/iam) in Google Cloud.
2. Find the service account for App Hosting (usually ends in `@apphosting.gserviceaccount.com`).
3. Ensure it has the **"Editor"** or **"App Hosting Admin"** role.

### 4. Firestore Permissions (Admin Access)
To allow the Admin Dashboard to save changes:
1. Go to Firestore in the Firebase Console.
2. Create a collection named `roles_admin`.
3. Create a document with ID `OHlnuIdOjoNhttmiChcCiVfe5cD3`.
4. Add a field: `role: "admin"`.

## Local Development

```bash
npm install
npm run dev
```

The site will be available at `http://localhost:9002`.
