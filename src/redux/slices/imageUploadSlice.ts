"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "sonner";

// Interface for image upload data
export interface ImageUploadItem {
  id: string;
  checkboxChecked: boolean;
  imageSrc: string | null;
  imageFile: File | null;
  uploadedAt: string;
}

interface ImageUploadState {
  uploadedImages: ImageUploadItem[];
}

const initialState: ImageUploadState = {
  uploadedImages: [],
};

export const imageUploadSlice = createSlice({
  name: "imageUpload",
  initialState,
  reducers: {
    addImageUpload: (state, { payload }: PayloadAction<Omit<ImageUploadItem, 'id' | 'uploadedAt'>>) => {
      const newId = Date.now().toString();
      const newImageUpload: ImageUploadItem = {
        ...payload,
        id: newId,
        uploadedAt: new Date().toISOString(),
      };
      state.uploadedImages.push(newImageUpload);
      toast.success("Image uploaded successfully!", {
        duration: 2000,
      });
    },
    
    updateCheckbox: (state, { payload }: PayloadAction<{ id: string; checked: boolean }>) => {
      const itemIndex = state.uploadedImages.findIndex(item => item.id === payload.id);
      if (itemIndex >= 0) {
        state.uploadedImages[itemIndex].checkboxChecked = payload.checked;
      }
    },
    
    updateImage: (state, { payload }: PayloadAction<{ id: string; imageSrc: string | null; imageFile: File | null }>) => {
      const itemIndex = state.uploadedImages.findIndex(item => item.id === payload.id);
      if (itemIndex >= 0) {
        state.uploadedImages[itemIndex].imageSrc = payload.imageSrc;
        state.uploadedImages[itemIndex].imageFile = payload.imageFile;
        state.uploadedImages[itemIndex].uploadedAt = new Date().toISOString();
        toast.success("Image updated successfully!", {
          duration: 2000,
        });
      }
    },
    
    removeImageUpload: (state, { payload }: PayloadAction<string>) => {
      state.uploadedImages = state.uploadedImages.filter(item => item.id !== payload);
      toast.success("Image removed successfully!", {
        duration: 2000,
      });
    },
    
    clearAllUploads: (state) => {
      state.uploadedImages = [];
      toast.success("All uploads cleared!", {
        duration: 2000,
      });
    },
  },
});

export const { 
  addImageUpload, 
  updateCheckbox, 
  updateImage, 
  removeImageUpload, 
  clearAllUploads 
} = imageUploadSlice.actions;

export default imageUploadSlice.reducer;