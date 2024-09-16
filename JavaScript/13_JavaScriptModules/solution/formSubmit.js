export const formSubmit = event => {
    event.preventDefault();
    alert(`The form was submitted.`);
    for(let i = 0; i < 3;i++) {
        console.log(event.target[i].value);
    }
    
}