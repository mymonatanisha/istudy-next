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
  isOpen: boolean;
  toggleOpen: () => void;
  openSidebar: boolean;
  setOpenSidebar: React.Dispatch<React.SetStateAction<boolean>>;
  toggleSidebarMenu: () => void;
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
export interface ICategoryFilter {
  checkId: string;
  name: string;
  count: number;
  isChecked: boolean;
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
  id: number;
  rating: number;
  content: string;
  name: string;
  avatar: StaticImageData;
  designation?: string;
  quoteImage?: StaticImageData;
  highlight?: string;
}
export interface Iinstructor {
  id: number;
  name: string;
  title?: string;
  image: StaticImageData;
  role?: string;
  socialLinks?: {
    facebook: string;
    twitter: string;
    linkedin: string;
    instagram?: string;
  };
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
  id: number;
  counterNum: number;
  suffix?: string;
  counterText: string;
  iconClass?: string;
}
export interface IFeature {
  id: number;
  icon: string;
  title: string;
  description: string;
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
export interface IEvent {
  id: number;
  image?: StaticImageData;
  date: string;
  monthYear: string;
  location: string;
  time: string;
  title: string;
  description?: string;
  isActive?: boolean;
}

// Book/shop product data type used by shop cards, cart and wishlist.
export interface ProductsType {
  id: number;
  image?: StaticImageData;
  instructorImage?: StaticImageData;
  title: string;
  rating?: number;
  price?: number;
  quantity?: number;
  discount?: number;
  badge?: string;
  badgeClass?: string;
  description?: string;
  books?: ProductsType[];
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
  avatarImg?: StaticImageData;
  category?: string[];
  shape?: StaticImageData;
  badgeClassTwo?: string;
  smallTextThree?: string;
  courseBgClass?: string;
  FontSizeClassTwo?: string;
  quantity?: number;
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
  wowDelayDuration: string;
}
export interface IBlog {
  id: number;
  image?: StaticImageData;
  title?: string;
  authorName?: string;
  date?: string;
  description?: string;
  month?: string;
  comments?: number;
  badge?: string;
  type?: string;
  quote?: string;
  images?: StaticImageData[];
  thumbnail?: StaticImageData;
  buttonShow?: boolean;
  buttonLink?: boolean;
  daynamicLink?: boolean;
  boxShadowClass?: boolean;
  isPublished?: boolean;
  publishDate?: string;
}

export type idType = {
  id: string | number;
};

export interface ContactDetailLink {
  text: string;
  link: string;
}

export interface ContactItem {
  icon: string;
  title: string;
  details: Array<string | ContactDetailLink>;
}

export interface IAcademicCalendarEvent {
  label: string;
  date: string;
}

export interface IAcademicCalendar {
  semester: string;
  image: StaticImageData;
  events: IAcademicCalendarEvent[];
}

export interface ICourseReview {
  id: number;
  name: string;
  date: string;
  avatar: StaticImageData;
  rating: number;
  comment: string;
  replies?: ICourseReview[];
}

export interface IExecutiveLeadersType {
  id: number;
  image: StaticImageData;
  name: string;
  designation: string;
  instituteOne: string;
  instituteTwo: string;
  email: string;
  type: string;
}

export interface IFeatureFilter {
  id: string;
  name: string;
  count: number;
  isChecked?: boolean;
}

export interface IInstructorFilter {
  id: string;
  name: string;
  courseCount: number;
  isChecked?: boolean;
}

export type Instructor = IInstructorFilter;

export interface ILanguageFilter {
  id: string;
  name: string;
  count: number;
  isChecked?: boolean;
}

export interface ILevelFilter {
  checkId: string;
  name: string;
  count: number;
  isChecked: boolean;
}

export interface IMissionVision {
  id: number;
  img: StaticImageData;
  title: string;
  description: string;
}

export interface IRatingFilter {
  checkId: string;
  stars: number;
  count: number;
  isChecked: boolean;
}

export interface IReview {
  id: number;
  ratingIcon: StaticImageData;
  contentTitle: string;
  text: string;
  author: string;
}

export interface IScholarshipFinancialAid {
  image: StaticImageData;
  title: string;
  link: string;
}

export interface ISubcategoryFilter {
  id: string;
  name: string;
  count: number;
  isChecked?: boolean;
}

export interface IVideoDuration {
  id: string;
  label: string;
  count: number;
  isChecked?: boolean;
}

export interface PriceFilter {
  checkId: string;
  name: string;
  count: number;
  isChecked: boolean;
}

export interface ProgramDataType {
  id: number;
  program?: string;
  type?: string;
  title: string;
  description: string;
  duration: string;
  credits?: string;
  image: StaticImageData;
  shapeImage: StaticImageData;
  textImage?: StaticImageData;
  BgClass?: string;
  hoursTime?: number;
  age?: string;
}
