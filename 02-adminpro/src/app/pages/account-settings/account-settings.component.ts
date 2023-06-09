import { Component, OnInit } from '@angular/core';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: [
  ]
})
export class AccountSettingsComponent implements OnInit {

  constructor(private settingsService: SettingsService) {

  }

  public ngOnInit(): void {
    this.settingsService.checkCurrentTheme();  }

  public changeTheme(theme: string) {
    this.settingsService.changeTheme(theme);
    this.settingsService.checkCurrentTheme();  }

  public checkCurrentTheme(): void {
    this.settingsService.checkCurrentTheme();
  }

}
