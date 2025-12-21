import axios from "axios";
import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentAddress,
  setCurrentCity,
  setCurrentState,
  setUserData,
} from "../redux/userSlice";
import { setAddress, setLocation } from '../redux/mapSlice'

function useGetCity() {

    //store details
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);
  const apiKey = import.meta.env.VITE_GEOAPIKEY;

  //navigator function to used for getting function from browser
  useEffect(() => {

    //navigator function
    navigator.geolocation.getCurrentPosition(async (position) => {
      console.log(position);

      // lat and lonng from position
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      //set lat and long on store
      dispatch(setLocation({ lat: latitude, lon: longitude }));

      //fetch city and state from api
      const result = await axios.get(
        `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&format=json&apiKey=${apiKey}`
      );
      console.log(result.data);

      //set city on userslice city
      dispatch(
        setCurrentCity(
          result?.data?.results[0].city || result?.data?.results[0].county
        )
      );

      //set state on userslice state
      dispatch(setCurrentState(result?.data?.results[0].state));

      //setcurrent address on userslaice address
      dispatch(
        setCurrentAddress(
          result?.data?.results[0].address_line2 ||
            result?.data?.results[0].address_line1
        )
      );
      //set address
      dispatch(setAddress(result?.data?.results[0].address_line2));
    });

    // this useeffect run when userdata changes
  }, [userData]);
}



export default useGetCity;
