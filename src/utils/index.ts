import { getServerSession } from 'next-auth';

import { Direction } from '@/types';

import { authOptions } from '@/lib/auth';

export const handleDownloadDocument = async (
  filePath: string,
  fileName: string,
) => {
  try {
    // Get the file from the server by making a fetch request to the provided filePath
    const response = await fetch(filePath);

    // Convert the response into a Blob object that contains the file data
    const blob = await response.blob();

    // Create a temporary URL that points to the blob data in memory
    const url = window.URL.createObjectURL(blob);

    // Create an invisible anchor element that we'll use to trigger the download
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(link);
  } catch (error) {
    console.error('Error downloading file:', error);
  }
};

export const isLoggedIn = async () => {
  const session = await getServerSession(authOptions);
  return !!session;
};

export const getDirection = (): Direction => {
  return document.documentElement.dir === 'rtl' ? 'rtl' : 'ltr';
};
