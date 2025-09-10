import { getCurrentYear } from '@/utils/dateUtils';
import Link from 'next/link';
import React, { ReactNode } from 'react';
import Logo from '../../../public/assets/images/logo/logo.svg';
import playStore from '../../../public/assets/images/icon/play-store.webp';
import appStore from '../../../public/assets/images/icon/app-store.webp';
import Image from 'next/image';
interface MainFooterProps {
    children?: ReactNode;
};
const MainFooter = ({ children }: MainFooterProps) => {
    return (
        <>
            {/* -- footer area start -- */}
            <footer className="bd-footer-area fix">
                <div className="bd-footer-area-main-content section-space theme-bg-05">
                    <div className="container">
                        <div className="row gy-30 justify-content-between">
                            <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-6 col-sm-12">
                                <div className="bd-footer-widget footer-1-col-1">
                                    <div className="bd-footer-widget-content">
                                        <div className="bd-footer-widget-logo">
                                            <Link href="/">
                                                <Image src={Logo} alt="image" width={120} height={60} priority />
                                            </Link>
                                        </div>
                                        <p className="bd-footer-widget-description">Empower your journey with a platform designed to inspire learning, unlock potential, and fuel your passion for growth.</p>
                                        <div className="bd-footer-widget-contact-info">
                                            <div className="bd-footer-widget-contact-item">
                                                <span>Phone:</span>
                                                <Link href="tell:+880-1721-186833">
                                                    +880-1721-186833</Link>
                                            </div>
                                            <div className="bd-footer-widget-contact-item">
                                                <span>Email:</span>
                                                <Link href="mailto:md.enamul19@gmail.com"> md.enamul19@gmail.com</Link>
                                            </div>
                                            <div className="bd-footer-widget-contact-item">
                                                <span>Address:</span>
                                                <Link href="#"> Dhaka, Bangladesh</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Children content section - This part allows dynamic content to be injected into the footer */}
                            {children}
                            <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-8 col-sm-12">
                                <div className="bd-footer-widget footer-1-col-4">
                                    <h6 className="bd-footer-widget-title mb-20">Stay Connected</h6>
                                    <div className="bd-footer-from-content mb-20">
                                        <div className="bd-footer-social">
                                            <div className="theme-social social-brand-color">
                                                <ul className="social-icon-list">
                                                    <li><Link className="facebook" href="https://www.facebook.com/enamnotescom/" target="_blank"><i className="fa-brands fa-facebook-f"></i></Link>
                                                    </li>
                                                    <li><Link className="youtube" href="https://www.youtube.com/@EnamNotes"><i className="fa-brands fa-youtube"></i></Link>
                                                    </li>
                                                    <li><Link className="tiktok" href="https://www.tiktok.com/@enamnotes" target="_blank"><i className="fa-brands fa-tiktok"></i></Link>
                                                    </li>
                                                    <li><Link className="linkedin" href="https://www.linkedin.com/in/enamul-huq/" target="_blank"><i className="fa-brands fa-linkedin-in"></i></Link>
                                                    </li>
                                                    <li><Link className="twitter" href="https://x.com/enamnotes" target="_blank"><i className="fa-brands fa-x-twitter"></i></Link>
                                                    </li>
                                                    
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <h6 className="bd-footer-widget-title mb-20">Download App</h6>
                                    <div className="bd-footer-from-content">
                                        <div className="bd-footer-app-btn d-flex align-items-center gap-15">
                                            <Link className="bd-app-btn" href="#"><Image src={playStore} style={{ width: "100%", height: "auto" }} alt="play-store" /></Link>
                                            <Link className="bd-app-btn" href="#"><Image src={appStore} style={{ width: "100%", height: "auto" }} alt="app-store" /></Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bd-footer-copyright-area pt-25 pb-20">
                    <div className="container">
                        <div className="row gy-10 align-items-center justify-content-lg-between justify-content-center">
                            <div className="col-xxl-4 col-xl-5 col-lg-5 col-md-8">
                                <div className="bd-footer-copyright text-lg-start text-center">
                                    <p className="underline">© Copyright <span>{getCurrentYear()}</span> | Developed By enamnotes</p>
                                </div>
                            </div>
                            <div className="col-xxl-5 col-xl-7 col-lg-7 col-md-12">
                                <div className="bd-footer-copyright-list">
                                    <ul className="justify-content-lg-end justify-content-center">
                                        <li className="underline"><Link href="/terms-conditions">Terms and Conditions</Link></li>
                                        <li className="underline"><Link href="/privacy-policy">Privacy and Policy</Link></li>
                                        
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
            {/* -- footer area end -- */}
        </>
    );
};

export default MainFooter;