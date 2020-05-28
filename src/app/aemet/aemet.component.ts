import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthenticationService } from '../authentication/service/authentication.service';
import { AemetResponse } from './response.model';

@Component({
  selector: 'app-aemet',
  templateUrl: './aemet.component.html',
  styleUrls: ['./aemet.component.css']
})
export class AemetComponent implements OnInit {
  andaluciaPreds = [];
  constructor(
    private http: HttpClient,
    private auth: AuthenticationService
    ) { }

  ngOnInit(): void {
    this.http.get(`https://opendata.aemet.es/opendata/api/prediccion/ccaa/medioplazo/and`).subscribe(
      auxResponse => {
        this.http.get((<AemetResponse>auxResponse).datos, { responseType: 'text' }).subscribe(
          data => {
            const matchedTitles = [];
            const regex = new RegExp(/DÍA?\s[0-9]+ \(.+\)/, 'g')
            let matchedTitle : RegExpExecArray;
            while ((matchedTitle = regex.exec(data)) !== null) {
              matchedTitles.push(matchedTitle);
            }
            matchedTitles.forEach((title, index) => {
              let content : string;
              if(index == matchedTitles.length-1) {
                content = data.substring(title.index+title.toString().length+1, data.length).trim();
              } else {
                content = data.substring(title.index+title.toString().length+1, matchedTitles[index+1].index).trim();
              }
              this.andaluciaPreds.push({
                title : title.toString(),
                content: content
              });
            })
          })
        })
  }
}
