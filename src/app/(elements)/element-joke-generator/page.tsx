import JokeGeneratorMain from '@/components/elements/element-joke-generator/JokeGeneratorMain';
import Wrapper from '@/layout/DefaultWrapper';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
    title: "Joke Generator - Fun Component Demo",
    description: "Random joke generator component demo - fetch jokes from external API and display them in a user-friendly format.",
};

const ElementJokeGenerator = () => {
    return (
        <>
            <Wrapper>
                <main>
                    <JokeGeneratorMain />
                </main>
            </Wrapper>
        </>
    );
};

export default ElementJokeGenerator;