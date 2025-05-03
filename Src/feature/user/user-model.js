export class userModel {
    constructor(id, name, email, password,type) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.type = type;
    }

    static signup(data) {
        const { name, email, password } = data;
        const newUser = new userModel(users.length + 1, name, email, password);
        users.push(newUser);
        return newUser;


    }

    static signin(email, password) {
        const findUser = users.find(user => user.email == email && user.password == password)
        return findUser;

    }



}


export const users = [
    {
        id:1,
        name:"seller",
        email: "seller@gmail.com",
        password:123,
        type:"seller"

    },
    {
        id:2,
        name:"customer",
        email: "customer@gmail.com",
        password:"pass1",
        type:"customer"

    }
];