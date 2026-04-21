'use client';
import { useState } from 'react';
import SectionTitle from './SectionTitle';

type AboutPropertyProps = {
  description: string;
};
function AboutProperty({ description }: AboutPropertyProps) {
  const maxChars = 350;
  const [isExpanded, setIsExpanded] = useState(false);
  const hasSeeMore = description.length > maxChars;

  return (
    <div className='flex flex-col gap-4'>
      <SectionTitle>About this Place</SectionTitle>
      <p className='text-grayish-400 transition-all duration-300 ease-in-out'>
        {isExpanded ? description : description.slice(0, maxChars)}
      </p>
      {hasSeeMore && (
        <button
          type='button'
          className='w-fit px-4 py-2.5 text-grayish-900 underline'
          onClick={() => setIsExpanded((prev) => !prev)}
        >
          {isExpanded ? 'show less' : 'show more'}
        </button>
      )}
    </div>
  );
}

export default AboutProperty;
