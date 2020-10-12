export default class Guest {

    id
    phone
    firstName
    lastName
    email

    constructor(id, phone, firstName, lastName, email) {
        this.id = id
        this.phone = phone
        this.firstName = firstName
        this.lastName = lastName
        this.email = email
    }

    includes(subValue) {
        return this.id.toString().includes(subValue) ||
            this.phone.toString().includes(subValue) ||
            this.firstName.includes(subValue) ||
            this.lastName.includes(subValue) ||
            this.email.includes(subValue)
    }

    getField = name => {
        switch (name) {
            case 'id' : return this.id
            case 'firstName' : return this.firstName
            case 'lastName' : return this.lastName
            case 'email' : return this.email
            case 'phone' : return this.phone
            default: break
        }
    }

    compare(field, other){
        const tField = this.getField(field)
        const oField = other.getField(field)
        return tField > oField ? 1 : oField > tField ? -1 : 0
    }

    getId = () => this.id

    getPhone = () => this.phone

    getFirstName = () => this.firstName

    getLastName = () => this.lastName

    getEmail = () => this.email

}
