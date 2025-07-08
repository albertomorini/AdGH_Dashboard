
import { useContext } from "react";
import { mycontext } from "../index";
const Dashboard = () => {
    const ctx = useContext(mycontext)
    return (
        <>
            Heey {ctx?.Username?.Username}
        </>
    )
}

export default Dashboard