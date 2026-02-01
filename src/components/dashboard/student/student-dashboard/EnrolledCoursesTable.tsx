import React from "react";

type Course = {
    name: string;
    instructor: string;
    startDate: string;
    status: "Ongoing" | "Ongoing" | "Not yet started";
};

const enrolledCourses: Course[] = [
    { name: "Build apps with AI", instructor: "Enamul Huq", startDate: "----------------", status: "Not yet started" },
  //  { name: "Advanced Python Programming", instructor: "Jane Smith", startDate: "15-08-2024", status: "Completed" },
  //  { name: "Project Management Fundamentals", instructor: "Michael Brown", startDate: "20-09-2024", status: "Ongoing" },
  //  { name: "Graphic Design Basics", instructor: "Emily Davis", startDate: "10-07-2024", status: "Completed" },
  //  { name: "Digital Marketing 101", instructor: "Sarah Lee", startDate: "05-10-2024", status: "Ongoing" },
];

const EnrolledCoursesTable: React.FC = () => {
    return (
        <div className="bd-dashboard-course-table table-responsive">
            <table className="table table-head-bg">
                <thead>
                    <tr>
                        <th style={{ minWidth: "300px" }}>Course Name</th>
                        <th style={{ minWidth: "194px" }}>Instructor</th>
                        <th>Start Date</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {enrolledCourses.map((course, index) => (
                        <tr key={index}>
                            <td>{course.name}</td>
                            <td>{course.instructor}</td>
                            <td>{course.startDate}</td>
                            <td>
                                <div className={`bd-badge ${course.status === "Ongoing" ? "badge-warning" : "badge-success"}`}>
                                    {course.status}
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default EnrolledCoursesTable;
