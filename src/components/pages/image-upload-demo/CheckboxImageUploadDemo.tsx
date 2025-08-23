"use client";
import React, { useState } from "react";
import CheckboxImageUploadForm from "@/form/CheckboxImageUploadForm";
import UploadedImagesDatabase from "@/components/common/database/UploadedImagesDatabase";
import { IImageUploadItem } from "@/interFace/interFace";
import Breadcrumbs from "@/components/common/Breadcrumb/Breadcrumbs";

const CheckboxImageUploadDemo: React.FC = () => {
    const [uploadCount, setUploadCount] = useState(0);
    
    // Handle new upload
    const handleNewUpload = (item: IImageUploadItem) => {
        setUploadCount(prev => prev + 1);
        console.log('New image uploaded:', item);
    };

    return (
        <>
            <Breadcrumbs breadcrumbTitle="Image Upload Demo" />
            
            {/* Main Demo Section */}
            <section className="bd-image-upload-demo-area section-space">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-xl-10 col-lg-12">
                            
                            {/* Page Header */}
                            <div className="bd-section-title-wrapper section-title-space text-center mb-60">
                                <span className="bd-section-subtitle">Feature Demo</span>
                                <h2 className="bd-section-title">Checkbox with Image Upload</h2>
                                <p className="bd-section-description mt-20">
                                    This demo showcases a form that combines a checkbox agreement with image upload functionality. 
                                    All uploaded images are stored in the simulated database below and persist using Redux state management.
                                </p>
                            </div>

                            {/* Upload Form Card */}
                            <div className="bd-demo-card mb-50">
                                <div className="bd-demo-card-header">
                                    <h4 className="bd-demo-card-title">
                                        <i className="fas fa-upload"></i> Upload Form
                                    </h4>
                                    <p className="bd-demo-card-description">
                                        Check the agreement checkbox and upload an image below.
                                    </p>
                                </div>
                                <div className="bd-demo-card-body">
                                    <CheckboxImageUploadForm 
                                        onUpload={handleNewUpload}
                                        allowMultiple={true}
                                        checkboxLabel="I agree to upload and store this image in the database"
                                        uploadButtonText="Save to Database"
                                    />
                                </div>
                            </div>

                            {/* Statistics */}
                            <div className="bd-upload-stats mb-40">
                                <div className="row g-20">
                                    <div className="col-md-4">
                                        <div className="bd-stat-card">
                                            <div className="bd-stat-icon">
                                                <i className="fas fa-images"></i>
                                            </div>
                                            <div className="bd-stat-content">
                                                <h5>Total Uploads</h5>
                                                <span className="bd-stat-number">{uploadCount}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="bd-stat-card">
                                            <div className="bd-stat-icon">
                                                <i className="fas fa-database"></i>
                                            </div>
                                            <div className="bd-stat-content">
                                                <h5>Storage Type</h5>
                                                <span className="bd-stat-text">Redux + LocalStorage</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="bd-stat-card">
                                            <div className="bd-stat-icon">
                                                <i className="fas fa-check-circle"></i>
                                            </div>
                                            <div className="bd-stat-content">
                                                <h5>Features</h5>
                                                <span className="bd-stat-text">Checkbox + Upload</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Features List */}
                            <div className="bd-features-list mb-50">
                                <h5 className="bd-features-title">✨ Key Features:</h5>
                                <ul className="bd-features-items">
                                    <li><i className="fas fa-check"></i> Checkbox agreement requirement before upload</li>
                                    <li><i className="fas fa-check"></i> Image file validation (type and size)</li>
                                    <li><i className="fas fa-check"></i> Real-time image preview</li>
                                    <li><i className="fas fa-check"></i> Redux state management for persistence</li>
                                    <li><i className="fas fa-check"></i> LocalStorage persistence across browser sessions</li>
                                    <li><i className="fas fa-check"></i> Database-like view with CRUD operations</li>
                                    <li><i className="fas fa-check"></i> Responsive design for all screen sizes</li>
                                    <li><i className="fas fa-check"></i> Toast notifications for user feedback</li>
                                </ul>
                            </div>

                        </div>
                    </div>
                </div>
            </section>

            {/* Database Section */}
            <section className="bd-database-demo-area section-space-bottom">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <UploadedImagesDatabase />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default CheckboxImageUploadDemo;