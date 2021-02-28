import React from 'react';
import { Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import CaseHistoryLayout from './layouts/CaseHistoryLayout';
import CaseHistoryView from './views/CaseHistoryView';
import NotFoundView from './views/errors/NotFoundView';

const routes = [
    {
        path: '/',
        element: <MainLayout />,
        children: [
            { path: '/', element: <Navigate to="/CaseHistory" /> },
            { path: '*', element: <Navigate to="/404" /> }
        ]
    },
    {
        path: 'case-history',
        element: <CaseHistoryLayout />,
        children: [
            { path: '/', element: <CaseHistoryView /> },
            { path: '*', element: <NotFoundView /> }
        ]
    },
];

export default routes;
