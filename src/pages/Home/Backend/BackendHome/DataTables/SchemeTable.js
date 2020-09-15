import React, { Component, useContext } from "react";
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
import data from "./scheme.json";
import { SchemeContext } from "../../../../../components/ContextAPI/SchemesAPI";
import { Link } from "react-router-dom";
const { SearchBar, ClearSearchButton } = Search;

function dateFormatter(cell, row) {
  if (!row.created_at) {
    return <div>---</div>;
  }
}

function sponsorFormatter(cell, row) {
  if (!row.sponsor) {
    return <div>---</div>;
  }
}
function statusFormatter(cell, row) {
  console.log(row);
  console.log(cell);
  if (row.status) {
    return (
      <div className=" d-flex">
        <strong className="cellActive mr-3"> Active</strong>

        <div class="dropdown dropdown-action">
          <a
            href="#"
            class="action-icon text-secondary"
            data-toggle="dropdown"
            aria-expanded="false"
          >
            <i class="fa fa-ellipsis-v" aria-hidden="true"></i>
          </a>
          <div class="dropdown-menu dropdown-menu-right">
            <a
              class="dropdown-item text-success"
              href="#"
              data-toggle="modal"
              data-target="#edit_leave"
            >
              Active <i class="fa fa-check text-success" aria-hidden="true"></i>{" "}
            </a>
            <a
              class="dropdown-item"
              href="#"
              data-toggle="modal"
              data-target="#delete_approve"
            >
              Pending
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
          class="action-icon text-secondary"
          data-toggle="dropdown"
          aria-expanded="false"
        >
          <i class="fa fa-ellipsis-v" aria-hidden="true"></i>
        </a>
        <div class="dropdown-menu dropdown-menu-right">
          <a
            class="dropdown-item"
            href="#"
            data-toggle="modal"
            data-target="#edit_leave"
          >
            {" "}
            Active
          </a>
          <a
            class="dropdown-item text-warning"
            href="#"
            data-toggle="modal"
            data-target="#delete_approve"
          >
            Pending <i class="fa fa-check text-warning" aria-hidden="true"></i>
          </a>
        </div>
      </div>
    </div>
  );
}
function nameFormatter(cell, row) {
  if (cell == "NPOWER") {
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
  } else if (cell == "TRADERMONI") {
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
  } else {
    return (
      <div className="d-flex">
        <p className="mask"></p>
        <span> {cell} </span>
      </div>
    );
  }
}

const SchemeTable = () => {
  const [columns, setColumns] = React.useState([
    {
      dataField: "scheme_name",
      text: "Scheme Name",
      formatter: nameFormatter,
      sort: true,
    },
    {
      dataField: "scheme_code",
      text: "Code",
      sort: true,
    },
    {
      dataField: "created_at",
      text: "Date Created",
      formatter: dateFormatter,
      sort: true,
    },
    {
      dataField: "sponsor",
      text: "Sponsor",
      formatter: sponsorFormatter,
      sort: true,
    },

    {
      dataField: "benefiary",
      text: "Beneficiaries",
      formatter: beneficiariesFormatter,
      sort: true,
    },

    {
      dataField: "status",
      text: "Status",
      formatter: statusFormatter,
      sort: true,
    },
  ]);
  const [data] = useContext(SchemeContext);
  const [allSchemes, setAllSchemes] = React.useState([]);

  const [active, setActive] = React.useState([false, false]);
  console.log(data);

  function beneficiariesFormatter(cell, row) {
    return (
      <Link
        to={`/beneficiaries/${row.scheme_name}`}
        className="click-to-view-benefi"
      >
        Click to see beneficiaries
      </Link>
    );
  }
  const filterStatus = (val) => {
    const currentState = active;
    setActive(!currentState);
    // this.setState({ active: !currentState });
    let filter = data.filter((e) => e.Status == val);
    console.log(filter);
    setAllSchemes(filter);
  };
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
        <ToolkitProvider keyField="id" data={data} columns={columns} search>
          {(props) => (
            <div>
              <div class="page-header">
                <div class="row align-items-center">
                  <div class="col-12 my-2">
                    <h3 class="scheme-report">Scheme Report</h3>
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
                <div class="col-2 my-2">
                  <a>
                    <h3
                      onClick={() => filterStatus(true)}
                      class="active-schemes"
                    >
                      ACTIVE SCHEMES
                    </h3>{" "}
                  </a>
                </div>
                <div class="col-2 my-2">
                  <a>
                    <h3
                      onClick={() => filterStatus(false)}
                      class="pending-schemes"
                    >
                      PENDING SCHEMES
                    </h3>{" "}
                  </a>
                </div>
              </div>

              <BootstrapTable bordered={false} {...props.baseProps} />
            </div>
          )}
        </ToolkitProvider>
      </div>
    </div>
  );
};

// export class SchemeTable extends Component {
//   static contextType = SchemeContext;

//   state = {
//     allSchemes: [],
//     active: [false, false],
//     columns: [
//       {
//         dataField: "scheme_name",
//         text: "Scheme Name",
//         formatter: nameFormatter,
//         sort: true,
//       },
//       {
//         dataField: "scheme_code",
//         text: "Code",
//         sort: true,
//       },
//       {
//         dataField: "created_at",
//         text: "Date Created",
//         formatter: dateFormatter,
//         sort: true,
//       },
//       {
//         dataField: "sponsor",
//         text: "Sponsor",
//         formatter: sponsorFormatter,
//         sort: true,
//       },

//       {
//         dataField: "benefiary",
//         text: "Beneficiaries",
//         formatter: beneficiariesFormatter,
//         sort: true,
//       },

//       {
//         dataField: "status",
//         text: "Status",
//         formatter: statusFormatter,
//         sort: true,
//       },
//     ],
//   };
//   filterStatus(val) {
//     const currentState = this.state.active;
//     this.setState({ active: !currentState });
//     let filter = data.filter((e) => e.Status == val);
//     console.log(filter);
//     this.setState({
//       allSchemes: filter,
//     });
//   }
//   componentDidMount() {
//     const data = this.context;
//     console.log(data);
//     axios
//       .get("https://sleepy-wildwood-51098.herokuapp.com/schemes/all")
//       .then((response) => {
//         console.log(response.data);
//         const data = response.data;
//         this.setState({
//           allSchemes: data,
//         });
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }
//   render() {
//     const defaultSorted = [
//       {
//         dataField: "Name",
//         order: "desc",
//       },
//     ];
//     return (
//       <div className="container">
//         <div
//           style={{
//             marginTop: 20,
//           }}
//         >
//           <ToolkitProvider
//             keyField="id"
//             data={this.state.allSchemes}
//             columns={this.state.columns}
//             search
//           >
//             {(props) => (
//               <div>
//                 <div class="page-header">
//                   <div class="row align-items-center">
//                     <div class="col-12 my-2">
//                       <h3 class="scheme-report">Scheme Report</h3>
//                     </div>
//                     <div class="col ">
//                       <SearchBar
//                         {...props.searchProps}
//                         placeholder="Search by Scheme Name, Scheme Code"
//                         className="search-scheme"
//                       />
//                     </div>
//                     <div class="col-auto float-right ml-auto mb-2">
//                       <a
//                         href="#"
//                         class="btn add-btn"
//                         data-toggle="modal"
//                         data-target="#add_allSchemes"
//                       >
//                         <i class="fa fa-plus"></i> Add Scheme
//                       </a>
//                     </div>
//                   </div>
//                 </div>
//                 <div class="row">
//                   <div class="col-2 my-2">
//                     <a>
//                       <h3
//                         onClick={() => this.filterStatus(true)}
//                         class="active-schemes"
//                       >
//                         ACTIVE SCHEMES
//                       </h3>{" "}
//                     </a>
//                   </div>
//                   <div class="col-2 my-2">
//                     <a>
//                       <h3
//                         onClick={() => this.filterStatus(false)}
//                         class="pending-schemes"
//                       >
//                         PENDING SCHEMES
//                       </h3>{" "}
//                     </a>
//                   </div>
//                 </div>

//                 <BootstrapTable bordered={false} {...props.baseProps} />
//               </div>
//             )}
//           </ToolkitProvider>
//         </div>
//       </div>
//     );
//   }
// }

export default SchemeTable;
