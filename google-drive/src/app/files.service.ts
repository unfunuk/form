import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { of, Subject } from 'rxjs';
const API_KEY = 'AIzaSyALKrGtW8xoM4fh2goItStszHCc8PZqRXA';
export interface RowData {
  name: string;
  projectName: string;
  assigmentName: string;
  workDate: string;
  billedHours: string;
  taskKey: string;
  taskSummary: string;
}
@Injectable({
  providedIn: 'root',
})
export class FilesService {
  stream$: Subject<RowData[]> = new Subject<RowData[]>();
  constructor(private http: HttpClient) {}

  static setDate(dateStr: string) {
    let date = dateStr.split('/');
    return new Date(+date[2], +date[1] - 1, +date[0]);
  }
  getUserFiles(token: string): void {
    let rows: Array<RowData> = new Array<RowData>();
    const params = new HttpParams()
      .set('access_token', token)
      .set('fields', '*');
    this.http
      .get('https://www.googleapis.com/drive/v3/files', {
        params,
        observe: 'response',
      })
      .subscribe((result: any) => {
        let file = result.body.files.filter(
          (doc: any) => doc.name === 'test_data_reporting'
        )[0];
        const sheetParams = new HttpParams().set('key', API_KEY);
        this.http
          .get(
            `https://content-sheets.googleapis.com/v4/spreadsheets/${file.id}`,
            {
              params: sheetParams,
            }
          )
          .subscribe((document: any) => {
            document.sheets.map((sheet: any, index: number) =>
              this.http
                .get(
                  `https://content-sheets.googleapis.com/v4/spreadsheets/${file.id}/values/${sheet.properties.title}`,
                  {
                    params: sheetParams,
                  }
                )
                .subscribe((result: any) => {
                  let maxDate = FilesService.setDate(result.values[1][3]);
                  let lastNote = result.values[1];
                  result.values.forEach((row: any, rowIndex: number) => {
                    if (row.length !== 0) {
                      if (row[3].trim() !== '') {
                        let currentDate = FilesService.setDate(row[3]);
                        if (
                          rowIndex !== 0 &&
                          maxDate < currentDate &&
                          (row[5] !== undefined || row[6] !== undefined)
                        ) {
                          maxDate = currentDate;
                          lastNote = row;
                        }
                      }
                    }
                  });
                  let obj: RowData = {
                    name: lastNote[0],
                    projectName: lastNote[1],
                    assigmentName: lastNote[2],
                    workDate: lastNote[3],
                    billedHours: lastNote[4],
                    taskKey: lastNote[5],
                    taskSummary: lastNote[6],
                  };
                  rows.push(obj);
                  this.stream$.next(rows);
                })
            );
          });
      });
  }
}
