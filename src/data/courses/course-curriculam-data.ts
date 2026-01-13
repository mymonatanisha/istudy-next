interface Lecture {
    title: string;
    duration: string;
}

interface ICurriculam {
    title: string;
    lectures: Lecture[];
}

const curriculamData: ICurriculam[] = [
    {
        title: "Mastering Basic Inputs",
        lectures: [
            { title: "Save user data (like Name) using EditText (Text Fields) and Buttons.", duration: " " },
            
        ],
    },
    {
        title: "Implementing Conditional Logic",
        lectures: [
            { title: "Developing selection logic for Gender using Radio Buttons", duration: "" },
           
        ],
    },
    {
        title: "Date & Time Integration",
        lectures: [
            { title: "Integrating a Calendar (Date Picker) to select birthdays", duration: " " },
            
        ],
    },
    {
        title: "Smart Selection Menus",
        lectures: [
            { title: "Creating efficient Spinners (Dropdown Menus)", duration: " " },
           
        ],
    },
    {
        title: "Multi-Selection Features",
        lectures: [
            { title: "user interests and hobbies using Checkboxes", duration: " " },
           
        ],
    },
    {
        title: "App Identity & Branding",
        lectures: [
            { title: "design and set a professional App Icon", duration: " " },
           
        ],
    },
    {
        title: "Premium Visuals",
        lectures: [
            { title: "high-quality Splash Screen (the loading screen)", duration: "" },
          
        ],
    },

        {
        title: "Advanced Navigation",
        lectures: [
            { title: "transitions between different pages", duration: "" },
          
        ],
    },
];

export default curriculamData;