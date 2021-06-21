import { ReactElement, useContext } from "react";
import UserContext from '../context/UserContext';
import { NO_USER_USERID } from '../types/User';

function FetchCurrentUserComponent(): ReactElement {
    const { currentUser, fetchCurrentUser } = useContext(UserContext);
    if (!currentUser || currentUser.userId === NO_USER_USERID)
        fetchCurrentUser()
    return (<> </>);
  }
  
  export default FetchCurrentUserComponent;