import React from 'react';

const StudentProfileMain = () => {
    return (
        <>
            <div className="col-xl-9 col-lg-9 col-md-8">
                <div className="bd-dashboard-inner">
                    <div className="bd-dashboard-title-inner">
                        <h4 className="bd-dashboard-title">My Profile</h4>
                    </div>
                    <div className="bd-dashboard-profile-info table-responsive">
                        <table className="table table-bordered table-head-bg">
                            <thead>
                                <tr>
                                    <th style={{ minWidth: "200px" }}>Field</th>
                                    <th style={{ minWidth: "736.5px" }}>Details</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th>Registration Date</th>
                                    <td>December 25, 2024 12:30pm</td>
                                </tr>
                                <tr>
                                    <th>Full Name</th>
                                    <td>Sarah A.</td>
                                </tr>
                               
                                
                                <tr>
                                    <th>Email</th>
                                    <td>info@gamil.com</td>
                                </tr>
                                <tr>
                                    <th>Phone Number</th>
                                    <td>+967 019 2425 990</td>
                                </tr>
                                <tr>
                                    <th>LinkedIn Profile link</th>
                                    <td>&nbsp;</td>
                                </tr>
                               
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
};

export default StudentProfileMain;