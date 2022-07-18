import React, { Fragment, useState } from "react";
import "./Navbar.scss";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { logout, updateProfile } from "../../../../store/actions/auth";
import Modal from "../../../Modal/Modal";

const Navbar = () => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.authReducer);

  const [showProfileOptions, setShowProfileOptions] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);

  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [email, setEmail] = useState(user.email);
  const [gender, setGender] = useState(user.gender);
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();

    const form = { firstName, lastName, email, gender, password, avatar };

    if (password.length > 0) {
      form.password = password;
    }

    const formData = new FormData();

    for (const key in form) {
      formData.append(key, form[key]);
    }

    dispatch(updateProfile(formData)).then(() => setShowProfileModal(false));
  };

  return (
    <div id="navbar" className="card-shadow">
      <h2>Chat.io</h2>
      <div
        id="profile-menu"
        onClick={() => setShowProfileOptions(!showProfileOptions)}
      >
        <img src={user.avatar} alt="avatar" />
        <p>{`${user.firstName} ${user.lastName}`}</p>
        <FontAwesomeIcon icon="caret-down" className="fa-icon" />

        {showProfileOptions && (
          <div id="profile-options">
            <p onClick={() => setShowProfileModal(true)}>Update Profile</p>
            <p onClick={() => dispatch(logout())}>Logout</p>
          </div>
        )}

        {showProfileModal && (
          <Modal click={() => setShowProfileModal(false)}>
            <Fragment key="header">
              <h3 className="m-0">Update Profile</h3>
            </Fragment>
            <Fragment key="body">
              <form onSubmit={submitHandler}>
                <div className="input-field mb-1">
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="First name"
                  />
                </div>
                <div className="input-field mb-1">
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Last name"
                  />
                </div>
                <div className="input-field mb-1">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                  />
                </div>
                <div className="input-field mb-1">
                  <select
                    defaultValue={gender}
                    onChange={(e) => setGender(e.target.value)}
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
                <div className="input-field mb-1">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                  />
                </div>
                <div className="input-field mb-2">
                  <input
                    type="file"
                    onChange={(e) => setAvatar(e.target.files[0])}
                  />
                </div>
              </form>
            </Fragment>
            <Fragment key="footer">
              <button
                type="submit"
                className="btn-success"
                onClick={submitHandler}
              >
                UPDATE
              </button>
            </Fragment>
          </Modal>
        )}
      </div>
    </div>
  );
};

export default Navbar;
