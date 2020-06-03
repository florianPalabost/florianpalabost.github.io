import { Component, OnInit } from '@angular/core';
import {faStar, faEnvelope} from '@fortawesome/free-solid-svg-icons';
import {faSkype} from '@fortawesome/free-brands-svg-icons';
import {FormBuilder} from "@angular/forms";
import {environment} from "../../environments/environment";
declare let emailjs: any;

@Component({
  selector: 'app-contact-component',
  templateUrl: './contact-component.component.html',
  styleUrls: ['./contact-component.component.scss']
})
export class ContactComponentComponent implements OnInit {
  faStar = faStar;
  faSkype = faSkype;
  faEnvelope = faEnvelope;
  formContact;
  constructor(private fb: FormBuilder) {
    this.formContact =  this.fb.group({
      contact_number: '',
      user_name: '',
      user_email: '',
      message: ''
    });
  }

  ngOnInit() {
    emailjs.init(environment.user_id);
  }

  async sendMsg() {
    const response = await emailjs.send('gmail', 'contact_form', this.formContact.value);
    if(response.status === 200 && response.text === 'OK') {
      alert('Message envoyé !');
    }

  }
}
