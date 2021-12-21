import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { json2csvAsync } from 'json-2-csv';
import { GapiSessionService } from '../gapi-session.service';
import { FilesService, RowData, SheetData } from '../files.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-files-list',
  templateUrl: './files-list.component.html',
  styleUrls: ['./files-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilesListComponent implements OnInit {
  constructor(
    public gapiSession: GapiSessionService,
    public filesService: FilesService,
    private ref: ChangeDetectorRef
  ) {}
  displayedColumns: string[] = [
    'name',
    'projectName',
    'assigmentName',
    'workDate',
    'billedHours',
    'taskKey',
    'taskSummary',
  ];
  dataSource = new MatTableDataSource<RowData>();
  isSignedIn = false;
  isLoading = false;
  @ViewChild(MatSort) set matSort(sort: MatSort) {
    this.dataSource.sort = sort;
  }
  ngOnInit() {
    this.gapiSession.isSignedIn$.subscribe((value) => {
      this.isSignedIn = value;
      if (!this.isSignedIn) {
        this.dataSource.data = [];
      }
      this.ref.detectChanges();
    });
  }
  refresh() {
    this.isLoading = true;
    this.filesService
      .getUserFile(this.gapiSession.token)
      .subscribe((result: SheetData[]) => {
        const data: RowData[] = this.filesService.modifyData(result);
        this.dataSource.data = data;
        this.isLoading = false;
        this.ref.detectChanges();
      });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  exportJSONData() {
    let a = document.createElement('a');
    let file = new Blob([JSON.stringify(this.dataSource.data, null, 2)], {
      type: 'text/json',
    });
    a.href = URL.createObjectURL(file);
    a.setAttribute('download', 'table.json');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  exportCSVData() {
    json2csvAsync(this.dataSource.data).then((csv) => {
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
