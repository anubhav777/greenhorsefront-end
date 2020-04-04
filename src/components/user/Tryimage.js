import React, { Component } from 'react';
import axios from 'axios'
import fileDownload from 'js-file-download';

class Tryimage extends Component {
    dowloadfile=(e)=>{
        e.preventDefault()
       
        const path='Users/programmer_coder_admin_administrator_5628_1920x1080.jpg'
        axios.get(`http://localhost:5000/download/${path}`,{
            headers:{
                'Access-Control-Allow-Origin':'*',
                'Access-Control-Expose-Headers': '*'
            },
            responseType:'blob'
        })
        .then(response  =>{
            // console.log(response.request.getResponseHeader('Content-Disposition')[filename])
            let new_header=response.request.getResponseHeader('Content-Disposition')
            let new_split=new_header.split(";",2)
            let file_split=new_split[1].split("=",2)
            let filename=file_split[1]
            let filename_split=filename.split("/",2)
            let new_filename=filename_split[1]
            console.log(new_filename)
            // fileDownload(response.data,new_filename)
            this.converbase(response.data)
        })
        
    }
    
    // getBase64FromImageUrl=(url)=> {
    //     var img = new Image();
    
    //     img.setAttribute('crossOrigin', 'anonymous');
    
    //     img.onload = function () {
    //         var canvas = document.createElement("canvas");
    //         canvas.width =this.width;
    //         canvas.height =this.height;
    
    //         var ctx = canvas.getContext("2d");
    //         ctx.drawImage(this, 0, 0);
    
    //         var dataURL = canvas.toDataURL("image/png");
    
    //         alert(dataURL.replace(/^data:image\/(png|jpg);base64,/, ""));
    //     };
    
    //     img.src = url;
    //     console.log(url,img)
    // }
    converbase=(url)=>{
        const reader= new FileReader()
        reader.readAsDataURL(url)
        reader.onloadend = function(){
            let base64data=reader.result
            let new_split=base64data.split(",",2)
            // let tryop=base64data.replace(/^data:image\/(png|jpeg);base64,/, "")
            // console.log(tryop,new_split[1])
            let new_image=new_split[1]
            localStorage.setItem("Profile",new_image)

        }
    }
    render() {
        return (
            <div>
               <button onClick={this.dowloadfile}>Down</button> 
            </div>
        );
    }
}

export default Tryimage;