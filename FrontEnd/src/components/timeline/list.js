import React,{useState, useEffect} from "react";
import propTypes  from "prop-types";
import moment from 'moment';
import 'moment/locale/ko';
import axios from "axios";
import { Link } from "react-router-dom";

function List({ id, writer, date, detail, file, contentslike, likestatus }) {

    const uid = sessionStorage.length === 0 ? "" : sessionStorage.getItem("id");
    
    var codes = detail;

    const [likeCnt, setLikeCnt] = useState(0);
    const [likeState, setLikeState] = useState(true);
    const [first, setFirst] = useState(true);
    const [reviewBool, setReviewBool] = useState(false);
    const [photo, setPhoto] = useState("../img/noProfile.png");
    const [nickname, setNickname] = useState();

    const etcid = id + 'etc';
    const ellipsisid = id + 'ellip';
    const bottom_wrapid = 'bottom_wrap' + id;
    const forUserId = id + 'forUser';
    const forAllId = id + 'forAll';
    const likeId = id + 'likeBtn';
    const contentslikeId = id + 'contentslikeId';

    // console.log(date);
    var t1 = moment(date).subtract(9,'h');
    var t2 = moment();
    var t3 = moment.duration(t2.diff(t1)).asHours();
    var min = moment.duration(t2.diff(t1)).asMinutes();
    
    var sYear = date.substring(0,4);
    var sMonth = date.substring(5,7);
    var sDate = date.substring(8, 10);
    
    var dateformat;
    if (t3 < 1) {
        dateformat = Math.floor(min) + '분전';
    }
    else if (t3 < 24) {
        dateformat = Math.floor(t3) + '시간전';
    }
    else {
        dateformat = sYear + '년 ' + sMonth + '월 ' + sDate+'일';
    }

    useEffect(() => {
        const getWriterInfo = async () => {
            // e.preventDefault();
            axios.get(`http://127.0.0.1:8080/myapp/member/`+writer, {
              id: writer
            }).then(res => {
                if (res.data.photo !== null) {
                    setPhoto(res.data.photo);
                }
                setNickname(res.data.nickname);
            });
          };

        if (first === true) {
            setLikeCnt(contentslike);
            if (likestatus === 1) {
                document.getElementById(likeId).classList.toggle('like');
                setLikeState(false);
            }
            setFirst(false);
        }

        getWriterInfo();
         // eslint-disable-next-line
    },[reviewBool])


    

    const ellip = (e) => {
        e.preventDefault();

        document.getElementById(etcid).setAttribute('style', 'display:none');
        document.getElementById(ellipsisid).classList.remove('detailhide');
        document.getElementById(ellipsisid).classList.add('detail');
    }

    const bottomOpen = (e) => {
        e.preventDefault();

        const sNN = sessionStorage.getItem('nickname');
        
        if (sNN === nickname) {
            document.getElementById('bg2').setAttribute('style', 'display:block');
            document.getElementById(bottom_wrapid).setAttribute('style','bottom:0px');
            document.getElementById(bottom_wrapid).classList.remove('bottomclose');
            document.getElementById(bottom_wrapid).classList.add('bottomopen');
        } else if (sNN === '관리자') {
            document.getElementById('bg2').setAttribute('style', 'display:block');
            document.getElementById(bottom_wrapid).setAttribute('style','bottom:0px');
            document.getElementById(bottom_wrapid).classList.remove('bottomclose');
            document.getElementById(bottom_wrapid).classList.add('bottomopen');
            // document.getElementById(forUserId).setAttribute('style', 'display:none');
        }
    }

    const bottomOut = (e) => {
        e.preventDefault();
        
        document.getElementById('bg2').setAttribute('style', 'display:none');
        document.getElementsByClassName('bottomopen')[0].style.bottom = "-200px";
        document.getElementsByClassName('bottomopen')[0].classList.add('bottomclose');
        document.getElementsByClassName('bottomclose')[0].classList.remove('bottomopen');
    }

    const deleteTimeline = (e) => {
        e.preventDefault();

        axios.delete('http://127.0.0.1:8080/myapp/contents/' + id, {
            no:id
        }).then(res => {
            if (res.data === "SUCCESS") {
                alert('삭제 성공하셨습니다.');
                window.location.replace('/timeline');
            } else {
                alert('삭제 실패하셨습니다. 잠시후 다시 시도해주세요');
            }
        })
    }

    const timeline_like = (e) => {
        e.preventDefault();

        if (uid === "") {
            alert('로그인 하시면 좋아요를 사용하실 수 있습니다!');
            window.location.assign('/login');
        }
        else {
            const sId = sessionStorage.getItem('id');
            if (likeState === true) {
                setLikeCnt(likeCnt + 1);
            } else {
                setLikeCnt(likeCnt - 1);
            }
            setLikeState(!setLikeState);
            setReviewBool(!reviewBool);
            
            document.getElementById(likeId).classList.toggle('like');
            axios.put('http://127.0.0.1:8080/myapp/contents/setlike', {
                contentsno : id,
                userid: sId,
                likestatus: likeState
            })
        }
        
        // window.location.replace('/timeline');
    }

    return (
        <div className="timelineListView">
            <div className="contentTit">
                <img className="writerProfile" src={photo} alt="프로필사진"></img>
                <div className="writerDateWrap">
                    <p className="writer">{nickname}</p>
                    <p className="date">{dateformat}</p>
                </div>
                <img className="bottomOpen" onClick={bottomOpen} alt="관리 오픈" src="../../img/timelineBtn.svg"/>
            </div>
            <img className="timelineThumb" src={file} alt={id}></img>
            <div className="detailView">
                <p id={ellipsisid} className="detailhide" dangerouslySetInnerHTML={{ __html: codes }}></p>
                <button id={etcid} className="etc" onClick={ellip}>더보기</button>
            </div>
            <button id={likeId} onClick={timeline_like} className="likeBtn"></button>
            <span id={contentslikeId} >{likeCnt}</span>
            
            <div id={bottom_wrapid}>
                <div id="Btns">
                    <button id={forUserId} className="user">
                        <GoModify
                            id={id}
                            writer={writer}
                            date={date}
                            detail={detail}
                            file={file}
                        />
                    </button>
                    <button id={forAllId} className="admin" onClick={deleteTimeline}>삭제하기</button>
                </div>
            </div>
            
            <div id="bg2" onClick={bottomOut}></div>
        </div>
    );
}


function GoModify({id, writer, date, detail, file }) {
    return (
        <div id="modifyBtn">
            <Link
                to={{
                    pathname: `/timeline/modify/${id}`,
                    state: {
                        id,
                        writer,
                        date,
                        detail,
                        file
                    }
                }}
            > 수정하기
                {/* <button id="modifyBtn" ></button> */}
            </Link>
        </div>
    )
}

GoModify.propTypes = {
    id: propTypes.number.isRequired,
    writer: propTypes.string.isRequired,
    date: propTypes.string.isRequired,
    detail: propTypes.string.isRequired,
    file: propTypes.string.isRequired
};

List.propTypes = {
    id: propTypes.number.isRequired,
    writer :propTypes.string.isRequired, 
    detail: propTypes.string.isRequired,
    file: propTypes.string.isRequired,
    date: propTypes.string.isRequired
};
 
export default List;