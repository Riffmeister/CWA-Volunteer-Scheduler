import { action, observable } from 'mobx';
import { observer } from 'mobx-react';

@observer
class CurrentEvent {
  @observable eventName = ''
  @observable eventID = ''
  @observable dates = []
  @observable jobs = []
  @observable volunteers = {}
  @observable volunteerObjects = {}
  @observable availability = {}
  @observable desiredHours = null
  @observable selectedDates = []
}

export default new CurrentEvent()
