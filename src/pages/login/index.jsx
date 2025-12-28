import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import InputBox from "../../components/inputBox";
import InputBtn from "../../components/inputBtn";
import { loginApi } from "../../api/login";

export default function Login() {
    const navigate = useNavigate();
    const { login } = useAuth();
    
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

    const handleLogin = async (e) => {
        e.preventDefault();

        setErrors({
            email: "",
            password: "",
        });

        if (!form.email || !form.password){
            setErrors({
                email: form.email ? "" : "필수 정보입니다.",
                password: form.password ? "" : "필수 정보입니다.",
            });
            return;
        }

        try {
            // ⭐ 백엔드 API 연동 대기 상태
            const response = await loginApi(form);

            console.log("로그인 성공", response);

            // 로그인 정보 저장
            login(response.user, response.accessToken);

            // 메인 페이지로 이동
            navigate("/home");
        } catch (err) {
            if (err.code === "INVALID_EMAIL") {
                setErrors((prev) => ({
                    ...prev,
                    email: "존재하지 않는 이메일입니다.",
                }));
            } else if (err.code === "INVALID_PASSWORD") {
                setErrors((prev) => ({
                    ...prev,
                    password: "비밀번호가 올바르지 않습니다.",
                }));
            } else {
                setErrors((prev) => ({
                    ...prev,
                    password: "로그인에 실패했습니다.",
                }));
            }
        }
    }

    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="w-[460px] h-[480px] rounded-[20px] shadow-[4px_4px_20px_rgba(0,0,0,0.1)] flex flex-col justify-center items-center gap-[23px]">
                <div className="flex flex-col text-center">
                    <span className="text-[50px] text-[#002455] font-noto font-black">PolishMe</span>
                    <span className="text-[16px] font-pretendad font-semibold">로그인</span>
                </div>
                <div className="flex flex-col gap-[15px]">
                    <InputBox 
                        type="email" 
                        label="이메일" 
                        placeholder="이메일을 입력하세요" 
                        name="email" 
                        value={form.email} 
                        onChange={handleChange} 
                        error={errors.email} 
                    />
                    <InputBox 
                        type="password" 
                        label="비밀번호" 
                        placeholder="비밀번호를 입력하세요" 
                        name="password" 
                        value={form.password} 
                        onChange={handleChange} 
                        error={errors.password} 
                    />
                    <InputBtn label="로그인" onClick={handleLogin}/>
                </div>
                <footer className="font-pretendad font-regular text-[12px] text-[#919191]">
                    아직 회원이 아니신가요? <a href="/signup" className="text-[#002455]">회원가입으로 이동</a>
                </footer>
            </div>
        </div>
    );
}