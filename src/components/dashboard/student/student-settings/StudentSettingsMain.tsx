"use client";
import ChangePasswordForm from "@/form/dashboard/student/change-password";
import UserSettingsDropdown from "./UserSettingsDropdown";
import StudentUploadPhoto from "./StudentUploadPhoto";

const StudentSettingsMain = () => {

    return (
        <div className="col-xl-9 col-lg-9 col-md-8">
            <div className="bd-dashboard-inner">
                <div className="bd-dashboard-title-inner">
                    <div className="d-flex justify-content-between">
                        <h4 className="bd-dashboard-title">Student Settings</h4>
                        <UserSettingsDropdown />
                    </div>
                </div>
                
                {/* Upload Photo Section */}
                <div className="dashboard-profile-info mb-30">
                    <div className="dashboard-profile-inner">
                        <h5 className="mb-20">Upload Photo</h5>
                        <StudentUploadPhoto />
                    </div>
                </div>

                {/* Change Password Section */}
                <div className="dashboard-profile-info">
                    <div className="dashboard-profile-inner">
                        <h5 className="mb-20">Change Password</h5>
                        <ChangePasswordForm />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentSettingsMain;
