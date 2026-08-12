import { ICourse } from "@/interFace/interFace";
import instructorImg2 from "../../../public/assets/images/course/course-instructor-2.webp";
import courseBg2 from "../../../public/assets/images/course/course-bg-2.webp";

export interface FlutterLectureVideo {
  title: string;
  url: string;
  type?: "video" | "short";
}

export interface FlutterRoadmapSection {
  title: string;
  lectures: {
    title: string;
    duration: string;
    videos?: FlutterLectureVideo[];
  }[];
}

export const flutterCourse: ICourse = {
  id: 36,
  badge: "FREE",
  badgeClass: "badge-primary",
  image: courseBg2,
  imageClassName: "bg-2",
  instructorImage: instructorImg2,
  instructorImageClassName: "right",
  courseTextContent: true,
  title: "Flutter App Development",
  courseName: "Flutter",
  smallText: "Beginner to Advanced",
  spacingClass: "mb--5",
  courseTag: "Free Course",
  lessons: 45,
  students: 0,
  courseDescription:
    "Learn Flutter and Dart step by step and build real-world mobile applications from the fundamentals to app deployment.",
  rating: 5,
  price: 0,
  discount: 0,
  quantity: 0,
  certificateBadge: "Flutter Developer Badge",
  advancedTitle: "Flutter App Development Roadmap",
  level: "Beginner to Advanced",
  details:
    "A practical Flutter learning roadmap covering Dart, Flutter fundamentals, UI, navigation, state management, APIs, databases, testing, real projects, and deployment.",
  courseList: [
    "Dart Programming",
    "Flutter Setup & Android Studio",
    "Flutter Basics & Widgets",
    "UI Design & Material Design",
    "Navigation & Screen",
    "State Management",
    "API & Database",
    "Testing & Debugging",
    "Real Projects",
    "Deployment",
  ],
  instructorName: "Enamul Huq",
  category: ["App Development", "Flutter", "Dart"],
  previewVideoId: "ArI2rGgkHpI",
};

export const flutterRoadmap: FlutterRoadmapSection[] = [
  {
    title: "Dart Fundamentals",
    lectures: [
      { title: "Dart Data Types", duration: "", videos: [{ title: "Dart Data Types", url: "https://www.youtube.com/watch?v=B0DjULvkoI0" }] },
      { title: "Dart Functions", duration: "", videos: [{ title: "Dart Functions", url: "https://www.youtube.com/watch?v=PPWvM5u-WTA" }] },
      { title: "Dart Classes & Objects", duration: "", videos: [{ title: "Dart Class & Object", url: "https://www.youtube.com/watch?v=e10kj_-_a1Q" }] },
      { title: "Dart Null Safety", duration: "", videos: [{ title: "Dart Null Safety", url: "https://www.youtube.com/watch?v=KMMW665YTlE" }] },
      { title: "Dart Maps", duration: "", videos: [{ title: "Dart Maps", url: "https://www.youtube.com/watch?v=Gsx3UNgtYl0" }] },
      { title: "If-Else & Control Flow", duration: "", videos: [{ title: "If-Else", url: "https://www.youtube.com/watch?v=j8UrYVkE358" }] },
      { title: "For-in Loop", duration: "", videos: [{ title: "For-in Loop", url: "https://www.youtube.com/watch?v=AYrNS-djhMk" }] },
      { title: "Dart Brackets", duration: "", videos: [{ title: "Dart Brackets", url: "https://www.youtube.com/watch?v=BC1euUwiayI" }] },
    ],
  },
  {
    title: "Flutter Learning Path",
    lectures: [
      { title: "Complete Flutter Learning Path", duration: "", videos: [{ title: "Flutter Learning Path", url: "https://www.youtube.com/watch?v=ArI2rGgkHpI" }] },
      { title: "Flutter App Roadmap", duration: "", videos: [{ title: "Flutter Roadmap", url: "https://www.youtube.com/shorts/1CQ8d2biId8", type: "short" }] },
    ],
  },
];
