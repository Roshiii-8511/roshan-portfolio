# Roshan Singh | AI & Automation Portfolio

This is a NextJS 15 portfolio site built with React, Tailwind CSS, and Firebase.

## FIXING "BACKEND NOT FOUND"
If you see the **"Backend Not Found"** error at your live link, it means the hosting service is ready but no code has landed. 

**Steps to fix:**
1. **GitHub Connection**: Go to the [Firebase App Hosting Console](https://console.firebase.google.com/project/portfolio-abc19/apphosting).
2. Click **"Create a backend"**.
3. Connect your **GitHub repository** where this code is pushed.
4. Firebase will automatically trigger a build (Rollout). Once finished, your site will be live.

## Administrative Setup
To allow the Admin Dashboard to save changes:
1. Go to Firestore in the Firebase Console.
2. Create a collection named `roles_admin`.
3. Create a document with ID `OHlnuIdOjoNhttmiChcCiVfe5cD3`.
4. Add a field: `role: "admin"`.

## Development Features
- **Premium Sorting**: "Premium Web Apps" are automatically prioritized.
- **Enhanced UI**: Features "Real" zoom and lift hover effects using Framer Motion.
- **Centralized Data**: All global content is managed via the `globalContent` collection.
