import { Component, OnInit } from "@angular/core";
import {
  faFacebook,
  faTwitter,
  faLinkedin,
  faGithub
} from "@fortawesome/free-brands-svg-icons";

@Component({
  selector: "app-footer-component",
  templateUrl: "./footer-component.component.html",
  styleUrls: ["./footer-component.component.scss"]
})
export class FooterComponentComponent implements OnInit {
  faFacebook = faFacebook;
  faTwitter = faTwitter;
  faLinkedIn = faLinkedin;
  faGithub = faGithub;
  constructor() {}

  ngOnInit() {}
}
