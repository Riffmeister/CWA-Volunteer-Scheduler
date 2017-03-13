import { action, observable } from 'mobx';
import { observer } from 'mobx-react';

@observer
class CurrentEvent {
  @observable eventName = ''
  @observable eventID = ''
  @observable dates = []
  @observable jobs = []
  @observable availability = {}
  @observable selectedDates = []
}

export default new CurrentEvent()
