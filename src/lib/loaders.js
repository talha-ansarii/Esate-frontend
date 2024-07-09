import { defer } from "react-router-dom"
import apiRequest from "./apiRequest"


export const singlePageLoader = async ({request,params}) => {
    try {
        const res = await apiRequest.get(`post/${params?.id}`)
        return res.data
        
    } catch (error) {
        console.log(error.message)
        
    }
}



export const listPageLoader = async ({request,params}) => {
    //console.log(request)
    const query = request?.url?.split('?')[1]
    const postPromise = apiRequest("post?" + query)
   return defer({
    postResponse : postPromise
   })
}


export const profilePageLoader = async ({request,params}) => {
    const postPromise = apiRequest("/user/profilePosts")
    const chatPromise = apiRequest("/chats")
    
   return defer({
    postResponse : postPromise,
    chatResponse : chatPromise
   })
}