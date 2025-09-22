'use client';

import { forwardRef, useState } from 'react';
import {
  UseFormRegisterReturn,
  FieldValues,
  FieldErrors,
} from 'react-hook-form';
import InputFile from '@/ui/InputFile';
import ImageBox from '@/ui/ImageBox';
import { Variant } from '@/ui/types';

interface FileInputProps<T extends FieldValues> {
  label: string;
  variant: Variant;
  id: string;
  name: string;
  required?: boolean;
  register: UseFormRegisterReturn;
  errors?: FieldErrors<T>;
}

const FileInput = <T extends FieldValues>(
  { label, variant, id, name, register, errors }: FileInputProps<T>,
  ref: React.Ref<HTMLInputElement>,
) => {
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }

    register.onChange({
      target: {
        name: register.name,
        value: file || null,
      },
    });
  };

  return (
    <div className='flex flex-col items-center space-y-3'>
      <label htmlFor={id} className='block text-base font-medium text-gray-700'>
        {label}
      </label>

      <InputFile
        {...register}
        ref={ref as React.RefObject<HTMLInputElement>}
        id={id}
        name={name}
        accept='image/png, image/jpeg, image/webp'
        onChange={handleFileChange}
        variant={variant}
        required={true}
      />

      {errors && (
        <p className='text-red-600 text-xs'>
          {errors[name]?.message as string}
        </p>
      )}

      {preview && <ImageBox imageUrl={preview} />}
    </div>
  );
};

FileInput.displayName = 'FileInput';

export default forwardRef(FileInput);
