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

    equals(other) {
        return this.id === other.id &&
            this.phone === other.phone &&
            this.firstName === other.firstName &&
            this.lastName === other.lastName &&
            this.email === other.email
    }

    includes(subValue) {
        return this.id.toString().includes(subValue) ||
            this.phone.toString().includes(subValue) ||
            this.firstName.includes(subValue) ||
            this.lastName.includes(subValue) ||
            this.email.includes(subValue)
    }

    toString = () => `Id > ${this.id} | Phone > ${this.phone} | FirstName > ${this.firstName} | LastName > ${this.lastName} | Email > ${this.email} | `

    getId = () => this.id

    getPhone = () => this.phone

    getFirstName = () => this.firstName

    getLastName = () => this.lastName

    getEmail = () => this.email

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

}
