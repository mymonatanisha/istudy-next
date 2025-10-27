"use client";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addImageUpload } from "@/redux/slices/imageUploadSlice";
import { IImageUploadFormProps } from "@/interFace/interFace";
import Image from "next/image";

const CheckboxImageUploadForm: React.FC<IImageUploadFormProps> = ({
  onUpload,
  allowMultiple = false,
  checkboxLabel = "I agree to upload this image",
  uploadButtonText = "Upload Image"
}) => {
  const dispatch = useDispatch();
  const [isChecked, setIsChecked] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  // Handle checkbox change
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(e.target.checked);
  };

  // Handle image file selection
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please select a valid image file');
        return;
      }

      // Validate file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size should be less than 5MB');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
        setSelectedFile(file);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isChecked) {
      alert('Please check the checkbox to proceed');
      return;
    }

    if (!selectedImage || !selectedFile) {
      alert('Please select an image to upload');
      return;
    }

    setIsUploading(true);

    // Create new upload item
    const newUploadItem = {
      checkboxChecked: isChecked,
      imageSrc: selectedImage,
      imageFile: selectedFile,
    };

    // Add to Redux store (simulating database save)
    dispatch(addImageUpload(newUploadItem));

    // Call optional callback
    if (onUpload) {
      const fullItem = {
        ...newUploadItem,
        id: Date.now().toString(),
        uploadedAt: new Date().toISOString(),
      };
      onUpload(fullItem);
    }

    // Reset form if not allowing multiple uploads
    if (!allowMultiple) {
      setIsChecked(false);
      setSelectedImage(null);
      setSelectedFile(null);
    }

    setIsUploading(false);
  };

  // Handle form reset
  const handleReset = () => {
    setIsChecked(false);
    setSelectedImage(null);
    setSelectedFile(null);
  };

  return (
    <div className="bd-checkbox-image-upload-form">
      <form onSubmit={handleSubmit} className="bd-form">
        <div className="bd-form-group">
          {/* Checkbox Section */}
          <div className="checkbox-option mb-25">
            <input
              id="upload-agreement-checkbox"
              type="checkbox"
              checked={isChecked}
              onChange={handleCheckboxChange}
            />
            <label htmlFor="upload-agreement-checkbox">
              {checkboxLabel}
            </label>
          </div>

          {/* Image Upload Section */}
          <div className="bd-image-upload-section">
            <div className="bd-upload-area">
              <div className="bd-upload-preview">
                {selectedImage ? (
                  <div className="bd-image-preview">
                    <Image 
                      src={selectedImage} 
                      alt="Selected image preview" 
                      width={200} 
                      height={200} 
                      style={{ objectFit: 'cover', borderRadius: '8px' }}
                    />
                    <button 
                      type="button" 
                      className="bd-remove-image-btn"
                      onClick={() => {
                        setSelectedImage(null);
                        setSelectedFile(null);
                      }}
                    >
                      ×
                    </button>
                  </div>
                ) : (
                  <div className="bd-upload-placeholder">
                    <div className="bd-upload-icon">
                      <i className="fas fa-cloud-upload-alt"></i>
                    </div>
                    <p>Click to select an image or drag and drop</p>
                    <small>Supported formats: JPG, PNG, GIF (Max: 5MB)</small>
                  </div>
                )}
              </div>

              <div className="bd-upload-controls">
                <input
                  type="file"
                  id="image-upload-input"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="bd-file-input"
                />
                <label htmlFor="image-upload-input" className="bd-btn btn-outline-border-primary">
                  <i className="fas fa-upload"></i> Choose Image
                </label>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="bd-form-actions mt-30">
            <button 
              type="submit" 
              className="bd-btn btn-primary"
              disabled={!isChecked || !selectedImage || isUploading}
            >
              {isUploading ? (
                <>
                  <i className="fas fa-spinner fa-spin"></i> Uploading...
                </>
              ) : (
                <>
                  <i className="fas fa-save"></i> {uploadButtonText}
                </>
              )}
            </button>
            
            <button 
              type="button" 
              className="bd-btn btn-outline-border-secondary ml-15"
              onClick={handleReset}
            >
              <i className="fas fa-undo"></i> Reset
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CheckboxImageUploadForm;