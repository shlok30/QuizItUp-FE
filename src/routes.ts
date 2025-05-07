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
    }
];

export default routes;