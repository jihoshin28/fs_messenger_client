import React from 'react';
import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <div>
            <nav>
                <ul>
                    <li>
                        <Link to = "/">
                            Homepage
                        </Link>
                    </li>
                    <li>
                        <Link to = "/chat">
                            Create a chat
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Navbar