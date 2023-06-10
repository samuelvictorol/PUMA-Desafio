import GitHubUser from '../interfaces/GitHubUser';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  users: GitHubUser[] = [];
  constructor(private userService: UserService) { }

  async ngOnInit() {
    await this.getAllFavUsers();
  }

  
  async getAllFavUsers() {
    this.users = await this.userService.getAllUsers();
  }
}
