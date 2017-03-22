import { action, observable } from 'mobx';
import { observer } from 'mobx-react';

@observer
class CurrentJob {
  @observable formattedDate = {}
  @observable jobID = ''
  @observable jobDate = ''
  @observable jobDescription = ''
  @observable jobLocation = ''
  @observable jobName = ''
  @observable jobTime = ''
  @observable volunteerID = ''
  @observable volunteerName = ''
  @observable volunteersAvailable = {}
  @observable selectedPerson = {}
  @observable selectedID = ''
}

export default new CurrentJob()
