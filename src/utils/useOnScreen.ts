import { useEffect, useState, useRef } from 'react';

export function useOnScreen(ref: any) {
    const [isOnScreen, setIsOnScreen] = useState(false);
    const observerRef = useRef(null);

    useEffect(() => {

        // @ts-ignore
        observerRef.current = new IntersectionObserver(([entry]) =>
            setIsOnScreen(entry.isIntersecting)
        );
    }, []);

    useEffect(() => {
        // @ts-ignore

        observerRef.current.observe(ref.current);

        return () => {
            // @ts-ignore

            observerRef.current.disconnect();
        };
    }, [ref]);

    return isOnScreen;
}