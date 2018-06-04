export class Toast {

  private static showToast(toast, message, duration, pos) {
    var basicToast = toast.create({
      message: message,
      duration: duration,
      position: pos
    });
    basicToast.present();
  }

  public static toastExerciseCreated(toast, message) {
    this.showToast(toast, message, 3000, 'bottom');
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
    this.showToast(toast, 'This email is already registered', 3000, 'top');
  }

  public static toastLoginSuccessful(toast) {
    this.showToast(toast, 'Welcome', 3000, 'top');
  }

  public static toastLoginNotSuccessful(toast) {
    this.showToast(toast, 'Username or password is not correct', 3000, 'top');
  }

  public static toastTestDeletedSuccessful(toast) {
    this.showToast(toast, 'Test successfully deleted', 3000, 'top');
  }

  public static toastTestNotDeleted(toast) {
    this.showToast(toast, 'Error: Test could not be deleted', 3000, 'top');
  }
  public static toastTestNotcreated(toast) {
    this.showToast(toast, 'Error: Test could be created', 3000, 'top');
  }
  public static toastPasswordsNotMatch(toast) {
    this.showToast(toast, 'The passwords does not match', 3000, 'bottom');
  }
}
