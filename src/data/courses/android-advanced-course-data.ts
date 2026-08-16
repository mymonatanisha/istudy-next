import { ICourse } from "@/interFace/interFace";
import instructorImg6 from "../../../public/assets/images/course/course-instructor-6.webp";
import courseBg4 from "../../../public/assets/images/course/course-bg-4.webp";

/**
 * Project-based Android course for learners who have completed the fundamentals.
 * The course is intentionally separate from the Fundamentals track so its
 * project/source-code resources can grow independently over time.
 */
export const androidAdvancedCourse: ICourse = {
  id: 39,
  badge: "FREE",
  badgeClass: "badge-success",
  category: ["App Development", "Android", "Java", "XML"],
  courseName: "Android App Development",
  imageClassName: "bg-4",
  image: courseBg4,
  instructorImage: instructorImg6,
  instructorName: "Enamul Huq",
  instructorImageClassName: "right",
  title: "Android App Development: Beginner to Advanced",
  courseTextContent: true,
  courseTitleClass: "text-warning",
  smallText: "Beginner to Advanced",
  courseTag: "Free Course",
  courseTagTwo: "Project Based",
  spacingClass: "mb-25",
  level: "Beginner to Advanced",
  lessons: 0,
  students: 0,
  rating: 0,
  price: 0,
  discount: 0,
  quantity: 0,
  courseDescription:
    "Build real-world Android applications with Java and XML through project-based learning, with source code and practical resources added over time.",
  certificateBadge: "Android Developer Badge",
  advancedTitle: "Real-World Android App Development",
  details:
    "A project-focused Android learning track for students who already understand Android fundamentals and want to progress toward complete applications.",
  courseList: [
    "Project setup and architecture",
    "Java/XML application development",
    "Real-world Android UI and features",
    "Local data and practical app workflows",
    "Debugging and improving applications",
    "Project source code and resources",
  ],
  previewVideoId: "pocEPByYLxQ",
  previewThumbnailUrl: "https://img.youtube.com/vi/pocEPByYLxQ/maxresdefault.jpg",
};
