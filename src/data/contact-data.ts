import { ContactItem } from "@/interFace/interFace";

export const contactData: ContactItem[] = [
    {
        icon: "fa-light fa-map-marker-alt",
        title: "Dhaka Office",
        details: [
            "Gulshan, Dhaka-1212, Bangladesh",
            { text: "www.enamnotes.com", link: "https://enamnotes.com" }
        ]
    },
    {
        icon: "fa-light fa-phone",
        title: "Call Us",
        details: [
            "+880 17-21186833 (WhatsApp)",
            
        ]
    },
    {
        icon: "fa-light fa-envelope",
        title: "Email Us",
        details: [
            { text: "info@enamnotes.com", link: "mailto:info@enamnotes.com" },
            { text: "md.enamul19@gmail.com", link: "mailto:md.enamul19@gmail.com" }
        ]
    },
    {
        icon: "fa-light fa-globe",
        title: "Visit Our Website",
        details: [
            { text: "www.enamnotes.com", link: "https://enamnotes.com" }

        ]
    }
];