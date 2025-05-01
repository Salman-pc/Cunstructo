import React, { useState } from 'react';
import { changePasswordApi, deleteMyaccountApi } from '../../services/allApi';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function SecurityPrivacy() {

  const token = sessionStorage.getItem("token");
  const user = JSON.parse(sessionStorage.getItem("user"))
  const navigate = useNavigate()

  const [isOpen, setIsOpen] = useState(false);
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);
  const [changePass, setChangePass] = useState({ currentPass: "", email: "", newPass: "", confirpass: "" })
  const [deleteAcountdata, setdeleteAccountdata] = useState({ email: "", password: "" })

  const handleChangePass = async () => {
    const updatedChangePass = { ...changePass, email: user.email };
    setChangePass(updatedChangePass);

    const { confirpass, currentPass, email, newPass } = updatedChangePass;

    if (confirpass && currentPass && email && newPass) {
      if (confirpass === newPass) {
        const reqheader = {
          "content-type": "application/json",
          "authorization": `Bearer ${token}`
        };

        try {
          const result = await changePasswordApi(updatedChangePass, reqheader);
          console.log(result);

          if (result.status >= 200 && result.status <= 299) {
            setChangePass({ currentPass: "", email: "", newPass: "", confirpass: "" });
            toast.success("Password updated successfully!");
          }
        } catch (error) {
          console.log(error);
          toast.warning(error?.response?.data?.message || "Something went wrong. Please try again.");
        }
      } else {
        toast.error("Passwords do not match!");
      }
    } else {
      toast.error("Please complete the form.");
    }
  };

  const handleDeleteAccount = async () => {
   
    if (!deleteAcountdata.email || !deleteAcountdata.password) {
      toast.warning("Please fill in both fields before deleting.");
      return;
    }

    else {
      const reqheader = {
        "content-type": "application/json",
        "authorization": `Bearer ${token}`
      };
      try {
        const result = await deleteMyaccountApi(deleteAcountdata, reqheader)
        
        if (result.status == 200) {
          sessionStorage.clear()
          navigate('/')
        }
        else {
          toast.warning(result.response.data)
        }
      } catch (error) {
        console.log(error);

      }
    }

  };

  return (
    <div className="max-w-2xl mx-auto mb-8">
      <h2 className="text-2xl font-bold text-gray-800 md:mt-0 mt-6">Security & Privacy</h2>

      {/* Password Change */}
      <div className="mb-6">
        <h3 className="text-lg font-medium text-gray-700">Change Password</h3>
        <p className="text-sm text-gray-500">Update your password for better security.</p>
        <div className="mt-3 flex flex-col gap-1">
          <input value={changePass.currentPass} onChange={(e) => setChangePass({ ...changePass, currentPass: e.target.value })} type="password" placeholder="Current Password" className="w-full p-3 border border-gray-300 rounded-lg mb-2" />
          <input value={changePass.newPass} onChange={(e) => setChangePass({ ...changePass, newPass: e.target.value })} type="password" placeholder="New Password" className="w-full p-3 border border-gray-300 rounded-lg mb-2" />
          <input value={changePass.confirpass} onChange={(e) => setChangePass({ ...changePass, confirpass: e.target.value })} type="password" placeholder="Confirm New Password" className="w-full p-3 border border-gray-300 rounded-lg mb-2" />
          <button onClick={handleChangePass} className="bg-blue-600 w-fit text-white px-4 py-2 rounded-md hover:bg-blue-700">Update Password</button>
        </div>
      </div>

      {/* Two-Factor Authentication */}
      <div className="mb-6">
        <h3 className="text-lg font-medium text-gray-700">Two-Factor Authentication (2FA)</h3>
        <p className="text-sm text-gray-500">Enhance security by enabling 2FA.</p>
        <div className="mt-3 flex items-center gap-2">
          <label className="flex items-center cursor-pointer">
            <input type="checkbox" checked={twoFactorAuth} onChange={() => setTwoFactorAuth(!twoFactorAuth)} className="hidden" />
            <span className={`w-10 h-5 flex items-center bg-gray-300 rounded-full p-1 transition ${twoFactorAuth ? 'bg-green-500' : ''}`}>
              <span className="bg-white w-4 h-4 rounded-full shadow transform transition-transform duration-300" style={{ transform: twoFactorAuth ? 'translateX(20px)' : 'translateX(0px)' }}></span>
            </span>
          </label>
          <span className="text-sm">{twoFactorAuth ? 'Enabled' : 'Disabled'}</span>
        </div>
      </div>

      {/* Privacy Settings */}
      <div className="mb-6">
        <h3 className="text-lg font-medium text-gray-700">Privacy Settings</h3>
        <p className="text-sm text-gray-500">Manage how others interact with you.</p>
        <div className="mt-3">
          <label className="flex items-center gap-2">
            <input type="checkbox" className="w-5 h-5" /> Hide my profile from search results
          </label>
          <label className="flex items-center gap-2 mt-2">
            <input type="checkbox" className="w-5 h-5" /> Block third-party tracking
          </label>
        </div>
      </div>

      {/* Account Deletion */}

      <div className="border-t pt-4">
        <h3 className="text-lg font-medium text-red-600">Delete Account</h3>

        {/* Dropdown Trigger */}
        <div className="relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="btn border-0 bg-[#b9b9ba] text-white px-4 w-full py-2 rounded mt-2"
          >
            ⚠️ Danger Zone
          </button>

          {/* Dropdown Content */}
          {isOpen && (
            <div className=" mt-10  bg-white border mx-2 border-gray-300 rounded-lg p-4 z-10">
              <p className="text-sm text-gray-500 mb-2">
                Once you delete your account, there is no going back.
              </p>
              <input

                onChange={(e) => setdeleteAccountdata({ ...deleteAcountdata, email: e.target.value })}
                type="email"
                placeholder="Enter your email"
                className="w-full p-2 border border-gray-300 rounded mb-2"
              />
              <input

                onChange={(e) => setdeleteAccountdata({ ...deleteAcountdata, password: e.target.value })}
                type="password"
                placeholder="Enter your password"
                className="w-full p-2 border border-gray-300 rounded mb-2"
              />
              <button
                onClick={handleDeleteAccount}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 w-full"
              >
                Delete My Account
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SecurityPrivacy;
