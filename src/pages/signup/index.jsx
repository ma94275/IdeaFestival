import { useNavigate } from "react-router-dom";
import { useState } from "react";
import InputBox from "../../components/inputBox";
import InputBtn from "../../components/inputBtn";

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

    const handleSubmit = (e) => {
        e.preventDefault();

        const nextErrors = {
            email: "",
            password: "",
        };
        // const hasError = Boolean(errors.email || errors.password);

        if (!form.email) {
            nextErrors.email = "필수 정보입니다.";
        } else if (!form.email.includes("@") || !form.email.includes(".")) {
            nextErrors.email = "올바른 이메일 형식이 아닙니다.";
        } //이메일 형식 검사

        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*]).+$/;
        if (!form.password) {
            nextErrors.password = "필수 정보입니다.";
        } else if (form.password.length < 10 || form.password.length > 15) {
            nextErrors.password = "비밀번호는 10~15자 이내여야 합니다.";
        } else if (form.password.includes(" ") || !passwordRegex.test(form.password)){
            nextErrors.password = "비밀번호는 영문, 숫자, 특수문자를 포함해야 합니다.";
        } //비밀번호 형식 검사

        setErrors(nextErrors);

        if (nextErrors.email || nextErrors.password) return;
        //둘중 하나라도 에러가 있으면 종료
        // const isValid = !nextErrors.email && !nextErrors.password;
        // if (!isValid) return;
        //얘는 필드가 많아질 경우나 조건이 복잡할 경우 더 유용
        
        localStorage.setItem(
            "signupData",
            JSON.stringify(form)
        )
        //회원가입 정보 로컬스토리지에 저장
        
        console.log(form);
        navigate("/profile-setup");
        //회원가입 성공 시 사용자 정보 페이지로 이동
    } 

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