import { Link } from "react-router-dom"

function Header(){
    return (
        <header>
            <ul>
                <li><Link to={"/"}>HOME</Link></li>
                <li><Link to={"/about"}> About</Link></li>
            </ul>
        </header>
    )
}

export default Header;