export default class UserAlreadyExist extends Error {
    constructor() {
        super(" O email Já foi cadastrado!")
    }
}