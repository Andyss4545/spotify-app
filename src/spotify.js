import { useEffect } from "react"

// spotify authorize account url
export const authEndpoint = "https://accounts.spotify.com/authorize/"

// spotify client ID
const clientId = "463ec3fbc0bd42d48a9ef843ff4b221b"

// redirect url to this
const redirectURL = "http://localhost:3000/" 

// spotify api scopes
const scopes = [
        "user-read-currently-playing",
        "user-read-recently-played",
        "user-read-playback-state",
        "user-top-read",
        "user-modify-playback-state",
        "user-read-private",
        "user-read-email",
        "user-read-playback-position"
      ]


//  http://localhost:3000/#access_token=BQD_6BKoaOvHDs8Oh1drqnJMwINGtTMMEVHwL1-SOqoz0wmrJUdy1ovNi1S9ykJ1hvmDDrdr8vJDxTd65aFu8wuauDfY8tJC4nl8ktVmeZvlYhFtenVD3RudXOuWwpGO6Jye2tJVG958Wk-YaWJmNO6pK03t4gj6QWruv5xlZq7cawIeFxayUJE90qLV4IbsaHaEzAGETBwevCSnU78W&token_type=Bearer&expires_in=3600

//  how to Grab access token from the url after it redirected

// 1st method to get token from url

// export const getTokenFormUrl = () => {
//     return window.location.hash.substring(1).split("&").reduce((initial, item) =>{
//                 // imagine we have a url  #accessToken=mysupersecretekey&name=Sonny , 
//                 // what it is sayin is that go to the first one split it is d equal sign and then
//                 let parts = item.split("=")
//                 initial[parts[0]] = decodeURIComponent(parts[1])
//                 // go into the array that is being returned for the access token, decodeurl and return the initial         
//                 return initial
//        },{})
// }

// 2nd method to get token from url

// export const getTokenFormUrl = () => { 
//   // get the grab the entire url when it redirected with the window.location.hash
//       const hash = window.location.hash
//       if (hash) {
//         // tell the browser to grab token from the hash after spliting each properties in the url
//         const token = hash.substring(1).split("&")[0].split('=')[1]
//         // console.log(token)
//       }

// }


// merge all variables together to generate the loginUrl
//get the authEndpoint and find the 
//clientId & redirect, get the scopes,join the user permission 
// in the object & response type should be equql token & show dialog should be true
export const loginUrl = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectURL}&scope=${scopes.join('%20')}&response_type=token&show_dialog=true`


