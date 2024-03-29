import { createSlice } from "@reduxjs/toolkit"

const initialState={
    userId:null,
    firstName:'',
    lastName:'',
    signUpEmail:'',
    signUpPassword:'',
    confirmPassword:'',
    isSignedUp:false,

}

export const signUpSlice= createSlice({
    name:'signUp',
    initialState,
    reducers:{
        setFirstName:(state, action)=>{
            state.firstName=action.payload
        },
        setLastName:(state, action)=>{
            state.lastName=action.payload
        },
        setConfirmPassword:(state, action)=>{
            state.confirmPassword=action.payload
        },
        setIsSignedUp:(state, action)=>{
            state.isSignedUp=action.payload
        },
        setSignedUpEmail:(state, action)=>{
            state.signUpEmail=action.payload
        },
        setSignedUpPassword:(state, action)=>{
            state.signUpPassword=action.payload
        },
        setUserId:(state, action)=>{
            state.userId=action.payload
        }
    }
})


export const {setFirstName, setLastName, setEmail, setPassword, setConfirmPassword, setIsSignedUp , setSignedUpEmail, setSignedUpPassword,setUserId }=signUpSlice.actions
export default signUpSlice.reducer