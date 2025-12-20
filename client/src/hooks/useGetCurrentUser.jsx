import React, { useEffect } from "react";
import axios from "axios";
import { serverUrl } from "../App";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";


//fetch current user hook
function useGetCurrentUser() {

    //hook
    const dispatch = useDispatch()


  useEffect(() => {
    const fetchUser = async () => {
      try {
        const result = await axios.get(`${serverUrl}/api/user/current`, {
          withCredentials: true,
        });
        // console.log(result);
        dispatch(setUserData(result.data))
        
      } catch (error) {
        console.log("fetch user hook error", error);
      }
    };
    fetchUser()
  });
}

export default useGetCurrentUser;
