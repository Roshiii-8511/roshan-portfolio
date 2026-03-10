# **App Name**: Roshan Singh - AI & Automation Portfolio

## Core Features:

- Hero Section with Dynamic Headline: Displays a circular profile image with a slow-spinning border and a customizable headline (e.g., 'Architecting Autonomous AI Systems'). Content can be updated via the founder dashboard.
- Expertise Showcase: Presents 5 animated cards detailing core expertise areas like Social Media Automation, Advanced Web Scraping, and Workflow Automation.
- Categorized Project Portfolio: Displays projects grouped by categories (e.g., Premium Web/App, Bots for Business), with data fetched from Firestore. Each project card features an autoplay image carousel.
- Founder Profile Section: Highlights the user's Computer Science background and MBA strategic vision, with the 'About Me' content dynamically loaded from Firestore.
- Contact & Social Links Footer: Provides essential contact information and direct links to professional social media profiles (LinkedIn, GitHub, Instagram).
- Fully Responsive Design: Ensures the application provides an optimal viewing and interaction experience across all devices and screen sizes, adapting fluidly to different form factors.
- Founder Dashboard (Admin Panel): A secure, protected administrative interface allowing the founder to perform CRUD (Create, Read, Update, Delete) operations on projects and update global content (headline, 'about me').
- Secure Founder Authentication: Provides a dedicated login page protected by Firebase Authentication (email/password), featuring a password visibility toggle for enhanced user experience.
- Firebase Storage for Asset Management: Integration with Firebase Storage for direct uploading and management of profile and project images, with their URLs automatically linked and stored in Firestore.
- AI Project Description Assistant Tool: A generative AI tool designed to assist the founder in crafting polished and engaging project descriptions and summaries based on provided bullet points or technical details.

## Style Guidelines:

- Design Theme: Futuristic dark theme with glassmorphism effects, achieved through the 'glass-card' utility class for UI elements.
- Primary Color: Vibrant Orange (#FF7B00), used for headlines, interactive elements, and key accents to convey energy and focus.
- Secondary Color: Radiant Gold (#FFD700), employed for secondary actions, highlights, and subtle contrast.
- Accent Color: Electric Cyan (#00CFFF), utilized for additional visual emphasis and stylistic flair.
- Background: A deep, dark gradient transitioning from a dark background to an even darker background end, creating depth.
- Headlines and prominent titles: 'Orbitron' (sans-serif), selected for its modern, futuristic, and tech-savvy aesthetic.
- Body text: 'Inter' (sans-serif), chosen for its excellent readability and clean, professional feel across all content.
- Code snippets and monospace elements: 'Source Code Pro' (monospace), ensuring clear legibility for technical code examples.
- Utilize modern, clean, and minimalist line icons (e.g., Lucide Icons) throughout the interface to reinforce content without causing distraction.
- Clean, grid-based layout for showcasing projects and expertise sections, ensuring ample whitespace to enhance readability and content focus.
- Sections are well-defined with clear visual hierarchies, promoting an intuitive user experience and embracing a minimalist aesthetic.
- Subtle and purposeful animations for transitions between sections (e.g., fade-in-up), project card hovers, and interactive elements.
- Smooth and performant animations, including a slow-spinning border around the profile image, adding to the refined feel without distractions.