import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators} from '@angular/forms'


import { NotificationService } from '../notification.service';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent implements OnInit {

  user:any = {};
  
  constructor(
    private router: Router, 
    private route: ActivatedRoute,
    private dataService: DataService,
    private notificationService: NotificationService,) { }



  ngOnInit(): void {

  }

  //Method to apply create functionality...
  save(user: any) {
    this.dataService.createUser(user);
    this.router.navigate(['/user-view']);
    this.notificationService.success('Added user successfully!');
   
  }
}
