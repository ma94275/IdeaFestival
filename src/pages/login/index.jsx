import { useState } from "react";
import InputBox from "../../components/inputBox";
import InputBtn from "../../components/inputBtn";

const SAVED_USER = {
    email: "test@example.com",
    password: "abc45678##",
};
//임시 사용자 정보

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

    const handleLogin = (e) => {
        e.preventDefault();

        setErrors({
            email: "",
            password: "",
        });

        if (form.email !== SAVED_USER.email) {
            setErrors(prev => ({
                ...prev,
                email: "이메일이 일치하지 않습니다",
            }))
            return;
        }
        if (form.password !== SAVED_USER.password) {
            setErrors(prev => ({
                ...prev,
                password: "비밀번호가 일치하지 않습니다",
            }))
            return;
        }
        if (!form.email || !form.password){
            setErrors({
                email: "필수 정보입니다.",
                password: "필수 정보입니다.",
            });
            return;
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