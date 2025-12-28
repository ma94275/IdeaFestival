import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar";
import FeedbackSection from "../../components/FeedbackSection";
import ScoreItem from "../../components/scoreItem";

const MOCK_FEEDBACK = {
    user: {
        company: "삼성전자",
        job: "디자이너",
        keyword: ["패기", "열정", "의지"],
    },
    form: {
        a1: {
            title: "지원동기",
            content:
                "저는 귀사의 혁신적인 기술에 매력을 느껴 지원하게 되었습니다.\n\n기술에 대한 구체적인 설명이 부족합니다.",
            improve:
                "귀사의 차세대 3nm 공정 기술과 GAA 트랜지스터 개발에 깊은 인상을 받았습니다.",
            good: "",
        },
        a2: {
            title: "성장과정 및 경험",
            content:
                "팀 프로젝트에서 리더 역할을 맡아 성공적으로 완수했습니다.\n\n성과가 구체적이지 않습니다.",
            improve:
                "5명의 팀을 이끌어 3개월간 앱 개발 프로젝트를 진행했습니다.",
            good:
                "성과를 수치로 표현한 점이 매우 좋습니다.",
        },
        a3: {
            title: "성격 및 강점",
            content:
                "저의 가장 큰 장점은 끈기입니다.\n\n직무와의 연관성을 보완하세요.",
            improve:
                "문제 해결을 위해 반복적으로 리팩토링한 경험을 강조하세요.",
            good: "",
        },
        a4: {
            title: "맞춤법 수정",
            content:
                "그리움숙에서 의욕을 죽습니다.\n\n맞춤법 오류가 다수 존재합니다.",
            improve:
                "문장을 다시 정리해 가독성을 높이세요.",
            good: "",
        },
    },
    score: {
        logic: ["논리성", "82"],
        persuasive: ["설득력", "75"],
        concrete: ["구체성", "68"],
        authenticity: ["진정성", "88"],
        total: "78",
    },
    summary:
        "전반적으로 진정성 있는 경험을 잘 표현했으나, 구체적인 수치와 성과를 보강하면 더 좋아집니다.",
};

export default function Feedback() {
    const navigate = useNavigate();
    const [aifeedback] = useState(MOCK_FEEDBACK);

    return (
        <div className="min-h-screen bg-[#EBEBEB] flex flex-col">
            <Navbar />
            <div className="flex-1 flex justify-center items-center p-[70px]">
            <div className="w-[800px] bg-[#F4F4F4] rounded-[20px] shadow-[4px_4px_20px_rgba(0,0,0,0.25)] py-[50px] px-[75px]">
                    <div className="flex flex-col gap-[15px] font-pretendad text-[18px] text-[#696969 mb-[50px]">
                        <div className="flex gap-[20px]">
                            <span>지원 회사 {aifeedback.user.company}</span>
                            <span>지원 직무 {aifeedback.user.job}</span>
                        </div>
                        <div className="flex gap-[15px]">
                            <span>핵심 키워드</span>
                            <span>{aifeedback.user.keyword.join(", ")}</span>
                        </div>
                    </div>

                    {/* <FeedbackSection
                        title={aifeedback.form.a1.title}
                        userAnswer={aifeedback.form.a1.content}
                        go={aifeedback.form.a1.go}
                        improve={aifeedback.form.a1.improve}
                        good={aifeedback.form.a1.good}
                    />
                    <FeedbackSection
                        title={aifeedback.form.a2.title}
                        userAnswer={aifeedback.form.a2.content}
                        go={aifeedback.form.a2.go}
                        improve={aifeedback.form.a2.improve}
                        good={aifeedback.form.a2.good}
                    />
                    <FeedbackSection
                        title={aifeedback.form.a3.title}
                        userAnswer={aifeedback.form.a3.content}
                        go={aifeedback.form.a3.go}
                        improve={aifeedback.form.a3.improve}
                        good={aifeedback.form.a3.good}
                    />
                    <FeedbackSection
                        title={aifeedback.form.a4.title}
                        userAnswer={aifeedback.form.a4.content}
                        go={aifeedback.form.a4.go}
                        improve={aifeedback.form.a4.improve}
                        good={aifeedback.form.a4.good}
                    /> */}
                    {Object.values(aifeedback.form).map((item, idx) => (
                        <FeedbackSection
                            key={idx}
                            title={item.title}
                            userAnswer={item.content}
                            improve={item.improve}
                            good={item.good}
                        />
                    ))}

                    <div className="">
                        <div className="flex justify-center gap-[87px] my-[40px]">
                            <ScoreItem 
                                label={aifeedback.score.logic[0]} 
                                score={aifeedback.score.logic[1]} 
                            />
                            <ScoreItem 
                                label={aifeedback.score.persuasive[0]} 
                                score={aifeedback.score.persuasive[1]} 
                            />
                            <ScoreItem 
                                label={aifeedback.score.concrete[0]} 
                                score={aifeedback.score.concrete[1]} 
                            />
                            <ScoreItem 
                                label={aifeedback.score.authenticity[0]} 
                                score={aifeedback.score.authenticity[1]} 
                            />
                        </div>
                        <div className="text-center border-y border-[#696969] py-[40px]">
                            <div className="font-pretendad font-semibold text-[32px]">총점</div>
                            <div className="font-pretendad font-semibold text-[48px] text-[#002455]">{aifeedback.score.total}</div>
                            <div className="w-[600px] h-[20px] bg-[#C7C7C7] rounded-full">
                                <div className="h-[20px] bg-[#36BC11] rounded-full transition-all duration-500"
                                    style={{ width: `${aifeedback.score.total}%` }}>
                                </div>
                            </div>
                        </div>

                        <div className="bg-[#D1E4FD] rounded-[15px] px-[20px] py-[16px] my-[40px]">
                            <span className="font-pretendad text-[16px] mb-[12px]">전체 총평</span>
                            <p className="font-pretendad text-[16px]">{aifeedback.summary}</p>
                        </div>

                        <div className="flex gap-[20px]">
                            <button className="w-[400px] h-[50px] bg-[#002455] rounded-[10px] font-pretendad font-semibold text-white text-[24px]"
                                onClick={() => navigate("/archive")}>
                                보관함가기
                            </button>
                            <button className="w-[230px] h-[50px] bg-[#002455] rounded-[10px] font-pretendad font-semibold text-white text-[24px]"
                                onClick={() => navigate("/write")}>
                                다시하기
                            </button>
                        </div>
                    </div>
            </div>
            </div>
        </div>
    );
}