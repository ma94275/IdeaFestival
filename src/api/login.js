export const loginApi = async ({ email, password }) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (email !== "test@example.com") {
                reject({ code: "INVALID_EMAIL" });
                return;
            }

            if (password !== "abc45678##") {
                reject({ code: "INVALID_PASSWORD" });
                return;
            }

            resolve({
                accessToken: "mock-access-token",
                user: {
                    email,
                    name: "테스트 유저",
                },
            });
        }, 500);
    });
};
