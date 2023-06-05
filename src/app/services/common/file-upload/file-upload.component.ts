import { Component, Input } from '@angular/core';
import { NgxFileDropEntry } from 'ngx-file-drop';
import { HttpClientService } from '../http-client.service';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { AlertifyService, MessageType, Position } from '../../admin/alertify.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../ui/custom-toastr.service';
import { MatDialog } from '@angular/material/dialog';
import { FileUploadDialogComponent, FileUploadState } from 'src/app/dialogs/file-upload-dialog/file-upload-dialog.component';
import { DialogService } from '../dialog.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent {
  constructor(private httpClientService: HttpClientService, private alertify: AlertifyService,
    private customtoastrService: CustomToastrService, private dialog: MatDialog, private dialogService: DialogService) {

  }
   files: NgxFileDropEntry[];

  @Input() options: Partial<FileUploadOptions>;

  public selectedFiles(files: NgxFileDropEntry[]) {
    this.files = files;
    const fileData: FormData = new FormData();
    for (const file of files) {
      (file.fileEntry as FileSystemFileEntry).file((_file: File) => {
        fileData.append(_file.name, _file, file.relativePath);
      });
    }

    this.dialogService.openDialog( {
      componentType: FileUploadDialogComponent,
       data: FileUploadState.Yes,
       afterClosed: () => {
      
        this.httpClientService.post({
          controller: this.options.controller,
          action: this.options.action,
          queryString: this.options.queryString,
          headers: new HttpHeaders({ "responseType": "blob" })
        }, fileData).subscribe(data => {
          const message: string = "File Uploaded Succesfully!";
          if (this.options.IsAdminPage) {
            this.alertify.message(message, {
              dismissOthers: true,
              messageType: MessageType.Success,
              position: Position.TopRight
            })
          } else {
            this.customtoastrService.message(message, "Success", {
              messageType: ToastrMessageType.Success,
              position: ToastrPosition.TopRight
            })
          }
        }, (errorresponse: HttpErrorResponse) => {
  
          const message: string = "File can't Uploaded!";
          if (this.options.IsAdminPage) {
            this.alertify.message(message, {
              dismissOthers: true,
              messageType: MessageType.Error,
              position: Position.TopRight
            })
          } else {
            this.customtoastrService.message(message, "Error", {
              messageType: ToastrMessageType.Error,
              position: ToastrPosition.TopRight
            })
          }
        });
      }
    })
  }
}
export class FileUploadOptions {
  controller?: string;
  action?: string;
  queryString?: string;
  explanation?: string;
  accept?: string;
  IsAdminPage?: boolean = false;
}
