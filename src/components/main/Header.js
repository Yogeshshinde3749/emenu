import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";

const Header = () => {
    const [data, setData] = useState([]);

    // Fetch cart data only once when the component mounts
    useEffect(() => {
        const localData = localStorage.getItem('cart');
        if (localData) {
            setData(JSON.parse(localData));
        } else {
            console.log("No product data found in localStorage.");
        }
    }, []);  // Empty array ensures useEffect runs only once on mount

    const handleActive = (e) => {
        const links = document.querySelectorAll("nav a");
        links.forEach(link => link.classList.remove("active"));

        e.target.classList.add("active");
    };
    
    return (
        <>
            <header>
                <h1>LOGO</h1>
                <nav>
                    <Link to="/" onClick={handleActive} className="active">Menu</Link>
                    <Link to="/cart" onClick={handleActive}>Cart <div>{data.length}</div></Link>
                    <Link to="/order" onClick={handleActive}>Order</Link>
                    <Link to="/login" onClick={handleActive}>Login</Link>
                    <Link to="/admin" onClick={handleActive}>Admin</Link>
                </nav>
            </header>
            <Outlet /> {/* Renders the matching child route */}
        </>
    );
};

export default Header;
