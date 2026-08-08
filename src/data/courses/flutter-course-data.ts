import { ICourse } from "@/interFace/interFace";
import instructorImg2 from "../../../public/assets/images/course/course-instructor-2.webp";
import courseBg2 from "../../../public/assets/images/course/course-bg-2.webp";

export interface FlutterRoadmapSection {
  title: string;
  lectures: { title: string; duration: string }[];
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
    "App Deployment",
  ],
  instructorName: "Enamul Huq",
  category: ["App Development", "Flutter"],
};

export const flutterRoadmap: FlutterRoadmapSection[] = [
  {
    title: "Dart Programming শেখা",
    lectures: [
      { title: "Variable & Data Types শেখা", duration: "" },
      { title: "Function লেখা", duration: "" },
      { title: "if-else এবং Loop", duration: "" },
      { title: "Class & Object বোঝা", duration: "" },
      { title: "List, Map & Set ব্যবহার", duration: "" },
      { title: "Null-safety বোঝা", duration: "" },
      { title: "Async/Await ও Future", duration: "" },
    ],
  },
  {
    title: "Flutter Setup ও Android Studio",
    lectures: [
      { title: "Flutter SDK ও Dart SDK ইনস্টল", duration: "" },
      { title: "Android Studio এবং Emulator সেটআপ", duration: "" },
      { title: "VS Code Flutter plugin সেটআপ", duration: "" },
      { title: "flutter doctor রান করে সব ঠিক আছে কিনা দেখা", duration: "" },
    ],
  },
  {
    title: "Flutter Basics ও Widget",
    lectures: [
      { title: "runApp() ও Widget Tree বোঝা", duration: "" },
      { title: "Stateless Widget তৈরি (stless snippet)", duration: "" },
      { title: "Stateful Widget ও setState() (stful snippet)", duration: "" },
      { title: "Common Widgets: Scaffold, AppBar, Text, Container", duration: "" },
      { title: "Column, Row, Stack Layout", duration: "" },
      { title: "Image, Icon ও Button Widget", duration: "" },
    ],
  },
  {
    title: "UI Design ও Material Design",
    lectures: [
      { title: "Material Design ও Cupertino Widget পার্থক্য", duration: "" },
      { title: "Theme ও Custom Color তৈরি", duration: "" },
      { title: "ListView ও GridView", duration: "" },
      { title: "Card, Padding, Margin ব্যবহার", duration: "" },
      { title: "Responsive UI বানানো", duration: "" },
    ],
  },
  {
    title: "Navigation ও Screen",
    lectures: [
      { title: "Navigator.push() দিয়ে screen যাওয়া", duration: "" },
      { title: "Named Routes সেটআপ", duration: "" },
      { title: "Data pass করা এক screen থেকে অন্যটায়", duration: "" },
      { title: "Back navigation ও result return", duration: "" },
    ],
  },
  {
    title: "State Management",
    lectures: [
      { title: "setState() গভীরভাবে বোঝা", duration: "" },
      { title: "Provider প্যাকেজ শেখা", duration: "" },
      { title: "Riverpod দিয়ে state manage করা", duration: "" },
    ],
  },
  {
    title: "API ও Database",
    lectures: [
      { title: "JSON parse করা", duration: "" },
      { title: "http প্যাকেজ দিয়ে REST API call", duration: "" },
      { title: "Firebase Authentication সেটআপ", duration: "" },
      { title: "Firestore দিয়ে data সেভ ও পড়া", duration: "" },
      { title: "SQLite / Hive local storage", duration: "" },
    ],
  },
  {
    title: "Testing ও Debugging",
    lectures: [
      { title: "Flutter DevTools দিয়ে debug করা", duration: "" },
      { title: "Unit Test লেখা", duration: "" },
      { title: "Widget Test লেখা", duration: "" },
      { title: "Error handling ও exception", duration: "" },
    ],
  },
  {
    title: "Real Projects তৈরি",
    lectures: [
      { title: "Calculator App", duration: "" },
      { title: "To-do App (CRUD + local DB)", duration: "" },
      { title: "Weather App (API integration)", duration: "" },
      { title: "E-commerce App (Firebase + cart)", duration: "" },
    ],
  },
  {
    title: "App Deployment",
    lectures: [
      { title: "APK ও AAB build করা", duration: "" },
      { title: "App signing ও keystore তৈরি", duration: "" },
      { title: "Google Play Store-এ publish", duration: "" },
    ],
  },
];
