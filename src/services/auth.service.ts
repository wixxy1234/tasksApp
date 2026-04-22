import { Api } from "@/api/Api";
import type { LoginDto, RegisterDto, AuthResponseDto } from "@/api/Api";

function getToken(): string | null {
    return localStorage.getItem("token");
}

function securityWorker() {
    const token = getToken();
    if (token) {
        return {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
    }
    return {};
}

const apiClient = new Api({
    baseURL: "",
    securityWorker,
});

const publicApiClient = new Api({ baseURL: "" });

export const authService = {
    async login(email: string, password: string): Promise<AuthResponseDto> {
        const data: LoginDto = { email, password };
        const response = await publicApiClient.api.authLoginCreate(data);
        return response.data;
    },

    async register(email: string, password: string): Promise<AuthResponseDto> {
        const data: RegisterDto = { email, password };
        const response = await publicApiClient.api.authRegisterCreate(data);
        return response.data;
    },

    logout() {
        localStorage.removeItem("token");
    },
};

export const tasksApiClient = apiClient; 