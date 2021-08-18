import React, {useEffect} from 'react'

const SidebarChat = ({chat_id, users, messages, focus, onFocus}) => {
    let ref = React.useRef()

    useEffect(() => {
        if(focus === true){
            ref.current.classList.add("sidebar-section-focus")
        } else {
            ref.current.classList.remove("sidebar-section-focus")
        }
    }, [focus])

    let focusChat = () => {
        onFocus(chat_id)
    }

    let renderUsers = (users) => {
        
        let user = users[0]
        if(users.length > 1){
            return (
                <h5>{user.first_name}, ...</h5>
            )
        } else {
            return (
                <h5>{user.first_name}</h5>
            )
        }
    }

    let renderMessages = () => {

    }

    return(
        <div ref = {ref} onClick = {focusChat}class = 'sidebar-section'>
            <div class = "sidebar-img-div">
                <img class = "sidebar-img" src = "https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg"/>
            </div>
            <div class = "col-8">
                <div class = "sidebar-content">
                    {renderUsers(users)}
                    <h6>Previous Message</h6>
                </div>
            </div>
            <div class = "read-receipt-div">
                <div class = "read-receipt">
                </div>
            </div>

        </div>
    )
}

export default SidebarChat