
import { 
  collection, 
  getDocs, 
  doc, 
  getDoc, 
  setDoc, 
  addDoc, 
  deleteDoc, 
  query, 
  orderBy,
  serverTimestamp,
  Firestore
} from 'firebase/firestore';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError, type SecurityRuleContext } from '@/firebase/errors';

export interface Project {
  id: string;
  title: string;
  category: 'Premium Web/App' | 'Bots for Business' | 'AI Integration';
  description: string;
  summary: string;
  images: string[];
  techStack: string[];
  link?: string;
  createdAt?: any;
}

export interface SiteContent {
  headline: string;
  aboutMe: string;
  profileImage: string;
}

export const getProjects = async (db: Firestore): Promise<Project[]> => {
  try {
    const q = query(collection(db, 'projects'), orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Project));
  } catch (e) {
    console.error("Error fetching projects:", e);
    return [];
  }
};

export const getSiteContent = async (db: Firestore): Promise<SiteContent> => {
  try {
    const docRef = doc(db, 'site', 'content');
    const snapshot = await getDoc(docRef);
    if (snapshot.exists()) {
      return snapshot.data() as SiteContent;
    }
  } catch (e) {
    console.error("Error fetching site content:", e);
  }
  return {
    headline: 'Architecting Autonomous AI Systems',
    aboutMe: 'Bridging the gap between Computer Science precision and MBA strategic vision.',
    profileImage: 'https://picsum.photos/seed/roshan/400/400'
  };
};

export const saveProject = (db: Firestore, project: Omit<Project, 'id'>, id?: string) => {
  const data = {
    ...project,
    updatedAt: serverTimestamp(),
    createdAt: id ? undefined : serverTimestamp()
  };

  if (id) {
    const docRef = doc(db, 'projects', id);
    setDoc(docRef, data, { merge: true }).catch(async (error) => {
      errorEmitter.emit('permission-error', new FirestorePermissionError({
        path: docRef.path,
        operation: 'update',
        requestResourceData: data,
      }));
    });
  } else {
    const collRef = collection(db, 'projects');
    addDoc(collRef, data).catch(async (error) => {
      errorEmitter.emit('permission-error', new FirestorePermissionError({
        path: collRef.path,
        operation: 'create',
        requestResourceData: data,
      }));
    });
  }
};

export const deleteProject = (db: Firestore, id: string) => {
  const docRef = doc(db, 'projects', id);
  deleteDoc(docRef).catch(async (error) => {
    errorEmitter.emit('permission-error', new FirestorePermissionError({
      path: docRef.path,
      operation: 'delete',
    }));
  });
};

export const updateSiteContent = (db: Firestore, content: SiteContent) => {
  const docRef = doc(db, 'site', 'content');
  setDoc(docRef, content, { merge: true }).catch(async (error) => {
    errorEmitter.emit('permission-error', new FirestorePermissionError({
      path: docRef.path,
      operation: 'update',
      requestResourceData: content,
    }));
  });
};
