import { Component, OnInit } from '@angular/core';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnInit {

  contacts: any;

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.apiService.get('contacts').subscribe(data => {
      this.contacts = data;
      console.log(`Contacts: ${this.contacts}`);
    });
  }

}
