import { Component, OnInit } from '@angular/core';
import { SpinnerCloakService } from './spinner-cloak.service';

@Component({
  selector: 'app-spinner',
  templateUrl: 'spinner-cloak.component.html',
  styleUrls: ['spinner-cloak.component.scss'],
})
export class SpinnerCloakComponent implements OnInit {
  constructor(private spinnerService: SpinnerCloakService) {}

  showSpinner: number;

  ngOnInit() {
    this.showSpinner = 0;
    this.spinnerService.displaySpinner$.subscribe((display: boolean) => {
      if (display) {
        this.showSpinner += 1;
      } else if (!display && this.showSpinner > 0) {
        this.showSpinner -= 1;
      }
    });
  }
}
