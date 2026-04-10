import React from 'react';

type CourseLearnListProps = {
    topics: string[];
};

const learnTopics: string[][] = [
    [
        "Build data driven apps step by step with hands-on coding",
        "Create interactive features like input fields, buttons, and checkboxes",
        "Learn to design and develop fully functional apps",
    ],
    [
        "Gain confidence in coding by building your own projects",
        "Work with databases like sqlite for full-stack applications",
        "Overcome coding roadblocks with a clear learning roadmap",
    ]
];

const CourseLearnList: React.FC<CourseLearnListProps> = ({ topics }) => (
    <div className="bd-course-details-list">
        <ul>
            {topics.map((topic, index) => (
                <li key={index}>
                    <span className="list-icon success">
                        <i className="fa-solid fa-check"></i>
                    </span>
                    {topic}
                </li>
            ))}
        </ul>
    </div>
);

const CourseWillYouLearn: React.FC = () => {
    return (
        <div className="bd-course-details-content mb-30">
            <h3 className="bd-course-details-content-title">What {`you'll`} learn</h3>
            <div className="bd-course-details-list-box">
                {learnTopics.map((topics, index) => (
                    <CourseLearnList key={index} topics={topics} />
                ))}
            </div>
        </div>
    );
};

export default CourseWillYouLearn;
