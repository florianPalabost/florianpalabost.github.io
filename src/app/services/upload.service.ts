import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertService } from './alert.service';
import { GraphQLService } from './graph-ql.service';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  // SERVER_URL: stsring = 'https://file.io?expires=1y';
  SERVER_URL: string = 'http://localhost:3003/api/v1/upload';

  constructor(private http: HttpClient, private alertService: AlertService, private graphQLService: GraphQLService) {}

  public async upload(formData) {
    try {
      const rep = await this.graphQLService.uploadImage(formData);
      console.log('reponse', rep);
      if (rep['statusCode'] === 200) {
        this.alertService.success('File updated successfully !');
        return true;
      }
      return false;
    } catch (e) {
      console.log(e);
    }
  }
}
