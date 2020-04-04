import React, { Component } from 'react';

class Trypicture extends Component {
    componentDidMount(){
        var dataImage = localStorage.getItem('Profile');
        let bannerImg = document.getElementById('tableBanner');
        bannerImg.src = "data:image/png;base64," + dataImage;
    }
    render() {
        return (
            <div>
                <img src="" id="tableBanner"/>
            </div>
        );
    }
}

export default Trypicture;