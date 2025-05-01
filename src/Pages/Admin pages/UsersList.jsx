import React, { useState ,useEffect} from "react";
import { Trash2, Ban } from "lucide-react";
import { deleteUserApi, getAllusersApi, updateBlockApi } from "../../services/allApi";
import serverUrl from "../../services/serverUrl";
import profileimg from "../../assets/profileimg/profileimg.webp"
import { toast } from "react-toastify";

function UsersList() {
    const [user, setUser] = useState([]);


    useEffect(() => {
      getAllusers()
    }, [])

    const getAllusers= async()=>{
        try {
           const result= await getAllusersApi()
           setUser(result.data)   
        } catch (error) {
            console.log(error);
            
        }
    }

    const handileBanuser =async(id)=>{
        
        try {
            const result = await updateBlockApi(id,{block:true})

            if(result.status==200){
                toast.error("temporary blocked")
                getAllusers()
            }
        } catch (error) {
            console.log(error);
            
        }
    }
    
    const handleDeleteUser = async(id) => {

        try {
            const result = await deleteUserApi(id)
            console.log(result);
            if(result.status>=200&&result.status<=299){
                getAllusers()
                toast.error("removed user")
               }
            
        } catch (error) {
            console.log(error);
            
        }
        
    };


    return (
        <div className="bg-white rounded-2xl md:pt-40  pt-24 w-full max-w-7xl mx-auto">
            <h2 className="text-2xl font-semibold text-gray-800 md:mt-3 mb-4">User Details</h2>
            {user.length>0 ? user.map((user,index)=>(
                <div key={index} className="flex items-center justify-between w-full p-4 mt-12 bg-gray-100 rounded-lg">
                <div className="flex items-center space-x-4  ">
                    <img
                        src={user.profilepic?`${serverUrl}/uploads/${user.profilepic}`:profileimg}
                        alt={user.username}
                        className={user.profilepic?"w-12 h-12 bg-gray-200 rounded-full":"w-12 h-12 p-2 bg-gray-200 rounded-full"}
                    />
                    <div>
                        <p className="font-medium text-left text-gray-800">{user.username}</p>
                        <p className="text-gray-600 text-sm">{user.email}</p>
                    </div>
                </div>
                <div className="flex space-x-4">
                    <button
                        onClick={()=>{handileBanuser(user._id)}}
                        className={`p-2 rounded-full text-white transition-all ${user.blocked ? "bg-green-500 hover:bg-green-600" : "bg-yellow-500 hover:bg-yellow-600"}`}
                    >
                        <Ban size={20} />
                    </button>
                    <button
                        onClick={()=>handleDeleteUser(user._id)}
                        className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-all"
                    >
                        <Trash2 size={20} />
                    </button>
                </div>
            </div>
            )) : (
                <p className="text-gray-600 text-center">No user found.</p>
            )}
        </div>
    );
}

export default UsersList;