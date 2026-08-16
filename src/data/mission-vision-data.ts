import missionIcon from '../../public/assets/images/icon/mission.svg';
import visionIcon from '../../public/assets/images/icon/vision.svg';
import valuesIcon from '../../public/assets/images/icon/values.svg';
import { IMissionVision } from '@/interFace/interFace';

export const missionVisionData: IMissionVision[] = [
    {
        id: 1,
        img: missionIcon,
        title: 'Our Mission',
        description: "Our mission at Enamnotes is to make digital learning simple, practical, and accessible for everyone — especially beginners and non-technical learners. We focus on real understanding and project-based learning to help students build confidence and practical skills."
    },
    {
        id: 2,
        img: visionIcon,
        title: 'Our Vision',
        description: "Our vision is to build a trusted and beginner-friendly online learning platform where anyone can start learning coding and digital skills without fear or confusion. We aim to empower learners to grow confidently in the digital world."
    },
    {
        id: 3,
        img: valuesIcon,
        title: 'Our Values',
        description: "At Enamnotes, we believe in simplicity, honesty, and practical education. We prioritize learner success, clear explanations, and continuous improvement to ensure meaningful and effective learning experiences for all."
    },
];
