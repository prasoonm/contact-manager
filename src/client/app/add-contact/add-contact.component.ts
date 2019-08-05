import { Component, OnInit } from '@angular/core';
import { Contact } from '../shared/contact.model';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.scss']
})
export class AddContactComponent implements OnInit {

  loading: boolean = false;
  newContact: any = null;

  constructor(public http: HttpClient) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    this.loading = true;

    const formValues = Object.assign({}, form.value);
    const contact: Contact = {
      name: `${formValues.firstname} ${formValues.lastname}`,
      address: formValues.address,
      phone: `(${formValues.areacode}) ${formValues.prefix}-${formValues.linenumber}`,
      photoUrl: formValues.photourl
    };

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    this.http.post('/api/contacts', contact, httpOptions).subscribe(data => {
      form.reset();
      this.loading = false;
      this.newContact = data;
    });
  }

}
