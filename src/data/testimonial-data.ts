import { ITestimonial } from "@/interFace/interFace";
import avatar1 from "../../public/assets/images/avatar/avatar.webp";
import avatar2 from "../../public/assets/images/avatar/avatar2.webp";
import avatar3 from "../../public/assets/images/avatar/avatar3.webp";
import avatar4 from "../../public/assets/images/avatar/avatar4.webp";
import testimonialQuote from "../../public/assets/images/shape/testimonial-quotes.webp";
import testimonialQuote2 from "../../public/assets/images/icon/quote-icon.webp";

const testimonialData: ITestimonial[] = [
  {
    id: 1,
    rating: 5,
    content:
      "Enamnotes helped me understand app development in a very simple way. The step-by-step lessons and practical projects made everything clear and easy to follow.",
    name: "Rahim Ahmed",
    designation: "App Development student",
    avatar: avatar1,
  },
  {
    id: 2,
    rating: 5,
    content:
      "I had no technical background before joining Enamnotes. Now I can confidently build small projects on my own. The explanations are beginner-friendly and practical.",
    name: "Sadia Islam",
    designation: "App Development student",
    avatar: avatar2,
  },
  {
    id: 3,
    rating: 5,
    content:
      "The best thing about Enamnotes is how simple everything is explained. Even difficult coding knowledge like Java became easy to understand.",
    name: "Hasan Mahmud",
    designation: "Programming Learner",
    avatar: avatar3,
  },
  {
    id: 4,
    rating: 5,
    content:
      "The practical approach of Enamnotes gave me real confidence. Instead of just watching videos, I actually built projects that improved my skills.",
    name: "Nusrat Jahan",
    designation: "App Development Student",
    avatar: avatar4,
  },
  {
    id: 5,
    name: "Imran Hossain",
    designation: "Coding Learner",
    avatar: avatar1,
    rating: 5,
    quoteImage: testimonialQuote,
    highlight: "Highly Recommended!",
    content:
      "Enamnotes is perfect for beginners. The structured roadmap and project-based learning helped me move from confusion to confidence.",
  },
  {
    id: 6,
    name: "Farzana Akter",
    designation: "App Development Student",
    avatar: avatar2,
    rating: 5,
    quoteImage: testimonialQuote,
    highlight: "Excellent Learning Experience!",
    content:
      "I love how Enamnotes focuses on real understanding instead of memorization. It feels like learning from a mentor who truly understands beginners.",
  },
  {
    id: 7,
    name: "Mehedi Hasan",
    designation: "App Development Student",
    avatar: avatar3,
    rating: 5,
    quoteImage: testimonialQuote2,
    content:
      "Before Enamnotes, coding felt overwhelming. Now I understand the logic behind development. The platform is simple, clear, and practical.",
  },
  {
    id: 8,
    name: "Tania Rahman",
    designation: "App Development Student",
    avatar: avatar4,
    rating: 5,
    quoteImage: testimonialQuote2,
    content:
      "Enamnotes made digital learning accessible for someone like me who comes from a non-technical background. Truly a confidence-building platform.",
  },
];

export default testimonialData;
