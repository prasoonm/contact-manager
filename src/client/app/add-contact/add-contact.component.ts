import { Component, OnInit } from '@angular/core';
import { Contact } from '../shared/contact.model';
import { NgForm } from '@angular/forms';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.scss']
})
export class AddContactComponent implements OnInit {

  loading: boolean = false;
  newContact: any = null;

  constructor(private apiService: ApiService) { }

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

    this.apiService.post('contacts', contact).subscribe(data => {
      form.reset();
      this.loading = false;
      this.newContact = data;
    });
  }

}
