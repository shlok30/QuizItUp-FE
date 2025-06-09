import History from "./pages/History";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Quiz from "./pages/Quiz";
import Summary from "./pages/Summary";

const routes = [
    {
        path : "/",
        component: Home
    },
    {
        path: "/login",
        component: Login
    },
    {
        path : "/quiz",
        component: Quiz
    },
    {
        path : "/summary",
        component: Summary
    },
    {
        path: "/history",
        component: History
    }
];

export default routes;