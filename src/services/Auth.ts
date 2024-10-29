class AuthService {
    #admin;
    #username;
    #password;
    #role;
    #token;

    constructor() {
        this.#admin = {
            username: "admin-domjudge",
            password: "RkxBR3t5b3VfZ2V0X3RoZV9wd30" // decode forg get the flag: FLAG{you_get_the_pw}
        };

        this.#username = "";
        this.#password = "";
        this.#role = "";
        this.#token = "";
    }

    authenticate(username: string, password: string) {
        // console.log(username, password, this.#role);

        if(username === this.#admin.username) {
            if(password === this.#admin.password) {
                this.#token = "fake_token";
                this.#role = "admin";
            }
        }

        return this.getRole();
    }

    getRole() {
        return this.#role;
    }
}

export default AuthService;