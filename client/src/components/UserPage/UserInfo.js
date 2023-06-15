import { useState, useEffect, useContext } from "react";
import { getUser } from '../../apis/userAPI';
import LoadingIcon from "../LoadingIcon";
import UserProfilePicture from "../UserProfilePicture";
import UserName from "../UserName";
import BtnUnfriend from "./BtnUnfriend";
import BtnMessage from "./BtnMessage";
import UserContext from "../../contexts/UserContext";
import BtnEditProfile from "./BtnEditProfile";
import ButtonLogOut from "./BtnLogOut";

const UserInfo = (props) => {
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);
  const { user, userPageId } = useContext(UserContext);
  
  useEffect(() => {
    if (!userPageId) return;
    
    getUser(userPageId)
      .then(res => setUserData(res.data ? { ...res.data } : {}))
      .finally(() => setLoading(false));
  }, [loading, userPageId]);
  
  return (
    <div className="card user-page-info">
      {
        loading ? <LoadingIcon /> :
          <div className="user-page-info-user">
            <UserProfilePicture pfp={userData.pfp} large={true} />
            
            <div className="user-page-info-user-cnt">
              <UserName full_name={`${userData.first_name} ${userData.last_name}`} />
              <span>{props.friendsCount}</span>
            </div>
          </div>
      }
      
      
      <div className='user-page-info-options'>
        {
          user.id === userData.id ?
          <>
            <BtnEditProfile />
            <ButtonLogOut id={user.id} />
          </> :
            <>
              <BtnUnfriend id={userPageId} />
              <BtnMessage id={userPageId} />
            </>
        }
      </div>
      
    </div>
  );
}

export default UserInfo;