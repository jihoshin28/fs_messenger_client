import React from 'react'

const SidebarChat = () => {
    return(
        <div class = 'sidebar-section'>
            <div class = "sidebar-img-div">
                <img class = "sidebar-img" src = "https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg"/>
            </div>
            <div class = "col-8">
                <div class = "sidebar-content">
                    <h5>Name</h5>
                    <h6>Previous Message</h6>
                </div>
            </div>
            <div class = "read-receipt-div">
                <img class = "read-receipt" src = "https://www.playworks.org/wp-content/uploads/2018/09/blue-dot.jpeg"/>
            </div>

        </div>
    )
}

export default SidebarChat