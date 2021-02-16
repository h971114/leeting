import React from 'react';
import "./NotFound.css"

function NotFound({ history }) {
    const goBack = () => {
        history.goBack();
    };
    const goHome = () => {
        history.push('/');
    };

    return (
        <div id="main_content">
            <div className='notFoundCon'>
                <img src="../img/404error.png" alt="404에러"></img>
                <p className="tit"><span>잘못된 접근입니다.</span></p>
                <p className="subtit">페이지가 존재하지 않거나, 사용할 수 없는 페이지입니다.<br />
                입력하신 주소가 정확한지 다시 한 번 확인해 주시기 바랍니다.</p>

                <div className="btndiv">
                    <button className="goBack" onClick={goBack}>이전 화면</button>
                    <button className="goHome" onClick={goHome}>홈으로</button>
                </div>
            </div>
        </div>
    );
}

export default NotFound;