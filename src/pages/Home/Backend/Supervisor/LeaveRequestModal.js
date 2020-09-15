import React from 'react'
import './modal.scss'
const LeaveRequestModal = () => {
    return (
        <div class="modal fade" id="modalLeaveRequest" tabindex="-1" role="dialog" aria-labelledby="modalLeaveRequest" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                <div class="modal-header border border-0">
                    <h5 class="modal-title" id="modalLeaveRequest">Leave Request</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                <ul class="nav nav-tabs border border-0" id="myTab" role="tablist">
  <li class="nav-item">
    <a class="nav-link active" id="application-tab" data-toggle="tab" href="#application" role="tab" aria-controls="application" aria-selected="true"><h5>Application</h5></a>
  </li>
  <li class="nav-item">
    <a class="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false"><h5>History</h5></a>
  </li>  
</ul>
<div class="tab-content" id="myTabContent">
  <div class="tab-pane fade show active" id="application" role="tabpanel" aria-labelledby="application-tab">
  <div class="row">
                        <div class="col-6">
                            <p className="skills mb-0">Leave Type</p>
                            <span className="leave-info">Sick Leave</span>
                                                       
                        </div>
                        <div class="col-6">
                        <p className="skills mb-0">Number of Days</p>
                        <span className="leave-info">
                            10
                        </span>                       
                        </div>
                        <div class="col-6 mt-4">
                            <p className="skills mb-0">From</p>
                            <span className="leave-info">10th Sep, 2020</span>
                                                       
                        </div>
                        <div class="col-6 mt-4">
                        <p className="skills mb-0">To</p>
                        <span className="leave-info">
                            19th Sep, 2020
                        </span>
                       
                        </div>
                       
                            <div class="col-12 mt-4">
                           <p>Reason for Leave </p>
                           <span className="leave-info">
                           During my last medical checkup, It was found that I had serious hypertensive tendecies, so I was advised by my doctor to take some time of work to get a good rest.
                           </span>
                            </div>
                            <div class="col-11 my-4 dashed"></div>
                            <div class="col" style={{marginLeft:'1.2rem'}}>
                                <input type="checkbox" class="form-check-input mt-2" id="exampleCheck1" />
                                <label class="form-check-label" for="exampleCheck1">Leave Status:</label>
                            </div>
                            <div class="col">
                                <input type="checkbox" class="form-check-input mt-2" id="exampleCheck1" />
                                <label class="form-check-label" for="exampleCheck1">Accepted</label>
                            </div>
                            <div class="col">
                                <input type="checkbox" class="form-check-input mt-2" id="exampleCheck1" />
                                <label class="form-check-label" for="exampleCheck1">Declined</label>
                            </div>
                            <div class="col">
                                <input type="checkbox" class="form-check-input mt-2" id="exampleCheck1" />
                                <label class="form-check-label" for="exampleCheck1">Leave as Pending</label>
                            </div>
                            <div class="form-group col-12 mt-3">
                                <label for="exampleFormControlTextarea1">Comment</label>
                                <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                            </div>
                    </div>
  </div>
  <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
  <p>No leave request has been made</p>
      </div>
 
</div>
              
                
                <div class="modal-footer border border-0">
                    <button type="button" class="btn cancel" data-dismiss="modal">Close</button>
                    <button type="button" class="btn save-changes">Save changes</button>
                </div>
                </div>
                
               
            </div>
            </div>
            </div>

    )
}

export default LeaveRequestModal
