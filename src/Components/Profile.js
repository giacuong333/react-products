import LocalStorage from "../script/LocalStorage";
import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();

  return (
    <div className="profile">
      <div className="profile-tabs">
        <div className="btn-group">
          <button type="button" className="active">
            Account
          </button>
          <button type="button">My Wish List</button>
          <button type="button">My Orders</button>
        </div>
      </div>
      <div className="profile-body">
        <div className="profile-header">
          <div className="profile-cover">
            <img src={LocalStorage.get("user").cover || require("../defaultBanner.accdc757f2c48d61f24c4fbcef2742fd.jpg")} alt="Cover" />
            <div className="profile-avatar-and-edit">
              <img src={LocalStorage.get("user").avatar || require("../defaultAvatar.jpg")} alt="Avatar" />
              <div className="btn-group">
                <button type="button" onClick={() => navigate("/profile/edit")}>
                  Edit Account
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="profile-content">
          <div className="profile-content__name">{LocalStorage.get("user").fullname}</div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="text" disabled value={LocalStorage.get("user").email} />
          </div>
          <div className="form-group">
            <label htmlFor="Address">Address</label>
            <input type="text" disabled value={LocalStorage.get("user").address || "Address not set"} />
          </div>
          <div className="form-group">
            <label htmlFor="join-date">Date Joined</label>
            <input type="text" disabled value={LocalStorage.get("user").joinDate} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
