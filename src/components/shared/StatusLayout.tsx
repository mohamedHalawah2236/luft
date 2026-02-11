'use client';
import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useParams } from 'next/navigation';

type StatusLayoutProps = {
    title: string;
    paragraph: string;
    mainImageSrc?: string;
    className?: string;
};

const StatusLayout = ({ title, paragraph, mainImageSrc, className }: StatusLayoutProps) => {
    const params = useParams();
    const isEnglish = params.locale === 'en';
    return (
        <div className={`container mx-auto py-20 ${className || ''}`}>
            <div className='flex flex-col items-center justify-center'>
                <img
                    src={mainImageSrc}
                    alt={title}
                    className='w-auto h-auto'
                />

                <div className='flex items-center justify-between mt-[48px]' dir='ltr'
                >
                    <img
                        src='/svg/leftArrow.svg'
                        alt='left arrow'
                        className='w-auto h-auto'
                    />

                    <div className='flex flex-col gap-2 items-center text-neutral-50 w-[902px]'>
                        <p className='text-5xl text-grayish-900 tracking-[-0.025em]'>{title}</p>
                        <span className='text-lg text-grayish-400'>{paragraph}</span>
                    </div>

                    <img
                        src='/svg/rightArrow.svg'
                        alt='right arrow'
                        className='w-auto h-auto'
                    />
                </div>

                <Button className='bg-grayish-900 text-grayish-50 hover:text-grayish-50 hover:bg-grayish-800 cursor-pointer h-[54px] mt-[48px] py-2 px-4 min-w-[200px]'>
                    <Link href={`/`} className='w-full '>
                        {isEnglish ? 'Back To Home' : 'الرجوع للرئيسية'}
                    </Link>
                </Button>
            </div>
        </div>
    );
};

export default StatusLayout;
