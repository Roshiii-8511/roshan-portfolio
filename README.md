# Roshan Singh | AI & Automation Portfolio

This is a NextJS 15 portfolio site built with React, Tailwind CSS, and Firebase.

## Deployment Troubleshooting (IMPORTANT)

If the "Publish" button in Firebase Studio fails with "Something went wrong creating your App Hosting rollout", follow these steps to fix and publish:

### 1. Manual Rollout (BEST FIX)
If the automated button fails, you can connect your project manually:
1. Go to the [Firebase App Hosting Console](https://console.firebase.google.com/project/portfolio-abc19/apphosting).
2. Click **"Create a backend"**.
3. Connect your **GitHub repository** directly. This is the official way to deploy and bypasses the Studio "snag".

### 2. Check Service Account Permissions
Sometimes the deployment fails because the "App Hosting" service account doesn't have permissions.
1. Go to [IAM & Admin](https://console.cloud.google.com/iam-admin/iam) in Google Cloud.
2. Find the service account for App Hosting (usually ends in `@apphosting.gserviceaccount.com`).
3. Ensure it has the **"Editor"** or **"App Hosting Admin"** role.

### 3. CLI Auth Issues
If you get "not yet authenticated" in the terminal:
- Run `firebase login --no-localhost` and follow the link.
- Ensure you have a `firebase.json` file in your root (I have added this for you).

### 4. Accessing Build Logs
- **Cloud Build Logs**: Most failures happen during the build. Check [Google Cloud Build History](https://console.cloud.google.com/cloud-build/builds).
- **Logs Explorer**: Search for `resource.type="apphosting.googleapis.com/Backend"` in the [Logs Explorer](https://console.cloud.google.com/logs/query).

### 5. Runtime Permissions (Firestore)
- Ensure your UID `OHlnuIdOjoNhttmiChcCiVfe5cD3` is added as a document in the `roles_admin` collection in Firestore.
- Add a field like `role: "admin"` so you can save the document.

## Local Development

```bash
npm install
npm run dev
```

The site will be available at `http://localhost:9002`.