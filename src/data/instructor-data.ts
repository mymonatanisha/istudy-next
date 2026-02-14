import { Iinstructor } from "@/interFace/interFace";
import instructorImg1 from "../../public/assets/images/instructor/instructor-thumb-01.webp";
import instructorImg10 from "../../public/assets/images/instructor/instructor-thumb-06.webp";
import instructorThumbOne from '../../public/assets/images/instructor/instructor-thumb-14.webp';
import instructorThumb2 from '../../public/assets/images/instructor/instructor-thumb-02.webp';

export const instructorsData: Iinstructor[] = [
  {
    id: 1,
    name: 'Enamul Huq',
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
    name: 'UI/UX Specialist',
    title: 'Frontend Development Mentor',
    image: instructorImg10,
    socialLinks: {
      facebook: '#',
      twitter: '#',
      linkedin: '#',
      instagram: '#',
    },
  },
  {
    id: 3,
    
	name: 'SEO & Digital Marketing Trainer',
    title: 'Growth & Online Strategy Mentor',
    image: instructorThumb2,
    socialLinks: {
      facebook: '#',
      twitter: '#',
      linkedin: '#',
      instagram: '#',
    },
  },

  {
    id: 5,
    name: 'Mymona Akter Tanisha',
    title: 'Video Editing Instructor (Adobe Premiere Pro)',
    image: instructorThumbOne,
    socialLinks: {
      facebook: '#',
      twitter: '#',
      linkedin: '#',
      instagram: '#',
    },
  },
 
];

export default instructorsData;
