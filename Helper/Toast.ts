export class Toast {

  private static showToast(toast, message, duration, top) {
    var basicToast = toast.create({
      message: message,
      duration: duration,
      position: top
    });
    basicToast.present();
  }

  public static toastConnected(toast) {
    console.log('network was disconnected :-(');
    this.showToast(toast, 'Network connected again :)', 3000, 'top');
  }

  public static toastNotConnected(toast) {
    console.log('network connected!');
    this.showToast(toast, 'No network connection, new tests cannot be loaded', 3000, 'top');
  }

  public static toastAccountCreatedSuccessful(toast) {
    this.showToast(toast, 'Account successfully created', 3000, 'top');
  }

  public static toastAccountNotCreatedSuccessful(toast) {
    this.showToast(toast, 'Account creation failed: username or email already exists', 3000, 'top');
  }

  public static toastLoginSuccessful(toast) {
    this.showToast(toast, 'Welcome', 3000, 'top');
  }

  public static toastLoginNotSuccessful(toast) {
    this.showToast(toast, 'Username or password is not correct', 3000, 'top');
  }


}
