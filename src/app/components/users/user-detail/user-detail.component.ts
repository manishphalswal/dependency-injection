import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IUser } from 'src/app/model/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {

  selectedUser?: IUser;
  userPosts: any;

  constructor(private activatedRoute: ActivatedRoute, private userService: UserService) {}

  ngOnInit(): void {

        this.activatedRoute.params.subscribe(params => {
          console.log("UserId: ", +params.id);

          this.userService.getUserByIdViaRest(+params.id).subscribe(
            user => this.selectedUser = user,
            err => console.log("Got error while calling getUserByIdViaRest", err),
            //() => alert("Fetch User completed for userId: " + +params.id)
          );
        });
    
  }

  createUser() {
    if (this.selectedUser != undefined) {
      this.userService.createUserViaRest(this.selectedUser).subscribe(
        user => alert('User Created with Id: ' + user.id),
        err => alert("Error while creating user: " + err)
      );    
    }
  }

  updateUser() {
    if (this.selectedUser != undefined) {
      this.selectedUser.name = 'Manish Phalswal';
      this.userService.updateUserViaRest(this.selectedUser).subscribe(
        user => alert('User Updated with Id: ' + user.id),
        err => alert("Error while updating user: " + err)
      );
    }
  }

  getUserPosts() {
    if (this.selectedUser != undefined) {
      this.userService.getUserPostsViaRest(this.selectedUser.id).subscribe(
        posts => this.userPosts = posts,
        err => alert('Error while fetching posts for user')
      );
    }
  }

  deleteUser() {
    if (this.selectedUser != undefined) {
      this.userService.deleteUserViaRest(this.selectedUser.id).subscribe(
        user => alert('User deleted successfully'),
      );
    }
  }

}
