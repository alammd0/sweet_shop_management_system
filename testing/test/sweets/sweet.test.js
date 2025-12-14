const { axios } = require("../ApiConnector");
const { BACKEND_URL } = require("../backendURL");


describe("Sweets Related CRUD Operations", () => {

    let userToken;
    let adminToken;
    let sweetId; 

    // 1. create account and login
    beforeAll(async () => {
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

        const response = await axios.post(`${BACKEND_URL}/api/auth/login`, {
            email,
            password
        })

        userToken = response.data.token;

        const name2 = "Khalid" + Math.random();
        const email2 = "khalid" + Math.random() + "@gmail.com";
        const password2 = "123456";
        const role2 = "ADMIN";

        await axios.post(`${BACKEND_URL}/api/auth/register`, {
            name: name2,
            email: email2,
            password: password2,
            role: role2
        })

        const response2 = await axios.post(`${BACKEND_URL}/api/auth/login`, {
            email: email2,
            password: password2
        })
        
        adminToken = response2.data.token;    
    })

    // 3. create sweet
    test("Admin can create a sweet", async () => {
        const name = "Khalid" + Math.random();
        const description = "sweet" + Math.random();
        const category = "sweet" + Math.random();
        const price = Math.floor(Math.random() * 100);
        const quantity = Math.floor(Math.random() * 100);

        const response = await axios.post(`${BACKEND_URL}/api/sweets`, {
            name,
            description,
            category,
            price,
            quantity
        }, {
            headers : {
                Authorization : `Bearer ${adminToken}`
            }
        })

        // console.log(response.data);

        expect(response.status).toBe(201);
        expect(response.data.data.name).toBe(name);
        expect(response.data.data.description).toBe(description);
        expect(response.data.data.category).toBe(category);
        expect(response.data.data.price).toBe(price);
        expect(response.data.data.quantity).toBe(quantity);
        sweetId = response.data.data.id;
    })

    // 4. view sweet by id
    test("User can view a sweet", async () => {
        const response = await axios.get(`${BACKEND_URL}/api/sweets/${sweetId}`, {
            headers : {
                Authorization : `Bearer ${userToken}`
            }
        })

        expect(response.status).toBe(200);
        expect(response.data.data).toBeDefined();
    })

    // 5. update sweet
    test("Admin can update a sweet", async () => {
        const name = "Khalid" + Math.random();
        const description = "sweet" + Math.random();
        const category = "sweet" + Math.random();
        const price = Math.floor(Math.random() * 100);
        const quantity = Math.floor(Math.random() * 100);

        const response = await axios.put(`${BACKEND_URL}/api/sweets/${sweetId}`, {
            name,
            description,
            category,
            price,
            quantity
        }, {
            headers : {
                Authorization : `Bearer ${adminToken}`
            }
        })

        expect(response.status).toBe(200);
        expect(response.data.data.name).toBe(name);
        expect(response.data.data.description).toBe(description);
        expect(response.data.data.category).toBe(category);
        expect(response.data.data.price).toBe(price);
        expect(response.data.data.quantity).toBe(quantity);
    })

    // 6. delete sweet
    test("Admin can delete a sweet", async () => {
        const response = await axios.delete(`${BACKEND_URL}/api/sweets/${sweetId}`, {
            headers : {
                Authorization : `Bearer ${adminToken}`
            }
        })

        expect(response.status).toBe(200);
    })

    // 7. view all available sweets : TODO 
    test("User can view all available sweets", async () => {
        const response = await axios.get(`${BACKEND_URL}/api/sweets`, {
            headers : {
                Authorization : `Bearer ${userToken}`
            }
        })

        expect(response.status).toBe(200);
        expect(response.data).toBeDefined();
    })

    // 8. purchase sweet
    test("user can purchase a sweet", async () => {
        const response = await axios.post(`${BACKEND_URL}/api/sweets/${sweetId}/purchase`, {}, {
            headers : {
                Authorization : `Bearer ${userToken}`
            }
        })

        expect(response.status).toBe(200);
        expect(response.data.data.quantity).toBeDefined();
    })

    // 9. restock sweet
    test("Admin can restock a sweet", async () => {
        const response = await axios.put(`${BACKEND_URL}/api/sweets/${sweetId}/restock`, {
            quantity : 1
        }, {
            headers : {
                Authorization : `Bearer ${adminToken}`
            }
        })

        expect(response.status).toBe(200);
        expect(response.data.data.quantity).toBe(1);
    })
})