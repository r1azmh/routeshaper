import React, {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {createBrowserRouter, RouterProvider,} from "react-router-dom";
import Dashboard from './components/Dashboard';
import Statistics from './components/Statistics';
import About from './pages/about/About.jsx';
import Category from './pages/category/Category';
import Contact from './pages/contact/Contact';
import Fleet from './pages/fleet/Fleet';
import Job from './pages/job/Job';
import Error from './pages/not-found/Error';
import VehicleProfile from './pages/vehicleProfile/VehicleProfile';
import Work from './pages/work/Work';
import Login from "./pages/login";
import Signup from "./pages/signup";
import NavbarComponent from "./components/NavbarComponent.jsx";
import Tos from "@/pages/tos/index.jsx";
import { toast, Toaster } from 'react-hot-toast';

const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
    },
    {
        path: "/login/",
        element: <Login/>,
    },
    {
        path: "/signup/",
        element: <Signup/>,
    },
    {
        path: "/privacy-policy/",
        element: <Tos/>,
    },
    {
        path: "/Dashboard/",
        Component: Dashboard,
        children: [
            {
                path: "",
                Component: Statistics,
            },
            {
                path: "work/",
                Component: Work,
            },
            {
                path: "job/",
                Component: Job,
            },
            {
                path: "job-category/",
                Component: Category,
            },
            {
                path: "fleet/",
                Component: Fleet,
            },
            {
                path: "vehicle-profile/",
                Component: VehicleProfile,
            },
        ],
    },
    {
        path: "*",
        Component: Error,
    },

]);


createRoot(document.getElementById('root')).render(
    <StrictMode>
        <Toaster position="top-center" />
        <div className="min-h-screen font-poppins">
            <NavbarComponent/>
            <div className="bg-white">
                <RouterProvider router={router}/>
            </div>
        </div>
    </StrictMode>,
)

if (window.djangoMessages) {
    window.djangoMessages.forEach(msg => {
        switch (msg.level) {
            case "success":
                toast.success(msg.text);
                break;
            case "error":
                toast.error(msg.text);
                break;
            case "warning":
                toast(msg.text, { icon: "⚠️" });
                break;
            default:
                toast(msg.text);
        }
    });
}