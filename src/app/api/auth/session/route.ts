import { NextResponse } from 'next/server';

import { getServerSession, refreshAccessToken } from '@/utils/session';

export async function GET() {
  let session = await getServerSession();
  
  if (!session) {
    return NextResponse.json(null);
  }

  // If the accessToken is missing (expired), attempt to refresh it
  if (!session.accessToken) {
    const newSession = await refreshAccessToken();
    if (newSession) {
      session = newSession;
    }
    // If it fails, newSession is null, and we just return the old session as requested
  }

  return NextResponse.json(session);
}
