import React from 'react'
import { FaInbox, FaRegCalendarAlt, FaRegCalendar  } from "react-icons/fa";

export const Sidebar = ({selectedtab, setSelectedtab}) => {
    // console.log(selectedtab);
    return (
        <div className="sidebar">
            <div className={selectedtab==="INBOX" ? "active" : ""} onClick={() => setSelectedtab("INBOX")}>
            <FaInbox className="icon"/>
            Inbox</div>
            <div className={selectedtab==="TODAY" ? "active" : ""} onClick={() => setSelectedtab("TODAY")}>
            <FaRegCalendarAlt className="icon"/>
            Today</div>
            <div className={selectedtab==="NEXT_7" ? "active" : ""} onClick={() => setSelectedtab("NEXT_7")}>
            <FaRegCalendar className="icon"/>
            Next 7 days</div>
        </div>
    )
}
