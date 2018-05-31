import { User } from '../models/User';

export class LocalStorage {
  // static variable to get user
  public static currentUser: User;

  // load user from local storage and save in static variable - used when app opening app
  static loadUserAndToken(storage) {
    storage.get('currentUser').then((val) => {
      LocalStorage.setUser(val, storage);
     });
  }

  // save user in local storage and static variable - used when log in
  static setUser(user, storage) {
    LocalStorage.currentUser = user;
    storage.set("currentUser", user);
  }
 
  // delete user out of local storage and static variable - used for log out
  static deleteUserAndToken(storage) {
    storage.set("currentUser", null);
    storage.remove("currentUser");
    LocalStorage.currentUser = null;
  }
}
