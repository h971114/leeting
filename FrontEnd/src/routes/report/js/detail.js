import React from 'react';
import axios from "axios";

class Detail extends React.Component {

    constructor() {
        super();
        this.state = {
            no:"",
            id:"",
            reportid:"",
            detail:"",
            date:""
        }
    }

    componentDidMount() {        
        this.showDetail();
        
        if (sessionStorage.getItem('id')!=='leetingadmin') {
            document.getElementById('root').setAttribute('style', 'display:none');
            window.location.replace("/WrongPage");
        }

        if (document.getElementById('side_wrap').classList.contains('open')) {
            document.getElementById('side_wrap').classList.remove('open');
            document.getElementById('side_wrap').classList.add('close');
            document.getElementById('side_wrap').setAttribute('style', 'right:-400px');
            document.getElementById('bg').setAttribute('style', 'display:none');
        }
    }

    showDetail = async () => {
        const { location } = this.props;

        let url = 'http://127.0.0.1:8080/myapp/report/' + location.state.no;
                
        let data = await axios.get(url);
        // console.log(data);
        this.setState({
            no : data.data.no,
            id:data.data.id,
            reportid:data.data.reportid,
            detail:data.data.detail,
            date:data.data.date
        })
    }

    profileClick = (e) => {

    }

    reportDelete = (e) => {
        e.preventDefault();
        
        let result = window.confirm("삭제하시겠습니까?");

        if (result) {
            axios.delete('http://127.0.0.1:8080/myapp/report/'+this.state.no, {
                params: {
                    no:this.state.no
                }
            }).then(res => {
                console.log(res);
                window.location.replace('/report/list');
            })
        } else {
        } 
    }


  render() {
      const { location } = this.props;

      var codes = this.state.detail;

    if (location.state) {
    return (
            
        <div id="main_content">
            <div className="reportInput reportWrap">
                <div className="reportTitle">
                    신고하셨습니다.
                </div>
                <table>
                    <thead>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">신고자 아이디</th>
                            <td colSpan="2">
                                <div>{this.state.id}</div>
                            </td>
                            <th scope="row">신고 대상자</th>
                            <td colSpan="2">
                                <div>{this.state.reportid}</div>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">신고 내용</th>
                                <td colSpan="5">
                                <div className="reportDetail" dangerouslySetInnerHTML={{ __html: codes} }></div>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div className="reportBtns">
                    <button className="Delete" onClick={this.reportDelete}>삭제하기</button>
                </div>
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