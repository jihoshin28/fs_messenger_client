import React from 'react'
import SidebarChat from '../components/SidebarChat'


const Sidebar = () => {
    return(
        <div class = "sidebar">
            <nav class="sticky-nav navbar navbar-expand-lg navbar-light bg-light">
                <div class="container-fluid">
                    <div class="sidebar-nav">
                        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                        <button class="btn btn-primary" type="submit">
                            +
                        </button>
                    </div>
                </div>
            </nav>
            <div class = "sidebar-chat">
                <SidebarChat/>
                <SidebarChat/>
                <SidebarChat/>

                <SidebarChat/>

                <SidebarChat/>
                <SidebarChat/>
                <SidebarChat/>
                <SidebarChat/>
                <SidebarChat/>
                <SidebarChat/>
                <SidebarChat/>
                <SidebarChat/>
                <SidebarChat/>
                <SidebarChat/>
                <SidebarChat/>
                <SidebarChat/>

            </div>
        </div>
    )
}

export default Sidebar