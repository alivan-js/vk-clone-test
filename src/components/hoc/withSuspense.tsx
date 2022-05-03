import React from 'react';

export function WithSuspense<T>(WrappedComponent: React.ComponentType<T>) {
    function ComponentWithRedirect(props: T) {
        return (
            <React.Suspense fallback={<div/>}>
                <WrappedComponent {...props}/>
            </React.Suspense>
        )
    }

    return ComponentWithRedirect
}