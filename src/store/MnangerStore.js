import { makeAutoObservable } from "mobx";

class ManagerStore {
    auth;
    setAuth;

  constructor() {
    makeAutoObservable(this);
  }
}


export default ManagerStore;