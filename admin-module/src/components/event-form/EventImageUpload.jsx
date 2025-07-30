
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { ImagePlus } from 'lucide-react';
import { useState, useEffect } from 'react';

// interface EventImageUploadProps {
//   existingImageUrl?: string | null;
//   onImageChange: (file: File | null) => void;
//   initialImage: File | null;
// }

export function EventImageUpload({ existingImageUrl, onImageChange, initialImage }) {
  const [image, setImage] = useState(initialImage);
  const [previewUrl, setPreviewUrl] = useState(existingImageUrl || null);
  
  // Update preview when existingImageUrl changes
  useEffect(() => {
    if (existingImageUrl) {
      setPreviewUrl(existingImageUrl);
    }
  }, [existingImageUrl]);
  
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
      onImageChange(file);
      
      // Create a preview URL
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setPreviewUrl(null);
    onImageChange(null);
  };

  return (
    <div className="space-y-2">
      <Label>Event Image</Label>
      <div className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center h-64">
        {previewUrl ? (
          <div className="relative w-full h-full">
            <img 
              src={previewUrl} 
              alt="Event preview" 
              className="w-full h-full object-contain"
            />
            <Button 
              type="button" 
              variant="outline" 
              className="absolute bottom-2 right-2"
              onClick={handleRemoveImage}
            >
              Change Image
            </Button>
          </div>
        ) : (
          <>
            <ImagePlus className="h-10 w-10 text-muted-foreground mb-2" />
            <p className="text-sm text-muted-foreground mb-1">Drag and drop your image here, or click to browse</p>
            <Input
              id="image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
            <Button type="button" variant="outline" onClick={() => document.getElementById('image')?.click()}>
              Select Image
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
