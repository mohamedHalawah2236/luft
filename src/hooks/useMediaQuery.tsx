'use client';

import * as React from 'react';

export function useMediaQuery(query: string) {
    const [matches, setMatches] = React.useState(false);

    React.useEffect(() => {
        const mq = window.matchMedia(query);
        const onChange = () => setMatches(mq.matches);

        onChange(); // initial
        mq.addEventListener?.('change', onChange);
        return () => mq.removeEventListener?.('change', onChange);
    }, [query]);

    return matches;
}
