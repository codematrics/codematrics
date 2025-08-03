'use client';

import { Upload, X } from 'lucide-react';
import Image from 'next/image';
import React, { useCallback, useState } from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';

interface ImageUploadProps {
  value?: string;
  onChange: (url: string) => void;
  onRemove: () => void;
  disabled?: boolean;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  value,
  onChange,
  onRemove,
  disabled,
}) => {
  const [isUploading, setIsUploading] = useState(false);

  const handleFileUpload = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) return;

      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast.error('Please select an image file');
        return;
      }

      // Validate file size (10MB limit)
      if (file.size > 10 * 1024 * 1024) {
        toast.error('File size must be less than 10MB');
        return;
      }

      setIsUploading(true);

      try {
        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Upload failed');
        }

        onChange(data.url);
        toast.success('Image uploaded successfully');
      } catch (error) {
        toast.error(
          error instanceof Error ? error.message : 'Failed to upload image'
        );
      } finally {
        setIsUploading(false);
      }
    },
    [onChange]
  );

  const handleDrop = useCallback(
    async (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      const file = event.dataTransfer.files?.[0];

      if (file && file.type.startsWith('image/')) {
        // Validate file type
        if (!file.type.startsWith('image/')) {
          toast.error('Please select an image file');
          return;
        }

        // Validate file size (10MB limit)
        if (file.size > 10 * 1024 * 1024) {
          toast.error('File size must be less than 10MB');
          return;
        }

        setIsUploading(true);

        try {
          const formData = new FormData();
          formData.append('file', file);

          const response = await fetch('/api/upload', {
            method: 'POST',
            body: formData,
          });

          const data = await response.json();

          if (!response.ok) {
            throw new Error(data.error || 'Upload failed');
          }

          onChange(data.url);
          toast.success('Image uploaded successfully');
        } catch (error) {
          toast.error(
            error instanceof Error ? error.message : 'Failed to upload image'
          );
        } finally {
          setIsUploading(false);
        }
      }
    },
    [onChange]
  );

  const handleDragOver = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
    },
    []
  );

  if (value) {
    return (
      <div className='relative'>
        <div className='relative aspect-video w-full max-w-md mx-auto overflow-hidden rounded-lg border'>
          <Image
            src={value}
            alt='Uploaded image'
            fill
            className='object-cover'
          />
        </div>
        <Button
          type='button'
          onClick={onRemove}
          size='sm'
          variant='destructive'
          className='absolute top-2 right-2'
          disabled={disabled}
        >
          <X size={16} />
        </Button>
      </div>
    );
  }

  return (
    <div
      className='border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors'
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <input
        type='file'
        accept='image/*'
        onChange={handleFileUpload}
        disabled={disabled || isUploading}
        className='hidden'
        id='image-upload'
      />
      <label
        htmlFor='image-upload'
        className='cursor-pointer flex flex-col items-center gap-4'
      >
        <div className='w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center'>
          <Upload className='w-6 h-6 text-primary' />
        </div>
        <div>
          <p className='text-sm font-medium text-foreground mb-1'>
            {isUploading ? 'Uploading...' : 'Click to upload or drag and drop'}
          </p>
          <p className='text-xs text-muted-foreground'>
            PNG, JPG, WEBP up to 10MB
          </p>
        </div>
      </label>
    </div>
  );
};

export default ImageUpload;
