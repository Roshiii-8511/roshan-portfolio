<<<<<<< HEAD

# Roshan Singh | AI & Automation Portfolio

This is a NextJS 15 portfolio site built with React, Tailwind CSS, and Firebase.

## FIXING THE "BACKEND NOT FOUND" ERROR
If you see the **"Backend Not Found"** or "No backends found" error at your live link, it means the hosting service is configured but no code has been successfully pushed to it.

**Steps to fix:**
1. **Connect GitHub**: Go to the [Firebase App Hosting Console](https://console.firebase.google.com/project/portfolio-abc19/apphosting).
2. Click **"Create a backend"**.
3. Connect your **GitHub repository** where this code is stored.
4. Select **Singapore (asia-southeast1)** as your primary region.
5. Firebase will automatically trigger a build (Rollout). Once it finishes, your live link will show your site instead of the error.

## Administrative Setup
To allow the Admin Dashboard to save changes:
1. Go to Firestore in the Firebase Console.
2. Create a collection named `roles_admin`.
3. Create a document with ID `OHlnuIdOjoNhttmiChcCiVfe5cD3`.
4. Add a field: `role: "admin"`.

## UI Features
- **Premium Effects**: Real 3D zoom and lift hover effects using Framer Motion on all expertise and project cards.
- **Smart Sorting**: "Premium Web Apps" are automatically prioritized at the top of the portfolio.
- **Integrated Socials**: Direct links to LinkedIn, GitHub, Instagram, and Gmail in the footer.
=======
# Roshan AI Automation Portfolio
>>>>>>> 2b0edfbd8674420df2a16e40f0cbf0349a3e07c6
