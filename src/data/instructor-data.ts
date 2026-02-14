import { Iinstructor } from "@/interFace/interFace";
import instructorImg1 from "../../public/assets/images/instructor/instructor-thumb-01.webp";
import instructorImg10 from "../../public/assets/images/instructor/instructor-thumb-06.webp";
import instructorThumbOne from '../../public/assets/images/instructor/instructor-thumb-18.webp';

export const instructorsData: Iinstructor[] = [
  {
    id: 1,
    name: 'Mohammad Enamul Huq',
    title: 'Founder & Lead Instructor (Mobile App Development)',
    image: instructorImg1,
    socialLinks: {
      facebook: 'https://www.facebook.com/enamnotes121/',
      twitter: 'https://x.com/enamnotes',
      linkedin: 'https://www.linkedin.com/in/enamul-huq/',
      instagram: 'https://www.instagram.com/enamnotes/',
    },
  },
  {
    id: 2,
    name: 'Mohammad Enamul Huq',
    title: 'SEO & Digital Marketing Trainer',
    image: instructorThumbOne,
    socialLinks: {
      facebook: 'https://www.facebook.com/enamnotes121/',
      twitter: 'https://x.com/enamnotes',
      linkedin: 'https://www.linkedin.com/in/enamul-huq/',
      instagram: 'https://www.instagram.com/enamnotes/',
    },
  },
];

export default instructorsData;
