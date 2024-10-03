import React from 'react';
import {createBrowserRouter} from 'react-router-dom';
import {QuestionList} from '../pages/Questions';
import CustomErrorComponent from '../components/customError.js';



const router = createBrowserRouter([
    {
        path: '/api/question',
        element: <QuestionList />,
        errorElement: <CustomErrorComponent />
    },
    {
        path: '*',
        element: <div>404 Not Found</div>,
        errorElement: <CustomErrorComponent />
    }
]);

export default router;