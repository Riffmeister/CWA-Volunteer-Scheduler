import { action, observable } from 'mobx';
import { observer } from 'mobx-react';

@observer
class UserStore {
  @observable personID = ''
  @observable isAdmin = false
  @observable loggedOn = false
  @observable events = []

}

export default new UserStore()
