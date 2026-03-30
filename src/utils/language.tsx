export const getLanguage = async () => {
  if (typeof window === 'undefined') {
    try {
      const { cookies } = await import('next/headers');
      const cookieStore = await cookies();
      return cookieStore.get('NEXT_LOCALE')?.value || 'en';
    } catch {
      return 'en';
    }
  } else {
    const match = document.cookie.match(/(?:^|; )NEXT_LOCALE=([^;]*)/);
    return match ? decodeURIComponent(match[1]) : 'en';
  }
};
