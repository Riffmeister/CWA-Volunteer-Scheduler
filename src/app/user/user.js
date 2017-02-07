import { action, observable } from 'mobx'

class UserStore {
  @observable isAdmin: boolean = false

  setAdmin() {
    this.isAdmin = true
  }

  removeAdmin() {
    this.isAdmin = false
  }

  destroy() {
    this.isAdmin = false
  }

}

export default new UserStore()
