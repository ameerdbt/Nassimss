import React, { Component } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';  
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import npower from '../../../../assets/n-power.jpg'
import tradermoni from '../../../../assets/trader-moni.jpg'
import axios from "axios";
import { Link } from "react-router-dom";

import data from './beneficiaryLists.json'
import BackendNav from "../../../../components/Nav/BackendNav";
import Tab from "../../../../components/Nav/Tabs";
import AppraisalModal from "./appraisalModal";
import LeaveRequestModal from "./LeaveRequestModal";
import Overview from "./Overview";
var Router = require("react-router");
var browserHistory = Router.browserHistory;
const { SearchBar, ClearSearchButton } = Search;
function actionFormatter(cell, row) {
  console.log(row) 
  return (
    <div className=' d-flex'>    
    <div class="dropdown dropdown-action">
        <a href="#" class="action-icon grey-btn text-secondary dropdown-toggle" data-toggle="dropdown" aria-expanded="false">Action</a>
            <div class="dropdown-menu dropdown-menu-right">
              <a class="dropdown-item" href="#" data-toggle="modal" data-target="#modalAppraisal">View details</a>
              <a class="dropdown-item" href="#" data-toggle="modal" data-target="#modalLeaveRequest">Appraisal</a>
              <a class="dropdown-item" href="#" data-toggle="modal" data-target="#delete_approve">Leave Status</a>
            </div>
    </div>
  </div>
    
  );
}
function statusFormatter(cell, row) {
    console.log(row)
    console.log(cell)
    if (row.leave_request == 'None') {
      return (
        <div className=' d-flex'>
          <strong className="cellNone mr-3"> None</strong>
        </div>
      );
    }
    return (
      <div className=' d-flex'>
      <strong className="cellPending mr-3">Pending</strong>     
    </div>
      
    );
  }

export class BeneficiaryLists extends Component {
  state = {
    allSchemes: [],
    traderMoni: [],
    npower: [],
    displaying: [],
    displayText:'N-POWER',
    columns: [     

        {
          dataField: "name",
          text: "Name",        
          sort: true,
        },
        {
          dataField: "email",
          text: "Email Address",
          sort: true,
        },      
        {
          dataField: "phone",
          text: "Phone Number",
          sort: true,
        },
        {
          dataField: "batch",
          text: "Batch",
          sort: true,
        },
        {
          dataField: "ppa",
          text: "PPA",
          sort: true,
        },
        {
          dataField: "leave_request",
          text: "Leave Request",
          formatter: statusFormatter,
          sort: true,
        },
        {
          dataField: "appraisal",
          text: "Appraisal",
          sort: true,
        },
        {
          dataField: "action",
          text: "Action",
          formatter: actionFormatter, 
        }     
      ],
  };
  toggleData(type){
      if(type == 'npower'){
          this.setState({
              displaying: this.state.npower,
              displayText: 'N-POWER'
          })
      }else{
        this.setState({
            displaying: this.state.traderMoni,
            displayText: 'Trader Moni'
        })
      }
  }
  componentDidMount() {
	console.log(data)
    // axios.get("./mock.json").then((response) => {
	// 	console.log(response)
    //   console.log(response.data);
    let traderMoni = data.filter(e => e.scheme == 'tradermoni')
    let npower = data.filter(e => e.scheme == 'npower')
      this.setState({
        allSchemes: data,
        npower,
        traderMoni,
        displaying: npower
      });
    // });
  }

  render() {
    
	const defaultSorted = [{
		dataField: 'Name',
		order: 'desc'
	  }];
    return (
      <div>
        <BackendNav />
          <div  className="border border-light"  style={{
            marginTop: '20px',
            background: 'white',
            borderBottom: '2px solid #fafafa'
          }}>         
        <ul className="container nav nav-pills  mb-3 tab-pills" id="pills-tab" role="tablist">
                <li className="nav-item">
                    <a className="nav-link active" id="pills-overview-tab" data-toggle="pill" href="#pills-overview" role="tab" aria-controls="pills-overview" aria-selected="true">Overview</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" id="pills-beneficiaries-tab" data-toggle="pill" href="#pills-beneficiaries" role="tab" aria-controls="pills-beneficiaries" aria-selected="false">Beneficiaries</a>
                </li>               
        </ul>
        </div>
        
        <div className="tab-content" id="pills-tabContent">
            <div className="tab-pane fade show active" id="pills-overview" role="tabpanel" aria-labelledby="pills-overview-tab">
                <div className="container">
                  <Overview />
                </div>
            </div>
            <div className="tab-pane fade" id="pills-beneficiaries" role="tabpanel" aria-labelledby="pills-beneficiaries-tab">
                <div>
                <ul className="container nav nav-pills  mb-3 tab-pills" id="pills-tab" style={{height:'0px', marginTop:'0px'}} role="tablist">
                    <li className="nav-item border-0">
                        <a onClick={() => this.toggleData('npower')} className="nav-link active border-0" id="pills-npower-tab" data-toggle="pill" href="#npower" role="tab" aria-controls="pills-home" aria-selected="true">NPOWER</a>
                    </li>
                     <li className="nav-item">
                        <a onClick={() => this.toggleData('tradermoni')} className="nav-link border-0" id="pills-profile-tab" data-toggle="pill" href="#pills-trader-moni" role="tab" aria-controls="pills-profile" aria-selected="false">Trader Moni</a>
                    </li>               
                </ul>
                </div>
           
           

        <div
        
         style={{background: '#F7F7F7'}}
        >
			  <ToolkitProvider
  keyField="id"
  data={this.state.displaying}
  columns={this.state.columns}
  search
>
  {
    props => (
      <div className="container">
          
            <div class="page-header mt-5">
						<div class="row align-items-center">
							<div class="col-12 my-2">
								<h3 class="mt-3">{this.state.displayText} BENEFICIARY LIST</h3>
								
							</div>
							<div class="col ">							
                            <div class="dropdown show">
                            <a class="btn border  dropdown-toggle" style={{border:'1px solid #fafafa', height:'45px'}} href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Filter by
                            </a>

                            <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                <a class="dropdown-item" href="#">Batch</a>
                                <a class="dropdown-item" href="#">Leave</a>
                                <a class="dropdown-item" href="#">PPA</a>
                            </div>
                            </div>
							</div>
							<div class="col-auto float-right ml-auto mb-2">
                            <SearchBar { ...props.searchProps } placeholder="Search by Scheme Name, Scheme Code" className="search-scheme mr-2" />       
						
								<a href="#" class="btn green-border" data-toggle="modal" data-target="#add_allSchemes" style={{height:'50px', marginBottom:'4px'}}> <i class="las la-file-upload"></i> Export Data</a>
								
							</div>
						</div>
					</div>
						
        
        <BootstrapTable
          bordered={ false }
          style={{background:'white'}}
          { ...props.baseProps }
        />
        
      </div>
    )
  }
</ToolkitProvider>
    
        </div>
      </div>
      </div>
        <AppraisalModal />
        <LeaveRequestModal />
        </div>
    );
  }
}

export default BeneficiaryLists;
