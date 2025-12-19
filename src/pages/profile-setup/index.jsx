import { useState } from "react";
import InputBox from "../../components/inputBox";
import InputBtn from "../../components/inputBtn";
import arrow from "../../assets/icons/arrow-down.svg";

export default function ProfileSetup() {
    const [open, setOpen] = useState(false);
    const [form, setForm] = useState({
        name: "",
        major: "",
    });
    const [errors, setErrors] = useState({
        name: "",
        major: "",
    });

    const majors = [
        "프론트엔드",
        "백엔드",
        "디자인", 
        "데브옵스",
        "앱개발",
        "게임개발",
        "기타",
    ]

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

    const handleStart = () => {
        const nextErrors = {
            name: "",
            major: "",
        };

        let hasError = false;

        if (form.name === "") {
            nextErrors.name = "필수 정보입니다.";
            hasError = true;
        }
        if (form.major === "") {
            nextErrors.major = "필수 정보입니다.";
            hasError = true;
        }
        setErrors(nextErrors);

        if (hasError) return;

        console.log(form);
    }

    return(
        <div className="flex justify-center items-center min-h-screen">
            <div className="w-[460px] h-[480px] rounded-[20px] shadow-[4px_4px_20px_rgba(0,0,0,0.1)] flex flex-col justify-center items-center gap-[23px]">
                <div className="flex flex-col text-center">
                    <span className="text-[50px] text-[#002455] font-noto font-black">PolishMe</span>
                    <span className="text-[16px] font-pretendad font-semibold">선택 및 작성</span>
                </div>
                <div className="flex flex-col gap-[12px]">
                    <InputBox type="text" label="이름" placeholder="이름을 입력하세요" name="name" onChange={handleChange} error={errors.name}/>
                    <div className="flex flex-col relative">
                        <label className="font-pretendad font-medium text-[16px] mx-[8px]">전공</label>
                        <button 
                            className={`flex justify-between w-[360px] h-[45px] border rounded-[10px] font-noto text-[#6F6F6F] text-[14px] text-left pl-[12px] pr-[12px] py-[12px] 
                                focus:outline-none ${errors.major ? "border-[#FF9898] focus:border-[#FF9898]" : "border-[#D9D9D9] focus:border-[#5E5E5E]"}`}
                            onClick={() => {setOpen(!open); setForm({...form, major: form.major})}} type="button">
                            {form.major || "전공을 선택하세요"} <img src={arrow} alt="화살표" />
                        </button>
                            <ul className={`
                                    absolute top-full mt-[-15px] w-[360px] h-[116px]
                                    overflow-y-auto rounded-[5px] bg-[#F4F4F4]
                                    shadow-[4px_4px_20px_rgba(0,0,0,0.1)]
                                    transition-all duration-200 ease-out 
                                    ${open
                                    ? "opacity-100 translate-y-0"
                                    : "opacity-0 -translate-y-2 pointer-events-none"}
                            `}>{/* 조건에 따라 다른 애니메이션으로 드롭다운 표시 */}
                                {majors.map((major) => (
                                    <li 
                                        className="w-full h-[30px] font-pretendad text-[14px] flex items-center pl-[10px] hover:bg-[#D9D9D9] hover:cursor-pointer"
                                        key={major}
                                        onClick={() => {setForm({...form, major: major}); setOpen(false); }}>
                                        {major}
                                    </li>
                                ))}
                            {/* map함수를 이용해 majors 배열을 렌더링 */}
                            </ul>
                        <span className="text-[#FF9898] font-pretendad text-[10px] ml-[8px] min-h-[10px]">{errors.major}</span>
                    </div>
                    <InputBtn label="시작하기" onClick={() => handleStart()}/>
                </div>
            </div>
        </div>
    )
}