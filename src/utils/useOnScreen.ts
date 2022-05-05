import {useEffect, useState, useRef, MutableRefObject} from 'react';

export function useOnScreen(ref: MutableRefObject<HTMLInputElement>) {
    const [isOnScreen, setIsOnScreen] = useState(false);
    const observerRef = useRef<null | IntersectionObserver>(null);

    useEffect(() => {

        observerRef.current = new IntersectionObserver(([entry]) =>
            setIsOnScreen(entry.isIntersecting)
        );
    }, []);

    useEffect(() => {

        observerRef.current?.observe(ref.current);

        return () => {

            observerRef.current?.disconnect();
        };
    }, [ref]);

    return isOnScreen;
}