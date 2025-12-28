import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import Navbar from "../../components/navbar";
import profile from "../../assets/icons/profile.svg";

export default function Mypage(){
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    if (!user) {
        return (
            <div className="min-h-screen bg-[#EBEBEB] flex flex-col">
                <Navbar/>
                <div className="flex-1 flex justify-center items-center">
                    <div className="flex flex-col items-center gap-[20px]">
                        <p className="font-pretendad text-[24px] text-[#696969]">
                            로그인이 필요합니다
                        </p>
                        <button
                            onClick={() => navigate("/login")}
                            className="px-[30px] py-[15px] bg-[#002455] text-white rounded-[10px] font-pretendad font-semibold"
                        >
                            로그인하러 가기
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    const maskedPassword = "●".repeat(10);

    const handleLogout = () => {
        if (window.confirm("로그아웃 하시겠습니까?")) {
            logout();
            navigate("/login");
        }
    };

    return(
        <div className="min-h-screen bg-[#EBEBEB] flex flex-col">
            <Navbar/>
            <div className="flex-1 flex justify-center items-center">
                <div className="w-[450px] h-[450px] bg-[#F4F4F4] rounded-[20px] shadow-[4px_4px_20px_rgba(0,0,0,0.25)] py-[48px] px-[63px]">
                    <div className="flex gap-[26px] mb-[20px]">
                        <img src={profile} alt="프로필 이미지" />
                        <div className="flex flex-col">
                            <span className="font-pretendad text-[32px]">{user.name} 님</span>
                            <span className="font-pretendad text-[24px]">
                                전공: {user.job || user.major || "미설정"}
                            </span>                        
                        </div>
                    </div>
                    <div className="flex flex-col gap-[15px]">
                        <button 
                            onClick={() => alert("정보 수정 기능은 백엔드 연동 후 구현됩니다.")}
                            className="font-pretendad text-[24px] text-[#0F7BFF] pt-[7px] w-[100px] text-left hover:underline"
                        >
                            수정하기
                        </button>
                        <div className="flex flex-col gap-[4px] font-pretendad">
                            <span className="font-medium text-[24px]">이메일</span>
                            <span className="font-regular text-[20px] px-[4px]">{user.email}</span>
                        </div>
                        <div className="flex flex-col gap-[4px] font-pretendad">
                            <span className="font-medium text-[24px]">비밀번호</span>
                            <span className="font-regular text-[20px] px-[4px]">{maskedPassword}</span>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="mt-[20px] w-full h-[45px] border-2 border-[#002455] text-[#002455] rounded-[10px] font-pretendad font-semibold hover:bg-[#f0f0f0] transition-colors"
                        >
                            로그아웃
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}