import React, { Component } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import ToolkitProvider, {
  Search,
  CSVExport,
} from "react-bootstrap-table2-toolkit";
import npower from "../../../../../assets/npower.jpg";
import tradermoni from "../../../../../assets/trader-moni.png";
import axios from "axios";
import "./datatable.scss";
import data from "./reports.json";
const { SearchBar, ClearSearchButton } = Search;
function statusFormatter(cell, row) {
  console.log(row);
  if (row.status) {
    return (
      <div className=" d-flex">
        <strong className="cellActive mr-3">Active</strong>
        <div class="dropdown dropdown-action">
          <a
            href="#"
            class="action-icon grey-btn text-secondary dropdown-toggle"
            data-toggle="dropdown"
            aria-expanded="false"
          >
            Action
          </a>
          <div class="dropdown-menu dropdown-menu-right">
            <a
              class="dropdown-item"
              href="#"
              data-toggle="modal"
              data-target="#edit_leave"
            >
              View Details
            </a>
            <a
              class="dropdown-item"
              href="#"
              data-toggle="modal"
              data-target="#delete_approve"
            >
              Benefits
            </a>
            <a
              class="dropdown-item"
              href="#"
              data-toggle="modal"
              data-target="#delete_approve"
            >
              Knowledge graph
            </a>
          </div>
        </div>
      </div>
    );
  } else if (!row.status) {
    return <div>---</div>;
  }
  return (
    <div className=" d-flex">
      <strong className="cellPending mr-3">Pending</strong>
      <div class="dropdown dropdown-action">
        <a
          href="#"
          class="action-icon grey-btn text-secondary dropdown-toggle"
          data-toggle="dropdown"
          aria-expanded="false"
        >
          Action
        </a>
        <div class="dropdown-menu dropdown-menu-right">
          <a
            class="dropdown-item"
            href="#"
            data-toggle="modal"
            data-target="#edit_leave"
          >
            View Details
          </a>
          <a
            class="dropdown-item"
            href="#"
            data-toggle="modal"
            data-target="#delete_approve"
          >
            Benefits
          </a>
          <a
            class="dropdown-item"
            href="#"
            data-toggle="modal"
            data-target="#delete_approve"
          >
            Knowledge graph
          </a>
        </div>
      </div>
    </div>
  );
}
function nameFormatter(cell, row) {
  if (cell == "N- Power") {
    return (
      <div className="d-flex">
        <p className="mask">
          <img
            src={npower}
            class="img-fluid ${3|rounded-top,rounded-right,rounded-bottom,rounded-left,rounded-circle,|}"
            alt=""
          />
        </p>
        <span> {cell} </span>
      </div>
    );
  }
  return (
    <div className="d-flex">
      <p className="mask">
        <img
          src={tradermoni}
          class="img-fluid ${3|rounded-top,rounded-right,rounded-bottom,rounded-left,rounded-circle,|}"
          alt=""
        />
      </p>
      <span> {cell} </span>
    </div>
  );
}
function dateFormatter(cell, row) {
  if (!row.date_created) {
    return <div>---</div>;
  }
}

export class InterventionReportTable extends Component {
  state = {
    allSchemes: [],
    active: [],
    pending: [],
    disbursed: [],
    // current
    columns: [
      {
        dataField: "programme_name",
        text: "Programme Name",
        sort: true,
      },
      {
        dataField: "scheme_name",
        text: "Scheme Name",
        sort: true,
      },
      {
        dataField: "date_created",
        text: "Date Created",
        formatter: dateFormatter,
        sort: true,
      },
      {
        dataField: "no_of_applicants",
        text: "No. of Applicants",
        sort: true,
      },

      {
        dataField: "no_of_approved",
        text: "Number of Approved",
        sort: true,
      },

      {
        dataField: "status",
        text: "Status",
        formatter: statusFormatter,
        sort: true,
      },
      {
        dataField: "action",
        text: "",
        sort: true,
      },
    ],
  };

  componentDidMount() {
    console.log(data);
    axios
      .get("https://sleepy-wildwood-51098.herokuapp.com/schemes/report")
      .then((response) => {
        console.log(response);
        console.log(response.data);
        const data = response.data;
        let active = data.filter((el) => el.status === "active");
        let pending = data.filter((el) => el.status === "pending");
        let disbursed = data.filter((el) => el.status === "disbursed");
        this.setState({
          allSchemes: data,
          active,
          pending,
          disbursed,
        });
      });
  }

  render() {
    const defaultSorted = [
      {
        dataField: "Name",
        order: "desc",
      },
    ];
    return (
      <div className="container">
        <div
          style={{
            marginTop: 20,
          }}
        >
          <ToolkitProvider
            keyField="id"
            data={this.state.allSchemes}
            columns={this.state.columns}
            search
          >
            {(props) => (
              <div>
                <div class="page-header">
                  <div class="row align-items-center">
                    <div class="col-12 my-2">
                      <h3 class="scheme-report1">Scheme Intervention Report</h3>
                    </div>
                    <div class="col ">
                      <SearchBar
                        {...props.searchProps}
                        placeholder="Search by Scheme Name, Scheme Code"
                        className="search-scheme"
                      />
                    </div>
                    <div class="col-auto float-right ml-auto mb-2">
                      <a
                        href="#"
                        class="btn add-btn"
                        data-toggle="modal"
                        data-target="#add_allSchemes"
                      >
                        <i class="fa fa-plus"></i> Add Scheme
                      </a>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-1 mr-3">
                    <a>
                      <h3 class="active-schemes">ALL</h3>{" "}
                    </a>
                  </div>
                  <div class="col-1 mr-3">
                    <a>
                      <h3 class="pending-schemes">ACTIVE</h3>{" "}
                    </a>
                  </div>
                  <div class="col-1 mr-3">
                    <a>
                      <h3 class="pending-schemes">DISBURSED</h3>{" "}
                    </a>
                  </div>
                  <div class="col-1 mr-3">
                    <h3 class="pending-schemes">PENDING</h3>
                  </div>
                </div>

                <BootstrapTable bordered={false} {...props.baseProps} />
              </div>
            )}
          </ToolkitProvider>
        </div>
      </div>
    );
  }
}

export default InterventionReportTable;
