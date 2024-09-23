import { Link } from "react-router-dom";


export default function NotFound() {
  return (
    <div>
        <h2>Page not found</h2>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. 
            Veniam molestias at quibusdam sapiente maxime autem, voluptates nesciunt 
            suscipit voluptatibus impedit fugit laudantium modi delectus illum culpa 
            repudiandae reiciendis sed unde.</p>

            <p>Go to the <Link to="/">Homepage</Link>.</p>
    </div>
  )
}
