import React from 'react';
import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <div>
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <div class="container-fluid">
                    <a class="navbar-brand" href="#">Navbar</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Dropdown
                            </a>
                            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                                <li><a class="dropdown-item" href="#">Action</a></li>
                                <li><a class="dropdown-item" href="#">Another action</a></li>
                                <li><hr class="dropdown-divider"/></li>
                                <li><a class="dropdown-item" href="#">Something else here</a></li>
                            </ul>
                        </li>
                        <li class="nav-item">
                            <Link class = "nav-link active"to = "/">
                                Homepage
                            </Link>
                        </li>
                        <li class="nav-item">
                            <Link class = "nav-link active"to = "/create_chat">
                                Create Chat
                            </Link>
                        </li>
                        <li class="nav-item">
                            <Link class = "nav-link active"to = "/chat_rooms">
                                Chat Rooms
                            </Link>
                        </li>
                        <li class="nav-item">
                            <Link class = "nav-link active"to = "/chat">
                                Current Chat
                            </Link>
                        </li>
                    </ul>
                    <form class="d-flex">
                        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                        <button class="btn btn-outline-success" type="submit">Search</button>
                    </form>
                    </div>
                </div>
            </nav>
            {/* <nav>
                <ul>
                    <li>
                        <Link to = "/">
                            Homepage
                        </Link>
                    </li>
                    <li>
                        <Link to = "/chat">
                            Current Chat Room
                        </Link>
                    </li>
                    <li>
                        <Link to = "/chat_rooms">
                            Chat Rooms
                        </Link>
                    </li>
                    <li>
                        <Link to = "/create_chat">
                            Create a Chat Room
                        </Link>
                    </li>
                </ul>
            </nav> */}
        </div>
    );
};

export default Navbar