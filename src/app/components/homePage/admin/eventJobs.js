import { observer } from 'mobx-react';
import { browserHistory } from 'react-router';

import Api from '../../../api/baseApi';
import React from 'react';
import ReactDOM from 'react-dom';
import eventStore from '../../../event/eventStore';
import currentEvent from '../../../event/currentEvent';
import currentJob from '../../../event/currentJob';

require('../../app.less')

@observer
class EventJobs extends React.Component {

  componentWillMount() {
    currentJob.jobTime = ''
    currentJob.jobName = ''
    currentJob.jobLocation = ''
    currentJob.jobDate = ''
    currentJob.jobDescription = ''
    currentJob.volunteerName = ''
    currentJob.volunteerID = null
    this.snackalert = ''
  }

    render() {
        return (
           <div className='jobs admin'>
            <h2>Jobs(Scroll to View More)</h2>
            <div className='jobs-body'>
              {this._createJobElements()}
            </div>
            <div className="snackbar" ref='snackbar'>{this.snackalert}</div>
           </div>
        )
    }

    _createJobElements() {
      let jobElements = currentEvent.jobs.map((job, index) => {
        let background = ''
        if (job.volunteerID) {
          background = 'assigned'
        } else {
          background = 'unassigned'
        }
        return (
            <div key={job.jobID} className={`single-job ${background}`}>
              <h3>{job.jobStatus ? job.jobName + ' | ' + 'Confirmed': job.jobName}</h3>
              <div className='job-body'>
                <div>
                  <h4>Date:</h4>
                  <h5>{job.jobDate}</h5>
                </div>
                <div>
                  <h4>Job Time:</h4>
                  <h5>{this._readableTime(job.jobTime)}</h5>
                </div>
                <div>
                  <h4>Location:</h4>
                  <h5>{job.jobLocation}</h5>
                </div>
                <div>
                  <h4>Description:</h4>
                  <h5>{job.jobDescription}</h5>
                </div>
                <div>
                  <h4>Job Status:</h4>
                  <h5>{job.jobStatus ? job.jobStatus : 'No Job Status'}</h5>
                </div>
                <div>
                  <h4>Assigned Volunteer:</h4>
                  <h5>{job.volunteerID === null ? 'Nobody Assigned' : job.volunteerFirstName + ' ' + job.volunteerLastName}</h5>
                </div>
              </div>
              <div className='options'>
                <button onClick={this._handleAssignClick.bind(this, job)}>Assign</button>
                <button onClick={this._handleDeleteJob.bind(this, job, index)}>Delete</button>
              </div>
              <div className="snackbar" ref='snackbar'>{this.snackalert}</div>
            </div>
        )
      })
      return jobElements
    }

    _changeAlert(value){
      this.snackalert = value;
      this.setState(() => {return true;})
    }

    _showSnackBar(){
      var t = this.refs.snackbar
        t.classList = "snackbar show";

        return setTimeout(function(){ t.classList = "snackbar"; }, 2000);
    }

    _handleAssignClick(job, event) {
      event.preventDefault()
      currentJob.jobID = job.jobID
      currentJob.jobDate = job.jobDate
      currentJob.jobDescription = job.jobDescription
      currentJob.jobLocation = job.jobLocation
      currentJob.jobName = job.jobName
      currentJob.jobStatus = job.jobStatus
      currentJob.jobTime = job.jobTime
      currentJob.volunteerID = job.volunteerID
      currentJob.volunteerName = job.volunteerFirstName + ' ' + job.volunteerLastName
      var id = this._changeAlert('Please give us a moment to find who is available.')
      this._showSnackBar()
      var request = new Api()
      request.getVolunteersAvailabile(job.jobID).then((response) => {
        currentJob.volunteersAvailable = response.body
        clearTimeout(id)
        browserHistory.push("/vms2/home/event/job/assign")
      })
    }

    _handleDeleteJob(job, index, event) {
      event.preventDefault()
      if (!job.volunteerID) {
        if (confirm(`Are you sure you would like to delete ${job.jobName}?`))
        var request = new Api()
        request.deleteJob(job.jobID).then((response) => {
          currentEvent.jobs.splice(index, 1)
          //this.setState(() => {true})
          this._changeAlert(`Successfully deleted ${job.jobName}.`)
          this._showSnackBar()
        })
      } else {
        this._changeAlert(`${job.jobName} cannot be deleted due to ${job.volunteerFirstName + ' ' + job.volunteerLastName} being assigned.`)
        this._showSnackBar()
      }
    }

    _handleJobClick(jobData, event) {
      var buildCurrentJob = new Promise((resolve, reject) => {
        currentJob.jobID = jobData.jobID
        currentJob.jobDate = jobData.jobDate
        currentJob.jobDescription = jobData.jobDescription
        currentJob.jobLocation = jobData.jobLocation
        currentJob.jobName = jobData.jobName
        currentJob.jobStatus = jobData.jobStatus
        currentJob.jobTime = jobData.jobTime
        currentJob.volunteerID = jobData.volunteerID
        currentJob.volunteerName = jobData.volunteerFirstName + ' ' + jobData.volunteerLastName
        resolve()
      })
      buildCurrentJob.then(() => {
        browserHistory.push('/vms2/home/event/job')
      })
    }

    _readableTime(time) {
      var startHour = parseInt(time.substring(0, 2))
      var startMinute = time.substring(3, 5)
      var endHour = parseInt(time.substring(6, 8))
      var endMinute = time.substring(9, 11)
      var startDayTime = ''
      var endDayTime = ''

      if (startHour === 0 || startHour < 12) {
        if (startHour < 10 && startHour !== 0) {
          startHour = '0' + startHour
        }
        startDayTime = 'AM'
      } else {
        if (startHour !== 12) {
        startHour = startHour - 12
        }
        if (startHour < 10) {
          startHour = '0' + startHour
        }
        startDayTime = 'PM'
      }

      if (endHour === 0 || endHour < 12) {
        if (endHour < 10 && endHour !== 0) {
          endHour = '0' + endHour
        }
        endDayTime = 'AM'
      } else {
        if (endHour !== 12){
        endHour = endHour - 12
        }
        if (endHour < 10) {
          endHour = '0' + endHour
        }
        endDayTime = 'PM'
      }
      return (startHour + ':' + startMinute + ' ' + startDayTime + ' - ' + endHour + ':' + endMinute + ' ' + endDayTime)
    }
}
export default EventJobs;
