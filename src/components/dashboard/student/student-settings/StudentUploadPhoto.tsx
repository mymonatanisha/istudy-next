"use client";
import React, { useState, useEffect } from "react";
import { toast } from "sonner";

const StudentUploadPhoto = () => {
  const [image, setImage] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  // Load current user avatar on mount
  useEffect(() => {
    const fetchUserProfile = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("/api/profile");
        if (response.ok) {
          const data = await response.json();
          // Use avatar field (for both OAuth users and uploaded photos)
          if (data.user?.avatar || data.user?.address) {
            setImage(data.user.avatar || data.user.address);
          }
        }
      } catch (error) {
        console.error("Failed to load user profile:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  // Handle Image Change with validation
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    
    if (!selectedFile) return;

    // Validate file type
    const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif", "image/webp"];
    if (!validTypes.includes(selectedFile.type)) {
      toast.error("Please select a valid image file (JPEG, PNG, GIF, or WebP)");
      return;
    }

    // Validate file size (5MB limit)
    const maxSize = 5 * 1024 * 1024; // 5MB in bytes
    if (selectedFile.size > maxSize) {
      toast.error("File size must be less than 5MB");
      return;
    }

    // Preview the image
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result as string);
      setFile(selectedFile);
    };
    reader.readAsDataURL(selectedFile);
  };

  // Handle Save/Upload
  const handleSavePhoto = async () => {
    if (!file) {
      toast.error("Please select a photo to upload");
      return;
    }

    setIsUploading(true);
    try {
      // Convert file to base64 for sending to API
      const base64 = await fileToBase64(file);
      
      const response = await fetch("/api/user/upload-photo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          photo: base64,
          fileName: file.name,
          fileType: file.type,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Profile photo updated successfully!");
        setFile(null); // Clear the file after successful upload
      } else {
        toast.error(data.error || "Failed to upload photo");
      }
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("An error occurred while uploading the photo");
    } finally {
      setIsUploading(false);
    }
  };

  // Helper to convert File to base64
  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  return (
    <div className="bd-profile-update-area">
      <div className="bd-cover-details-thumb details-slide-full mb-30">
        <div className="bd-cover-thumb-chnage">
          <div className="bd-cover-thumb-preview">
            <div
              className="bd-cover-thumb-preview-box"
              id="imagePreview"
              style={{
                backgroundImage: image ? `url(${image})` : "none",
                backgroundColor: image ? "transparent" : "#f0f0f0",
                backgroundSize: "cover",
                backgroundPosition: "center",
                minHeight: "200px",
              }}
            >
              {!image && !isLoading && (
                <div style={{ 
                  display: "flex", 
                  alignItems: "center", 
                  justifyContent: "center", 
                  height: "200px",
                  color: "#999"
                }}>
                  No photo uploaded
                </div>
              )}
              {isLoading && (
                <div style={{ 
                  display: "flex", 
                  alignItems: "center", 
                  justifyContent: "center", 
                  height: "200px",
                  color: "#999"
                }}>
                  Loading...
                </div>
              )}
            </div>
          </div>

          <div className="bd-cover-thumb-edit">
            <input
              type="file"
              id="imageUpload"
              accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
              onChange={handleImageChange}
              disabled={isUploading}
            />
            <label htmlFor="imageUpload">
              {file ? "Change Image" : "Add / Change Image"}
            </label>
          </div>
        </div>
      </div>

      {file && (
        <div className="bd-change-btn">
          <button 
            className="bd-btn btn-primary" 
            onClick={handleSavePhoto}
            disabled={isUploading}
          >
            {isUploading ? "Uploading..." : "Save Changes"}
          </button>
        </div>
      )}
    </div>
  );
};

export default StudentUploadPhoto;
