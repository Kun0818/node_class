// class Person{
//   constructor(name='noname',age=0){
//     this.name = 'david';
//     this.age = 18;
//   }
//   toJSON(){
//     const {name,age} = this;
//     return {name,age}
//   }
// }

// const p1 = new Person;

// console.log(JSON.stringify(p1))

//JSON.stringify寫在class裡面

//一個檔案只能有一個default

export default class Person{
  gender = 'female'
  constructor(name = 'noname', age =0){
    
    this.name = name;
    this.age = age;
  }
  toJSON(){
    const {name,age,gender} = this;
    return {name,age,gender}
  }
  toString(){
    return JSON.stringify(this)
  }
}

// const p2 = new Person('Mary',20);

// console.log(p2 + '')

export const a = 20;

const b = n => n * n;

export {b}


