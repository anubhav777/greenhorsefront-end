import React, { Component } from 'react';
import axios from 'axios'
import DataTable,{defaultThemes} from 'react-data-table-component'
class Try extends Component {
    state={
        bla:[],
        disp:"none",
        runscript:false
        
    }
    componentWillMount(){
        // fetch('http://localhost:5000/tryuser')
      this.datafetcher()

    
    }

    datafetcher=()=>{
        let token=localStorage.getItem('Token')
        axios.get('http://localhost:5000/getallquestion/overall',{
            headers:{
                
                'x-access-token':token

            }
        })
        
        .then((res) =>{
            console.log(res.data)
            
            this.setState({bla:res.data.data})
            if (res.data.user==="admin"){
                this.setState({disp:""})
            }
        })
    }
   
    delete=(id)=>(e)=>{
        e.preventDefault()
        let token=localStorage.getItem('Token')
        axios.delete(`http://localhost:5000/deletequestion/${id}`,{
            headers:{
                'x-access-token':token
            }
        })
        .then(res =>{
            console.log(res.data)
            this.datafetcher()
           
        })
        console.log(id)
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
                 
                  padding:'12px',
                  fontFamily: '-apple-system BlinkMacSystemFont'
                  
                  
                },
              },
            },
            cells: {
              style: {
                '&:not(:last-of-type)':{
                  borderRightStyle: 'solid',
                  borderRightWidth: '1px',
                  borderRightColor: defaultThemes.default.divider.default,
                  fontSize:'16px',
               
                
                 
                  padding:'12px',
                  fontFamilySansSerif: 'Source Sans Pro,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbo',
                  
                  
                },
               
              },
            },
          };
          
        const data=this.state.bla
        const columns=[
            {
                name:'Linkname',
                selector:'linkname',
                sortable:true,
                width:'500px'

            },
            {
                name:'Date',
                selector:'date',
                sortable:true
            },
            {
                name:'Status',
                selector:'status',
                sortable:true
            },
            {
                name:'Uploaded By',
                selector:'user',
                sortable:true,

            },
            {
               
                selector:(obj)=><button className='btn btn-block btn-danger' onClick={this.delete(obj.id)}>Delete</button>,
                ignoreRowClick: true,
                allowOverflow: true,
                button: true,
                width: '100px',
                padding:'12px'
                
                
            },
           
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
                        <li className="breadcrumb-item"><a href="#">Home</a></li>
                        <li className="breadcrumb-item active">DataTables</li>
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
                        <h3 className="card-title">DataTable with minimal features &amp; hover style</h3>
                      </div>
                      
                        
                        <DataTable style={ml} className="table table-bordered table-hover"
                        title='Question Uploads'
                        columns={columns}
                        data={data}
                        customStyles={customStyles}
                        pagination
                        
                       
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
const ml={
    marginTop:"-100px"
}

export default Try;