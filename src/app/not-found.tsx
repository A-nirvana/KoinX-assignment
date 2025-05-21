import React from 'react';


const NotFound: React.FC = () => (
        <div className="flex-1 flex flex-col items-center justify-center px-4">
            <h1 className="text-6xl sm:text-8xl font-bold text-red-700 m-0">404</h1>
            <p className="text-lg sm:text-2xl text-gray-600 mt-4 text-center">
                Page Not Found
            </p>
        </div>
);

export default NotFound;
