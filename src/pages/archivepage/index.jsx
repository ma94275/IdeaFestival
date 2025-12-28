import Navbar from "../../components/navbar";
import search from "../../assets/icons/search.svg";

function FeedbackBoxs({company, title, major}){
    return (
        <div className="w-[800px] h-[200px] bg-[#F4F4F4] rounded-[20px] shadow-[4px_4px_20px_rgba(0,0,0,0.25)]
            hover:outline-none hover:bg-[#C7C7C7] transition">
            <div className="px-[47px] py-[36px]">
                <span>{company} | {title}</span>
                <span>{major}</span>
            </div>
        </div>
    )
}

export default function archive(){
    return (
        <div className="min-h-screen bg-[#EBEBEB] flex flex-col">
            <Navbar/>
            <div className="flex flex-col justify-center items-center">
                <div className="relative w-[700px] h-[70px] rounded-[15px] bg-[#F4F4F4] shadow-[4px_4px_20px_rgba(0,0,0,0.25)] flex items-center my-[70px]">
                    <img src={search} alt="검색"
                        className="absolute left-[22px]"/>
                    <input type="text" placeholder="검색어를 입력하세요"
                        className="w-full h-full bg-transparent pl-[66px] pr-[20px] font-pretendad text-[20px] focus:outline-none"/>
                </div>
                <div className="flex flex-col gap-[30px]">
                    <FeedbackBoxs/> 
                    <FeedbackBoxs/> 
                    <FeedbackBoxs/> 
                    <FeedbackBoxs/>                     
                </div>
            </div>
        </div>
    )
}