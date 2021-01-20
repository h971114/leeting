import React from "react";
import "../css/meeting.css"

class Detail extends React.Component {
  componentDidMount() {
    const { location, history } = this.props;
    if (location.state === undefined) {
      history.push("/");
    }
    }
    
    likeClick = (e) => {
        if (document.getElementById('likebtn').classList.contains('ilike') === true) {
            document.getElementById('likebtn').classList.remove('ilike');
        } else {
            document.getElementById('likebtn').classList.add('ilike');
        }
    }

    profileClick = (e) => {

    }

  render() {
    const { location } = this.props;
    if (location.state) {
        return (
            <div id="meeting_detail">
                <div className="titleset">
                    <img src={location.state.file} alt={location.state.maintitle}></img>
                    <div className="titleswrap">
                        <div className="titles">
                            <h1 className="tit">{location.state.maintitle}</h1>
                            <p className="subtit">{location.state.subtitle}</p>
                        </div>
                        <div className="like">
                            <button id="likebtn" className="likebtn ilike" onClick={this.likeClick}></button>
                            {/* <p className="likecnt">1</p> */}
                            </div>
                            <hr className="hosthr"/>
                        <div className="host">
                            <img className="hostProfile" onClick={this.profileClick} src="../img\noProfile.png"></img>
                            <p className="hostNickname">{location.state.hostid} </p>
                        </div>
                    </div>
                </div>
                <hr className="detail_hr"/>
                <div className="detail_view">
                    <p className="detail_subtit">Leeting 소개</p>
                    <p className="detail_content"> {location.state.detail}</p >
                    </div>
                
            </div>
            // 
        );            
    } else {
      return null;
    }
  }
}
export default Detail;