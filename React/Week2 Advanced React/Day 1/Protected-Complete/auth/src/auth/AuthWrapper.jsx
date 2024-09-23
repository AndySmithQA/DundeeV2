import { createContext, useContext, useState, useNavigate } from "react"
import { RenderHeader } from "../structure/Header";
import { RenderMenu, RenderRoutes } from "../structure/RenderNavigation";

const AuthContext = createContext();
export const AuthData = () => useContext(AuthContext);

export const AuthWrapper = () => { 

    const [ user, setUser ] = useState({ name: "", isAuthenticated: false })

    const login = (userName, password) => {

        //This is where we would call the API to authenticate the user

        return new Promise((resolve, reject) => {
            if (password === "password") {
                setUser({ name: userName, isAuthenticated: true })
                resolve("Success")
            } else {
                reject("Incorrect password")
            }
        })
    }

    const logout = () => {
        setUser({ ...user, isAuthenticated: false })
        useNavigate("/")
    }

    return (
          
        <AuthContext.Provider value={{user, login, logout}}>
             <>
                  <RenderHeader />
                  <RenderMenu />
                  <RenderRoutes />
             </>
             
        </AuthContext.Provider>
   
)

}

