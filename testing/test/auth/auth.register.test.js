const { axios } = require("../ApiConnector");
const { BACKEND_URL } = require("../backendURL");

describe("Registration a new user", () => {
    // for user 
    test("User can register if email are unique", async () => {
        const name = "Khalid" + Math.random();
        const email = "khalid" + Math.random() + "@gmail.com";
        const password = "123456";
        const role = "USER";

        const response = await axios.post(`${BACKEND_URL}/api/auth/register`, {
            name,
            email,
            password,
            role
        });

        expect(response.status).toBe(201);
        expect(response.data.data.name).toBe(name);
        expect(response.data.data.email).toBe(email);
        expect(response.data.data.role).toBe(role);
    })

    test("User can fail register in case field are missing", async () => {
         const name = "Khalid" + Math.random();
        const email = "khalid" + Math.random() + "@gmail.com";
        const password = "123456";
        const role = "USER";

        const response = await axios.post(`${BACKEND_URL}/api/auth/register`, {
            email,
            password,
            role
        });

        expect(response.status).toBe(400)
    })

    // for admin
    test("Admin can register if email are unique", async () => {
        const name = "Khalid" + Math.random();
        const email = "khalid" + Math.random() + "@gmail.com";
        const password = "123456";
        const role = "ADMIN";

        const response = await axios.post(`${BACKEND_URL}/api/auth/register`, {
            name,
            email,
            password,
            role
        })

        expect(response.status).toBe(201);
        expect(response.data.data.name).toBe(name);
        expect(response.data.data.email).toBe(email);
        expect(response.data.data.role).toBe(role);
    })
})
