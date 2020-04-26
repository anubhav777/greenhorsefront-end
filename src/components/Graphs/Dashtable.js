import React, { Component } from 'react';
import axios from 'axios'
import DataTable,{defaultThemes} from 'react-data-table-component';
import token_genrator from '../Miscallenous/Token';
class Dashtable extends Component {
    state={
        data:[],
        call_method:'file',
        token:'',
        current_date:'2020-04-06',
        allusers:[],
        data_caller:'work',
        stats:false,
        user_method:'getfile/50',
        userid:'11'
    }
    componentWillMount(){
        let date= new Date()
        let token=localStorage.getItem('Token')
        let cuurent_month=('0' + (date.getMonth()+1)).slice(-2)
        let current_date= date.getFullYear() + '-'+ cuurent_month + '-'+('0' + date.getDate()).slice(-2)
        this.setState({token:token})
       

    }
    componentDidMount(){
      if(token_genrator()){
        this.getdata()

      }
        
    }
    getdata=()=>{
          
        let datas='date'
      axios.get(`https://greehorsebackend.herokuapp.com/graph?stats=${datas}`,{
          headers:{
              'x-access-token':token_genrator(),
              'send_methods':this.state.call_method,
              'curr_date':this.state.current_date,

          }
      })
      .then(res =>{
       this.setState({data:res.data.data})
      })
    }
    userfetcher=()=>{
     
        axios.get('https://greehorsebackend.herokuapp.com/getalluser',{
            headers:{
                'x-access-token':token_genrator()
            }
        })
        
        .then(res =>{
            console.log(res.data)
            
            this.setState({allusers:res.data.data})
        })
    }
    updateval=(name)=>(e)=>{
        e.preventDefault()
       if(name === 'file' || name === 'question'){
          this.setState({call_method:name,data_caller:'work'},()=>{
               this.getdata()
          })
      }
      else{
        this.setState({data_caller:'users'},()=>{
          this.userfetcher();
          this.datafetcher();
        })

      }
 
     }
     value_changer=(e)=>{

         this.setState({[e.target.name]:e.target.value})
     }
     datafetcher=()=>{
       
         let userid=Number(this.state.userid)
         let user_method=this.state.user_method
         axios.get(`https://greehorsebackend.herokuapp.com/${user_method}?userid=${userid}`,{headers:{

         'x-access-token':token_genrator()
         }})
         .then(res =>{
             this.setState({data:res.data.data})
         })


     }
     updatedate=async (e)=>{
      console.log(e.target.name)
      this.setState({[e.target.name]:e.target.value},()=>{
        this.getdata()
      })
          
      
     
     
    }
    render() {
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
        const data=this.state.data
        const column=
        this.state.data_caller === 'work' ? [
          
            {
                name:'Date',
                selector:'date',

            },
            {
                name:'Username',
                selector:'y_axis',
                sortable:true
            },
            {
                name:'Total Upload',
                selector:'total',
                sortable:true
            }
        ]
    :[
        {
            name:'S.no',
            selector:'sno'
        },

        {
            name:'Linkname',
            selector:'linkname',
            sortable:true
        },
        {
          nae:'Username',
          selector:'user',  
        },
        {
            name:'Status',
            selector:'status',
            sortable:true
        },
        {
            name:'Date',
            selector:'dates',
            sortable:true
        },
        
    ]
        return (
           
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
                    <li className="breadcrumb-item"><a href="/home">Home</a></li>
                    <li className="breadcrumb-item active"><a href="/dashtab">DataTables</a></li>
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
                    <h3 className="card-title">Users DataTable</h3>
                    <div className="card-tools">
                <button type="button" className="btn btn-tool" data-card-widget="collapse">
                  <i className="fas fa-minus" />
                </button>
                <div className="btn-group">
                  <button type="button" className="btn btn-tool dropdown-toggle" data-toggle="dropdown">
                    <i className="fas fa-cogs" />
                  </button>
                  <div className="dropdown-menu dropdown-menu-right" role="menu">
                  <li className="dropdown-item" name='file' onClick={this.updateval('file')}>File</li>
                  <li className="dropdown-item" name='question' onClick={this.updateval('question')}>Question</li>
                  <li className="dropdown-item" name='user' onClick={this.updateval('user')}>Users</li>
                  </div>
                </div>
                
                   {this.state.data_caller === 'users' ?
                   <div className="btn-group">
                  <button className="btn btn-tool btn-sm daterange"  onClickCapture={(e)=>{e.preventDefault(); this.setState({stats:!this.state.stats})}}>
                    <i className="fas fa-calendar-alt" />
                    </button>
                     <div style={!this.state.stats ? {display:'none'} : disp} role="menu">
                    <div className='row' >
                    <div className="col-5" style={{marginLeft:'15px'}}>
                    <select name='userid'  onChange={this.value_changer} className="form-control">
                        {this.state.allusers.map((val,i)=>{
                            return(
                            <option key={i} value={val.id}>{val.fullname}</option>
                            )
                        })}
                    </select>
                  </div>
                  <div className="col-6">
                    <select name='user_method'  onChange={this.value_changer} className="form-control">
                          <option value='getfile/50'>File</option>
                          <option value='getquestion/50'>Question</option>
                          </select>
                          </div>
                  </div>
                  <div style={ml} className="col-4">
                    <button type='button' class="btn btn-block btn-info" onClick={async (e) =>{ e.preventDefault(); await this.datafetcher(); this.setState({stats : false})}}>Update</button>
                  </div>
                  </div>
                  </div>
                   :
                    ''
                  }
                  {this.state.data_caller === 'work' ?                 
                   <div  className="btn-group">
                  <button type="button" className="btn btn-tool dropdown-toggle" data-toggle="dropdown">
                    <i className="fas fa-calendar-alt" />
                    </button>
                  <div className="dropdown-menu dropdown-menu-right" role="menu">
                  <input type='date' name='current_date' className="form-control" onChange={this.updatedate} />

              </div>
              </div>: ''}
                                  
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
export default Dashtable;