import { Component, OnInit, Inject } from '@angular/core';

import { OktaAuth } from '@okta/okta-auth-js';
import { OKTA_AUTH } from '@okta/okta-angular';

@Component({
  selector: 'app-apparel',
  templateUrl: './apparel.component.html',
  styleUrls: ['./apparel.component.scss']
})

export class ApparelComponent implements OnInit {

  isAuthenticated: boolean = false;
  apparelString: string = '';

  constructor(@Inject(OKTA_AUTH) private oktaAuth: OktaAuth) { }

  async ngOnInit() {
    this.isAuthenticated = await this.oktaAuth.isAuthenticated();
  }

  onSelectMen() { this.apparelString = 'male'; }
  onSelectWomen() { this.apparelString = 'female'; }
  onSelectPride() { this.apparelString = 'pride'; }
  onSelectMain() { this.apparelString = ''; }
}
