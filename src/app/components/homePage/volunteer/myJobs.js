import { observer } from 'mobx-react';
import { browserHistory } from 'react-router';

import Api from '../../../api/baseApi';
import React from 'react';
import ReactDOM from 'react-dom';
import eventStore from '../../../event/eventStore';
import currentEvent from '../../../event/currentEvent';
import currentJob from '../../../event/currentJob';
import userStore from '../../../user/userStore';

@observer
class MyJobs extends React.Component {

  componentWillMount() {
    currentJob.jobTime = ''
    currentJob.jobName = ''
    currentJob.jobStatus = ''
    currentJob.jobLocation = ''
    currentJob.jobDate = ''
    currentJob.jobDescription = ''
  }

  render() {
      return (
         <div className='jobs'>
            <div className='jobs-body'>
              {currentEvent.jobs.length > 0 ? this._createJobElements() : <h3>No Jobs Assigned</h3>}
            </div>
         </div>
      )
  }

  _createJobElements() {
    let jobElements = currentEvent.jobs.map((job) => {
      return (
          <div key={job.jobID}>
            <button onClick={this._handleJobClick.bind(this, job)}>
              {job.jobName}
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
      currentJob.jobStatus = jobData.jobStatus
      currentJob.jobDescription = jobData.jobDescription
      currentJob.jobLocation = jobData.jobLocation
      currentJob.jobName = jobData.jobName
      currentJob.jobTime = jobData.jobTime
      resolve()
    })
    buildCurrentJob.then(() => {
      browserHistory.push('/vms/home/event/job')
    })
  }

  _handleRefresh(event) {
    event.preventDefault()
    var eventRequest = new Api()
    eventRequest.getEvents().then((response) => {
      for (var key in response.body) {
        eventStore.events.push({
          eventID: key,
          eventName: response.body[key].event_name,
          startDate: response.body[key].start_date,
          endDate: response.body[key].end_date
        })
      }
    }).catch((error) => {
      console.log(error)
    })
    console.log('success')
  }
}
export default MyJobs;
