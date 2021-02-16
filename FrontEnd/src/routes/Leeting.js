import React from "react";
import "./Slider.css";
import "./Leeting.css";

class Leeting extends React.Component {
    componentDidMount() {
        if (document.getElementById('side_wrap').classList.contains('open')) {
            document.getElementById('side_wrap').classList.remove('open');
            document.getElementById('side_wrap').classList.add('close');
            document.getElementById('side_wrap').setAttribute('style', 'right:-400px');
            document.getElementById('bg').setAttribute('style', 'display:none');
        }
    }
    render() {
        return (
            <div id="main_content">
                <div id="leetings1280">
                    <img src="img/leeting1280.png" alt="leeting"/>
                </div>
                <div id="leetings768">
                    <img src="img/leeting768.png" alt="leeting"/>
                </div>
                <div id="leetings481">
                    <img src="img/leetingmin.png" alt="leeting"/>
                </div>                
            </div>
        )
    }
}
  
export default Leeting;