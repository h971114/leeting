import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <div id="footer">
        <div className="footerdiv">
            <ul className="fnb">
                <li><a href="/">이용약관</a></li>
                <li><a href="/">개인정보처리방침</a></li>
            </ul>
            <div className="fttxt">
                고객센터  02-1234-5678  |  평일 상담시간  09:00 ~ 18:00<br/>
                본 사이트의 콘텐츠는 저작권법의 보호를 받는 바 무단 전재, 복사, 배포 등을 금합니다.<br/>
                Copyright © Leeting All Rights Reserved.
            </div>
        </div>
    </div>
  );
}

export default Footer;