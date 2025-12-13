const { axios} = require("../ApiConnector");
const { BACKEND_URL } = require("../backendURL");

describe("User login", () => {
    // user login if user is registered

    test("User can login with valid credentials", async () => {
        const name = "Khalid" + Math.random();
        const email = "khalid" + Math.random() + "@gmail.com";
        const password = "123456";
        const role = "USER";

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

        const response2 = await axios.post(`${BACKEND_URL}/api/auth/login`, {
            email,
            password
        })

        expect(response2.status).toBe(200);
        expect(response2.data.token).toBeDefined();
    })

    test("User can not login with invalid emails", async () => {
        const name = "Khalid" + Math.random();
        const email = "khalid" + Math.random() + "@gmail.com";
        const password = "123456";
        const role = "USER";

        await axios.post(`${BACKEND_URL}/api/auth/register`, {
            name,
            email,
            password,
            role
        })

        const response2 = await axios.post(`${BACKEND_URL}/api/auth/login`, {
            email: "khalid2" + Math.random() + "@gmail.com",
            password: "123456"
        })

        expect(response2.status).toBe(400);
    })

    test("User can not login with invalid passwords", async () => {
        const name = "Khalid" + Math.random();
        const email = "khalid" + Math.random() + "@gmail.com";
        const password = "123456";
        const role = "USER";

        const response = await axios.post(`${BACKEND_URL}/api/auth/register`, {
            name,
            email,
            password,
            role
        })

        const response2 = await axios.post(`${BACKEND_URL}/api/auth/login`, {
            email,
            password: "1234567"
        })

        expect(response2.status).toBe(400);
    })
})