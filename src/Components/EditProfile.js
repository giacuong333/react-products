import { useEffect, useState } from "react";
import LocalStorage from "../script/LocalStorage";
import { useNavigate } from "react-router-dom";
import { GoArrowLeft } from "react-icons/go";
import { FaCheck } from "react-icons/fa6";
import { LuPencilLine } from "react-icons/lu";
import User from "../script/users";
import Popup from "./Popup";

function EditProfile() {
  const [cover, setCover] = useState(LocalStorage.get("user").cover || "");
  const [avatar, setAvatar] = useState(LocalStorage.get("user").avatar || "");
  const [fullName, setFullName] = useState(LocalStorage.get("user").fullname || "");
  const [email, setEmail] = useState(LocalStorage.get("user").email || "");
  const [address, setAddress] = useState(LocalStorage.get("user").address || "");
  const [phoneNumber, setPhoneNumber] = useState(LocalStorage.get("user").phoneNumber || "");
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    // Cleanup function for avatar
    return () => {
      if (avatar) {
      }
    };
  }, [avatar]);

  useEffect(() => {
    // Cleanup function for cover
    return () => {
      if (cover) {
      }
    };
  }, [cover]);

  function handleUpdateProfile() {
    try {
      const oldUser = LocalStorage.get("user");
      if (!oldUser) {
        throw new Error("User not found in local storage.");
      }

      const users = LocalStorage.getStorage("users");
      if (!Array.isArray(users)) {
        throw new Error("Users data is not an array.");
      }

      const { password, joinDate } = oldUser;
      const user = new User(fullName, email, password, joinDate, phoneNumber, address, cover || cover || "", avatar || avatar || "");

      const indexOfCurrentUser = users.findIndex((item) => item.email === oldUser.email);
      if (indexOfCurrentUser === -1) {
        throw new Error("Current user not found in users list.");
      }

      users.splice(indexOfCurrentUser, 1, user);

      LocalStorage.set("users", users);
      LocalStorage.set("user", user);

      setPopupMessage("Profile updated successfully");
      setIsPopupVisible(true);

      // Delay navigation to allow the user to see the popup message
      setTimeout(() => {
        navigate(-1);
      }, 2000);
    } catch (error) {
      console.error("Error updating profile:", error.message);
      // Additional error handling, e.g., show an error message to the user
      setPopupMessage("Error updating profile: " + error.message);
      setIsPopupVisible(true);
    }
  }

  function handleCoverChange(e) {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        const base64data = reader.result;
        setCover(base64data);
      };

      reader.readAsDataURL(file);
    }
  }

  function handleAvatarChange(e) {
    const file = e.target.files[0];

    if (file) {
      // FileReader is a built-in object that allows web applications to read the contents of files (such as images) async
      const reader = new FileReader();

      // the onloadend event handler is set up to execute when the reading operation is successfully completed
      reader.onloadend = () => {
        // reader.result contains the base64-encoded data URL of the file
        const base64data = reader.result;
        setAvatar(base64data);
      };

      // This method reads the content of the file and, once read, the `onloadend` callback is triggered with the file's data
      // encoded64 URL
      reader.readAsDataURL(file);
    }
  }

  return (
    <div className="profile profile-edit">
      <h3 className="profile-edit-title">Edit Account Details</h3>
      <div className="profile-body profile-body-edit">
        <div className="profile-header">
          <div className="profile-cover">
            {!cover ? <img src={require("../defaultBanner.accdc757f2c48d61f24c4fbcef2742fd.jpg")} alt="Cover" /> : <img src={cover} alt="Cover" />}
            <div className="profile-avatar-and-edit">
              <div className="profile-avatar">
                {!avatar ? <img src={require("../defaultAvatar.jpg")} alt="Avatar" /> : <img src={avatar} alt="Avatar" />}
                <div className="profile-edit-avatar">
                  <label htmlFor="edit-avatar">
                    <LuPencilLine style={{ color: "#fff", fontSize: "16px" }} />
                  </label>
                  <input type="file" id="edit-avatar" hidden onChange={handleAvatarChange} />
                </div>
              </div>

              <div className="profile-edit-cover">
                <label htmlFor="edit-cover">
                  <LuPencilLine style={{ color: "#fff", fontSize: "16px" }} />
                </label>
                <input type="file" id="edit-cover" hidden onChange={handleCoverChange} />
              </div>
            </div>
          </div>
        </div>
        <div className="profile-content profile-content-edit">
          <div className="form-group">
            <label htmlFor="fullname">* Full Name</label>
            <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} />
          </div>
          <div className="form-group">
            <label htmlFor="email">* Email Address</label>
            <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="form-group">
            <label htmlFor="address">Address (Will be used for checkout)</label>
            <input type="text" id="address" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="245 Phu Dinh, Phuong 16, Quan 8, TP.HCM" />
          </div>
          <div className="form-group">
            <label htmlFor="phoneNumber">Phone Number (Will be used for checkout)</label>
            <input type="text" id="phoneNumber" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
          </div>
        </div>
        <div className="profile-edit-footer">
          <div className="btn-group">
            <button type="button" onClick={() => navigate("/profile")}>
              <GoArrowLeft style={{ verticalAlign: "bottom", fontSize: "18px", marginRight: "10px" }} />
              Back to Profile
            </button>
            <button type="button" onClick={handleUpdateProfile}>
              <FaCheck style={{ verticalAlign: "bottom", fontSize: "18px", marginRight: "10px" }} />
              Update Profile
            </button>
          </div>
        </div>
      </div>
      <Popup message={popupMessage} isVisible={isPopupVisible} />
    </div>
  );
}

export default EditProfile;
