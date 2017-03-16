import { observable } from 'mobx';
import { observer } from 'mobx-react';

@observer
class UserStore {
  @observable users = []
}

export default new UserStore()
