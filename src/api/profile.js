// api/profile.js

export const mockProfileSetupApi = (data) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // 예시: 이름이 "에러"면 실패
            if (data.name === "에러") {
                reject({
                    code: "INVALID_PROFILE",
                });
            } else {
                resolve({
                    success: true,
                });
            }
        }, 800);
    });
};
