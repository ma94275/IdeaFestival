import { useState, useNavigate } from "react";
import Navbar from "../../components/navbar";

function FeedbackSection({ title, userAnswer, improve, good }) {
    return (
        <div className="flex flex-col gap-[15px]">
            <span className="font-pretendad text-[20px]"> {title} </span>
            <p className="font-pretendad text-[16px]"> {userAnswer} </p>
            <FeedbackBox title="개선제안" content={improve} type="improve"/>
            {good && (<FeedbackBox title="좋은점" content={good} type="good"/>)}
            <hr className="border-[#696969] my-[20px]" />
        </div>
    );
}
function FeedbackBox({ title, content, type }) {
    const styles = {
        improve: "bg-[#FFCFCF]",
        good: "bg-[#C9F7CC]",
    };

    return (
        <div className={`rounded-[15px] px-[20px] py-[16px] gap-[16px] ${styles[type]}`}>
            <span className="block font-pretendad text-[16px]">
                {title}
            </span>
            <p className="font-pretendad text-[15px]">
                {content}
            </p>
        </div>
    );
}
function ScoreItem({ label, score }) {
    return (
        <div className="flex flex-col items-center gap-[6px]">
            <span className="font-pretendad text-[16px]">{label}</span>
            <span className="font-pretendad text-[36px] text-[#002455]">{score}</span>
        </div>
    );
}

export default function Feedback() {
    const navigate = useNavigate();

    const aifeedback = {
        user: {
            company: "삼성전자",
            job: "디자이너",
            keyword: ["패기", "열정", "의지"]
        },
        form: {
            a1: {
                title: "지원동기",
                content: "저는 귀사의 혁신적인 기술에 매력을 느껴 지원하게 되었습니다.\n\n혁신적인 기술이 구체적으로 무엇인지 명시하지 않아 '귀사의 이 분야의 기술' 되는 '5G 통신 플랫폼'",
                go: "",
                improve: "귀사의 차세대 3nm 공정 기술과 GAA 트랜지스터 개발에 깊은 인상을 받았습니다.",
                good: ""
            },
            a2: {
                title: "성장과정 및 경험",
                content: "팀 프로젝트에서 리더 역할을 맡아 성공적으로 완수했습니다.\n\n팀 규모, 프로젝트 기간, 구체적 성과를 추가로 제시하세요.",
                go: "",
                improve: "5명의 팀을 이끌어 3개월간 진행한 앱 서비스 개발 프로젝트에서 사용자 500명 유치에 성공했습니다.",
                good: "데이터에서 최적화를 통해 렌더 성능 시간을 40% 개선하고, 이는 팀장 시상식 10만 원의 경과 창출로 이어졌습니다. 구체적인 수치와 영향력이 명확하게 제시되어 있습니다. 훌륭합니다!"
            },
            a3: {
                title: "성격 및 강점",
                content: "저의 가장 큰 장점은 끈기입니다.\n\n강점을 뒷받침하는 구체적 사례와 직무 연관성을 추가하세요.",
                go: "",
                improve: "목표를 바라그 때까지 3개월간 꾸준히 개념을 공부하며, 문제 해결을 위해 코드가기 리펙터링 했던 것이 강점입니다.",
                good: ""
            },
            a4: {
                title: "수정 사항",
                content: "그리움숙에서 의욕을 죽습니다.\n\n숙어를 전문에서 과열하세요.\n잘못듣을 않했슺니다.",
                go: "",
                improve: "수정을 허가가 전이 놓았기 버릇이 출은 결과가 나오지 않았던 것 같습니다.",
                good: ""
            }
        },
        score: {
            logic: ["논리성", "82"],
            persuasive: ["설득력", "75"],
            concrete: ["구체성", "68"],
            authenticity: ["진정성", "88"],
            total: "78"
        },
        summary: "전반적으로 진정성 있는 경험을 잘 표현했으나, 구체적인 수치와 성과를 더 많이 보강하여 설득력이 크게 향상됩니다. 특히 '성장과정 및 경험' 항목에서 프로젝트 규모와 성과를 수치화시키기 더 강력한 자기소개서가 될 것입니다."
    };

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

                    <FeedbackSection
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
                    />
                    {/* {Object.values(aifeedback.form).map((item, idx) => (
                        <FeedbackSection
                            key={idx}
                            title={item.title}
                            userAnswer={item.content}
                            improve={item.improve}
                            good={item.good}
                        />
                    ))} */}

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