const Card = ({name,age,role, isActive}) => {
   
        return ( 
                <div className="card">
                    <img src="https://pedodoctor.com/custom/images/dr-jeffries.jpg" 
                    width="100px"
                    alt="" 
                    />
                    <h1>{name} {isActive && '🏵'}</h1> 
                    <h2>{age}</h2>
                    <h2>{role}</h2>


                </div> 
            );
    
}
 
export default Card;