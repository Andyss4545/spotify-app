// the present state
export const initialState = {
    user: null,
    playlists: [],
    playing: null,
    currentPlaying: false,
    discover_weekly: [],
    selectedPlaylistId: "37i9dQZEVXcGUO6IQRdrAW",
    playerState : false,
    // token: "BQBHV-PZ2Z1RP15SzGYHc5Ule2Djt0AJ-3hMYdWd0S_HkzniFiZlZtK33qLBM60U-td197pNpckxuNoZ4hVAMgQMnm_WYs-XbVsngBF8ueeOM_rNKDhPWDPX4cQMCI53gH1MTWuPu0w3oXJHK3ZA5ivDYVWR2CKLmIkaH3_StpBSfOO-n4jgW-g3gZciy0qJNM5XekFUtdF2LzjA0gW2"
 }



// this are the action to be dispatch to
 const reducer = (state, action) => {

       switch(action.type) {
             case "SET_TOKEN":
             return {
                  ...state,
                  token: action.token
             }
             case "SET_USER":
             return {
                 ...state,
                 user: action.user
             }

             case "SET_PLAYLIST":
                return {
                     ...state,
                     playlists: action.playlists
                }

                case "SET_DISCOVER_WEEKLY":
                    return {
                         ...state,
                         discover_weekly: action.discover_weekly
                    }

               case "SET_CURRENTLY_PLAYING":
                    return {
                          ...state,
                          currentPlaying: action.currentPlaying
                    }

               case "SET_PLAYING": 
                    return {
                          ...state,
                          playing: action.playing
                    }

               case "SET_PLAYER_STATE": 
                  return {
                       ...state,
                       playerState: action.state
                  }


             default:
                return state
       }
}

export default reducer

