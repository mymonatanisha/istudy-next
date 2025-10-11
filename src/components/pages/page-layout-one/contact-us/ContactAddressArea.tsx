import { contactData } from '@/data/contact-data';
import React from 'react';

const ContactAddressArea = () => {
    return (
        <>
            <section className="bd-contact-address-area section-space primary-bg">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-xl-6 col-lg-8">
                            <div className="bd-section-title-wrapper section-title-space text-center">
                                <span className="bd-section-subtitle">Locations</span>
                                <h2 className="bd-section-title mb-20">Our Global Offices</h2>
                            </div>
                        </div>
                    </div>
                    <div className="row gy-30">
                        {contactData.map((item, index) => (
                            <div key={index} className="col-xl-3 col-lg-6 col-md-6">
                                <div className="bd-contact-address-box">
                                    <div className="icon">
                                        <i className={item.icon}></i>
                                    </div>
                                    <div className="content">
                                        <h6 className="title">{item.title}</h6>
                                        {item.details.map((detail, idx) => (
                                            typeof detail === 'string' ? (
                                                <p key={idx}>{detail}</p>
                                            ) : (
                                                <p key={idx}><a href={detail.link} target="_blank" rel="noopener noreferrer">{detail.text}</a></p>
                                            )
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="row">
                        <div className="col-xl-12">
                            <div className="bd-contact-map">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m16!1m11!1m3!1d139.66691242153112!2d90.42155529352287!3d23.773526206882202!2m2!1f20.63386298162675!2f0!3m2!1i1024!2i768!4f46.257226498458195!3m2!1m1!2s!5e1!3m2!1sen!2sbd!4v1760194616483!5m2!1sen!2sbd" width="600" height="450" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade">
                                </iframe>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default ContactAddressArea;