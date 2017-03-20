import { action, observable } from 'mobx';
import { observer } from 'mobx-react';

@observer
class UserStore {
  @observable personID = ''
  @observable isAdmin = false
  @observable loggedOn = false
  @observable events = []
  @observable firstName = ''
  @observable lastName = ''
  @observable phoneNumber = ''
  @observable dateOfBirth = ''
  @observable email = ''
  @observable phoneProvider = ''


}

export default new UserStore()
