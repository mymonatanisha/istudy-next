import CheckboxImageUploadDemo from '@/components/pages/image-upload-demo/CheckboxImageUploadDemo';
import Wrapper from '@/layout/DefaultWrapper';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Checkbox Image Upload Demo - Education & Online Courses React NextJs Template",
    description: "Demo page showing checkbox with image upload functionality and database storage simulation",
};

const ImageUploadDemoPage = () => {
    return (
        <>
            <Wrapper>
                <main>
                    <CheckboxImageUploadDemo />
                </main>
            </Wrapper>
        </>
    );
};

export default ImageUploadDemoPage;