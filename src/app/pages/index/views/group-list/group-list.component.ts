import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.css'],
})
export class GroupListComponent implements OnInit {
  groups = [
    { id: 1, name: 'Group A' },
    { id: 2, name: 'Group B' },
    { id: 3, name: 'Group C' },
  ];
  selectedGroup: any = { id: 1, name: 'Group A' };

  selectGroup(group: any) {
    this.selectedGroup = group;
    this.sharedService.selectedGroup$.next(this.selectedGroup);
  }
  constructor(private sharedService: SharedService) {}

  ngOnInit() {}
}
