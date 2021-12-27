import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { forkJoin, Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { json2csvAsync } from 'json-2-csv';
const API_KEY = 'AIzaSyCX5SMRSv5Jh9DnvoYeGKP1BMlmeLO0UrQ';

export interface RowData {
  name: string;
  projectName: string;
  assigmentName: string;
  workDate: string;
  billedHours: string;
  taskKey: string;
  taskSummary: string;
}
export interface SheetData {
  range: string;
  majorDimension: string;
  values: [[string]];
}
@Injectable({
  providedIn: 'root',
})
export class FilesService {
  constructor(private http: HttpClient) {}

  static setDate(dateStr: string) {
    let date = dateStr.split('/');
    return new Date(+date[2], +date[1] - 1, +date[0]);
  }

  modifyData(data: SheetData[]): RowData[] {
    let rows: Array<RowData> = new Array<RowData>();
    data.forEach((sheet: any) => {
      if (sheet.values.length !== 0) {
        let maxDate = FilesService.setDate(sheet.values[1][3]);
        let lastNote = sheet.values[1];
        sheet.values.forEach((row: any, rowIndex: number) => {
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
      }
    });
    return rows;
  }

  getUserFile(token: string): Observable<SheetData[]> {
    const params = new HttpParams()
      .set('access_token', token)
      .set('fields', '*');
    const sheetParams = new HttpParams().set('key', API_KEY);
    return this.http
      .get('https://www.googleapis.com/drive/v3/files', {
        params,
        observe: 'response',
      })
      .pipe(
        map((result: any) => {
          let file = result.body.files.filter(
            (doc: any) => doc.name === 'test_data_reporting'
          )[0];
          return file;
        }),
        mergeMap((file: any) =>
          this.http
            .get(
              `https://content-sheets.googleapis.com/v4/spreadsheets/${file.id}`,
              {
                params: sheetParams,
              }
            )
            .pipe(
              mergeMap(({ sheets }: any) => {
                let sheetRequest: any[] = [];
                sheets.forEach((sheet: any) => {
                  sheetRequest.push(
                    this.http.get(
                      `https://content-sheets.googleapis.com/v4/spreadsheets/${file.id}/values/${sheet.properties.title}`,
                      {
                        params: sheetParams,
                      }
                    )
                  );
                });
                return forkJoin(sheetRequest);
              })
            )
        )
      );
  }
  exportJSONData(data: RowData[]) {
    let a = document.createElement('a');
    let file = new Blob([JSON.stringify(data, null, 2)], {
      type: 'text/json',
    });
    a.href = URL.createObjectURL(file);
    a.setAttribute('download', 'table.json');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  exportCSVData(data: RowData[]) {
    json2csvAsync(data).then((csv) => {
      let a = document.createElement('a');
      let file = new Blob([csv], {
        type: 'text/csv',
      });
      a.href = URL.createObjectURL(file);
      a.setAttribute('download', 'table.csv');
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    });
  }
}
