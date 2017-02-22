import { action, observable } from 'mobx';
import { observer } from 'mobx-react';

@observer
class EventStore {
  @observable events = []
}

export default new EventStore()
