import { observer } from 'mobx-react';
import { browserHistory } from 'react-router';

import Api from '../../../api/baseApi';
import React from 'react';
import ReactDOM from 'react-dom';
import eventStore from '../../../event/eventStore';
import currentEvent from '../../../event/currentEvent';
import currentJob from '../../../event/currentJob';

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
  }

    render() {
        return (
           <div className='jobs admin'>
            <h2>Jobs(Scroll to View More)</h2>
            <div className='jobs-body'>
              {this._createJobElements()}
            </div>
           </div>
        )
    }

    _createJobElements() {
      let jobElements = currentEvent.jobs.map((job) => {
        let background = ''
        console.log(job)
        if (job.volunteerID) {
          background = 'assigned'
        } else {
          background = 'unassigned'
        }
        return (
            <div key={job.jobID}>
              <button className={background} onClick={this._handleJobClick.bind(this, job)}>
                {job.jobStatus ? job.jobName + ' | ' + 'Confirmed': job.jobName}
              </button>
            </div>
        )
      })
      return jobElements
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
        browserHistory.push('/vms/home/event/job')
      })
    }
}
export default EventJobs;
