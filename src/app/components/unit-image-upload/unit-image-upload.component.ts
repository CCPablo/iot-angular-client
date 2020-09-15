import { Component, OnInit, Input } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { trigger, transition, query, animateChild, style, animate } from '@angular/animations';

@Component({
  selector: 'app-unit-image-upload',
  templateUrl: './unit-image-upload.component.html',
  styleUrls: ['./unit-image-upload.component.css'],
  animations: [
    trigger('inOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('200ms', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('200ms', style({ opacity: 0 }))
      ])
    ]),
  ]
})
export class UnitImageUploadComponent implements OnInit {

  imageNameOn: string;
  imageNameOff: string;

  imageOn: File;
  imageOff: File;

  uploaded = false;
  uploading = false;

  @Input() nodeId: number;
  @Input() unitId: number;
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  onImageOnChange(event) {
    this.imageOn = event.target.files[0];
    if (this.imageOn) {
      this.imageNameOn = this.imageOn.name;
      this.previewOn(this.imageOn);
    } else {
      this.imageNameOn = '';
    }
  }

  onImageOffChange(event) {
    this.imageOff = event.target.files[0];
    if (this.imageOff) {
      this.imageNameOff = this.imageOff.name;
      this.previewOff(this.imageOff);
    } else {
      this.imageNameOff = '';
    }
  }

  onUploadClicked() {
    const formData = new FormData();
    formData.append('imageOn', this.imageOn);
    formData.append('imageOff', this.imageOff);

    formData.append('nodeId', '1');
    formData.append('unitId', '1');


    this.uploading = true;

    this.http.post(`${environment.apiUrl}/upload`, formData)
      .subscribe(() => {
        this.uploaded = true;
        setTimeout(() => {
          this.uploaded = false;
          this.uploading = false;
     }, 2000);
     this.imageOn = null;
     this.imageOff = null;
     this.imageNameOn = null;
     this.imageNameOff = null;
    });
  }

  imgOnURL: any;
  imgOffURL: any;
  public message: string;

  previewOn(file) {
    var mimeType = file.type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }

    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (_event) => {
      this.imgOnURL = reader.result;
    }
  }

  previewOff(file) {
    var mimeType = file.type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }

    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (_event) => {
      this.imgOffURL = reader.result;
    }
  }
}
