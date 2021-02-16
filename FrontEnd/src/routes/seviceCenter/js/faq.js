import React,{useEffect} from 'react';

import '../css/sc.css';

import { Link } from "react-router-dom";

const Faq = () => {

    useEffect(() => {

        if (document.getElementById('side_wrap').classList.contains('open')) {
            document.getElementById('side_wrap').classList.remove('open');
            document.getElementById('side_wrap').classList.add('close');
            document.getElementById('side_wrap').setAttribute('style', 'right:-400px');
            document.getElementById('bg').setAttribute('style', 'display:none');
        }
    }, [])
    return (
        <div id="main_content">
            <div className="scWrap">
                <div id="sub_wrap">
                    <div id="subImg">
                        <Link to={{pathname: `/sc/onetoone`}}>
                            <button id="goList">1:1 문의 보기</button>
                        </Link>
                        <Link to={{pathname: `/sc/otowrite`}}>
                            <button id="goWrite">1:1 문의 하기</button>
                        </Link>
                    </div>
                </div>
                <div className="accordion">
                    <input type="checkbox" id="que01"></input>
                    <div className="faq_Q first">
                        <div className="Q">Q</div>
                        <div className="question"><label htmlFor="que01">닉네임을 어떻게 설정해야하나요?</label></div>
                        <em></em>
                    </div>
                    <div className="faq_A" >
                        <div className="A">A</div>
                        <div className="answer">Leeting 주체자가 구분할 수 있도록 Leeting 닉네임과 동일하게 설정해 주는 것이 중요할 것 같아요!</div>
                    </div>
                    <input type="checkbox" id="que02"></input>
                    <div className="faq_Q second">
                        <div className="Q">Q</div>
                        <div className="question"><label htmlFor="que02">Leeting은 어떻게 등록하나요?</label></div>
                        <em></em>
                    </div>
                    <div className="faq_A" id="second">
                        <div className="A">A</div>
                        <div className="answer">로그인 유저에 한해서 리팅 등록 버튼을 활성화 시켜드렸어요!<br />카테고리, 제목, 부제목, 썸네일, 기간, 내용 등을 입력하시고 등록하기 버튼을 클릭하면 끝!<br /> 간단하죠? 지금 등록해보세요!</div>
                    </div>
                    <input type="checkbox" id="que03"></input>
                    <div className="faq_Q third">
                        <div className="Q">Q</div>
                        <div className="question"><label htmlFor="que03">어떤 유저를 신고해야 하나요?</label></div>
                        <em></em>
                    </div>
                    <div className="faq_A" id="third">
                        <div className="A">A</div>
                        <div className="answer">상황에 따라 다르겠지만 노쇼한 유저, 진행을 방해하는 유저 등을 신고해주시면 됩니다!</div>
                    </div>
                    {/* <input type="checkbox" id="que04"></input>
                    <div className="faq_Q fourth">
                        <div className="Q">Q</div>
                        <div className="question" ><label htmlFor="que04">질문입니다</label></div>
                        <em></em>
                    </div>
                    <div className="faq_A" id="fourth">
                        <div className="A">A</div>
                        <div className="answer">대답대답<br/><br/><br/><br/></div>
                    </div> */}
                </div>
            </div>
        </div>
    )
}

export default Faq;