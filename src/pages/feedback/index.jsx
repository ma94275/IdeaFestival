import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "../../components/navbar";
import FeedbackSection from "../../components/FeedbackSection";
import ScoreItem from "../../components/scoreItem";
import { mockSaveFeedbackApi } from "../../api/archive";

export default function Feedback() {
    const navigate = useNavigate();
    const location = useLocation();
    const [aifeedback, setAifeedback] = useState(null);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        if (location.state) {
            setAifeedback(location.state);
        } else {
            navigate("/home");
        }
    }, [location.state, navigate]);

    const handleSave = async () => {
        if (!aifeedback) return;
        
        setIsSaving(true);
        try {
            // ⭐ 백엔드 API 연동 대기 상태
            await mockSaveFeedbackApi(aifeedback);
            alert("피드백이 보관함에 저장되었습니다!");
            navigate("/archive");
        } catch (err) {
            console.error("저장 실패:", err);
            alert("저장에 실패했습니다. 다시 시도해주세요.");
        } finally {
            setIsSaving(false);
        }
    };

    const handleRetry = () => {
        if (window.confirm("작성한 내용이 모두 초기화됩니다. 처음부터 다시 작성하시겠습니까?")) {
            sessionStorage.removeItem('chapter1Data');
            sessionStorage.removeItem('chapter2Data');
            navigate("/write-chapter1");
        }
    };

    if (!aifeedback) {
        return (
            <div className="min-h-screen bg-[#EBEBEB] flex flex-col">
                <Navbar />
                <div className="flex-1 flex justify-center items-center">
                    <p className="text-[20px] font-pretendad text-[#696969]">로딩 중...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#EBEBEB] flex flex-col">
            <Navbar />
            <div className="flex-1 flex justify-center items-center p-[70px]">
                <div className="w-[800px] bg-[#F4F4F4] rounded-[20px] shadow-[4px_4px_20px_rgba(0,0,0,0.25)] py-[50px] px-[75px]">
                    <div className="flex flex-col gap-[15px] font-pretendad text-[18px] text-[#696969] mb-[50px]">
                        <div className="flex gap-[20px]">
                            <span>지원 회사 {aifeedback.user.company}</span>
                            <span>지원 직무 {aifeedback.user.job}</span>
                        </div>
                        <div className="flex gap-[15px]">
                            <span>핵심 키워드</span>
                            <span>{aifeedback.user.keyword.join(", ")}</span>
                        </div>
                    </div>

                    {Object.values(aifeedback.form).map((item, idx) => (
                        <FeedbackSection
                            key={idx}
                            title={item.title}
                            userAnswer={item.content}
                            improve={item.improve}
                            good={item.good}
                        />
                    ))}

                    <div>
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
                            <div className="font-pretendad font-semibold text-[48px] text-[#002455] my-[10px]">
                                {aifeedback.score.total}
                            </div>
                            <div className="w-[600px] h-[20px] bg-[#C7C7C7] rounded-full mx-auto">
                                <div 
                                    className="h-[20px] bg-[#36BC11] rounded-full transition-all duration-500"
                                    style={{ width: `${aifeedback.score.total}%` }}
                                />
                            </div>
                        </div>

                        <div className="bg-[#D1E4FD] rounded-[15px] px-[20px] py-[16px] my-[40px]">
                            <span className="block font-pretendad font-semibold text-[16px] mb-[12px]">
                                전체 총평
                            </span>
                            <p className="font-pretendad text-[16px] leading-relaxed">
                                {aifeedback.summary}
                            </p>
                        </div>

                        <div className="flex gap-[20px]">
                            <button 
                                className="w-[400px] h-[50px] bg-[#002455] rounded-[10px] font-pretendad font-semibold text-white text-[24px] hover:bg-[#003670] transition-colors disabled:bg-gray-400"
                                onClick={handleSave}
                                disabled={isSaving}
                            >
                                {isSaving ? "저장 중..." : "보관함가기"}
                            </button>
                            <button 
                                className="w-[230px] h-[50px] bg-[#002455] rounded-[10px] font-pretendad font-semibold text-white text-[24px] hover:bg-[#003670] transition-colors"
                                onClick={handleRetry}
                            >
                                다시하기
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
