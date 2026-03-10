
import { getProjects, getSiteContent } from "@/app/lib/db";
import { Hero } from "@/components/portfolio/hero";
import { Expertise } from "@/components/portfolio/expertise";
import { ProjectPortfolio } from "@/components/portfolio/project-portfolio";
import { FounderProfile } from "@/components/portfolio/founder-profile";
import { Footer } from "@/components/portfolio/footer";

export default async function Home() {
  const [projects, siteContent] = await Promise.all([
    getProjects(),
    getSiteContent()
  ]);

  return (
    <main className="min-h-screen">
      <Hero content={siteContent} />
      <Expertise />
      <ProjectPortfolio projects={projects} />
      <FounderProfile content={siteContent} />
      <Footer />
    </main>
  );
}
