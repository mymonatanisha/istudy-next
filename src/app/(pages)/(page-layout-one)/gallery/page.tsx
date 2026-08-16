import GalleryMain from '@/components/pages/page-layout-one/gallery/GalleryMain';
import Wrapper from '@/layout/DefaultWrapper';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
    title: "Gallery - Enam Notes Online Courses",
};

const Gallery = () => {
    return (
        <>
            <Wrapper>
                <main>
                    <GalleryMain />
                </main>
            </Wrapper>
        </>
    );
};

export default Gallery;