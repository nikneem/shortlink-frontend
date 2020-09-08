import { Component, OnInit } from '@angular/core';
import { MsalService } from 'src/app/services/msal.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  constructor(private authService: MsalService) {}
  isIframe = false;
  loggedIn = false;
  ngOnInit(): void {
    this.isIframe = window !== window.parent && !window.opener;
    this.checkAccount();
  }

  onPaste(event: ClipboardEvent) {
    let clipboardData = event.clipboardData || window.clipboardData;
    let pastedText = clipboardData.getData('text');
    alert(pastedText);
  }

  checkAccount() {
    this.loggedIn = this.authService.getAllAccounts().length > 0;
  }

  login() {
    this.authService.loginPopup().subscribe(() => this.checkAccount());
  }

  logout() {
    this.authService.logout();
  }
}
