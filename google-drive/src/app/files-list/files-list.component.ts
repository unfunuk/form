import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { GapiSessionService } from '../gapi-session.service';
import { FilesService, RowData } from '../files.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];
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
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit() {
    this.filesService.stream$.subscribe((data) => {
      this.dataSource.data = data;
      this.dataSource.sort = this.sort;
      this.isLoading = false;
      this.ref.detectChanges();
    });
    this.gapiSession.isSignedIn$.subscribe((value) => {
      this.isSignedIn = value;
      this.ref.detectChanges();
    });
  }

  refresh() {
    this.isLoading = true;
    this.filesService.getUserFiles(this.gapiSession.token);
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  announceSortChange(event: Sort) {
    console.log(event);
  }
}
