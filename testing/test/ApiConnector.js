const axios2 = require("axios");

const axios = {
    post : async (...args) => {
        try{
            const response = await axios2.post(...args);
            return response;
        }
        catch(error){
            return error.response;
        }
    },
    put : async (...args) => {
        try{
            const response = await axios2.put(...args);
            return response;
        }
        catch(error){
            return error.response;
        }
    },
    get : async (...args) => {
        try{
            const response = await axios2.get(...args);
            return response;
        }
        catch(error){
            return error.response;
        }
    },
    delete : async (...args) => {
        try{
            const response = await axios2.delete(...args);
            return response;
        }
        catch(error){
            return error.response;
        }
    }
}

module.exports = {
    axios
}