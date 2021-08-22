import React from 'react'
import { Sidebar } from './Sidebar'
import { Tasks } from './Tasks'
import { useState } from 'react'

export const Content = () => {
    const [selectedtab, setSelectedtab] = useState("INBOX")
    return (
        <section className="content">
            <Sidebar selectedtab={selectedtab} setSelectedtab={setSelectedtab}/>
            <Tasks selectedtab={selectedtab}  />
        </section>
    )
}
