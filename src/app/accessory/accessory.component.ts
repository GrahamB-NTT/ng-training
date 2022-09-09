import { Component, OnInit, Inject } from '@angular/core';

import { OktaAuth } from '@okta/okta-auth-js';
import { OKTA_AUTH } from '@okta/okta-angular';

@Component({
  selector: 'app-accessory',
  templateUrl: './accessory.component.html',
  styleUrls: ['./accessory.component.scss']
})
export class AccessoryComponent implements OnInit {

  isAuthenticated: boolean = false;
  accessString: string = '';

  constructor(@Inject(OKTA_AUTH) private oktaAuth: OktaAuth) { }

  async ngOnInit() {
    this.isAuthenticated = await this.oktaAuth.isAuthenticated();
  }

  onSelectBags() { this.accessString = 'bags' };
  onSelectSwag() { this.accessString = 'swag' };
  onSelectMain() { this.accessString = '' };
}
