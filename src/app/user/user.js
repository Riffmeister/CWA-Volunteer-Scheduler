import { action, observable } from 'mobx'

class UserStore {
  constructor() {
    extendObservable(this, { isAdmin: false })
  }

  getAdmin() {
    return this.isAdmin
  }

  setAdmin() {
    this._isAdmin = true
  }

  removeAdmin() {
    this._isAdmin = false
  }

  destroy() {
    console.log('before', UserStore.instance)
    delete UserStore.instance
    console.log('after', UserStore.instance)
  }

}

export default new UserStore()
