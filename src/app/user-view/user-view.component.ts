import { Component, OnInit,OnDestroy, AfterViewInit, ViewChild, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, timer } from 'rxjs';
import { Iuserdata } from '../user';
import { MatSort, Sort } from '@angular/material/sort';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { NotificationService } from '../notification.service';
import { DataService } from '../service/data.service';
import { DialogService } from '../service/dialog.service';



@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.css']
})
export class UserViewComponent implements OnInit {


  //Specifying the number of data to be displayed per page...
  pageSizeOptions = [3,5, 10, 25];
  
  
  //Specifying the order of table columns to be displayed...
  displayedColumns: string[] = ['firstName', 'lastName', 'phone', 'email', 'edit' , 'delete'];

  public users?: Iuserdata[];
  isDataAvailable: boolean = false;
  subscription ?: Subscription;
  sortedUser?: Iuserdata[];
  totalData?:number;
  dataNotFound?:boolean;
  dataSource: any;
  dataSourceLength ?: number;
  isLoading = true;
  

  //Declaring variables for sorting and pagination features...
  @ViewChild(MatSort) sort ?: MatSort;
  @ViewChild(MatPaginator) paginator ?: MatPaginator;
  pageSize=5;
  pageIndex= 0;
  
  
  constructor(private router: Router,
    private service: DataService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private notificationService: NotificationService,
    private dialogService: DialogService) { }

  ngOnInit():void {
    this.isLoading=true;
    this.service.getUserCount().subscribe(data => this.totalData=+(data.toString()));
    this.subscription=this.service.getAll().subscribe(data => {
      this.dataSource=new MatTableDataSource(data);
      this.isLoading=false;
    });
    
}
ngAfterViewInit(): void{
  this.paginator?.page.subscribe(page => {
    this.pageSize = page.pageSize;
    this.pageIndex = page.pageIndex;
    console.log(this.pageSize);
    this.service.getPage(this.pageSize, this.pageIndex).subscribe(data=>{
      this.dataSource=new MatTableDataSource(data);
    });
  });
}

//Method to apply sort functionality...
sortChange(query:any) {
  this.subscription=this.service.sort(this.pageSize, this.pageIndex, query.id, query._arrowDirection)
   .subscribe(data =>{
   this.dataSource=new MatTableDataSource(data);
  });
  //console.log(query._arrowDirection);
}

  ngOnDestroy() {
    //this.subscription.unsubscribe();
  }


  //Method to apply search functionality...
  filter(query: string) {
   
    this.subscription=this.service.search(this.pageSize,this.pageIndex,query)
    .subscribe(data =>{
     this.dataSource=new MatTableDataSource(data);
     //console.log(this.dataSource);
     if(this.dataSource.filteredData.length!=0)
      this.dataNotFound=false;
     else
      this.dataNotFound=true;
   });
     //console.log(query);
  }

 
  //Method to apply delete functionality...
  delete(user: any) {
   
      this.dialogService.openConfirmDialog('Are you sure to delete this record ?')
       .afterClosed().subscribe(res =>{
       if(res){
        this.service.deleteUser(user.id, user);
        window.location.reload();
        this.notificationService.warn('! Deleted successfully');
      }
    });
  }
}
