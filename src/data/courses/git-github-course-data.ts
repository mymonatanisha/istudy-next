import { ICourse } from "@/interFace/interFace";
import instructorImg2 from "../../../public/assets/images/course/course-instructor-2.webp";
import courseBg3 from "../../../public/assets/images/course/course-bg-3.webp";

export interface GitGithubRoadmapSection {
  title: string;
  lectures: {
    title: string;
    duration: string;
  }[];
}

export const gitGithubCourse: ICourse = {
  id: 38,
  badge: "COMING SOON",
  badgeClass: "badge-warning",
  image: courseBg3,
  imageClassName: "bg-3",
  instructorImage: instructorImg2,
  instructorImageClassName: "right",
  courseTextContent: true,
  title: "Git & GitHub for Developers",
  courseName: "Git & GitHub",
  smallText: "Developer Essentials",
  spacingClass: "mb--5",
  courseTag: "Coming Soon",
  lessons: 0,
  students: 0,
  courseDescription:
    "Learn Git and GitHub from the ground up and build a practical developer workflow for managing code, branches, collaboration, pull requests, and real-world projects.",
  rating: 0,
  price: 0,
  discount: 0,
  quantity: 0,
  certificateBadge: "Git & GitHub Developer Badge",
  advancedTitle: "Git & GitHub for Developers",
  level: "Beginner to Advanced",
  details:
    "A practical roadmap covering Git fundamentals, branching, collaboration, GitHub workflows, pull requests, conflict resolution, project management, and professional developer workflows. Video lessons and supporting resources will be added in future updates.",
  courseList: [
    "Git Fundamentals",
    "Repository & Commit Workflow",
    "Branching & Merging",
    "GitHub Essentials",
    "Pull Requests & Collaboration",
    "Merge Conflicts",
    "Professional Git Workflow",
    "Project & Portfolio Workflow",
  ],
  instructorName: "Enamul Huq",
  category: ["Developer Tools", "Git", "GitHub"],
};

export const gitGithubRoadmap: GitGithubRoadmapSection[] = [
  {
    title: "Module 1 — Git Fundamentals",
    lectures: [
      { title: "What is Git and why developers use it", duration: "" },
      { title: "Git installation and initial setup", duration: "" },
      { title: "Working directory, staging area, and repository", duration: "" },
      { title: "Your first Git repository", duration: "" },
    ],
  },
  {
    title: "Module 2 — Commits & Version History",
    lectures: [
      { title: "Creating meaningful commits", duration: "" },
      { title: "Reading Git history and inspecting changes", duration: "" },
      { title: "Undoing and correcting common mistakes", duration: "" },
      { title: "Writing useful commit messages", duration: "" },
    ],
  },
  {
    title: "Module 3 — Branching & Merging",
    lectures: [
      { title: "Understanding branches", duration: "" },
      { title: "Creating and switching branches", duration: "" },
      { title: "Merging branches safely", duration: "" },
      { title: "Resolving merge conflicts", duration: "" },
    ],
  },
  {
    title: "Module 4 — GitHub Essentials",
    lectures: [
      { title: "GitHub repositories and remote origins", duration: "" },
      { title: "Push and pull workflow", duration: "" },
      { title: "README and repository structure", duration: "" },
      { title: "Managing a developer portfolio on GitHub", duration: "" },
    ],
  },
  {
    title: "Module 5 — Collaboration & Pull Requests",
    lectures: [
      { title: "Forks, clones, and collaboration", duration: "" },
      { title: "Creating a pull request", duration: "" },
      { title: "Code review basics", duration: "" },
      { title: "Merging pull requests", duration: "" },
    ],
  },
  {
    title: "Module 6 — Professional Git Workflow",
    lectures: [
      { title: "Feature branch workflow", duration: "" },
      { title: "Keeping branches synchronized", duration: "" },
      { title: "Tags, releases, and versioning", duration: "" },
      { title: "Git workflow for real development projects", duration: "" },
    ],
  },
  {
    title: "Module 7 — Future Practical Projects",
    lectures: [
      { title: "Real project workflow with Git and GitHub", duration: "" },
      { title: "Building a professional GitHub portfolio", duration: "" },
      { title: "Resources and project exercises — coming in future updates", duration: "" },
    ],
  },
];