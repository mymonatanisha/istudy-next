import ElementsBreadcrumb from '@/components/common/Breadcrumb/ElementsBreadcrumb';
import React from 'react';
import JokeGenerator from '@/components/common/joke-generator/JokeGenerator';

const JokeGeneratorMain = () => {
    return (
        <>
            <ElementsBreadcrumb title='Joke Generator' subTitle='Random Joke Generator Component'/>
            <JokeGenerator/>
        </>
    );
};

export default JokeGeneratorMain;