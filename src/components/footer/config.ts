import { config } from "@/data/config";

const footer: { title: string; href: string; external?: boolean }[] = [
  { title: "Projects", href: "/#projects" },
  { title: "About", href: "/about" },
  { title: "Writing", href: "/writing" },
  { title: "Resume", href: config.resume, external: true },
];

export { footer };
