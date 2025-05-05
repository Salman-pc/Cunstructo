import React, { use, useContext, useEffect, useState } from 'react'
import { getSingleuserApi, updateProfileApi } from '../../services/allApi';
import serverUrl from '../../services/serverUrl';
import { displaycategoryContext ,displayProfileContext} from '../../Context/OtherPurpuseContextApi';
import profileimg from '../../assets/profileimg/profileimg.webp'
import { toast } from 'react-toastify';

function Profile() {


    const { setProfileResponse } = useContext(displayProfileContext)
    const { categoryResponse } = useContext(displaycategoryContext)

    const token = sessionStorage.getItem("token");
    const user = JSON.parse(sessionStorage.getItem("user"))

    const [profileData, setprofileData] = useState({})
    const [profileimage, setprofileimg] = useState()


    const Allcategory = categoryResponse.map(item => item.categoryname)

    useEffect(() => {
        getSingleuser()

    }, [])

    useEffect(() => {
        if (profileData.profilepic instanceof File) {
            setprofileimg(URL.createObjectURL(profileData.profilepic));
        } 
        
        else if ( profileData.profilepic ) {
            setprofileimg(`${serverUrl}/uploads/${profileData.profilepic}`);
        }
        else if (profileData.profilepic == " ") {
            setprofileimg(URL.createObjectURL(profileimg))
        }
        
    }, [profileData.profilepic]);

    const getSingleuser = async () => {

        const reqheader = {
            "content-type": "application/json",
            "authorization": `Bearer ${token}`
        }

        try {
            const result = await getSingleuserApi(reqheader)
            setprofileData(result.data)
            setProfileResponse(result.data)



        } catch (error) {
            console.log(error);

        }
    }

    const handileUpdateprofile = async () => {

        const { username, dob, mobileno, gender, location, skills, experience, status, profilepic } = profileData;

        const reqBody = new FormData();
        reqBody.append("username", username);
        reqBody.append("dob", dob);
        reqBody.append("mobileno", mobileno);
        reqBody.append("gender", gender);
        reqBody.append("location", location);  // fixed typo "loacation"
        reqBody.append("skills", JSON.stringify(skills)); // convert to string if array
        reqBody.append("experience", experience);
        reqBody.append("status", status);
        reqBody.append("profilepic", profilepic);

        if (token) {
            const reqheader = {

                "authorization": `Bearer ${token}`
            }

            try {
                const result = await updateProfileApi(reqBody, reqheader)

                
                
                if(result.status>=200&&result.status<300){
                    
                    toast.success(result.data.message)
                    getSingleuserApi()
                    setProfileResponse(result.data.data)
                }
                else{
                    

                    toast.warning(result.response.data.message)
                }
                

            } catch (error) {
                console.log(error);

            }
        }
    }

    return (
        <div>
            <div className="max-w-2xl mx-auto" >
                <p className="text-2xl font-bold text-gray-800 mb-6 md:mt-0 mt-6">Profile Settings</p>

                <form className="space-y-3 px-4">
                    <div className="  ">

                        <div className="grid gap-3 justify-center">
                            <div>
                                <label htmlFor="profilepic" className="relative cursor-pointer inline-block w-[120px] h-[120px]">
                                    <input
                                        id="profilepic"
                                        type="file"
                                        className="hidden"
                                        onChange={(e) => setprofileData({ ...profileData, profilepic: e.target.files[0] })}
                                    />
                                    <img
                                        className={profileimage?"w-full h-full border rounded-full object-cover":"w-full h-full border rounded-full p-4 object-cover"}
                                        src={profileimage || profileimg}
                                        alt="Profile"
                                    />
                                    <i className="fa-solid fa-plus text-white text-lg bg-[#1877F2] p-2 rounded-full absolute bottom-2 right-2 shadow-md"></i>
                                </label>


                            </div>
                        </div>
                    </div>

                    <div className="  ">

                        <div className="grid gap-3">
                            <div>
                                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                <input
                                    id="fullName"
                                    value={profileData?.username || ""}
                                    type="text"
                                    onChange={(e) => setprofileData({ ...profileData, username: e.target.value })}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                    placeholder="John Doe"
                                />
                            </div>

                        </div>
                    </div>

                    <div className="">

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div>
                                <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
                                <input
                                    value={profileData?.mobileno || ""}
                                    id="mobile"
                                    type="tel"
                                    onChange={(e) => setprofileData({ ...profileData, mobileno: e.target.value })}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                    placeholder="+1 234 567 890"
                                />
                            </div>
                            <div>
                                <label htmlFor="dob" className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                                <input
                                    id="dob"
                                    type="date"
                                    value={profileData?.dob || ""}
                                    onChange={(e) => setprofileData({ ...profileData, dob: e.target.value })}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                />

                            </div>
                            <div className="md:col-span-2">
                                <fieldset>
                                    <legend className="block text-sm font-medium text-gray-700 mb-1">Gender</legend>
                                    <div className="flex flex-wrap gap-4">
                                        {['male', 'female', 'other'].map((gender) => (
                                            <label key={gender} className="flex items-center space-x-2">
                                                <input
                                                    type="radio"
                                                    name="gender"
                                                    value={gender}
                                                    checked={profileData?.gender === gender}
                                                    onChange={(e) => setprofileData({ ...profileData, gender: e.target.value })}
                                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                                                />
                                                <span className="capitalize">{gender}</span>
                                            </label>
                                        ))}
                                    </div>
                                </fieldset>
                            </div>
                        </div>
                    </div>

                    {user.roll == "worker" &&
                        <div>

                            <div className="">
                                <div className="grid grid-cols-1 gap-3 mb-3">

                                    {/* Location Field */}
                                    <div>
                                        <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                                            Location
                                        </label>
                                        <input
                                            type="text"
                                            id="location"
                                            value={profileData?.location || ""}
                                            name="location"
                                            onChange={(e) => setprofileData({ ...profileData, location: e.target.value })}
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                            placeholder="Enter your location"
                                        />
                                    </div>

                                </div>
                            </div>

                            <div className="">
                                <div className="space-y-3">
                                    <div>
                                        <fieldset>
                                            <legend className="block text-sm font-medium text-gray-700 mb-1">Skills</legend>
                                            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                                {Allcategory.map((skill) => (
                                                    <label key={skill} className="flex items-center space-x-2">
                                                        <input
                                                            type="checkbox"
                                                            checked={profileData?.skills?.includes(skill) || false}
                                                            onChange={(e) => {
                                                                var updatedSkills = e.target.checked
                                                                    ? [...(profileData?.skills || []), skill]
                                                                    : (profileData?.skills || []).filter((s) => s !== skill);
                                                                setprofileData({ ...profileData, skills: updatedSkills });
                                                                console.log(e.target.checked,"iam var vaarr");
                                                                
                                                            }}
                                                        />
                                                        <span>{skill}</span>
                                                    </label>
                                                ))}
                                            </div>
                                        </fieldset>
                                    </div>
                                    <div className="grid grid-cols-2 gap-3">
                                        <div>
                                            <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-1">Experience (years)</label>
                                            <input
                                                id="experience"
                                                type="number"
                                                value={profileData.experience || ""}
                                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                                min="0"
                                                onChange={(e) => setprofileData({ ...profileData, experience: e.target.value })}
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="availability" className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                                            <select
                                                id="availability"
                                                value={profileData?.status || ""}
                                                onChange={(e) => setprofileData({ ...profileData, status: e.target.value })}
                                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                            >
                                                <option value="available">Available</option>
                                                <option value="unavailable">Unavailable</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>}



                    <button
                        onClick={handileUpdateprofile}
                        type="button"
                        className="w-full mt-5 bg-[#1877F2] text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                    >
                        Updadte Profile
                    </button>
                </form>
            </div>
        </div >
    )
}

export default Profile