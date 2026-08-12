import { ICourse } from "@/interFace/interFace";
import instructorImg2 from "../../../public/assets/images/course/course-instructor-2.webp";
import courseBg3 from "../../../public/assets/images/course/course-bg-3.webp";

export interface AndroidLectureVideo {
  title: string;
  url: string;
  type?: "video" | "short";
}

export interface AndroidFundamentalsSection {
  title: string;
  lectures: {
    title: string;
    duration: string;
    videos?: AndroidLectureVideo[];
  }[];
}

export const androidFundamentalsCourse: ICourse = {
  id: 37,
  badge: "FREE",
  badgeClass: "badge-primary",
  image: courseBg3,
  imageClassName: "bg-3",
  instructorImage: instructorImg2,
  instructorImageClassName: "right",
  courseTextContent: true,
  title: "Android App Development with Java/XML",
  courseName: "Android",
  smallText: "Fundamentals",
  spacingClass: "mb--5",
  courseTag: "Free Course",
  lessons: 32,
  students: 0,
  courseDescription:
    "Understand Android fundamentals from the ecosystem and SDK to Android Studio, Java/XML UI, core Android components, runtime, data transfer, database, and AndroidManifest.xml.",
  rating: 5,
  price: 0,
  discount: 0,
  quantity: 0,
  certificateBadge: "Android Fundamentals Badge",
  advancedTitle: "Android App Development — Beginner to Advanced",
  level: "Fundamentals",
  details:
    "A focused foundation course for understanding Android development with Java and XML before moving into real-world project-based Android development.",
  courseList: [
    "Android Ecosystem",
    "Android SDK & Packages",
    "Android Studio & Project Structure",
    "Java & XML UI",
    "Activity, Lifecycle, Intent & Context",
    "Android Components",
    "Runtime & Debugging",
    "Data Transfer",
    "Database & AndroidManifest.xml",
  ],
  instructorName: "Enamul Huq",
  category: ["App Development", "Android", "Java", "XML"],
  previewVideoId: "jnl_DlXG6Tk",
};

export const androidFundamentalsRoadmap: AndroidFundamentalsSection[] = [
  {
    title: "Android Ecosystem",
    lectures: [
      { title: "Android Development Ecosystem Explained", duration: "", videos: [{ title: "Android Development Ecosystem Explained", url: "https://www.youtube.com/watch?v=jnl_DlXG6Tk&t=3s" }] },
      { title: "Android SDK Explained — Beginner’s Guide to Android App Development Tools", duration: "", videos: [{ title: "Android SDK Explained", url: "https://www.youtube.com/watch?v=rkGiHjjVVxw" }] },
      { title: "Android Packages Explained", duration: "", videos: [{ title: "Android Packages Explained", url: "https://www.youtube.com/watch?v=rkJU_5xMzps" }] },
      { title: "What Is Android? — Explained with a House Analogy", duration: "", videos: [{ title: "What Is Android?", url: "https://www.youtube.com/shorts/MLZrTzsIJ6I", type: "short" }] },
      { title: "What Is AAPT? — App Packaging Made Simple", duration: "", videos: [{ title: "What Is AAPT?", url: "https://www.youtube.com/shorts/ShQxUbfZKDY", type: "short" }] },
      { title: "What Is ADB in Android?", duration: "", videos: [{ title: "What Is ADB?", url: "https://www.youtube.com/shorts/pvba_LPArmc", type: "short" }] },
    ],
  },
  {
    title: "Android Studio & Project Structure",
    lectures: [
      { title: "Class 01 — Getting Started with Android Studio Setup Secrets", duration: "", videos: [{ title: "Class 01 — Android Studio Setup", url: "https://www.youtube.com/watch?v=iZ-IylfDoEY&list=PLg_3d7KmjG4MWxX0fZ9pMDFtXxOfG8uoC&index=1" }] },
      { title: "What's Inside the app Folder in Android Studio?", duration: "", videos: [{ title: "app Folder", url: "https://www.youtube.com/shorts/0rQzsODlYa0", type: "short" }] },
      { title: "What's Inside the Java Folder in Android Studio?", duration: "", videos: [{ title: "Java Folder", url: "https://www.youtube.com/shorts/Tp45-DI81Gc", type: "short" }] },
      { title: "What's Inside the res Folder in Android Studio?", duration: "", videos: [{ title: "res Folder", url: "https://www.youtube.com/shorts/54HtcLUcUuc", type: "short" }] },
      { title: "What Are Script Files in Android Studio? — build.gradle Explained", duration: "", videos: [{ title: "build.gradle Explained", url: "https://www.youtube.com/shorts/8D0bdqQrRJ8", type: "short" }] },
      { title: "Class 02 — UI Design with XML in Android Studio", duration: "", videos: [{ title: "Class 02 — XML UI Design", url: "https://www.youtube.com/watch?v=4oTIzBWiezY" }] },
    ],
  },
  {
    title: "Activity & Core Components",
    lectures: [
      { title: "Class 03 — MainActivity.java XML UI Binding Tutorial", duration: "", videos: [{ title: "Class 03 — MainActivity + XML", url: "https://www.youtube.com/watch?v=GOdg39dWhGs" }] },
      { title: "What Is an Activity in Android?", duration: "", videos: [{ title: "What Is an Activity?", url: "https://www.youtube.com/shorts/XzyquUUDuPk", type: "short" }] },
      { title: "Android Activity Lifecycle Explained with a Stage Actor", duration: "", videos: [{ title: "Activity Lifecycle", url: "https://www.youtube.com/shorts/etb3wxhsU", type: "short" }] },
      { title: "What Is Context in Android?", duration: "", videos: [{ title: "What Is Context?", url: "https://www.youtube.com/shorts/MhNPilKDFuw", type: "short" }] },
      { title: "What Is a Bundle in Android?", duration: "", videos: [{ title: "What Is a Bundle?", url: "https://www.youtube.com/shorts/ej7B6k5gSGE", type: "short" }] },
      { title: "What Is an Intent in Android?", duration: "", videos: [{ title: "What Is an Intent?", url: "https://www.youtube.com/shorts/tSCVYNc6F2o", type: "short" }] },
    ],
  },
  {
    title: "Android Components",
    lectures: [
      { title: "What Is a Toast in Android?", duration: "", videos: [{ title: "What Is a Toast?", url: "https://www.youtube.com/shorts/KloOmh_1cZk", type: "short" }] },
      { title: "Android Dialog Boxes Explained", duration: "", videos: [{ title: "Android Dialog Boxes", url: "https://www.youtube.com/shorts/pecBBJ9BUAY", type: "short" }] },
      { title: "What Are Broadcast Receivers in Android?", duration: "", videos: [{ title: "Broadcast Receivers", url: "https://www.youtube.com/shorts/4pUyoNUvrwk", type: "short" }] },
      { title: "What Are Sensors in Android?", duration: "", videos: [{ title: "Android Sensors", url: "https://www.youtube.com/shorts/qUk2VzOliuA", type: "short" }] },
    ],
  },
  {
    title: "Runtime & Debugging",
    lectures: [
      { title: "What Is ART in Android?", duration: "", videos: [{ title: "What Is ART?", url: "https://www.youtube.com/shorts/LB4jO-olBdY", type: "short" }] },
      { title: "Main Thread vs Service in Android", duration: "", videos: [{ title: "Main Thread vs Service", url: "https://www.youtube.com/shorts/SHmkVf9eMDM", type: "short" }] },
      { title: "From DDMS to Android Profiler: The Evolution of App Debugging", duration: "", videos: [{ title: "Android Profiler", url: "https://www.youtube.com/shorts/wA8r124nyLU", type: "short" }] },
      { title: "Android Dev Tools & Workflows Explained", duration: "", videos: [{ title: "Android Dev Tools & Workflows", url: "https://www.youtube.com/watch?v=JS3ysmYI2G4" }] },
    ],
  },
  {
    title: "Data Transfer",
    lectures: [
      { title: "What Is Serializable in Android? — Data Transfer Basics", duration: "", videos: [{ title: "Serializable in Android", url: "https://www.youtube.com/shorts/HoSQpFawjtM", type: "short" }] },
      { title: "Parcelable vs Serializable in Android — What's the Difference?", duration: "", videos: [{ title: "Parcelable vs Serializable", url: "https://www.youtube.com/shorts/8eE_eTbDApU", type: "short" }] },
    ],
  },
  {
    title: "Database & AndroidManifest.xml",
    lectures: [
      { title: "Class 04 — Build DBHandler Like a Pro", duration: "", videos: [{ title: "Class 04 — DBHandler", url: "https://www.youtube.com/watch?v=LYG-LWt1yAs&t=35s" }] },
      { title: "Class 05 — Connecting MainActivity with Database (DBHandler)", duration: "", videos: [{ title: "Class 05 — Database + MainActivity", url: "https://www.youtube.com/watch?v=0xtbAr6PFek&t=25s" }] },
      { title: "What Is AndroidManifest.xml? — Blueprint + ID Card of Your App", duration: "", videos: [{ title: "AndroidManifest.xml", url: "https://www.youtube.com/shorts/zVeyY9IF174", type: "short" }] },
      { title: "Class 06 — AndroidManifest.xml Overview & Final App Build", duration: "", videos: [{ title: "Class 06 — Final Android App Build", url: "https://www.youtube.com/watch?v=o1AT7O4Dw2c" }] },
    ],
  },
];
