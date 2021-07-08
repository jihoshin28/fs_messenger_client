import React from 'react'
import Navbar from '../containers/Navbar'

const Sidebar = () => {
    return(
        <div class = "sidebar">
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <div class="container-fluid">
                    <div class="sidebar-content">
                        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                        <button class="btn btn-primary" type="submit">
                            +
                        </button>
                    </div>
                </div>
                
            </nav>
        </div>
    )
}

export default Sidebar