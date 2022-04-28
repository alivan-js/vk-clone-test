import React from 'react';

export function WithSuspense <T>(WrappedComponent: React.ComponentType<T>) {
    return (props: T) => {
        return <React.Suspense fallback={<div></div>}>
            <WrappedComponent {...props}/>
        </React.Suspense>
    }
}