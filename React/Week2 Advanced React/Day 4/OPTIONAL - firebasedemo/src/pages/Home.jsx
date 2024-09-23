import { json, useNavigate } from "react-router-dom"
import "../style.css"

const Home = () => {

    const navigate = useNavigate()

    const gotoLogin = () => {
        navigate('/login')
    }   

    return (
        <>
            <h1 className="header">Welcome Home</h1>
            <button onClick={gotoLogin}>Sign Up</button>
        </>
    )
}

export default Home


