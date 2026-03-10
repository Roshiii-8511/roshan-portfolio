
"use client";

import { useFirestore, useCollection, useDoc, useMemoFirebase } from "@/firebase";
import { Hero } from "@/components/portfolio/hero";
import { Expertise } from "@/components/portfolio/expertise";
import { ProjectPortfolio } from "@/components/portfolio/project-portfolio";
import { FounderProfile } from "@/components/portfolio/founder-profile";
import { Footer } from "@/components/portfolio/footer";
import { Navbar } from "@/components/portfolio/navbar";
import { Project, SiteContent } from "@/app/lib/db";
import { collection, query, orderBy, doc } from "firebase/firestore";
import { Loader2 } from "lucide-react";

export default function Home() {
  const db = useFirestore();
  
  const projectsQuery = useMemoFirebase(() => {
    return query(collection(db, 'projects'), orderBy('createdAt', 'desc'));
  }, [db]);
  
  const { data: projectsData, loading: projectsLoading } = useCollection<Project>(projectsQuery);
  
  const siteContentRef = useMemoFirebase(() => {
    // Explicitly using the path defined in backend.json and security rules
    return doc(db, 'globalContent', 'main-config');
  }, [db]);
  
  const { data: siteContent, loading: contentLoading } = useDoc<SiteContent>(siteContentRef);

  const fallbackContent: SiteContent = {
    headline: 'Architecting Autonomous AI Systems',
    aboutMeContent: 'Bridging the gap between Computer Science precision and MBA strategic vision. I specialize in building robust automation frameworks that scale businesses through intelligent technology.',
    profileImageUrl: 'https://picsum.photos/seed/roshan/400/400',
    contactEmail: 'raushanar123@gmail.com'
  };

  const displayContent = siteContent || fallbackContent;
  const projects = projectsData || [];

  if (projectsLoading || contentLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#050505]">
        <Loader2 className="animate-spin text-primary w-12 h-12" />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#050505]">
      <Navbar />
      <Hero content={displayContent} />
      <Expertise />
      <ProjectPortfolio projects={projects} />
      <FounderProfile content={displayContent} />
      <Footer />
    </main>
  );
}
