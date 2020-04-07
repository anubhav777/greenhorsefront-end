import React, { Component } from 'react';
import axios from 'axios'

class Tables extends Component {
    state={
        files:[],
        question:[]
    }
    componentWillMount(){
        let token=localStorage.getItem('Token')
        
        this.getfile(token)
        this.getquestion(token)
    }
    getfile=(token,month)=>{
        axios.get('http://localhost:5000/getallfile/overall',{
            headers:{
                'x-access-token':token
            }
        })
        .then(res =>{
            console.log(res.data)
            let new_array=res.data.data
            let updated_array=new_array.splice((new_array.length-5),new_array.length)
            console.log(updated_array)
            let bg=this.monthmodifier(updated_array)
            
            this.setState({files:bg})

        })
  
    }

    getquestion=(token)=>{
        axios.get('http://localhost:5000/getallquestion/overall',{
            headers:{
                'x-access-token':token
            }
        })
        .then(res =>{
            console.log(res.data)
            let new_array=res.data.data
            let updated_array=new_array.splice((new_array.length-7),new_array.length)
            let bg=this.monthmodifier(updated_array)
            console.log(updated_array)
            this.setState({question:bg})

        })
    }
    monthmodifier=(updated_array)=>{
        var month=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Nov','Dec']
        let final_array=updated_array.map((val)=>{
            let new_date=val.date.split(" ",2)
            let new_split=new_date[1].split(/(?:-| )+/)
            let new_month=(Number(new_split[1])-1)
            val.date=`${month[new_month]}-${new_split[2]} ${new_date[0]}`
            return val
            
        })
        // console.log(updated_array,final_array)
        return final_array
    }
    render() {
        return (
            <section>
                <div className='row'>
<div className='col-md-8'>
<div className="card">
  <div className="card-header border-transparent">
    <h3 className="card-title">Latest Uploaded Question</h3>
    <div className="card-tools">
      <button type="button" className="btn btn-tool" data-card-widget="collapse">
        <i className="fas fa-minus" />
      </button>
      <button type="button" className="btn btn-tool" data-card-widget="remove">
        <i className="fas fa-times" />
      </button>
    </div>
  </div>
  {/* /.card-header */}
  <div className="card-body p-0">
    <div className="table-responsive">
      <table className="table m-0">
        <thead>
          <tr>
            <th>S.No</th>
            <th></th>
            <th>Filename</th>
            <th>Date</th>
            <th>User</th>
          </tr>
        </thead>
        <tbody>
            {this.state.question.map((val,i) =>{
                return(
                    <tr>
                    <td>{(i+1)}</td>
                    <td>  <span className="info-box-icon bg-info elevation-1"><i className="fas fa-upload" /></span></td>
                <td>{val.linkname}</td>
                <td><span >{val.date}</span></td>
                    <td>
                    <div >{val.user}</div>
                    </td>
                </tr>
                )

            })}
          
        
        </tbody>
      </table>
    </div>
    {/* /.table-responsive */}
  </div>
</div>
</div>
<div className='col-md-4'>

<div className="card">
  <div className="card-header">
    <h3 className="card-title">Recently Added Files</h3>
    <div className="card-tools">
      <button type="button" className="btn btn-tool" data-card-widget="collapse">
        <i className="fas fa-minus" />
      </button>
      <button type="button" className="btn btn-tool" data-card-widget="remove">
        <i className="fas fa-times" />
      </button>
    </div>
  </div>
  {/* /.card-header */}
  <div className="card-body p-0">
    <ul className="products-list product-list-in-card pl-2 pr-2">
        {this.state.files.map((val)=>{
            return(
                <li className="item">
                <div className="product-img">
                  <img src={process.env.PUBLIC_URL +"/word.jpg"} alt="Product Image" className="img-size-50" />
                </div>
                <div className="product-info">
                  <a href="javascript:void(0)" className="product-title">{val.filename}
            <span className="badge badge-warning float-right">{val.date}</span></a>
                  <span className="product-description">
                   {val.user}
                  </span>
                </div>
              </li>
            )
        })}
     
      {/* /.item */}
    
     
      {/* /.item */}
    </ul>
  </div>
  {/* /.card-body */}
  <div className="card-footer text-center">
    <a href="javascript:void(0)" className="uppercase">View All Products</a>
  </div>
  {/* /.card-footer */}
</div>
</div>
</div>
</section>
        );
    }
}

export default Tables;