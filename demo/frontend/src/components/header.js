import React from 'react';
import {Link, useNavigate} from "react-router-dom";

function Header() {
    const navigate = useNavigate()
    return (
        <header className="flex bg-gray-500 h-16 p-5 xl:p-0 w-full">
            <div className="flex mx-auto w-full justify-between items-center container text-white">
                <div className="cursor-pointer" onClick={() => navigate("/")}>LOGO</div>
                <ul style={{gap: 20}} className="flex items-center ">
                    <li>
                        <Link to={'/product'}>
                            Add Product
                        </Link>
                    </li>
                </ul>
            </div>
        </header>
    );
}

export default Header;
