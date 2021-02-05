import React from "react";
import "./Slider.css";
import "./Leeting.css";

class Leeting extends React.Component {
    render() {
        return (
            <div id="main_content">
                <div id="leeting_content">
                    <div id="tit1">
                        <p className="title">Leeting<span>.</span></p>
                        <p className="subtit">당신이 찾는<br />모든 랜선 그룹</p>
                        <p className="highlight">Leeting 웹 이용하기</p>
                    </div>
                    <div id="tit2">
                        <p className="title">웹 하나로 끝내는<br /><span>Leeting 모집</span></p>
                        <p className="subtit"><span>어뷰징 시스템</span>을 통해 엄선된 리팅을 볼 수 있어요.<br />익명의 그룹에 시간을 소비하지 마세요!</p>
                        <img src="img/leeting2.png" alt="리팅 모바일 ver"></img>
                    </div>
                    <div id="tit3">
                        <p className="title">내가 가장<br /><span>관심있는 카테고리</span></p>
                        <p className="subtit">내가 어떤 카테고리가 관심있는지<br /><span>Leeting이 직접 통계를 구해줄게요!</span></p>
                    </div>
                    <div id="tit4">
                        <p className="title">매일, 직접 선별합니다.<br /><span>Leeting 크루의 큐레이션</span></p>
                        <p className="subtit">사용자들에게 힘이 되었으면 하는 마음으로<br /> 리팅 크루들은 매일 좋은 리팅을 확인하고 있어요.</p>
                        <img src="img/leeting4.png" alt="리팅 크루"></img>
                    </div>
                </div>
            </div>
        )
    }
}
  
export default Leeting;