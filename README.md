# Roshan Singh | AI & Automation Portfolio

This is a NextJS 15 portfolio site built with React, Tailwind CSS, and Firebase.

## Deployment Troubleshooting

If the "Publish" button in Firebase Studio fails with "Something went wrong creating your App Hosting rollout", please check the following:

### 1. Check Project Billing (MOST IMPORTANT)
App Hosting requires your Firebase project to be on the **Blaze Plan (Pay-as-you-go)**. 
- Go to the [Firebase Console Billing Section](https://console.firebase.google.com/project/_/usage/details) to verify.

### 2. Enable Required APIs
Ensure these Google Cloud APIs are enabled for project `portfolio-abc19`:
- [Cloud Build API](https://console.cloud.google.com/apis/library/cloudbuild.googleapis.com)
- [Artifact Registry API](https://console.cloud.google.com/apis/library/artifactregistry.googleapis.com)
- [Cloud Run API](https://console.cloud.google.com/apis/library/run.googleapis.com)
- [Secret Manager API](https://console.cloud.google.com/apis/library/secretmanager.googleapis.com)

### 3. Accessing Logs
If the rollout fails, you can find detailed technical logs here:
- **Build Logs**: [Google Cloud Build Dashboard](https://console.cloud.google.com/cloud-build/builds)
- **Deployment Logs**: [Firebase App Hosting Dashboard](https://console.firebase.google.com/project/portfolio-abc19/apphosting) -> Select your backend -> View Rollouts.

## Local Development

```bash
npm install
npm run dev
```

The site will be available at `http://localhost:9002`.
