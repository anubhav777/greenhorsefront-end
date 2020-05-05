import React, { Component } from 'react';
import DataTable,{defaultThemes} from 'react-data-table-component'
import token_genrator from '../Miscallenous/Token';
import Axios from 'axios';

class Userinsight extends Component {
    state={
        data:[],
        users:[],
        userid:'none',
        date:'',
        data_caller:'overall',
        stats:false,
        usertype:'',
        title:''
    }
    UNSAFE_componentWillMount(){
        let date= new Date()
        let cuurent_month=('0' + (date.getMonth()+1)).slice(-2)
        let current_date= date.getFullYear() + '-'+ cuurent_month + '-'+('0' + date.getDate()).slice(-2)
        this.setState({date:current_date})
    }
    componentDidMount(){
        if(token_genrator()){
          
            this.getfile()
            this.getuser()
            let usertype=localStorage.getItem('Usertype')
            this.setState({usertype:usertype})
        }

    }
    getfile=async ()=>{
        let body= JSON.stringify({
            date:this.state.date
        })
        await Axios.post(`https://greehorsebackend.herokuapp.com/dateuser?userid=${this.state.userid}`,body,{
            headers:{
                'x-access-token':token_genrator(),
                'Content-Type':'application/json'
            }
        })
        .then(res =>{
         
            this.setState({data:res.data.data},()=>{
                this.useridentifier(this.state.userid)
            })
        })
    }
    getuser=()=>{
        Axios.get('https://greehorsebackend.herokuapp.com/getalluser',{
            headers:{
                'x-access-token':token_genrator()
            }
        })
        
        .then(res =>{
          
            
            this.setState({users:res.data.data})
        })
    }
    updateval=(name)=>(e)=>{
        e.preventDefault()
       if(name === 'overall'){
          this.setState({data_caller:name,userid:'none'},()=>{

            this.getfile()
          })
      }
      else{
        this.setState({data_caller:'user'})

      }
 
     }
     updatedate=(e)=>{
         this.setState({[e.target.name]:e.target.value})
     }
     useridentifier=(id)=>{
         if(id=== 'none'){
             this.setState({title:'User DataTable'})
         }
         else{
            let new_arr=''
            let new_dat=this.state.users.filter((val)=>{
                
                if(val.id === id){
                    new_arr=val.fullname
                    
                }
                return new_arr
   
            })
            this.setState({title:new_arr})
            

         }
         
       
     }
    render() {
        const data=this.state.data
        const filter_dat= this.state.userid === 'none' ? 'username' : 'status'
        const Title= this.state.userid === 'none' ? 'Username' : 'Status'
       
        const customStyles = {
            header: {
                style: {
                  minHeight: '56px',
                },
              },
              headRow: {
                style: {
                  borderTopStyle: 'solid',
                  borderTopWidth: '1px',
                  borderTopColor: defaultThemes.default.divider.default,
                },
              },
              headCells: {
                style: {
                  '&:not(:last-of-type)': {
                    borderRightStyle: 'solid',
                    borderRightWidth: '1px',
                    borderRightColor: defaultThemes.default.divider.default,
                    fontSize:'16px',
                    fontFamilySansSerif11: 'Source Sans Pro,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbo',
                  
                  },
                },
              },
              cells: {
                style: {
                  '&:not(:last-of-type)': {
                    borderRightStyle: 'solid',
                    borderRightWidth: '1px',
                    borderRightColor: defaultThemes.default.divider.default,
                    fontSize:'16px',
                    fontFamilySansSerif11: 'Source Sans Pro,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbo',
                  
                    
                  },
                },
              },
            };
          
        const column=[{
            name:'Filename',
            selector:'filename',
            sortable:true
        },
        {
            name:'Question',
            selector:'url',
            sortable:true
        },
        {
            name:'Date',
            selector:'date',
            sortable:true
        },
        {
            name:Title,
            selector:filter_dat,
            sortable:true
        }
    ]
        return (
            <div>
            <div className="content-wrapper">
              {/* Content Header (Page header) */}
              <section className="content-header">
                <div className="container-fluid">
                  <div className="row mb-2">
                    <div className="col-sm-6">
                      <h1>DataTables</h1>
                    </div>
                    <div className="col-sm-6">
                  <ol className="breadcrumb float-sm-right">
                    <li className="breadcrumb-item"><a href="/getallfile">DataTable</a></li>
                <li style={this.state.usertype !== 'admin' ? {display:'none'} : {display:'list-item'}} className="breadcrumb-item active"><a href="/userinsight">User-Insight</a></li>
                  </ol>
                </div>
                  </div>
                </div>{/* /.container-fluid */}
              </section>
              {/* Main content */}
              <section className="content">
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-header">
                    <h3 className="card-title">{this.state.title}</h3>
                    <div className="card-tools">
                <button type="button" className="btn btn-tool" data-card-widget="collapse">
                  <i className="fas fa-minus" />
                </button>
                <div className="btn-group">
                  <button type="button" className="btn btn-tool dropdown-toggle" data-toggle="dropdown">
                    <i className="fas fa-cogs" />
                  </button>
                  <div className="dropdown-menu dropdown-menu-right" role="menu">
                  <li className="dropdown-item" name='file' onClick={this.updateval('overall')}>Overall</li>
                  <li className="dropdown-item" name='user' onClick={this.updateval('user')}>Users</li>
                  </div>
                </div>
                
                   
                   <div className="btn-group">
                  <button className="btn btn-tool btn-sm daterange"  onClickCapture={(e)=>{e.preventDefault(); this.setState({stats:!this.state.stats})}}>
                    <i className="fas fa-calendar-alt" />
                    </button>

                     <div style={!this.state.stats ? {display:'none'} : disp}  role="menu">
                    <div className='row' >
                    {this.state.data_caller === 'user' ? <div  className="col-5" style={{marginLeft:'15px'}}>
                    <select name='userid'  onChange={this.updatedate} className="form-control">
                        {this.state.users.map((val,i)=>{
                            return(
                            <option key={i} value={val.id}>{val.fullname}</option>
                            )
                        })}
                    </select>
                  </div> : ""}
                  <div className="col-6" style={this.state.data_caller === 'user' ? {marginLeft:'0px'} : {marginLeft:'20%'}}>
                  <input type='date' style={this.state.data_caller === 'user' ? {width:'100%'} : {width:'170px'}} name='date' className="form-control" onChange={this.updatedate} />
                          </div>
                  </div> 
                  <div style={ml} className="col-4">
                    <button type='button' class="btn btn-block btn-info" onClick={async (e) =>{ e.preventDefault(); await this.getfile(); this.setState({stats : false})}}>Update</button>
                  </div>
                  </div>
                  </div>
                                  
                <button type="button" className="btn btn-tool" data-toggle="dropdown" data-card-widget="remove">
                  <i className="fas fa-times" />
                </button>
                
              </div>
                  </div>
                  
                    
                  <DataTable
                  
                    data={data}
                    columns={column}
                    pagination
                    noHeader
                    customStyles={customStyles}
                    
                    
                    />
         
                  {/* /.card-body */}
                </div>
                {/* /.card */}
             
                {/* /.card */}
              </div>
              {/* /.col */}
            </div>
            {/* /.row */}
          </section>
          {/* /.content */}
        </div>
        </div>
        
                
           
               
        
        );
    }
}
const disp={
  
    position: 'absolute',
    willChange: 'transform',
    left: '0px',
    transform: 'translate3d(-116px, 19px, 0px)',
    top: '100%',
    zIndex: '1000',
    float: 'left',
    minWidth: '10rem',
    padding: '.5rem 0',
    margin: '.125rem 0 0',
    fontSize: '1rem',
    color: '#212529',
    textAlign: 'left',
    listStyle: 'none',
    backgroundColor:'#fff',
    backgroundClip: 'padding-box',
    border: '1px solid rgba(0,0,0,.15)',
    borderRadius: '.25rem',
    boxShadow: '0 0.5rem 1rem rgba(0,0,0,.175)',
    width:'300px',height:'100px',marginLeft:'-100px'

}
const ml={
    marginTop:'10px',
    marginLeft:'35%'
  }

export default Userinsight;