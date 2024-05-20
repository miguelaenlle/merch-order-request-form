import axios from "axios";

export const useAPIHook = () => {
    const post = async (url: string, data: any, token?: string) => {
        try {
            const response = await axios.post(url, data, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": token ? `Bearer ${token}` : undefined,
                }
            });
            console.log("Response", response.data);
            return response.data;
        } catch (e: any) {
            try {
                console.error("Simplified Error: ", e.response.data.message);
            } catch {
                console.error("Simplified Error: ", e);
            }
            throw e;
        }
    }
    

    const get = async (url: string, token?: string) => {
        try {
            const response = await axios.get(url, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": token ? `Bearer ${token}` : undefined,
                }
            });
            console.log("Response", response.data);
            return response.data;
        } catch (e: any) {
            console.log("e", e);
            try {
                console.error("Simplified Error: ", e.response.data.message);
            } catch {
                console.error("Simplified Error: ", e);
            }
            throw e;
        }
    }

    const put = async (url: string, data: any, token?: string) => {
        try {
            const response = await axios.put(url, data, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": token ? `Bearer ${token}` : undefined,
                }
            });
            console.log("Response", response.data);
            return response.data;
        } catch (e: any) {
            try {
                console.error("Simplified Error: ", e.response.data.message);
            } catch {
                console.error("Simplified Error: ", e);
            }
            throw e;
        }
    }

    const patch = async (url: string, data: any, token?: string) => {
        try {
            const response = await axios.patch(url, data, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": token ? `Bearer ${token}` : undefined,
                }
            });
            console.log("Response", response.data);
            return response.data;
        } catch (e: any) {
            try {
                console.error("Simplified Error: ", e.response.data.message);
            } catch {
                console.error("Simplified Error: ", e);
            }
            throw e;
        }
    }

    const del = async (url: string, token?: string) => {
        try {
            const response = await axios.delete(url, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": token ? `Bearer ${token}` : undefined,
                }
            });
            console.log("Response", response.data);
            return response.data;
        } catch (e: any) {
            try {
                console.error("Simplified Error: ", e.response.data.message);
            } catch {
                console.error("Simplified Error: ", e);
            }
            throw e;
        }
    }

    const generateBuyerToken = async () => {
        const sampleBuyerEmail = "bot.developer3@gmail.com" // User to be deleted after testing
        const password = "123456$"

        const response = await post("http://localhost:3000/api/auth/login", {
            email: sampleBuyerEmail,
            password: password
        })

        return response.token
    }

    const generateSellerToken = async () => {
        const sampleSellerEmail = "bot.developer4@gmail.com" // User to be deleted after testing
        const password = "123456$"

        const response = await post("http://localhost:3000/api/auth/login", {
            email: sampleSellerEmail,
            password: password
        })

        return response.token
    }

    return {
        post,
        get,
        put,
        patch,
        del,
        generateBuyerToken,
        generateSellerToken
    }
}