import { createSlice, current } from "@reduxjs/toolkit";

const mapSlice=createSlice({
    name:"user",
    initialState:{
       location:{
        lat:null,
        lon:null
       },
       address:null

    },
    reducers:{
       setLocation:(state,action)=>{
        //data comes but no store in state
        const {lat,lon}=action.payload
        //now store in state
        state.location.lat=lat
        state.location.lon=lon
       },
       setAddress:(state,action)=>{
        state.address=action.payload
       }
       
    }
})

export const {setAddress,setLocation}=mapSlice.actions
export default mapSlice.reducer