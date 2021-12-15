import { Injectable } from '@angular/core';
declare var gapi: any;

@Injectable({
  providedIn: 'root'
})
export class FilesService {
  getFiles(folderId: string) {
    return gapi.client.drive.files.list({
      pageSize: 100,
      fields: "nextPageToken, files(id, name, mimeType, modifiedTime, size)",
    }).then((res:any) => {
      console.log(res);
    });
  }
}
