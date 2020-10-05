import { useStores } from "../../stores";
class authService {
  constructor(auth) {
    this.authClass = auth;
    this.auth = auth();
    this.microsoftAuthProvider = new auth.OAuthProvider("microsoft.com");
    this.gitHubProvider = new auth.GithubAuthProvider();
    this.facebookProvider = new auth.FacebookAuthProvider();
    this.googleAuthProvider = new auth.GoogleAuthProvider();
  }

  signUpWithEmail(user) {
    return this.auth.createUserWithEmailAndPassword(user.email, user.password);
  }

  signInWithEmailAndPassword(email, password) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  signOut() {
    return this.auth.signOut();
  }

  sendPasswordResetEmail(emailAddress) {
    return this.auth.sendPasswordResetEmail(emailAddress);
  }

  signInWithProvider(platform) {
    switch (platform) {
      case "microsoft":
        return this.auth.signInWithRedirect(this.microsoftAuthProvider);
        break;
      case "google":
        return this.auth.signInWithRedirect(this.googleAuthProvider);
        break;
      case "git":
        return this.auth.signInWithRedirect(this.gitHubProvider);
        break;
      case "facebook":
        return this.auth.signInWithRedirect(this.facebookProvider);
      case "default":
        throw Error("no supported sign in method provided");
        break;
    }
  }
  signOut() {
    return this.auth.signOut();
  }

  async getToken() {
    return this.auth.currentUser.getIdToken();
  }

  async getCredentials() {
    const token = await this.auth.currentUser.getIdToken();
    return { token };
  }
}

export default authService;
