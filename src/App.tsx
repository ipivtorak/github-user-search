import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Root } from "./pages/root";
import { User } from "./pages/user";
import './App.css'


const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
    },
    {
        path: "users/:username",
        element: <User />,
    },
]);

function App() {
    return (
        <RouterProvider router={router} />
    );
}

export default App;
