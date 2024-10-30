class AuthService {
    #admin;
    #role;
    #token;

    constructor() {
        this.#admin = {
            username: "admin",
            password: "RkxBR3t5b3VfZ2V0X3RoZV9wd30", // Decode for the flag: FLAG{you_get_the_pw}
        };

        this.#role = ""; // Initialize role as an empty string
        this.#token = "";
    }

    authenticate(username: string, password: string) {
        if (username === this.#admin.username && password === this.#admin.password) {
            this.#token = "fake_token"; // Mock token for demonstration
            this.#role = "admin"; // Set role to admin
        } else {
            this.#role = "player"; // Set role to player
        }
        sessionStorage.setItem('userRole', this.#role); // Store role in session storage
        console.log("Authenticated successfully. Role:", this.#role);

        return this.getRole(); // Return the role after authentication
    }

    getRole() {
        // Retrieve role from session storage if private field is not set
        if (!this.#role) {
            this.#role = sessionStorage.getItem('userRole') || ''; // Use an empty string if null
        }
        return this.#role;
    }

    logout() {
        // Clear session storage and reset private fields on logout
        this.#role = '';
        this.#token = '';
        sessionStorage.removeItem('userRole');
        console.log("Logged out successfully.");
    }
}

export default AuthService;
