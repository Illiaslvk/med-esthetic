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
            {/* Holiday List */}
            {activepage === 'manageholidays' ?
                <div className='s2'>
                    <svg viewBox="0 0 1024 1024" fill="currentColor" height="1em" width="1em">
                        <path d="M923 283.6a260.04 260.04 0 00-56.9-82.8 264.4 264.4 0 00-84-55.5A265.34 265.34 0 00679.7 125c-49.3 0-97.4 13.5-139.2 39-10 6.1-19.5 12.8-28.5 20.1-9-7.3-18.5-14-28.5-20.1-41.8-25.5-89.9-39-139.2-39-35.5 0-69.9 6.8-102.4 20.3-31.4 13-59.7 31.7-84 55.5a258.44 258.44 0 00-56.9 82.8c-13.9 32.3-21 66.6-21 101.9 0 33.3 6.8 68 20.3 103.3 11.3 29.5 27.5 60.1 48.2 91 32.8 48.9 77.9 99.9 133.9 151.6 92.8 85.7 184.7 144.9 188.6 147.3l23.7 15.2c10.5 6.7 24 6.7 34.5 0l23.7-15.2c3.9-2.5 95.7-61.6 188.6-147.3 56-51.7 101.1-102.7 133.9-151.6 20.7-30.9 37-61.5 48.2-91 13.5-35.3 20.3-70 20.3-103.3.1-35.3-7-69.6-20.9-101.9zM512 814.8S156 586.7 156 385.5C156 283.6 240.3 201 344.3 201c73.1 0 136.5 40.8 167.7 100.4C543.2 241.8 606.6 201 679.7 201c104 0 188.3 82.6 188.3 184.5 0 201.2-356 429.3-356 429.3z" />
                    </svg>
                    <span>Holiday List</span>
                </div>
                :
                <Link to='/admin/manageholidays' className='stylenone'>
                    <div className='s1'>
                        <svg viewBox="0 0 1024 1024" fill="currentColor" height="1em" width="1em">
                            <path d="M923 283.6a260.04 260.04 0 00-56.9-82.8 264.4 264.4 0 00-84-55.5A265.34 265.34 0 00679.7 125c-49.3 0-97.4 13.5-139.2 39-10 6.1-19.5 12.8-28.5 20.1-9-7.3-18.5-14-28.5-20.1-41.8-25.5-89.9-39-139.2-39-35.5 0-69.9 6.8-102.4 20.3-31.4 13-59.7 31.7-84 55.5a258.44 258.44 0 00-56.9 82.8c-13.9 32.3-21 66.6-21 101.9 0 33.3 6.8 68 20.3 103.3 11.3 29.5 27.5 60.1 48.2 91 32.8 48.9 77.9 99.9 133.9 151.6 92.8 85.7 184.7 144.9 188.6 147.3l23.7 15.2c10.5 6.7 24 6.7 34.5 0l23.7-15.2c3.9-2.5 95.7-61.6 188.6-147.3 56-51.7 101.1-102.7 133.9-151.6 20.7-30.9 37-61.5 48.2-91 13.5-35.3 20.3-70 20.3-103.3.1-35.3-7-69.6-20.9-101.9zM512 814.8S156 586.7 156 385.5C156 283.6 240.3 201 344.3 201c73.1 0 136.5 40.8 167.7 100.4C543.2 241.8 606.6 201 679.7 201c104 0 188.3 82.6 188.3 184.5 0 201.2-356 429.3-356 429.3z" />
                        </svg>
                        <span>Holiday List</span>
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