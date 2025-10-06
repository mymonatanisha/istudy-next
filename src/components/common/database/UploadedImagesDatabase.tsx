"use client";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { removeImageUpload, clearAllUploads, updateCheckbox } from "@/redux/slices/imageUploadSlice";
import Image from "next/image";

const UploadedImagesDatabase: React.FC = () => {
  const dispatch = useDispatch();
  const { uploadedImages } = useSelector((state: RootState) => state.imageUpload);

  // Handle checkbox toggle in the database view
  const handleCheckboxToggle = (id: string, checked: boolean) => {
    dispatch(updateCheckbox({ id, checked }));
  };

  // Handle remove individual item
  const handleRemoveItem = (id: string) => {
    if (confirm('Are you sure you want to remove this uploaded image?')) {
      dispatch(removeImageUpload(id));
    }
  };

  // Handle clear all items
  const handleClearAll = () => {
    if (confirm('Are you sure you want to clear all uploaded images?')) {
      dispatch(clearAllUploads());
    }
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  if (uploadedImages.length === 0) {
    return (
      <div className="bd-uploaded-images-database">
        <div className="bd-database-header">
          <h4 className="bd-database-title">
            <i className="fas fa-database"></i> Uploaded Images Database
          </h4>
        </div>
        <div className="bd-empty-state">
          <div className="bd-empty-icon">
            <i className="fas fa-images"></i>
          </div>
          <h5>No images uploaded yet</h5>
          <p>Upload your first image using the form above to see it here.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bd-uploaded-images-database">
      <div className="bd-database-header">
        <h4 className="bd-database-title">
          <i className="fas fa-database"></i> Uploaded Images Database
        </h4>
        <div className="bd-database-actions">
          <span className="bd-total-count">
            Total: {uploadedImages.length} image{uploadedImages.length !== 1 ? 's' : ''}
          </span>
          <button 
            className="bd-btn btn-danger btn-sm"
            onClick={handleClearAll}
          >
            <i className="fas fa-trash"></i> Clear All
          </button>
        </div>
      </div>

      <div className="bd-database-content">
        <div className="bd-database-grid">
          {uploadedImages.map((item) => (
            <div key={item.id} className="bd-database-item">
              <div className="bd-item-header">
                <div className="checkbox-option">
                  <input
                    id={`db-checkbox-${item.id}`}
                    type="checkbox"
                    checked={item.checkboxChecked}
                    onChange={(e) => handleCheckboxToggle(item.id, e.target.checked)}
                  />
                  <label htmlFor={`db-checkbox-${item.id}`}>
                    Agreement Status
                  </label>
                </div>
                <button 
                  className="bd-remove-btn"
                  onClick={() => handleRemoveItem(item.id)}
                  title="Remove this image"
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>

              <div className="bd-item-image">
                {item.imageSrc ? (
                  <Image 
                    src={item.imageSrc} 
                    alt={`Uploaded image ${item.id}`}
                    width={250}
                    height={200}
                    style={{ objectFit: 'cover', borderRadius: '8px' }}
                  />
                ) : (
                  <div className="bd-no-image">
                    <i className="fas fa-image"></i>
                    <span>No image</span>
                  </div>
                )}
              </div>

              <div className="bd-item-info">
                <div className="bd-info-row">
                  <strong>ID:</strong> {item.id}
                </div>
                <div className="bd-info-row">
                  <strong>Status:</strong> 
                  <span className={`bd-status ${item.checkboxChecked ? 'checked' : 'unchecked'}`}>
                    {item.checkboxChecked ? (
                      <>
                        <i className="fas fa-check-circle"></i> Agreed
                      </>
                    ) : (
                      <>
                        <i className="fas fa-times-circle"></i> Not Agreed
                      </>
                    )}
                  </span>
                </div>
                <div className="bd-info-row">
                  <strong>Uploaded:</strong> {formatDate(item.uploadedAt)}
                </div>
                {item.imageFile && (
                  <div className="bd-info-row">
                    <strong>File:</strong> {item.imageFile.name} ({Math.round(item.imageFile.size / 1024)}KB)
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UploadedImagesDatabase;