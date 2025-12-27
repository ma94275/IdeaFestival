import { useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from '../../components/navbar';

function InputBox({name, title, placeholder, onChange, error}) {
    return(
        <div className="w-[600px] flex flex-col">
            <span className="font-pretendad font-regular text-[20px] ml-[15px] ">{title}</span>
            <input type="text" name={name} placeholder={placeholder} onChange={onChange}
                className={`w-[600px] h-[60px] font-pretendad font-regular text-[20px] text-[#6F6F6F] pl-[15px] text-left
                border ${error? "border-[#FF9898]":"border-[#D9D9D9]"} rounded-[10px] focus:outline-none focus:border-[#5E5E5E]`}/>
            <span className="min-h-[18px] font-pretendad font-medium text-[#FF9898] text-[12px] ml-[15px]">{error}</span>
        </div>
    )
}
function StyleKeywordBox({ keyword, onChange, checked }) {
    return (
        <label className="cursor-pointer">
        <input type="checkbox" value={keyword} checked={checked} onChange={onChange} className="peer hidden"/>
        <span className="inline-block px-[12px] py-[5px] border border-[#6F6F6F] rounded-[30px] font-pretendad text-[20px]
        transition peer-checked:bg-[#919191] hover:bg-[#E0E0E0]">
            {keyword}
        </span>
        </label>
    );
}

function createMockResult(form) {
    const { company, job, style } = form;

    return {
        reason: `${company}에 지원한 이유는 ${style.join(", ")} 성향을 바탕으로 ${job} 직무에서 성장하고 싶기 때문입니다.`,
        experience: `${job} 직무와 관련된 경험을 통해 문제 해결 능력과 협업 능력을 기를 수 있었습니다.`,
        strength: `${style.join(", ")} 성향은 ${job} 직무 수행에 큰 강점이 될 수 있습니다.`,
        goal: `${company}에서 ${job}로서 지속적으로 성장하며 조직에 기여하고 싶습니다.`,
    };
}
//얘도 mock 데이터임 (동적)

export default function WriteChapter1() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        company: "",
        job: "",
        style: [],
    });
    const [errors, setErrors] = useState({
        company: "",
        job: "",
        style: "",
    });

    const handleTextChange = (e) => {
        const {name, value} = e.target;

        setForm((prev) => {
            const next = {
                ...prev,
                [name]: value
            };
            return next;
        });
        //next는 이 상태이후에 확장, 디버깅, 조건 처리가 들어갈 가능성
        setErrors((prev) => ({
            ...prev,
            [name]: "",
        }))
        //지금은 단순하고 더 확장하지 않음 -> 의도와 확정성에 따라 next사용 유무
        //전체적으로 함수형 업데이트를 함, 이전 값을 정확히 쓰려면 반드시 prev를 기준으로
    };

    const MAX_STYLE = 5;

    const handleKeywordChange = (e) => {
        const value = e.target.value;

        setForm((prev) => {
            const styles = prev.style;

            if (styles.includes(value)) {
                return {
                    ...prev,
                    style: styles.filter((v) => v !== value),
                };
            }

            if (styles.length >= MAX_STYLE) {
                setErrors((prev) => ({
                    ...prev,
                    style: "스타일 키워드는 최대 5개까지 선택할 수 있습니다.",
                }));
                return prev;
            }

            setErrors((prev) => ({ 
                ...prev, 
                style: "" 
            }));

            return {
                ...prev,
                style: [...styles, value],
            };
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        setErrors({
            company: "",
            job: "",
            style: "",
        });

        if (!form.company) {
            setErrors((prev) => ({ ...prev, company: "필수 작성 칸입니다" }));
            return;
        }
        if (!form.job) {
            setErrors((prev) => ({ ...prev, job: "필수 작성 칸입니다" }));
            return;
        }
        if (form.style.length === 0) {
            setErrors((prev) => ({ ...prev, style: "필수 선택 항목입니다" }));
            return;
        }

        const mockResult = createMockResult(form);

        localStorage.setItem(
            "chapter1Deta",
            JSON.stringify({
                form,
                result: mockResult,
            })
        )
        //데이터 로컬스토리지에 저장하기

        navigate("/write-chapter2", {
            state: {
                form,
                result: mockResult,
            },
        });
    };

    const STYLE_KEYWORDS = [
        "열정적", 
        "논리적", 
        "유연성",
        "팀워크 중시",
        "창의적", 
        "비판적 사고",
        "학습력",
        "적응력",
        "성장 지향",  
        "문제 해결 능력",
        "분석적", 
        "전략적",
        "책임감",
        "협업 중시",
        "성실성",
        "소통 중시",
        "주도적", 
        "도전적",
        // "기타",
    ];

    return(
        <div className='min-h-screen flex flex-col'>
            <Navbar/>
            <div className='flex flex-1 justify-center items-center bg-[#EBEBEB]'>
            <div className="flex justify-center items-center w-[700px] h-[680px] rounded-[20px] shadow-[4px_4px_20px_rgba(0,0,0,0.25)] bg-white">
                <div className="flex flex-col">
                    <div className="flex flex-col gap-[5px] mb-[20px]">
                        <span className="font-pretendad font-regular text-[36px]">어떤 스타일을 원하세요?</span>
                        <span className="font-pretendad font-regular text-[20px] text-[#696969]">기업의 문화나 면접관의 성향을 입력하면 AI가 최적화된 양식을 생성합니다.</span>
                    </div>
                    <div className="flex flex-col">
                        <InputBox name="company" title="지원기업" placeholder="예: 삼성전자, SK하이닉스, 스타트업..." value={form.company} onChange={handleTextChange} error={errors.company}/>
                        <InputBox name="job" title="직무" placeholder="예: 소프트웨어 엔지니어, 마케팅, 기획..." value={form.job} onChange={handleTextChange} error={errors.job}/>
                    </div>
                    <div className='flex flex-col'>
                        <span className="font-pretendad font-regular text-[20px] mb-[20px]">원하는 스타일 키워드</span>
                        <div className="flex flex-wrap gap-[10px] w-[600px] items-center">
                            {STYLE_KEYWORDS.map((keyword) => (
                                <StyleKeywordBox
                                key={keyword}
                                keyword={keyword}
                                onChange={handleKeywordChange}
                                checked={form.style.includes(keyword)}
                                />
                            ))}
                        </div>
                        <span className="min-h-[32px] text-[#FF9898] font-pretendad text-[12px] ml-[15px] mt-[8px]">
                            {errors.style}
                        </span>
                        <button className="w-[600px] h-[60px] bg-[#002455] rounded-[10px] text-white font-pretendad font-semibold text-[24px]"
                            onClick={handleSubmit}>
                            양식 생성하기
                        </button>   
                    </div>                 
                </div>
            </div>
            </div>
        </div>
    )
}