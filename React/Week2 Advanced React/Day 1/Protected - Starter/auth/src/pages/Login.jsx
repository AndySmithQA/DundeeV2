export const Login = () => {
  return (
    <div className="page">
           <h2>Login Page</h2>
           <div className="inputs">
                <input type="text" name="username" placeholder="User Name"/>
           </div>
          
           <div className="inputs">
                <input type="password" name="password" placeholder="Password"/>
           </div>
          
           <div className="button">
                <button>Log in</button>
            </div>
    </div>
    

  )
}
