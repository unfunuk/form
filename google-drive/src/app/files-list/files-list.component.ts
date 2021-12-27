import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { GapiService } from '../services/gapi.service';
import { FilesService, RowData, SheetData } from '../services/files.service';

@Component({
  selector: 'app-files-list',
  templateUrl: './files-list.component.html',
  styleUrls: ['./files-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilesListComponent implements OnInit {
  constructor(
    public gapiService: GapiService,
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
  user: any;
  dataSource = new MatTableDataSource<RowData>();
  isLoading = false;
  @ViewChild(MatSort) set matSort(sort: MatSort) {
    this.dataSource.sort = sort;
  }
  ngOnInit() {
    this.gapiService.subject$.subscribe((user: any) => {
      this.user = user;
      if (user !== null) {
        this.refresh(gapi.client.getToken().access_token);
      } else {
        this.dataSource.data = [];
      }
      this.ref.detectChanges();
    });
  }
  refresh(token: string) {
    this.isLoading = true;
    this.filesService.getUserFile(token).subscribe((result: SheetData[]) => {
      const data: RowData[] = this.filesService.modifyData(result);
      this.dataSource.data = data;
      this.isLoading = false;
      this.ref.detectChanges();
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.ref.detectChanges();
  }
  exportJSONData() {
    this.filesService.exportJSONData(this.dataSource.data);
  }

  exportCSVData() {
    this.filesService.exportCSVData(this.dataSource.data);
  }
}
