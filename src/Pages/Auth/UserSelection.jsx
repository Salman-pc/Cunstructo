import React from 'react';
import { Link } from 'react-router-dom';

function UserSelection() {
  return (
    <div className="relative overflow-hidden flex flex-col items-center justify-center min-h-screen bg-gradient-to-r  from-blue-800 to-blue-500">
      
      <div className="flex flex-col items-center justify-center ">
        
        {/* Background Shapes */}
        <div className="absolute inset-0 z-0">
          <span className="absolute w-[520px] animate-[float_6s_ease-in-out_infinite] h-[520px] top-[-50px] left-[20px] rounded-tr-[172px] transform rotate-45"></span>
          <span className="absolute w-[220px] animate-[float_6s_ease-in-out_infinite] h-[220px] bg-blue-400 top-[-150px] right-0 rounded-[32px] transform rotate-45"></span>
          <span className="absolute w-[200px] animate-[float_6s_ease-in-out_infinite] h-[400px] bg-blue-400 top-[60px] right-[0px] rounded-[60px] transform rotate-45"></span>
          <span className="absolute w-[200px] animate-[float_6s_ease-in-out_infinite] h-[400px] bg-blue-400 top-[335px] left-[10px] rounded-[60px] transform rotate-45"></span>
          <span className="absolute w-[200px] animate-[float_6s_ease-in-out_infinite] h-[540px] bg-gradient-to-l from-blue-500 to-blue-500 top-[-24px] left-0 rounded-[32px] transform rotate-45"></span>
          <span className="absolute w-[200px] animate-[float_6s_ease-in-out_infinite] h-[400px] bg-blue-300 top-[280px] right-[-70px] rounded-[60px] transform rotate-45"></span>
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center space-y-8 h-[400px] p-6 rounded-2xl backdrop-blur-md bg-white/20 shadow-lg border border-white/20">
          <h1 className="text-3xl text-white font-bold">Choose Your Role</h1>
          
          <div className="flex space-x-6">
            <Link to="/workersignup">
              <button className="w-40 h-14 bg-blue-600 hover:bg-blue-500 text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 text-lg font-medium">
                Worker
              </button>
            </Link>
            <Link to="/usersignup">
              <button className="w-40 h-14 bg-blue-600 hover:bg-blue-500 text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 text-lg font-medium">
                User
              </button>
            </Link>
          </div>
        </div>

      </div>

    </div>
  );
}

export default UserSelection;
