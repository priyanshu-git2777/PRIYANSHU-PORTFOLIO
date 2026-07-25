export const siteConfig = {
  name: "Priyanshu Jaggi",
  title: "Priyanshu Jaggi | Software Developer Portfolio",

  description:
    "Developer portfolio of Priyanshu Jaggi, a Computer Science student focused on Java DSA, full-stack development, React, Next.js and software engineering.",

  url:
    process.env.NEXT_PUBLIC_SITE_URL ||
    "http://localhost:3000",

  author: {
    name: "Priyanshu Jaggi",
  },

  keywords: [
    "Priyanshu Jaggi",
    "Software Developer",
    "Computer Science Student",
    "Java Developer",
    "Full Stack Developer",
    "React Developer",
    "Next.js Developer",
    "Node.js Developer",
    "Portfolio",
    "India",
  ],

  links: {
    github: "https://github.com/priyanshu-git2777/PRIYANSHU-PORTFOLIO",
    linkedin:
      "https://www.linkedin.com/in/priyanshu-jaggi-8b71a4423/",
  },
} as const;