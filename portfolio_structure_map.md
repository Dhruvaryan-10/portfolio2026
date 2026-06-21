# Portfolio Project Mapping & Personalization Guide

This document maps out the structure of the portfolio, detailing where all key information is stored, how the components retrieve this data, and which files need to be modified to personalize the site.

---

## 1. Where Personal Information is Stored
Personal details (name, titles, email, resume, bio) are stored across a mix of config files and page-level code:

- **Site Metadata & Identity Variables**:
  - [config.ts](file:///c:/Users/Asus/my-3d-portfolio-2026-1/src/data/config.ts): Stores author's name (`author`), email address (`email`), site URL (`site`), and meta descriptions/titles used in SEO tags.
- **Detailed Bio & Contact Details**:
  - [page.tsx](file:///c:/Users/Asus/my-3d-portfolio-2026-1/src/app/about/page.tsx): Stores a hardcoded `CONTACT_LINKS` array containing a direct WhatsApp link (`+923249419774`), name, and email details, along with the paragraph of "About me" bio text and subtitle `"Sr. Full Stack Engineer"`.
- **Easter Eggs / Logs**:
  - [easter-eggs.tsx](file:///c:/Users/Asus/my-3d-portfolio-2026-1/src/components/easter-eggs.tsx): Triggers custom console logging when user types the developer's first name (`faiq`, `Faiq`, `FAIQ`) in the DevTools console.
- **Blog Author Metadata**:
  - [achieving-milestone.mdx](file:///c:/Users/Asus/my-3d-portfolio-2026-1/src/content/blogs/achieving-milestone.mdx): Stores the author property in its frontmatter (`author: "M. Faiq Khokhar"`).
- **Profile Photo**:
  - `/assets/me.jpg` (located in the public directory at `c:\Users\Asus\my-3d-portfolio-2026-1\public\assets\me.jpg`) is the author photo rendered on the About page.

---

## 2. Where Projects are Stored
Project cards, descriptions, colors, and live links are managed using a central typescript definition:

- **Centralized Data**:
  - [projects.tsx](file:///c:/Users/Asus/my-3d-portfolio-2026-1/src/data/projects.tsx): Contains the `PROJECTS` list. Each project object defines a title/name, short description, custom background gradient colors, live site URL, tech badges, and an `imageKey` identifier.
- **Project Assets**:
  - Screenshots are stored in `public/assets/projects-screenshots/` (matching the project `imageKey` with `.png` or `.jpg` extension).
  - Tech icons are dynamically loaded from `public/assets/tech/{techName}.svg`.
- **Rendering Component**:
  - [projects.tsx](file:///c:/Users/Asus/my-3d-portfolio-2026-1/src/components/sections/projects.tsx): Implements a horizontal-scrolling card track using GSAP scrolltrigger and `vanilla-tilt` for 3D card tilt effects.

---

## 3. Where Experience Data is Stored
Professional experience entries are kept cleanly structured in constants:

- **Centralized Data**:
  - [constants.ts](file:///c:/Users/Asus/my-3d-portfolio-2026-1/src/data/constants.ts): The `EXPERIENCE` array lists job titles, company names, start/end dates, bullet-pointed responsibility lists, and mapped skill tags.
- **Rendering Component**:
  - [experience.tsx](file:///c:/Users/Asus/my-3d-portfolio-2026-1/src/components/sections/experience.tsx): Maps out the timeline stack. Cards use sticky scroll effects powered by Framer Motion.

---

## 4. Where Skills Data is Stored
Skill definitions, icons, colors, and interactive keycap events are linked between typescript variables and a 3D Spline scene:

- **Centralized Metadata**:
  - [constants.ts](file:///c:/Users/Asus/my-3d-portfolio-2026-1/src/data/constants.ts): Contains the `SkillNames` enum and `SKILLS` record. This defines the display labels, custom tooltips/descriptions, brand color theme, and CDN icon URL.
- **3D Spline Scene**:
  - `public/assets/skills-keyboard.spline`: The 3D model representing the interactive keyboard. The names of interactive objects in this Spline scene map directly to keys in `SkillNames` (e.g. `react`, `js`, etc.).
- **Spline Event Handling**:
  - [animated-background.tsx](file:///c:/Users/Asus/my-3d-portfolio-2026-1/src/components/animated-background.tsx): Listens to user hover and keypress inputs, reads corresponding details from `SKILLS`, and updates variables inside the Spline instance to show skill information.
- **About Page Skills Carousel**:
  - [page.tsx](file:///c:/Users/Asus/my-3d-portfolio-2026-1/src/app/about/page.tsx): Has a hardcoded `TOOLS` array (with names, descriptions, and custom icon renderers) that populates the carousel on the About page.

---

## 5. Where Social Links are Stored
Social icons (LinkedIn, Upwork, GitHub) are sourced from configuration but also exist inside some page-level structures:

- **Configuration File**:
  - [config.ts](file:///c:/Users/Asus/my-3d-portfolio-2026-1/src/data/config.ts): Under the `social` sub-object.
- **Global Footer Icons**:
  - [social-media-icons.tsx](file:///c:/Users/Asus/my-3d-portfolio-2026-1/src/components/social/social-media-icons.tsx): Queries `config.social` to render the buttons in the footer.
- **Hero Contact Buttons**:
  - [hero.tsx](file:///c:/Users/Asus/my-3d-portfolio-2026-1/src/components/sections/hero.tsx): Directly links buttons to `config.social` variables.
- **About Page Links**:
  - [page.tsx](file:///c:/Users/Asus/my-3d-portfolio-2026-1/src/app/about/page.tsx): Hardcoded in `CONTACT_LINKS`.

---

## 6. Where the Hero Section Gets Its Data
The main intro card features a mix of configuration imports and hardcoded elements:

- **Source File**: [hero.tsx](file:///c:/Users/Asus/my-3d-portfolio-2026-1/src/components/sections/hero.tsx)
- **Configuration Imports**:
  - Author Name: Displayed by parsing `config.author` (`config.author.split(" ")[0]` and `config.author.split(" ")[1]`).
  - Social Links: Fetches Upwork, GitHub, and LinkedIn URLs from `config.social`.
- **Hardcoded Strings & Anchors**:
  - Title/Subtitle: `"A Full Stack Web Developer"` is written inline (Line 83).
  - Resume: Google Drive link (`https://drive.google.com/file/d/184CT9elgsqE8nYGlfE0frH-N76Vsg3Yy/view?usp=sharing`) is written inline (Line 90).
  - "Hire Me" Button: Links locally to `#contact` with a tooltip phrase `"Yes, you can do it. 🥹 🙏"`.

---

## 7. Which Files Should Be Edited to Personalize This Portfolio

To customize this portfolio for a new owner, edit the following files:

### Central Configuration
1. **[config.ts](file:///c:/Users/Asus/my-3d-portfolio-2026-1/src/data/config.ts)**
   - Update metadata titles, keywords, name, email address, website, and social links.
   - Adjust `githubUsername` to sync the GitHub followers tracker button in the header.

### Sections & Content
2. **[projects.tsx](file:///c:/Users/Asus/my-3d-portfolio-2026-1/src/data/projects.tsx)**
   - Populate with your projects, live URLs, gradients, and tech badges.
3. **[constants.ts](file:///c:/Users/Asus/my-3d-portfolio-2026-1/src/data/constants.ts)**
   - Modify the `EXPERIENCE` list with your job history.
   - Adjust `SKILLS` info and colors (ensure skill keys match Spline object names if you keep the same 3D scene).
4. **[page.tsx](file:///c:/Users/Asus/my-3d-portfolio-2026-1/src/app/about/page.tsx)**
   - Rewrite the paragraphs in the "About me" section.
   - Replace the `CONTACT_LINKS` (email, phone, LinkedIn, GitHub URLs).
   - Customize or trim items inside the `TOOLS` array for the skills carousel.
5. **[hero.tsx](file:///c:/Users/Asus/my-3d-portfolio-2026-1/src/components/sections/hero.tsx)**
   - Replace the hardcoded Google Drive resume link (Line 90).
   - Edit the hardcoded subtitle string if needed (Line 83).

### Easter Eggs & Blogs
6. **[easter-eggs.tsx](file:///c:/Users/Asus/my-3d-portfolio-2026-1/src/components/easter-eggs.tsx)**
   - Update the console log print strings and name listeners (`["faiq", "Faiq", "FAIQ"]` on Line 23) to trigger on your name instead.
7. **[achieving-milestone.mdx](file:///c:/Users/Asus/my-3d-portfolio-2026-1/src/content/blogs/achieving-milestone.mdx)**
   - Update frontmatter metadata author details, or delete/replace the file if posting custom blogs.

### Environment & Analytics Setup
8. **`.env` or `.env.local`** (create if missing)
   - Configure your EmailJS keys:
     - `NEXT_PUBLIC_USER_ID`
     - `NEXT_PUBLIC_SERVICE_ID`
     - `NEXT_PUBLIC_TEMPLATE_ID`
   - Configure Umami Analytics keys:
     - `UMAMI_DOMAIN`
     - `UMAMI_SITE_ID`

### Static Asset Replacement (`public/assets/`)
9. **`public/assets/me.jpg`**
   - Replace with your profile photo.
10. **`public/assets/projects-screenshots/`**
    - Place images matching the `imageKey` values of your projects in `src/data/projects.tsx`.
11. **`public/favicon.ico`**, **`public/favicon.svg`**, **`public/favicon.png`**
    - Replace with your custom brand logos.
12. **`public/assets/seo/og-image.png`**
    - Replace with your OpenGraph/SEO preview banner.
