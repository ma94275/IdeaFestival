import { useState } from "react";
import InputBox from "../../components/inputBox";
import InputBtn from "../../components/inputBtn";
import axios from "axios";

const SAVED_USER = {
    email: "test@example.com",
    password: "abc45678##",
};
//임시 사용자 정보, 연동 시 삭제

export default function Login() {
    const [form, setForm] = useState({
        email: "",
        password: ""
    });
    const [errors, setErrors] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm((prev) => {
            const next = {
                ...prev,
                [name]: value
            };
            return next;
        });
        setErrors((prev) => ({
            ...prev,
            [name]: "",
        }));
    };
    //입력창 변경 시 상태 업데이트

    const handleLogin = async (e) => {
        e.preventDefault();

        setErrors({
            email: "",
            password: "",
        });

        if (!form.email || !form.password){
            setErrors({
                email: "필수 정보입니다.",
                password: "필수 정보입니다.",
            });
            return;
        }

        const mockLoginApi = (form) => {
            if (form.email === "test@example.com" && form.password === "1234") {
                return {
                    accessToken: "mock-token",
                    user: { id: 1, email: form.email },
                };
            }
            throw new Error("INVALID_LOGIN");
        };
        try {
            // 2️⃣ 백엔드 로그인 요청
            // const response = await axios.post(
            //     "http://localhost:8080/auth/login",
            //     {
            //         email: form.email,
            //         password: form.password,
            //     }
            // );
            const response = await mockLoginApi(form);

            console.log("로그인 성공", response.data);

            // 예시: 토큰 저장
            localStorage.setItem("accessToken", response.data.accessToken);

            // 예시: 메인 페이지 이동
            // navigate("/");
        } catch (error) {
            // 4️⃣ 에러 처리
            if (error.response) {
                const status = error.response.status;

                if (status === 401) {
                    setErrors({
                        email: "",
                        password: "이메일 또는 비밀번호가 올바르지 않습니다",
                    });
                } else {
                    alert("서버 오류가 발생했습니다.");
                }
            } else {
                alert("네트워크 오류가 발생했습니다.");
            }
        }

        console.log("로그인 성공");
    }

    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="w-[460px] h-[480px] rounded-[20px] shadow-[4px_4px_20px_rgba(0,0,0,0.1)] flex flex-col justify-center items-center gap-[23px]">
                <div className="flex flex-col text-center">
                    <span className="text-[50px] text-[#002455] font-noto font-black">PolishMe</span>
                    <span className="text-[16px] font-pretendad font-semibold">로그인</span>
                </div>
                <div className="flex flex-col gap-[15px]">
                    <InputBox type="email" label="이메일" placeholder="이메일을 입력하세요" name="email" value={form.email} onChange={handleChange} error={errors.email} />
                    <InputBox type="password" label="비밀번호" placeholder="비밀번호를 입력하세요" name="password" value={form.password} onChange={handleChange} error={errors.password} />
                    <InputBtn label="로그인" onClick={handleLogin}/>
                </div>
                <footer className="font-pretendad font-regular text-[12px] text-[#919191]">
                    이미 로그인을 하셨나요? <a href="/signup" className="text-[#002455]">회원가입으로 이동</a>
                </footer>
            </div>
        </div>
    )
}