import { Component, OnInit, Input } from '@angular/core';

import { User } from 'src/app/models';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  @Input() user: User;

  @Input() email: string;
  @Input() phone: string;
  @Input() address: string;

  constructor() {
  }

  ngOnInit() {
  }

  getUserName(): string {
    return this.user.name_complete.split(',')[0].trim();
  }

  getUserLastName(): string {
    return this.user.name_complete.split(',')[1].trim();
  }

  getFullName(): string {
    return this.getUserName() + ' ' + this.getUserLastName();
  }

  acceptChangesClick() {
    this.user.email = this.email;
    this.user.phone = this.phone;
    this.user.info.address = this.address;
  }
}
