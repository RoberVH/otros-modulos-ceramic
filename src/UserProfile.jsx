import React from "react";

const  UserProfile = ( {user} ) => {
 console.log('userX', user);
 console.log('Object.keys(user)', Object.keys(user));
 console.log('Object.keys(user).map', Object.keys(user).map(key => user[key]));
 return (
    <div className="profile-frame">
        {Object.entries(user).map(user => {            
            return (
             <div style={{display:'flex', 
                flexDirection:'row', fontSize:'0.5em', marginTop: '0.1em', marginLeft: '1em'}} key={user[0]}>
                 <h2>&#x26AA; {user[0]}: &nbsp;</h2>
                <h2 style ={{ color:'red'}}>{user[1]}</h2>
            </div>
            )
            })
        }
    </div>
 )}

export default UserProfile;