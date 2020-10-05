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

    includes(subValeu) {
        return this.id.toString().includes(subValeu) ||
            this.phone.toString().includes(subValeu) ||
            this.firstName.includes(subValeu) ||
            this.lastName.includes(subValeu) ||
            this.email.includes(subValeu)
    }

    toString = () => `Id > ${this.id} | Phone > ${this.phone} | FirstName > ${this.firstName} | LastName > ${this.lastName} | Email > ${this.email} | `;

    getId = () => this.id;

    getPhone = () => this.phone;

    getFirstName = () => this.firstName

    getLastName = () => this.lastName;

    getEmail = () => this.email;

    getField = name => {
        switch (name) {
            case 'id' : return this.id
            case 'firstName' : return this.firstName
            case 'lastName' : return this.lastName
            case 'email' : return this.email
            case 'phone' : return this.phone
            default: break;
        }
    };


}
