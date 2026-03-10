'use client';

import React, { ReactNode } from 'react';
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { firebaseConfig } from './config';
import { FirebaseProvider } from './provider';

// Initialize Firebase eagerly to ensure the context is always available, 
// including during the server-side pre-render of client components.
const firebaseApp = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const firestore = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

export function FirebaseClientProvider({
  children
}: {
  children: ReactNode;
}) {
  return (
    <FirebaseProvider 
      firebaseApp={firebaseApp} 
      firestore={firestore} 
      auth={auth}
    >
      {children}
    </FirebaseProvider>
  );
}
