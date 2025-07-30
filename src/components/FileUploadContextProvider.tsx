import { ReactNode, useState } from 'react';
import { FileUploadContext } from '../context/FileUploadContext';

type Props = {
  children: ReactNode;
};

function FileUploadContextProvider({ children }: Props) {
  const [file, setFile] = useState();

  return (
    <FileUploadContext.Provider value={{ file, setFile }}>
      {children}
    </FileUploadContext.Provider>
  );
}

export default FileUploadContextProvider;
