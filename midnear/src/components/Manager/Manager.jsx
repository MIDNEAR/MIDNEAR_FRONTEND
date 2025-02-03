import React, { Suspense } from 'react';
import { useLocation } from 'react-router-dom';
import Nav from './Nav';

const Manager = () => {
    const location = useLocation();
    const path = location.pathname.split('/manager/')[1];

    const ManagerContent = React.lazy(async () => {
        try {
            return await import(`./${path}.jsx`);
        } catch (error) {
            return import('../Sections/None.jsx'); 
        }

    });

    return (
        <div className="manager">
            <Nav />
            <div className="contents">
                <Suspense fallback={<div>Loading...</div>} key={path}>
                    <ManagerContent />
                </Suspense>
            </div>
        </div>
    );
};

export default Manager;
