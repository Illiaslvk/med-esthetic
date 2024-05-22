import React from "react";
import {Link} from "react-router-dom"

const AdminSidebar = ({activepage}) => {
    return (
        <div className="admin-sidebar">
            {/* Admin Tab */}
            {activepage === 'admintab' ?
                <div className='s2'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0zM20 8v.01M20 12v.01M20 16v.01M4 8v.01M4 12v.01M4 16v.01M8 4h8a2 2 0 012 2v12a2 2 0 01-2 2H8a2 2 0 01-2-2V6a2 2 0 012-2z" />
                    </svg>
                    <span>Admin</span>
                </div>
             :
                <Link to='/admin/admintab' className='stylenone'>
                    <div className='s1'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0zM20 8v.01M20 12v.01M20 16v.01M4 8v.01M4 12v.01M4 16v.01M8 4h8a2 2 0 012 2v12a2 2 0 01-2 2H8a2 2 0 01-2-2V6a2 2 0 012-2z" />
                        </svg>
                        <span>Admin</span>
                    </div>
                </Link>
            }

            {/* Users List */}
            {activepage === 'userslist' ?
                <div className='s2'>
                    <svg fill="currentColor" viewBox="0 0 16 16"  height="1em" width="1em">
                        <path fillRule="evenodd" d="M0 .5A.5.5 0 01.5 0h2a.5.5 0 010 1h-2A.5.5 0 010 .5zm4 0a.5.5 0 01.5-.5h10a.5.5 0 010 1h-10A.5.5 0 014 .5zm-4 2A.5.5 0 01.5 2h2a.5.5 0 010 1h-2a.5.5 0 01-.5-.5zm4 0a.5.5 0 01.5-.5h9a.5.5 0 010 1h-9a.5.5 0 01-.5-.5zm-4 2A.5.5 0 01.5 4h2a.5.5 0 010 1h-2a.5.5 0 01-.5-.5zm4 0a.5.5 0 01.5-.5h11a.5.5 0 010 1h-11a.5.5 0 01-.5-.5zm-4 2A.5.5 0 01.5 6h2a.5.5 0 010 1h-2a.5.5 0 01-.5-.5zm4 0a.5.5 0 01.5-.5h8a.5.5 0 010 1h-8a.5.5 0 01-.5-.5zm-4 2A.5.5 0 01.5 8h2a.5.5 0 010 1h-2a.5.5 0 01-.5-.5zm4 0a.5.5 0 01.5-.5h8a.5.5 0 010 1h-8a.5.5 0 01-.5-.5zm-4 2a.5.5 0 01.5-.5h2a.5.5 0 010 1h-2a.5.5 0 01-.5-.5zm4 0a.5.5 0 01.5-.5h10a.5.5 0 010 1h-10a.5.5 0 01-.5-.5zm-4 2a.5.5 0 01.5-.5h2a.5.5 0 010 1h-2a.5.5 0 01-.5-.5zm4 0a.5.5 0 01.5-.5h6a.5.5 0 010 1h-6a.5.5 0 01-.5-.5zm-4 2a.5.5 0 01.5-.5h2a.5.5 0 010 1h-2a.5.5 0 01-.5-.5zm4 0a.5.5 0 01.5-.5h11a.5.5 0 010 1h-11a.5.5 0 01-.5-.5z"/>
                    </svg>
                    <span>Users List</span>
                </div>
                :
                <Link to='/admin/userslist' className='stylenone'>
                    <div className='s1'>
                        <svg fill="currentColor" viewBox="0 0 16 16"  height="1em" width="1em">
                            <path fillRule="evenodd" d="M0 .5A.5.5 0 01.5 0h2a.5.5 0 010 1h-2A.5.5 0 010 .5zm4 0a.5.5 0 01.5-.5h10a.5.5 0 010 1h-10A.5.5 0 014 .5zm-4 2A.5.5 0 01.5 2h2a.5.5 0 010 1h-2a.5.5 0 01-.5-.5zm4 0a.5.5 0 01.5-.5h9a.5.5 0 010 1h-9a.5.5 0 01-.5-.5zm-4 2A.5.5 0 01.5 4h2a.5.5 0 010 1h-2a.5.5 0 01-.5-.5zm4 0a.5.5 0 01.5-.5h11a.5.5 0 010 1h-11a.5.5 0 01-.5-.5zm-4 2A.5.5 0 01.5 6h2a.5.5 0 010 1h-2a.5.5 0 01-.5-.5zm4 0a.5.5 0 01.5-.5h8a.5.5 0 010 1h-8a.5.5 0 01-.5-.5zm-4 2A.5.5 0 01.5 8h2a.5.5 0 010 1h-2a.5.5 0 01-.5-.5zm4 0a.5.5 0 01.5-.5h8a.5.5 0 010 1h-8a.5.5 0 01-.5-.5zm-4 2a.5.5 0 01.5-.5h2a.5.5 0 010 1h-2a.5.5 0 01-.5-.5zm4 0a.5.5 0 01.5-.5h10a.5.5 0 010 1h-10a.5.5 0 01-.5-.5zm-4 2a.5.5 0 01.5-.5h2a.5.5 0 010 1h-2a.5.5 0 01-.5-.5zm4 0a.5.5 0 01.5-.5h6a.5.5 0 010 1h-6a.5.5 0 01-.5-.5zm-4 2a.5.5 0 01.5-.5h2a.5.5 0 010 1h-2a.5.5 0 01-.5-.5zm4 0a.5.5 0 01.5-.5h11a.5.5 0 010 1h-11a.5.5 0 01-.5-.5z"/>
                        </svg>
                        <span>Users List</span>
                    </div>
                </Link>
            }
            {/* Service List */}
            {activepage === 'servicelist' ?
                <div className='s2'>
                    <svg fill="currentColor" viewBox="0 0 16 16" height="1em" width="1em">
                        <path d="M8 2.5a.5.5 0 00-1 0v11a.5.5 0 001 0v-11zM4 6.5a.5.5 0 00-1 0v5a.5.5 0 001 0v-5zm4 0a.5.5 0 00-1 0v5a.5.5 0 001 0v-5zm4-3a.5.5 0 00-1 0v8a.5.5 0 001 0v-8z"/>
                    </svg>
                    <span>Service List</span>
                </div>
                :
                <Link to='/admin/servicelist' className='stylenone'>
                    <div className='s1'>
                        <svg fill="currentColor" viewBox="0 0 16 16" height="1em" width="1em">
                            <path d="M8 2.5a.5.5 0 00-1 0v11a.5.5 0 001 0v-11zM4 6.5a.5.5 0 00-1 0v5a.5.5 0 001 0v-5zm4 0a.5.5 0 00-1 0v5a.5.5 0 001 0v-5zm4-3a.5.5 0 00-1 0v8a.5.5 0 001 0v-8z"/>
                        </svg>
                        <span>Service List</span>
                    </div>
                </Link>
            }
            {/* Appointment List */}
            {activepage === 'appolist' ?
                <div className='s2'>
                    <svg fill="none" viewBox="0 0 15 15" height="1em" width="1em">
                        <path stroke="currentColor" d="M3.5 0v5m8-5v5M3 7.5h3m6 0H9m-6 3h3m3 0h3m-10.5-8h12a1 1 0 011 1v10a1 1 0 01-1 1h-12a1 1 0 01-1-1v-10a1 1 0 011-1z"/>
                    </svg>
                    <span>Appointment List</span>
                </div>
                :
                <Link to='/admin/appolist' className='stylenone'>
                    <div className='s1'>
                        <svg fill="none" viewBox="0 0 15 15" height="1em" width="1em">
                            <path stroke="currentColor" d="M3.5 0v5m8-5v5M3 7.5h3m6 0H9m-6 3h3m3 0h3m-10.5-8h12a1 1 0 011 1v10a1 1 0 01-1 1h-12a1 1 0 01-1-1v-10a1 1 0 011-1z"/>
                        </svg>
                        <span>Appointment List</span>
                    </div>
                </Link>
            }
            {/* Banned List */}
            {activepage === 'bannedlist' ?
                <div className='s2'>
                    <svg viewBox="0 0 512 512" fill="currentColor" height="1em" width="1em">
                        <path fill="none" stroke="currentColor" strokeMiterlimit={10} strokeWidth={32} d="M464 256 A208 208 0 0 1 256 464 A208 208 0 0 1 48 256 A208 208 0 0 1 464 256 z"/>
                        <path fill="none" stroke="currentColor" strokeMiterlimit={10} strokeWidth={32} d="M108.92 108.92l294.16 294.16"/>
                    </svg>
                    <span>Banned Users</span>
                </div>
                :
                <Link to='/admin/bannedlist' className='stylenone'>
                    <div className='s1'>
                        <svg viewBox="0 0 512 512" fill="currentColor" height="1em" width="1em">
                            <path fill="none" stroke="currentColor" strokeMiterlimit={10} strokeWidth={32} d="M464 256 A208 208 0 0 1 256 464 A208 208 0 0 1 48 256 A208 208 0 0 1 464 256 z"/>
                            <path fill="none" stroke="currentColor" strokeMiterlimit={10} strokeWidth={32} d="M108.92 108.92l294.16 294.16"/>
                        </svg>
                        <span>Banned Users</span>
                    </div>
                </Link>
            }
            {/* Canceled Appos */}
            {activepage === 'cancelledappos' ?
                <div className='s2'>
                    <svg viewBox="0 0 24 24" fill="currentColor" height="1em" width="1em">
                        <path d="M14.5 11c.28 0 .5.22.5.5V13H9v-1.5c0-.28.22-.5.5-.5h5m4 1c.5 0 1 .07 1.5.18V10h-2v2.03c.17-.03.33-.03.5-.03M6 19v-9H4v11h8.5c-.26-.62-.41-1.3-.47-2H6M21 9H3V3h18v6m-2-4H5v2h14V5m4 13.5c0 2.5-2 4.5-4.5 4.5S14 21 14 18.5s2-4.5 4.5-4.5 4.5 2 4.5 4.5m-3 2.58L15.92 17c-.27.42-.42.94-.42 1.5 0 1.66 1.34 3 3 3 .56 0 1.08-.15 1.5-.42m1.5-2.58c0-1.66-1.34-3-3-3-.56 0-1.08.15-1.5.42L21.08 20c.27-.42.42-.94.42-1.5z" />
                    </svg>
                    <span>Cancelled Appointments</span>
                </div>
                :
                <Link to='/admin/cancelledappos' className='stylenone'>
                    <div className='s1'>
                        <svg viewBox="0 0 24 24" fill="currentColor" height="1em" width="1em">
                            <path d="M14.5 11c.28 0 .5.22.5.5V13H9v-1.5c0-.28.22-.5.5-.5h5m4 1c.5 0 1 .07 1.5.18V10h-2v2.03c.17-.03.33-.03.5-.03M6 19v-9H4v11h8.5c-.26-.62-.41-1.3-.47-2H6M21 9H3V3h18v6m-2-4H5v2h14V5m4 13.5c0 2.5-2 4.5-4.5 4.5S14 21 14 18.5s2-4.5 4.5-4.5 4.5 2 4.5 4.5m-3 2.58L15.92 17c-.27.42-.42.94-.42 1.5 0 1.66 1.34 3 3 3 .56 0 1.08-.15 1.5-.42m1.5-2.58c0-1.66-1.34-3-3-3-.56 0-1.08.15-1.5.42L21.08 20c.27-.42.42-.94.42-1.5z" />
                        </svg>
                        <span>Cancelled Appointments</span>
                    </div>
                </Link>
            }
        </div>
    )
}

export  default AdminSidebar;