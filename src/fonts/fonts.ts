// app/fonts.ts
import localFont from 'next/font/local';

export const switzer = localFont({
  src: [
    {
      path: './Switzer/Switzer-Variable.woff2',
      weight: '100 900',
      style: 'normal',
    },
    {
      path: './Switzer/Switzer-VariableItalic.woff2',
      weight: '100 900',
      style: 'italic',
    },
  ],
  variable: '--font-switzer',
  display: 'swap',
});
