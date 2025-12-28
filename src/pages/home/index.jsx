import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../../components/navbar";
import letter from "../../assets/icons/letter.svg";

export default function Home() {
    const navigate = useNavigate();

    // 🔹 추가 1: 로그인 상태
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // 🔹 추가 2: 로그인 여부 확인
    useEffect(() => {
        const accessToken = localStorage.getItem("accessToken");
        setIsLoggedIn(!!accessToken);
    }, []);

    // 🔹 추가 3: 작성하러가기 클릭 시 처리
    const handleWriteClick = (e) => {
        if (!isLoggedIn) {
            e.preventDefault(); // Link 이동 막기
            navigate("/login");
        }
    };

    return(
        <div className="bg-[#ECECEC] w-full h-screen">
            <Navbar/>
            <div className="flex flex-col justify-center items-center gap-[28px] mt-[120px]">
                <div className="flex flex-col justify-center items-center gap-[20px]">
                    <span className="font-pretendad text-[40px]">좋은 소식이 오는 중입니다</span>
                    <span className="font-pretendad font-light text-[24px] text-[#696969]">AI가 양식에 맞게 피드백 합니다.</span>
                </div>
                <Link to="/write-chapter1" className="flex justify-center items-center w-[400px] h-[150px] rounded-[20px] shadow-[4px_4px_20px_rgba(0,0,0,0.25)] gap-[16px] 
                bg-[#F4F4F4] hover:bg-[#C7C7C7] transition-colors">
                    <img src={letter} alt="문서" />
                    <span className="font-pretendad text-[28px]">작성하러가기</span>
                </Link>
            </div>
        </div>
    )
}