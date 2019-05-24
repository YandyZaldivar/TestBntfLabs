import { Component, OnInit, Inject } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { isNullOrUndefined } from 'util';

import { User } from 'src/app/models';
import { Image } from 'src/app/models';
import { UserResult } from 'src/app/models';
import { SkillResult } from 'src/app/models';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: User[];
  skills: object[];
  dist: number;
  showModal = false;
  showModalEdit = false;
  loaded: boolean;

  public user: User;
  public email: string;
  public phone: string;
  public address: string;

  constructor(http: HttpClient, domSanitizer: DomSanitizer, @Inject('BASE_URL') baseUrl: string) {

    http.get<UserResult>(baseUrl + '/users').subscribe(result => {
      this.users = result.response.data;
      var users = this.users;

      http.get<SkillResult>(baseUrl + '/skills').subscribe(result => {
        this.skills = result.response.data;

        this.skills.forEach(function (skillWrapper) {
          let [skillWrapperKey, skillWrapperValue] = Object.entries(skillWrapper)[0];

          var userId = skillWrapperKey;
          var user = users.find(p => p.id == userId);
          user.skills = [];
          user.skillNames = [];
          user.skillValues = [];

          if (user.format_image == 1)
            http.get<Image>(baseUrl + '/image/' + user.id).subscribe(result => {
              if (isNullOrUndefined(result.base64Data))
                user.format_image = 2;
              else {
                var base64Image = 'data:image/jpeg;base64, ' + result.base64Data;
                user.safeUrl_image = domSanitizer.bypassSecurityTrustResourceUrl(base64Image);
              }
            });

          for (let [skillKey, skillValue] of Object.entries(skillWrapperValue)) {
            user.skills.push({ name: skillKey, value: skillValue as number });
            user.skillValues.push(skillValue as number);
            user.skillNames.push(skillKey);
          }

          user.chartDataSets = [
            {
              data: user.skillValues,
              backgroundColor: ['rgba(0,123,255,1)', 'rgba(40,167,69,1)', 'rgba(220,53,69,1)', 'rgba(255,193,7,1)']
            }
          ];
        });
        this.loaded = true;
      });
    });
  }

  ngOnInit() {
  }

  toggleModal = () => {
    this.showModal = !this.showModal;
  }

  closeModalEdit = () => {
    this.showModalEdit = !this.showModalEdit;
  }

  createTestUserClick() {

    let skillValue1 = Math.floor(Math.random() * 10) + 1;
    let skillValue2 = Math.floor(Math.random() * 10) + 1;
    let skillValue3 = Math.floor(Math.random() * 10) + 1;
    let skillValue4 = Math.floor(Math.random() * 10) + 1;

    const user: User = {
      birthdate: "05-08-1929",
      chartDataSets: [
        {
          data: [skillValue1, skillValue2, skillValue3, skillValue4],
          backgroundColor: ['rgba(0,123,255,1)', 'rgba(40,167,69,1)', 'rgba(220,53,69,1)', 'rgba(255,193,7,1)']
        }
      ],
      email: "prueba.user@gmail.com",
      format_image: 2,
      id: "82699dff-11a1-1582-a672-5f28454a266b",
      info: {
        profession: "Administrador",
        address: "5ta avenida #543, Cárdenas, Matanzas"
      },
      name_complete: "Prueba,User",
      phone: "58274462",
      rut: 17638729,
      safeUrl_image: undefined,
      skillNames: ['C#', '.NET Core', 'Blazor', 'EF Core'],
      skillValues: [skillValue1, skillValue2, skillValue3, skillValue4],
      skills: [
        { name: 'C#', value: skillValue1 },
        { name: '.NET Core', value: skillValue2 },
        { name: 'Blazor', value: skillValue3 },
        { name: 'EF Core', value: skillValue4 }
      ],
      url_image: undefined
    }

    this.users.push(user);
  }

  detailsClick(user: User) {
    this.user = user;
    this.showModal = !this.showModal;
  }

  editClick(user: User) {
    this.user = user;
    this.email = user.email;
    this.phone = user.phone;
    this.address = user.info.address;
    this.showModalEdit = !this.showModalEdit;
  }

  deleteClick(index: number) {
    this.users.splice(index, 1);
  }

  getUserName(user: User): string {
    return user.name_complete.split(',')[0].trim();
  }

  getUserLastName(user: User): string {
    return user.name_complete.split(',')[1].trim();
  }
}
