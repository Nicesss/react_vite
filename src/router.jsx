
import { createBrowserRouter, Navigate } from 'react-router-dom'
import Main from './pages'
import ErrorPage from './pages/Error'
import Module1 from './pages/Module1'
import Module2 from './pages/Module2'
import Module3 from './pages/Module3'

const router = createBrowserRouter([
    {
        path: '/',
        element: <Main />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <Navigate to="/module-1" replace />,
            },
            {
                path: 'module-1',
                element: <Module1 />
            }, {
                path: 'module-2',
                element: <Module2 />
            },
            {
                path: 'module-3',
                element: <Module3 />
            }
        ]

    }
], {
    basename: "/reactApp",
})


export default router