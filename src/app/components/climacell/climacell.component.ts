import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-climacell',
  templateUrl: './climacell.component.html',
  styleUrls: ['./climacell.component.css']
})
export class ClimacellComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

}
