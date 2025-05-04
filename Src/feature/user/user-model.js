export class userModel {
    constructor(id, name, email, password,type) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.type = type;
    }

    static signup(name,email,password) {
        const newUser = new userModel(users.length + 1, name, email, password);
        return newUser;
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