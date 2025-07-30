import { createContext } from 'react';

export const FileUploadContext = createContext<{
  file: File | null;
  setFile: (file: File | null) => void;
} | null>(null);
