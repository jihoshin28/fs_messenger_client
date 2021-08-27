import React from 'react';
import { Link } from 'react-router-dom'

const Navbar = ({logOut, current_user}) => {

    let renderLogButton = () => {
        if(!current_user){
            return
        } else {
            return <button onClick = {() => logOut()}className = 'btn btn-primary'>Logout</button>
        }
    }

    return (
        <div>
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <div class="container-fluid">
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <div class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                ...
                            </a>
                            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                                <li><a class="dropdown-item" href="#">Action</a></li>
                                <li><a class="dropdown-item" href="#">Another action</a></li>
                                <li><hr class="dropdown-divider"/></li>
                                <li><a class="dropdown-item" href="#">Something else here</a></li>
                            </ul>
                        </li>
                    </div>
                    <form class="d-flex">
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                            <li>
                                {renderLogButton()}
                            </li>
                        </ul>
                    </form>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Navbar