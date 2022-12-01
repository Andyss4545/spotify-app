import { useEffect } from 'react';
import './App.css';
import Login from './Components/Login/Login';
// import { getTokenFormUrl } from './spotify';
import { useStateValue } from './StateProvider/StateProvider';
import Player from './Components/Player/Player';




// const spotify = new SpotifyWebApi()
function App() {

      const [{user, token}, dispatch] = useStateValue()

     useEffect(() => {
          
            const getTokenFormUrl = () => { 
                // get the grab the entire url when it redirected with the window.location.hash
                    let hash = window.location.hash
                    window.location.hash = ""
                    if (hash) {
                      // tell the browser to grab token from the hash after spliting each properties in the url
                      const token = hash.substring(1).split("&")[0].split('=')[1]

                      dispatch({
                           type: "SET_TOKEN",
                           token : token
                      })

                 }
                 hash = ""
            }
             

          getTokenFormUrl()
     },[token, user, dispatch])
  return (
    <div className="app">
          {token ? <Player/> : <Login/> }
         
    </div>
  );
}

export default App;
