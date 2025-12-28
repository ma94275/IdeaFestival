// ⭐ 회원가입 mock API
export const mockSignupApi = async (form) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // 이미 가입된 이메일 예시
            if (form.email === "test@example.com") {
                reject({
                    code: "DUPLICATE_EMAIL",
                });
                return;
            }

            resolve({
                message: "회원가입 성공",
                userId: 1,
            });
        }, 500); // 실제 API 느낌
    });
};
