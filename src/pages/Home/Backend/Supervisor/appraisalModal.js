import React from 'react'
import './modal.scss'
const AppraisalModal = () => {
    return (
        <div class="modal fade" id="modalAppraisal" tabindex="-1" role="dialog" aria-labelledby="modalAppraisal" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                <div class="modal-header border border-0">
                    <h5 class="modal-title" id="modalAppraisal">Appraisal</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form class="row">
                        <div class="col-6">
                            <p className="skills">Skills</p>
                            <p className="skills">Leadership</p>
                            <p className="skills">Critical Thinking</p>
                            <p className="skills">Productivity</p>
                            <p className="skills">Punctuality</p>
                            <p className="skills">Management</p>                            
                        </div>
                        <div class="col-6">
                        <p className="skills">Score</p>
                        <p className="d-flex score">
                              <input type="text"
                                class="form-control score-input" name="" id="" aria-describedby="helpId" placeholder="0.0" /> <span className="grade">/10.0</span>
                           
                        </p>
                        <p className="d-flex score">
                              <input type="text"
                                class="form-control score-input" name="" id="" aria-describedby="helpId" placeholder="0.0" /> <span className="grade">/10.0</span>
                           
                        </p>
                        <p className="d-flex score">
                              <input type="text"
                                class="form-control score-input" name="" id="" aria-describedby="helpId" placeholder="0.0" /> <span className="grade">/10.0</span>
                           
                        </p>
                        <p className="d-flex score">
                              <input type="text"
                                class="form-control score-input" name="" id="" aria-describedby="helpId" placeholder="0.0" /> <span className="grade">/10.0</span>
                           
                        </p>
                        <p className="d-flex score">
                              <input type="text"
                                class="form-control score-input" name="" id="" aria-describedby="helpId" placeholder="0.0" /> <span className="grade">/10.0</span>
                           
                        </p>
                        </div>
                       
                            <div class="col-12">
                           <span>Overall Rating : </span>
                            </div>
                            <div class="col" style={{marginLeft:'1.2rem'}}>
                                <input type="checkbox" class="form-check-input mt-2" id="exampleCheck1" />
                                <label class="form-check-label" for="exampleCheck1">Excellent</label>
                            </div>
                            <div class="col">
                                <input type="checkbox" class="form-check-input mt-2" id="exampleCheck1" />
                                <label class="form-check-label" for="exampleCheck1">Good</label>
                            </div>
                            <div class="col">
                                <input type="checkbox" class="form-check-input mt-2" id="exampleCheck1" />
                                <label class="form-check-label" for="exampleCheck1">Average</label>
                            </div>
                            <div class="col">
                                <input type="checkbox" class="form-check-input mt-2" id="exampleCheck1" />
                                <label class="form-check-label" for="exampleCheck1">Poor</label>
                            </div>
                            <div class="form-group col-12 mt-3">
                                <label for="exampleFormControlTextarea1">Remark</label>
                                <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                            </div>
                    </form>
                </div>
                <div class="modal-footer border border-0">
                    <button type="button" class="btn cancel" data-dismiss="modal">Close</button>
                    <button type="button" class="btn save-changes">Save changes</button>
                </div>
                </div>
            </div>
</div>
    )
}

export default AppraisalModal
