'use client';


import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';

import LOGO from '../../../public/svgs/logo.svg';
import Icon from '../shared/Icon';

import { Link, usePathname } from '@/i18n/routing';
import { cn } from '@/lib/utils';

const Footer = () => {
  const locale = useLocale();
  const pathname = usePathname();
  const t = useTranslations();

  const isContactPage = pathname === '/contact';
  const isEnglish = locale === 'en';



  
  // Pages links
  const PAGES = [
    { labelEn: 'Home', labelAr: 'الرئيسية', href: '/' },
    { labelEn: 'For Owners', labelAr: 'للملاك', href: '/owners' },
    { labelEn: 'About Us', labelAr: 'معلومات عنا', href: '/about' },
    {
      labelEn: 'Contact Us', labelAr: 'تواصل معنا', href: '/contact' },
  ];

  // Static Address section (unchanged)
  const STATIC_ADDRESSES = [
    {
      text: '123 Main St, Anytown, USA',
      href: 'https://maps.app.goo.gl/H7oEi4TH8eSL6oYy8',
    },
  ];

  const SOCIAL_MEDIA = [
    {
      iconName: 'linkedIn',
      href: 'https://www.linkedin.com/company/luft-stay',
    },
    {
      iconName: 'facebook',
      href: 'https://www.facebook.com/luft-stay',
    },
    {
      iconName: 'instagram',
      href: 'https://www.instagram.com/luft-stay',
    },
    {
      iconName: 'whatsapp',
      href: 'https://wa.me/1234567890',
    },
  ];

  const CONTACTS = [
    {
      labelEn: 'Address',
      labelAr: 'العنوان',
      value: STATIC_ADDRESSES,
    },
    {
      labelEn: 'Phone',
      labelAr: 'الهاتف',
      value: [
        {
          text: '1234567890',
          href: `tel:1234567890`,
        },
      ],
    },
    {
      labelEn: 'Email',
      labelAr: 'البريد الإلكتروني',
      value: [
        {
          text: 'info@luft-stay.com',
          href: `mailto:info@luft-stay.com`,
        },
      ],
    },
  ];

  return (
    <section>
      <div className='container mx-auto space-y-6 bg-primary-700 py-4 text-grayish-50 xs:space-y-12 xs:py-6 md:py-20'>
        {!isContactPage && (
          <>
            <div className='flex justify-between max-sm:flex-col max-sm:gap-y-6'>
              <div>
                <h3 className='mb-4 text-[32px] text-grayish-50 md:text-5xl'>
                  {isEnglish ? (
                    <>
                      Do you have <br className='max-md:hidden' />
                      any questions?
                    </>
                  ) : (
                    <>هل لديك أي أسئلة؟</>
                  )}
                </h3>

                <p className='mb-8 text-grayish-200 md:mb-10'>
                  {isEnglish
                    ? "We're here to answer your questions and guide you every step of the way."
                    : 'نحن هنا لتقديم الإجابات على أسئلتك وتوجيهك في كل خطوة من الطريق.'}
                </p>

              
              </div>

              <div>
                <Link href='/'>
                  <Image
                    src={LOGO}
                    alt='logo'
                    width={236}
                    height={40}
                    className='max-xs:mx-auto'
                  />
                </Link>

                <ul className='mt-4 space-y-2'>
                  {PAGES.map(({ labelEn, labelAr, href }) => (
                    <Link
                      key={labelEn}
                      href={href}
                      className='block px-2 py-1.5 text-grayish-200 last:mb-0 max-md:text-sm'
                      prefetch={true}
                    >
                      <li
                        className={cn(
                          'relative w-fit transition-all duration-300 ease-in hover:text-white',
                          pathname === href
                            ? 'text-white underline underline-offset-8'
                            : '',
                        )}
                      >
                        {locale === 'en' ? labelEn : labelAr}
                      </li>
                    </Link>
                  ))}
                </ul>
              </div>
            </div>

            {/* Contact Info */}
            <div className='!mt-20 flex flex-col items-start justify-between gap-6 lg:flex-row'>
              {CONTACTS.map(({ labelEn, labelAr, value }) => (
                <div
                  key={labelEn}
                  className='max-w-[550px]'
                >
                  <h3 className='mb-3 text-sm text-grayish-200'>
                    {locale === 'en' ? labelEn : labelAr}
                  </h3>
                  <div className='flex flex-col gap-2'>
                    {value.map((item, i) => (
                      <Link
                        key={i}
                        href={item.href}
                        target='__blank'
                        className='text-grayish-50 hover:text-secondary-500 hover:underline'
                      >
                        {item.text}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Social Media */}
        <div className='grid items-center justify-between gap-y-4 xs:grid-cols-3'>
          <div className='flex gap-x-4 max-xs:justify-center'>
            {SOCIAL_MEDIA.map(({ iconName, href }) => (
              <Link
                key={iconName}
                href={href}
                target='__blank'
                className='text-grayish-50 hover:text-secondary-500'
              >
                <Icon
                  name={iconName}
                  fill='#A7A7A6'
                  className='size-6'
                />
              </Link>
            ))}
          </div>
          <div className='flex flex-col items-center gap-y-4 max-xs:order-first'>
            <p className='text-sm text-grayish-200'>{t('footer.powerBy')}</p>
            <Image
              src='/svgs/footer-logo.svg'
              alt='power by'
              width={58}
              height={80}
            />
          </div>
          <p className='text-xs text-grayish-200 max-xs:text-center md:text-sm'>
            {t('footer.copyright', { year: new Date().getFullYear() })}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Footer;
