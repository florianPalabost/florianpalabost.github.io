import { Component, OnInit } from '@angular/core';
import {faDownload, faEnvelope, faStar} from '@fortawesome/free-solid-svg-icons';
import {faGithub, faLinkedin} from '@fortawesome/free-brands-svg-icons';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {FileSaverService} from 'ngx-filesaver';
declare var require: any;
const FileSaver = require('file-saver');

@Component({
  selector: 'app-about-component',
  templateUrl: './about-component.component.html',
  styleUrls: ['./about-component.component.scss']
})
export class AboutComponentComponent implements OnInit {
  faDownload = faDownload;
  faStar = faStar;
  faLinkedIn = faLinkedin;
  faGithub = faGithub ;
  faEnvelope = faEnvelope;

  constructor(private http: HttpClient, private _FileSaverService: FileSaverService) { }

  ngOnInit() {
  }

  downloadPdf() {
    const pdfUrl = 'https://docdro.id/rq7BVmu';
    const pdfName = 'cv_florian.pdf';

    // window.open('./assets/cv_florian.pdf',);
    // todo test with a route & routerlink in html !!!
    // todo next : if doesnt work test with lib viewpdf
    // const filePDF = open(pdfUrl);
    // return FileSaver.saveAs(filePDF, pdfName);

    const httpOptions : any    = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': 'https://docdro.id',
      })
        // responseType: 'blob'
    };

    this.http.get('https://docdro.id/rq7BVmu', httpOptions).subscribe(res => {
      this._FileSaverService.save((<any>res)._body, pdfName);
    });

  }
}
