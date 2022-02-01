import { Component, Inject, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FileUploader, FileSelectDirective } from 'ng2-file-upload';
export interface DialogData {
  url: any;

}

const URL = 'http://localhost:4000/animalesF/encuesta/upload';
// ! TODO recordar importae FileLoadModule.

@Component({
  selector: 'app-dialog-respaldos',
  templateUrl: './dialog-respaldos.component.html',
  styleUrls: ['./dialog-respaldos.component.scss']
})
export class DialogRespaldosComponent implements OnInit {

  constructor(public dialogRef:MatDialogRef<DialogRespaldosComponent>,){}

  title = 'ng8fileupload';
  public uploader: FileUploader = new FileUploader({ url: URL, itemAlias: 'video' });
  ngOnInit() {
    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
         console.log('ImageUpload:uploaded:', item, status, response);
         alert('File uploaded successfully');
         this.dialogRef.close(response);
    };
 }

}
