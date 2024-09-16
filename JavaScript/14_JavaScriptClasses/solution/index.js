import MotorVehicle from './motorvehicle.js';
import Car from './car.js';
import Motorbike from './motorbike.js';

const myVehicle = new MotorVehicle("myMake", "myModel", 4, 2000);

console.log(myVehicle);

console.log(myVehicle.speed);
myVehicle.accelerate(10);
console.log(myVehicle.speed);
myVehicle.brake(5);
console.log(myVehicle.speed);
myVehicle.brake(5);
console.log(myVehicle.speed);

const myCar = new Car("BMW", "320dGT", 2000, 5, true);
console.log(myCar);

const myBike = new Motorbike("Kawasaki", "Ninja", 650, "chain");

console.log(`Who wins in an acceleration race? myCar or myBike?`);
myCar.accelerate(10);
myBike.accelerate(10);
console.log(`After 10 seconds:
myCar is going at ${myCar.speed} m/s;
myBike is going at ${myBike.speed} m/s;
Therefore ${myCar.speed > myBike.speed ? 'myCar' : 'myBike'} wins!`);
