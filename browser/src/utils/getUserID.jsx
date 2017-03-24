const getUserID = () => JSON.parse(localStorage.getItem('profile')).identities[0].user_id;
export default getUserID;
