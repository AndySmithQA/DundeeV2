const Exp = () => {
    const username = "Jim";
    const age = 32;

    return ( 
        <div className="output">
            <p>{ username } is { age } years old</p>
            <p>In 5 years he will be { age + 5 }</p>
        </div>
     );
}
 
export default Exp;
