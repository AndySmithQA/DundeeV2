import logo from "./react.png" 
export const RenderHeader = () => {

    return (
         <div className="header">
              <div className="logo">
                   <img src={logo} alt="react"/> 
              </div>
              <h1>Protected Routes</h1>
         </div>
    )
}