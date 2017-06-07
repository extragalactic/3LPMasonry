import UsersModel from '../lib/UserModel';

class OneSignalClass {
  constructor(user) {
    this.user = user;
  }

  savePlayerIdtoUser(id) {
    return UsersModel.findOne({ _id: this.user })
     .then((user) => {
       user.oneSignalID = id;
       user.save();
       return true;
     });
  }

}

export default OneSignalClass;

