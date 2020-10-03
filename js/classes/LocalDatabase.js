import Guest from "./Guest.js";

export default class LocalDatabase {

    base = []

    init(){
       // iniciar a lista de clientes 
    }

    add(id, phone, firstName, lastName, email){
        this.base[this.base.length] = new Guest(id, phone, firstName, lastName ,email)
    }

    getBase(){
        let regress = []
        for (let i = 0; i < this.base.length; i++) {
            regress[i] = new Guest(this.base[i].getId(), this.base[i].getPhone(), this.base[i].getFirstName(), this.base[i].getLastName(), this.base[i].getEmail())
        }
        return regress
    }

}
