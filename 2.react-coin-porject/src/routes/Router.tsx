import { createBrowserRouter } from "react-router-dom"
import App from "../App"
import Coins from "./Coins";
import Coin from "./Coin";


const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children: [
            {
                path: "",
                element: <Coins/>,
            },
            {
                path: "/:coinId",
                element: <Coin/>,
            }
        ],
    }
])

export default router;