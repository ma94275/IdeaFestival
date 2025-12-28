import Navbar from "../../components/navbar";
import profile from "../../assets/icons/profile.svg";
import { Link } from "react-router-dom";

export default function Mypage(){
    const user = {
        name: "김이박",
        job: "디자이너",
        email: "s25020@gsm.hs.kr",
        password: "1234##abc",
    }

    const maskedPassword = "●".repeat(user.password.length);

    return(
        <div className="min-h-screen bg-[#EBEBEB] flex flex-col">
            <Navbar/>
            <div className="flex-1 flex justify-center items-center">
            <div className="w-[450px] h-[400px] bg-[#F4F4F4] rounded-[20px] shadow-[4px_4px_20px_rgba(0,0,0,0.25)] py-[48px] px-[63px]">
                <div className="flex gap-[26px]">
                    <img src={profile} alt="프로필 이미지" />
                    <div className="flex flex-col">
                        <span className="font-pretendad text-[32px]">{user.name} 님</span>
                        <span className="font-pretendad text-[24px]">전공: {user.job}</span>                        
                    </div>
                </div>
                <div className="flex flex-col gap-[15px]">
                    <Link to="/re" className="font-pretendad text-[24px] text-[#0F7BFF] pt-[7px] w-[100px] text-center">수정하기</Link>
                    <div className="flex flex-col gap-[4px] font-pretendad">
                        <span className="font-medium text-[24px]">이메일</span>
                        <span className="font-regular text-[20px] px-[4px]">{user.email}</span>
                    </div>
                    <div className="flex flex-col gap-[4px] font-pretendad">
                        <span className="font-medium text-[24px]">비밀번호</span>
                        <span className="font-regular text-[20px] px-[4px]">{maskedPassword}</span>
                    </div>
                </div>
            </div>
            </div>
        </div>
    )
}