import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import SidebarChat from '../components/SidebarChat'

let nameList = ['Allen Shin', 'Jane Shin', 'Anna Shin', 'Joon Shin', 'Uncle', 'Aunt', 'Michael Peralez', 'Josh Chang', 'Jisung Park', 'Zack Epp', 'David Lee', 'Mark Heyder']

const Sidebar = () => {

    let [name, setName] = useState('')

    let onFocus = (name) => {
        setName(name)
    }
    
    let renderSidebarChats = () => {
        return nameList.map((item, index) => {
            if(item === name){
                return <SidebarChat key = {index} name = {item} focus = {true} onFocus = {onFocus}/>
            } else {
                return <SidebarChat key = {index} name = {item} focus = {false} onFocus = {onFocus}/>
            }
        })
    }

    return(
        <div class = "sidebar">
            <nav class="sticky-nav navbar navbar-expand-lg navbar-light bg-light">
                <div class="container-fluid">
                    <div class="sidebar-nav">
                        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                        <Link class="btn btn-primary" to = "/create_chat">
                            +
                        </Link>
                      
                    </div>
                </div>
            </nav>
            <div class = "sidebar-chat">
                {renderSidebarChats()}

            </div>
        </div>
    )
}

export default Sidebar