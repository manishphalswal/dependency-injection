import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-child-one',
  templateUrl: './child-one.component.html',
  styleUrls: ['./child-one.component.scss']
})
export class ChildOneComponent implements OnInit, OnDestroy {

  prop?: string;

  propSub?: Subscription;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    //this.prop = this.userService.getProp();
    this.propSub = this.userService.propChanged.subscribe(
      prop => this.prop = prop,
      err => console.log("Error while changing property"),
      () => alert("Oberservable completed")
    );
  }

  ngOnDestroy(): void {
    this.propSub?.unsubscribe();
  }

  changeProp() {
    this.userService.setProp("Bar");
  }

}
