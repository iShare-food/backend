export class User {
    constructor(
        private id: string,
        private name: string,
        private email: string,
        private password: string,
        private phoneNumber: string,
        private zipCode: string,
        private roleId: number
    ) {};

    getId() {
        return this.id;
    };

    getName() {
        return this.name;
    };

    getEmail() {
        return this.email;
    };

    getPassword() {
        return this.password;
    };

    getPhoneNumber() {
        return this.phoneNumber;
    };

    getZipCode() {
        return this.zipCode;
    };

    getRole() {
        return this.roleId;
    };

    setId(id: string) {
        this.id = id;
    };

    setName(name: string) {
        this.name = name;
    };

    setEmail(email: string) {
        this.email = email;
    };

    setPassword(password: string) {
        this.password = password;
    };

    setPhoneNumber(phoneNumber: string) {
        this.phoneNumber = phoneNumber;
    };

    setZipCode(zipCode: string) {
        this.zipCode = zipCode;
    };

    setRole(role: UserRole) {
        this.roleId = role;
    };

    static idToUserRole(input: number): UserRole {
        switch (input) {
            case 1:
                return UserRole.DOADOR;
            case 2:
                return UserRole.DONATARIO;
            default:
                throw new Error("Invalid user role");
        };
    };

    static toUserModel(user: any): User {
        return new User(user.id, user.name, user.email, user.password, user.phoneNumber, user.zipCode, User.idToUserRole(user.roleId));
    };
};

export enum UserRole {
    DOADOR = 1,
    DONATARIO = 2
};

export interface UserInputDTO {
    email: string;
    password: string;
    name: string;
    phoneNumber: string
    zipCode: string
    roleId: number;
};

export interface LoginInputDTO {
    email: string;
    password: string;
};