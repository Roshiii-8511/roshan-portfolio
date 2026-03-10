
import { 
  collection, 
  getDocs, 
  doc, 
  getDoc, 
  setDoc, 
  deleteDoc, 
  query, 
  orderBy,
  serverTimestamp,
  Firestore,
  writeBatch
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, FirebaseStorage } from 'firebase/storage';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError, type SecurityRuleContext } from '@/firebase/errors';

export interface Project {
  id: string;
  title: string;
  category: 'Premium Web Apps' | 'Advanced Web Scraping' | 'Bots for Business' | 'AI Automation';
  description: string;
  summary: string;
  images: string[];
  techStack: string[];
  link?: string;
  githubLink?: string;
  createdAt?: any;
}

export interface SiteContent {
  headline: string;
  aboutMeContent: string;
  profileImageUrl: string;
  contactEmail: string;
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
    const docRef = doc(db, 'globalContent', 'main-config');
    const snapshot = await getDoc(docRef);
    if (snapshot.exists()) {
      return snapshot.data() as SiteContent;
    }
  } catch (e) {
    console.error("Error fetching site content:", e);
  }
  return {
    headline: 'Architecting Autonomous AI Systems',
    aboutMeContent: 'Bridging the gap between Computer Science precision and MBA strategic vision.',
    profileImageUrl: 'https://picsum.photos/seed/roshan/400/400',
    contactEmail: 'raushanar123@gmail.com'
  };
};

export async function uploadImage(storage: FirebaseStorage, file: File, path: string): Promise<string> {
  const storageRef = ref(storage, path);
  await uploadBytes(storageRef, file);
  return getDownloadURL(storageRef);
}

export const saveAllChanges = async (db: Firestore, siteContent: SiteContent, projects: Project[]) => {
  const batch = writeBatch(db);

  const siteRef = doc(db, 'globalContent', 'main-config');
  batch.set(siteRef, { ...siteContent, id: 'main-config' }, { merge: true });

  projects.forEach((project) => {
    const data = {
      ...project,
      updatedAt: serverTimestamp(),
      createdAt: project.id.startsWith('temp-') ? serverTimestamp() : (project.createdAt || serverTimestamp())
    };
    
    if (project.id.startsWith('temp-')) {
      const newDocRef = doc(collection(db, 'projects'));
      const { id, ...saveData } = data;
      batch.set(newDocRef, saveData);
    } else {
      const docRef = doc(db, 'projects', project.id);
      batch.set(docRef, data, { merge: true });
    }
  });

  return batch.commit().catch(async (error) => {
    const permissionError = new FirestorePermissionError({
      path: 'batch-write-projects-and-globalContent',
      operation: 'write',
      requestResourceData: { siteContent, projectsCount: projects.length },
    } satisfies SecurityRuleContext);
    
    errorEmitter.emit('permission-error', permissionError);
    throw error;
  });
};

export const deleteProjectDoc = (db: Firestore, id: string) => {
  if (id.startsWith('temp-')) return Promise.resolve();
  const docRef = doc(db, 'projects', id);
  return deleteDoc(docRef).catch(async (error) => {
    errorEmitter.emit('permission-error', new FirestorePermissionError({
      path: docRef.path,
      operation: 'delete',
    } satisfies SecurityRuleContext));
    throw error;
  });
};
