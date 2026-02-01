import Link from 'next/link';
import React from 'react';

const CategoryDropdown = () => {
    return (
        <>
            <ul>
                <li><Link href="/courses">Development</Link></li>
                <li><Link href="/courses">Marketing</Link></li>

            </ul>
        </>
    );
};

export default CategoryDropdown;