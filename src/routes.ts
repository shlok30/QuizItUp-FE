import History from "./pages/History";
import Home from "./pages/Home";
import Quiz from "./pages/Quiz";
import Summary from "./pages/Summary";

const routes = [
    {
        path : "/",
        component: Home
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