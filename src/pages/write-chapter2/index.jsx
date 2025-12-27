import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation, Navigate } from 'react-router-dom';
import Navbar from '../../components/navbar';

function Format({title, value}){
    return(
        <div className='flex flex-col font-pretendad'>
            <span className='text-[14px] text-[#696969]'>{title}</span>
            <p className='text-[20px]'>{value}</p>
        </div>
    )
}

export default function WriteChapter2() {
    const navigate = useNavigate();
    const location = useLocation();

    if (!location.state) {
        return <Navigate to="/write-chapter1" replace />;
    }

    const { form, result } = location.state;

    return (
        <div className='min-h-screen flex flex-col'>
            <Navbar />
            <div className="flex flex-1 justify-center items-center bg-[#EBEBEB]">
                <div className="w-[500px] min-h-full rounded-[20px] shadow-[4px_4px_20px_rgba(0,0,0,0.25)] px-[50px] py-[42px]
                flex flex-col gap-[28px] bg-white">
                    <div className='flex flex-col gap-[32px]'>
                        <div className="text-left flex gap-[20px] font-pretendad text-[16px] text-[#696969]">
                            <span> 지원 회사  {form.company}</span>
                            <span>지원 직무 {form.job}</span>
                        </div>
                        <div className="flex flex-col gap-[20px]">
                            <Format title="지원동기" value={result.reason}/>
                            <Format title="성장 과정" value={result.experience}/>
                            <Format title="강점" value={result.strength}/>
                            <Format title="입사 후 포부" value={result.goal}/>
                        </div>
                        <span className="font-pretendad font-medium text-[20px] text-[#696969] text-left">
                            {form.name}님의 문서에는 이와 같은 내용이 필요합니다
                        </span>                        
                    </div>
                    <button className="w-[400px] h-[50px] bg-[#002455] rounded-[10px] text-white font-pretendad font-semibold text-[24px]"
                    onClick={() => navigate("/write-chapter3")}>
                        다음으로
                    </button>                    
                </div>
            </div>
        </div>
    );
}
