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

### 4. Manual Rollout (Alternative)
If Studio publishing continues to fail, go to the [App Hosting Console](https://console.firebase.google.com/project/portfolio-abc19/apphosting) and click **"Create a backend"**. Point it to your GitHub repository to trigger the deployment manually.

### 5. Accessing Logs
Detailed build logs can be found here once a rollout starts:
- **Build Logs**: [Google Cloud Build Dashboard](https://console.cloud.google.com/cloud-build/builds)
- **Deployment Logs**: [Firebase App Hosting Dashboard](https://console.firebase.google.com/project/portfolio-abc19/apphosting) -> Select your backend -> View Rollouts.

## Local Development

```bash
npm install
npm run dev
```

The site will be available at `http://localhost:9002`.
