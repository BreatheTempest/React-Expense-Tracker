import React from "react";

import Input from "../../components/Input";

import Edit from "../../assets/edit.svg";
import "./Settings.css";

export default function Settings() {
  return (
    <div className="settings-container">
      <div className="settings-title">
        <h2>Account Information</h2>
        <p>Update your account information</p>
      </div>
      <div className="settings-header">
        <h3>Personal Information</h3>
        <div className="settings-edit">
          <img src={Edit} alt="Edit" />
          <p>Edit</p>
        </div>
      </div>
      <div className="settings-input-containers">
        <Input
          name="first-name"
          label="First Name"
          type="text"
          placeholder="Mahfuzul"
        />
        <Input name="last-name" label="Last Name" type="text" placeholder="Nabil" />
      </div>
      <div className="settings-input-containers">
        <Input label="Date of Birth" />
        <Input label="Mobile Number" />
      </div>
      <Input
        name="email"
        label="Email"
        type="email"
        placeholder="example@gamil.com"
      />
      <div className="settings-input-containers">
        <Input
          label="Password"
          type="password"
          placeholder="••••••"
          name="password"
        />
        <Input
          label="Confirm Password"
          type="password"
          placeholder="••••••"
          name="confirm-password"
        />
      </div>
      <button>Update</button>
    </div>
  );
}
