# Roshan Singh | AI & Automation Portfolio

This is a NextJS 15 portfolio site built with React, Tailwind CSS, and Firebase.

## How to see your Web App Link
1. Go to the [Firebase App Hosting Console](https://console.firebase.google.com/project/portfolio-abc19/apphosting).
2. If a rollout is complete, your URL will be displayed at the top.
3. If not yet published, click **"Create a backend"** and connect your GitHub repository.

## Deployment Troubleshooting

If the "Publish" button in Firebase Studio fails:
1. Ensure your project is on the **Blaze (Pay-as-you-go) Plan**.
2. Manually connect your **GitHub repository** in the App Hosting console. This is the most reliable way to deploy.

## Local Development & CLI
1. Run `firebase login --no-localhost` to authenticate.
2. Run `firebase use portfolio-abc19` to set the project.
3. Run `firebase deploy` to sync Firestore rules and indexes.

## Admin Access
To allow the Admin Dashboard to save changes:
1. Go to Firestore in the Firebase Console.
2. Create a collection named `roles_admin`.
3. Create a document with ID `OHlnuIdOjoNhttmiChcCiVfe5cD3`.
4. Add a field: `role: "admin"`.
