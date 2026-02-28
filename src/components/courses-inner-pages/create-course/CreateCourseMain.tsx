"use client";
import React, { useMemo, useState } from 'react';
import { toast } from 'sonner';
import CourseUploadTips from './CourseUploadTips';

import CourseInformationForm from '@/form/create-course/course-information-form';
import CourseSettings from './CourseSettings';
import CourseAttachment from '@/form/create-course/course-attachment';
import AddProductForm from '@/form/create-course/add-product-form';
import CoursePrerequisites from '@/form/create-course/course-prerequisites';
import CourseBuilder from './CourseBuilder';
import FeatureImageOrVideo from '@/form/create-course/feature-image-or-video';
import CertificateTemplates from './CertificateTemplates';
import AddQuizAssignment from './AddQuizAssignment';
import AdditionalData from './AdditionalData';
import CourseIntroVideo from './CourseIntroVideo';
import CourseVideoInstructors from './CourseVideoInstructors';
import AccordionItem from './AccordionItem';

type CoursePayload = {
    title: string;
    courseDescription: string;
    shortDescription?: string;
    price: number;
    oldPrice?: number;
    status?: 'draft' | 'published' | 'archived';
};

const CreateCourseMain = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [excerpt, setExcerpt] = useState('');
    const [author, setAuthor] = useState('');

    const [courseType, setCourseType] = useState<'paid' | 'free'>('paid');
    const [regularPrice, setRegularPrice] = useState('');
    const [salePrice, setSalePrice] = useState('');

    const [isSubmitting, setIsSubmitting] = useState(false);

    const canSubmit = useMemo(() => {
        if (!title.trim() || !description.trim()) {
            return false;
        }

        if (courseType === 'free') {
            return true;
        }

        return Number(regularPrice) > 0;
    }, [courseType, description, regularPrice, title]);

    const handleSave = async (status: 'draft' | 'published') => {
        if (!canSubmit) {
            toast.error('Please fill required fields (title, description, and price for paid course).');
            return;
        }

        try {
            setIsSubmitting(true);

            const payload: CoursePayload = {
                title: title.trim(),
                courseDescription: description.trim(),
                shortDescription: excerpt.trim() || undefined,
                price: courseType === 'free' ? 0 : Number(salePrice || regularPrice || 0),
                oldPrice: courseType === 'free' ? undefined : (regularPrice ? Number(regularPrice) : undefined),
                status,
            };

            const response = await fetch('/api/admin/courses', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to create course');
            }

            toast.success(`Course ${status === 'published' ? 'published' : 'saved as draft'} successfully.`);
        } catch (error) {
            toast.error(error instanceof Error ? error.message : 'Failed to create course');
        } finally {
            setIsSubmitting(false);
        }
    };

    const courseSections = [
        {
            id: 'One',
            title: 'Course Information',
            component: () => (
                <CourseInformationForm
                    courseTitle={title}
                    courseDescription={description}
                    excerpt={excerpt}
                    courseAuthor={author}
                    onFieldChange={(field, value) => {
                        if (field === 'title') setTitle(value);
                        if (field === 'description') setDescription(value);
                        if (field === 'excerpt') setExcerpt(value);
                        if (field === 'author') setAuthor(value);
                    }}
                />
            ),
        },
        { id: 'Two', title: 'Course Settings', component: CourseSettings },
        { id: 'Three', title: 'Course Attachments', component: CourseAttachment },
        {
            id: 'Four',
            title: 'Add Product',
            component: () => (
                <AddProductForm
                    courseType={courseType}
                    regularPrice={regularPrice}
                    salePrice={salePrice}
                    onCourseTypeChange={setCourseType}
                    onPriceChange={(field, value) => {
                        if (field === 'regularPrice') setRegularPrice(value);
                        if (field === 'salePrice') setSalePrice(value);
                    }}
                />
            ),
        },
        { id: 'Five', title: 'Course Prerequisites', component: CoursePrerequisites },
        { id: 'Six', title: 'Course Builder', component: CourseBuilder },
        { id: 'Seven', title: 'Featured Image and Video Lessons', component: FeatureImageOrVideo },
        { id: 'Eight', title: 'Add Quiz & Assignments', component: AddQuizAssignment },
        { id: 'Nine', title: 'Additional Data', component: AdditionalData },
        { id: 'Ten', title: 'Course Intro Video', component: CourseIntroVideo },
        { id: 'Eleven', title: 'Certificate Templates', component: CertificateTemplates },
        { id: 'Twelve', title: 'Instructors', component: CourseVideoInstructors },
    ];

    return (
        <section className="bd-new-course-area section-space">
            <div className="container">
                <div className="row g-30 justify-content-between">
                    <div className="col-xl-8 col-lg-7 order-lg-0 order-1">
                        <div className="bd-new-course-wrapper">
                            <div className="accordion-common-style accordion-transparent accordion-item-margin">
                                <div className="accordion" id="accordionExample">
                                    {courseSections.map((section) => (
                                        <AccordionItem key={section.id} {...section} />
                                    ))}
                                </div>
                            </div>
                            <div className="d-flex-items justify-content-start gap-30 mt-50">
                                <button
                                    type="button"
                                    className="bd-btn btn-outline-secondary"
                                    disabled={isSubmitting}
                                    onClick={() => {
                                        if (!isSubmitting) {
                                            void handleSave('draft');
                                        }
                                    }}
                                >
                                    {isSubmitting ? 'Saving...' : 'Save Draft'}
                                </button>
                                <button
                                    type="button"
                                    className="bd-btn btn-outline-primary"
                                    disabled={isSubmitting}
                                    onClick={() => {
                                        if (!isSubmitting) {
                                            void handleSave('published');
                                        }
                                    }}
                                >
                                    {isSubmitting ? 'Publishing...' : 'Publish'}
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-4 col-lg-5 order-lg-1 order-0">
                        <CourseUploadTips />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CreateCourseMain;
