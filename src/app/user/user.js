import { action, observable } from 'mobx';
import { observer } from 'mobx-react';

@observer
class UserStore {
  @observable isAdmin = false
  @observable loggedOn = false

}

export default new UserStore()
