import React, { useContext } from 'react'
import { UserContext } from '../context/UserContext';

const Profile = () => {
    const user = useContext(UserContext);
    return (
        <div className="profileContainer">
            <div className="profileColor">
                <h2>{user.name}</h2>
                <p>email: <span className="spanInfo">{user.email}</span></p>
                <p>pohlaví: <span className="spanInfo">{user.gender}</span></p>
                <p>status: <span className="spanInfo">{user.status}</span></p>
            </div>
        </div>
    )
}

export default Profile
