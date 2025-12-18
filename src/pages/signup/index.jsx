import { useState } from "react";

function InputBox({type = "text", label, placeholder, name, value, onChange, error}) {
    //type의 기본값으로 text사용
    return(
        <div className="flex flex-col">
            <label className="font-pretendad font-medium text-[16px] mx-[8px]" htmlFor={name}>{label}</label>
            <input
                className={`w-[360px] h-[45px] border rounded-[10px] font-noto text-[14px] px-[12px] py-[12px] 
                focus:outline-none ${error ? "border-[#FF9898] focus:border-[#FF9898]" : "border-[#D9D9D9] focus:border-[#5E5E5E]"}`}
                type={type} placeholder={placeholder} name={name} value={value} onChange={onChange} id={name}/>
            <span className="text-[#FF9898] font-pretendad text-[10px] ml-[8px]">{error}</span>
        </div>
    )
}
function InputBtn({label, onClick}){
    return(
        <div>
            <button 
                className="w-[360px] h-[45px] bg-[#002455] text-white rounded-[10px] font-pretendad font-semibold"
                onClick={onClick}>{label}
            </button>
        </div>
    )
}

export default function Signup() {
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
        }

        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*]).+$/;
        if (!form.password) {
            nextErrors.password = "필수 정보입니다.";
        } else if (form.password.length < 10 || form.password.length > 15) {
            nextErrors.password = "비밀번호는 10~15자 이내여야 합니다.";
        } else if (form.password.includes(" ") || !passwordRegex.test(form.password)){
            nextErrors.password = "비밀번호는 영문, 숫자, 특수문자를 포함해야 합니다.";
        }

        setErrors(nextErrors);

        if (nextErrors.email || nextErrors.password) return;
        console.log(form);
    } 
    //회원가입 버튼 클릭 시 입력된 값 콘솔에 출력, 임시
    //조건을 확인하는 코드를 요기 작성

    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="w-[460px] h-[480px] rounded-[20px] shadow-[4px_4px_20px_rgba(0,0,0,0.1)] flex flex-col justify-center items-center gap-[23px]">
                <div className="flex flex-col text-center">
                    <span className="text-[50px] text-[#002455] font-noto font-black">PolishMe</span>
                    <span className="text-[16px] font-pretendad font-semibold">회원가입</span>
                </div>
                <div className={`flex flex-col ${errors.email || errors.password ? "gap-[12px]" : "gap-[20px]"}`}>
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