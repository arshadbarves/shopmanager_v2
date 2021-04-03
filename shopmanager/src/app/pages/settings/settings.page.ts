import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  toggleValue: boolean;

  constructor() {
    let systemDark = window.matchMedia("(prefers-color-scheme: dark)");
    
    this.initTheme(systemDark);
  }

  ngOnInit() {

  }

  initTheme(systemInitiatedDark) {
    var darkThemeSelected = (localStorage.getItem('themeSwitch') !== null && localStorage.getItem('themeSwitch') === 'dark');
    this.toggleValue = darkThemeSelected ? true : false;
    // this.toggleValue = systemInitiatedDark.matches ? true : false;
  };

  onClick(event) {

    if (event.detail.checked) {
      document.body.setAttribute('data-theme', 'dark');
      localStorage.setItem('themeSwitch', 'dark'); // save theme selection
    }
    else {
      document.body.setAttribute('data-theme', 'light');
      localStorage.removeItem('themeSwitch'); // reset theme selection
    }
  }
}

