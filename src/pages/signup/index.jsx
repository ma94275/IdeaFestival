import { useNavigate } from "react-router-dom";
import { useState } from "react";
import InputBox from "../../components/inputBox";
import InputBtn from "../../components/inputBtn";
import { mockSignupApi } from "../../api/signup";

export default function Signup() {
    const navigate = useNavigate();

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

    const handleSubmit = async (e) => {
        e.preventDefault();

        const nextErrors = {
            email: "",
            password: "",
        };

        if (!form.email) {
            nextErrors.email = "필수 정보입니다.";
        } else if (!form.email.includes("@") || !form.email.includes(".")) {
            nextErrors.email = "올바른 이메일 형식이 아닙니다.";
        }

        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*]).+$/;
        if (!form.password) {
            nextErrors.password = "필수 정보입니다.";
        } else if (form.password.length < 10 || form.password.length > 15) {
            nextErrors.password = "비밀번호는 10~15자 이내여야 합니다.";
        } else if (form.password.includes(" ") || !passwordRegex.test(form.password)) {
            nextErrors.password = "비밀번호는 영문, 숫자, 특수문자를 포함해야 합니다.";
        }

        setErrors(nextErrors);
        if (nextErrors.email || nextErrors.password) return;

        try {
            // ⭐ 여기만 나중에 axios로 교체됨
            const response = await mockSignupApi(form);

            console.log(response);
            navigate("/profile-setup");
        } catch (err) {
            if (err.code === "DUPLICATE_EMAIL") {
                setErrors((prev) => ({
                    ...prev,
                    email: "이미 가입된 이메일입니다.",
                }));
            }
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="w-[460px] h-[480px] rounded-[20px] shadow-[4px_4px_20px_rgba(0,0,0,0.1)] flex flex-col justify-center items-center gap-[23px]">
                <div className="flex flex-col text-center">
                    <span className="text-[50px] text-[#002455] font-noto font-black">PolishMe</span>
                    <span className="text-[16px] font-pretendad font-semibold">회원가입</span>
                </div>
                <div className="flex flex-col gap-[15px]">
                    <InputBox type="email" label="이메일" placeholder="이메일을 입력하세요" name="email" value={form.email} onChange={handleChange} error={errors.email} />
                    <InputBox type="password" label="비밀번호" placeholder="비밀번호를 입력하세요" name="password" value={form.password} onChange={handleChange} error={errors.password} />
                    <InputBtn label="회원가입" onClick={handleSubmit}/>
                </div>
                <footer className="font-pretendad font-regular text-[12px] text-[#919191]">
                    이미 회원가입을 하셨나요? <a href="/login" className="text-[#002455]">로그인으로 이동</a>
                </footer>

            </div>
        </div>
    )
}