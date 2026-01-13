import OnlineDocumentationSvg from '@/svg/OnlineDocumentationSvg';
import SupportSvg from '@/svg/SupportSvg';
import Link from 'next/link';
import React from 'react';

interface FaqItemProps {
    id: string;
    question: string;
    answer: string;
}

const faqData: FaqItemProps[] = [
    { id: "Nine", question: "Do I need coding experience to start?", answer: "No, our beginner-friendly Android course starts from zero using practical project-based learning." },
    { id: "Ten", question: "Are the courses free or paid?", answer: "Most blog content is free. Premium Android crash courses will require a one-time enrollment fee." },
    { id: "Eleven", question: "Do you offer certificates?", answer: "Yes. After completing a course, you can download a verified certificate of completion from your dashboard." },
    { id: "Twelve", question: "Can I access content on mobile?", answer: "Yes. The platform is fully responsive and mobile-friendly." },
    { id: "Thirteen", question: "Can I ask questions or get support?", answer: "Absolutely! Use the contact page or join our community group linked in your dashboard." },
];
const FaqItem: React.FC<FaqItemProps> = ({ id, question, answer }) => {
    const isFirst = id === faqData[0].id;

    return (
        <div className="accordion-item">
            <h6 className="accordion-header" id={`heading${id}`}>
                <button 
                    className={`accordion-button ${isFirst ? '' : 'collapsed'}`} 
                    type="button" 
                    data-bs-toggle="collapse" 
                    data-bs-target={`#collapse${id}`} 
                    aria-expanded={isFirst ? "true" : "false"} 
                    aria-controls={`collapse${id}`}
                >
                    <span>{`Q${id.replace(/\D/g, '')}:`}</span> {question}
                </button>
            </h6>
            <div 
                id={`collapse${id}`} 
                className={`accordion-collapse collapse ${isFirst ? 'show' : ''}`} 
                aria-labelledby={`heading${id}`} 
                data-bs-parent="#accordionExampleThree"
            >
                <div className="accordion-body">{answer}</div>
            </div>
        </div>
    );
};

interface ServiceBoxProps {
    icon: React.ElementType;
    title: string;
    link: string;
    btnText: string;
    btnClass: string;
}

const ServiceBox: React.FC<ServiceBoxProps> = ({ icon: Icon, title, link, btnText, btnClass }) => (
    <div className="col-lg-12 col-md-6">
        <div className="bd-landing-service">
            <div className="inner">
                <span className="inner-icon">
                    <Icon />
                </span>
                <div className="content">
                    <h4 className="title mb-15">{title}</h4>
                    <Link href={link} target="_blank" className={`bd-btn ${btnClass}`}>
                        {btnText}
                    </Link>
                </div>
            </div>
        </div>
    </div>
);

const HomeFaqArea: React.FC = () => {
    return (
        <div className="faq-area section-space">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-12">
                        <div className="section-title-wrapper text-center section-title-space">
                            <span className="bd-section-subtitle">Got a Question?</span>
                            <h2 className="bd-section-title mb-15">Start Confidently</h2>
                            <p className="description">Find answers to common app development questions from our learners.</p>
                        </div>
                    </div>
                </div>

                <div className="row gy-30 align-items-center justify-content-between">
                    <div className="col-lg-7 col-sm-12 col-12">
                        <div className="demo-faq">
                            <div className="accordion-common-style accordion-transparent accordion-style-one">
                                <div className="accordion" id="accordionExampleThree">
                                    {faqData.map((faq) => (
                                        <FaqItem key={faq.id} {...faq} />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-5 col-sm-12 col-12">
                        <div className="row gy-30">
                            <ServiceBox 
                                icon={OnlineDocumentationSvg} 
                                title="About Us" 
                                link="#" 
                                btnText="About Us" 
                                btnClass="btn-primary" 
                            />
                            <ServiceBox 
                                icon={SupportSvg} 
                                title="Dedicated Support" 
                                link="https://wa.me/8801721186833?text=Hi%20there%2C%20I%20have%20a%20question%20about%20your%20course. " 
                                btnText="Get Support (Whatsapp)" 
                                btnClass="btn-secondary" 
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomeFaqArea;