import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserProvider } from "../../providers/user/user";
import { User } from "../../shared/user/user";
import { HomePage } from "../home/home";

declare var facebookConnectPlugin: any;

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  user: User;
  isLoggingIn = true;

  @ViewChild("container") container: ElementRef;

  constructor(public navCtrl: NavController, private userService: UserProvider) {
    this.user = new User();
    this.user.email = "my.test.account@nativescript.org";
    this.user.password = "password";
  }

  ngOnInit() {

  }

  submit() {
    if (this.isLoggingIn) {
      this.login();
    } else {
      this.signUp();
    }
  }

  login() {
    this.userService.login(this.user)
      .subscribe(
        () => this.navCtrl.setRoot(HomePage),
        (error) => alert("Unfortunately we could not find your account.")
      );
  }

  toggleDisplay() {
    this.isLoggingIn = !this.isLoggingIn;
    //let container = this.container.nativeElement;
    // container.animate({
    //   backgroundColor: this.isLoggingIn ? 'red' : 'gray',
    //   duration: 200
    // });
  }

  signUp() {
    this.userService.register(this.user)
      .subscribe(
        () => {
          alert("Your account was successfully created.");
          this.toggleDisplay();
        },
        () => alert("Unfortunately we were unable to create your account.")
      );
  }

  fbLogin() {
    facebookConnectPlugin.login(["public_profile"], function(userData) {
      console.log("UserInfo: ", userData);
    }, function(error) {
      console.error(error);
    })
  }

}
