import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-child-two',
  templateUrl: './child-two.component.html',
  styleUrls: ['./child-two.component.scss']
})
export class ChildTwoComponent implements OnInit, OnDestroy {

  prop?: string;

  propSub?: Subscription;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    //this.prop = this.userService.getProp();
    this.userService.propChanged.subscribe(
      prop => this.prop = prop
    );
  }

  ngOnDestroy(): void {
    this.propSub?.unsubscribe();
  }

}
