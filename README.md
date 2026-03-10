# Roshan Singh | AI & Automation Portfolio

This is a NextJS 15 portfolio site built with React, Tailwind CSS, and Firebase.

## Deployment Troubleshooting (IMPORTANT)

If the "Publish" button in Firebase Studio fails with "Something went wrong creating your App Hosting rollout", please follow these steps:

### 1. Standardize Collection Names
Ensure your code and `backend.json` are synced. The code has been updated to use `globalContent` for site configuration.

### 2. Check Project Billing (CRITICAL)
App Hosting **requires** the **Blaze Plan (Pay-as-you-go)**. 
- Go to the [Firebase Console Billing Section](https://console.firebase.google.com/project/_/usage/details) to verify.

### 3. Enable Required APIs
Ensure these Google Cloud APIs are enabled for project `portfolio-abc19`:
- [Cloud Build API](https://console.cloud.google.com/apis/library/cloudbuild.googleapis.com)
- [Artifact Registry API](https://console.cloud.google.com/apis/library/artifactregistry.googleapis.com)
- [Cloud Run API](https://console.cloud.google.com/apis/library/run.googleapis.com)
- [Secret Manager API](https://console.cloud.google.com/apis/library/secretmanager.googleapis.com)

### 4. Accessing Logs (Where to find what went wrong)
If the automated rollout fails, you can find the detailed reason here:
- **Cloud Build Logs**: Most App Hosting failures happen during the build. Check [Google Cloud Build History](https://console.cloud.google.com/cloud-build/builds).
- **Logs Explorer**: Go to [Logs Explorer](https://console.cloud.google.com/logs/query) and search for `resource.type="apphosting.googleapis.com/Backend"`.

### 5. Manual Rollout (Alternative)
If Studio publishing continues to fail, you can manually connect your project to App Hosting:
1. Go to the [Firebase App Hosting Console](https://console.firebase.google.com/project/portfolio-abc19/apphosting).
2. Click **"Create a backend"**.
3. Choose the option to connect to a **GitHub repository**.
4. Point it to your repository to trigger the deployment manually. This bypasses the Studio's "Publish" button.

### 6. Runtime Permissions
If you see "Missing or insufficient permissions" when saving data:
- Ensure your UID `OHlnuIdOjoNhttmiChcCiVfe5cD3` is added as a document in the `roles_admin` collection in Firestore.
- Add a field like `role: "admin"` or `isAdmin: true` so you can save the document.

## Local Development

```bash
npm install
npm run dev
```

The site will be available at `http://localhost:9002`.