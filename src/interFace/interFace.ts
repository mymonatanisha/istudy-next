import { StaticImageData } from "next/image";

// context api data type
export interface AppContextType {
  sideMenuOpen: boolean;
  toggleSideMenu: () => void;
  scrollDirection: string;
  setScrollDirection: React.Dispatch<React.SetStateAction<string>> | undefined;
  inputValue: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  setSideMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  filterType: string;
  setFilterType: React.Dispatch<React.SetStateAction<string>>;
  isVideoOpen: boolean;
  setIsVideoOpen: React.Dispatch<React.SetStateAction<boolean>>;
  openVideoModal: () => void;
  isOpen:boolean,
  toggleOpen:() => void;
  openSidebar:boolean,
  setOpenSidebar:React.Dispatch<React.SetStateAction<boolean>>;
  toggleSidebarMenu:() => void;
}
interface Submenu {
  title: string;
  link: string;
  previewImg?: StaticImageData;
  pluseIncon?: boolean;
  megaMenu?: Submenu[];
}
export interface MenuItem {
  id: number;
  hasDropdown: boolean;
  children: boolean;
  active: boolean;
  title: string;
  pluseIncon: boolean;
  link: string;
  columnFour?: boolean;
  previewImg?: boolean;
  submenus?: Submenu[];
  megaMenu?: boolean;
  pageLayout?: boolean;
  lastDropdown?: boolean;
  requireAuth?: boolean;
  hideWhenAuth?: boolean;
}
export interface ICategories {
  id: number;
  title: string;
  totalCourses: number;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}
export interface ISchoolinCategories {
  id: number;
  categories: ICategories[];
}
export interface ITestimonial {
  id: number,
  rating: number,
  content: string,
  name: string,
  avatar: StaticImageData,
  designation?: string;
  quoteImage?:StaticImageData;
  highlight?:string
}
export interface Iinstructor {
  id: number,
  name: string,
  title?: string,
  image: StaticImageData,
  role?: string,
  socialLinks?: {
    facebook: string,
    twitter: string,
    linkedin: string,
    instagram?: string,
  },
}
interface TimelineEvent {
  year: string;
  description: string;
}
export interface TimelineData {
  id: string;
  title: string;
  description: string;
  image: StaticImageData;
  events: TimelineEvent[];
}
export interface MissionVisionImgData {
  image: StaticImageData;
}
export interface MissionVisionData {
  title: string;
  description: string;
}
export interface ICounter {
  id: number,
  counterNum: number,
  suffix?: string;
  counterText: string;
  iconClass?:string
}
export interface IFeature {
  id: number,
  icon: string,
  title: string,
  description: string,
}
export interface ICtaData {
  id: number;
  subtitle: string;
  title: string;
  buttonText: string;
  buttonLink: string;
  image: StaticImageData;
  bgClass: string;
}
export interface ICourse {
  id: number;
  badge?: string;
  badgeClass?: string;
  image: StaticImageData;
  imageClassName?: string;
  instructorImage?: StaticImageData;
  instructorImageClassName?: string;
  courseTextContent?: boolean;
  title: string;
  courseTitleClass?: string;
  FontSizeClass?: string;
  spacingClass?: string;
  smallText?: string;
  smallTextTwo?: string;
  courseTag?: string;
  lessons?: number;
  students?: number;
  courseName?: string;
  courseDescription: string;
  rating?: number;
  price?: number;
  discount?: number;
  certificateBadge?: string;
  advancedTitle?: string;
  level?: string;
  details?: string;
  courseList?: string[];
  ratingNum?: number;
  courseTextContentStyle?: boolean;
  latterUppercase?: boolean;
  totalCourse?: number;
  instructorName?: string;
  hoursTime?: number;
  type?: string;
  brands?: StaticImageData[];
  buttonText?: string;
  courseTagTwo?: string;
  avatarImg?: StaticImageData
  category?: string[]
  shape?: StaticImageData;
  badgeClassTwo?: string;
  smallTextThree?: string;
  courseBgClass?: string;
  FontSizeClassTwo?: string;
  quantity?:number;
  previewVideoId?: string;
  previewThumbnailUrl?: string;
}
export interface ICourseProps {
  course: ICourse;
}
export interface WhyChooseDataType {
  id: number;
  icon: StaticImageData;
  title: string;
  description: string;
}
export interface CoreValue {
  icon: string;
  title: string;
  description: string;
}
export interface ISchoolingWhyChoose {
  id: number;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title: string;
  description: string;
  wowDelayDuration: string
}
export interface IBlog {
  id: number;
  image?: StaticImageData,
  title?: string,
  authorName?: string,
  date?: string,
  description?: string,
  month?: string;
  comments?: number;
  badge?: string;
  type?:string;
  quote?:string;
  images?:StaticImageData[];
  thumbnail?:StaticImageData;
  buttonShow?:boolean;
  buttonLink?:boolean;
  daynamicLink?:boolean;
  boxShadowClass?:boolean;
  isPublished?: boolean;
  publishDate?: string;
}
