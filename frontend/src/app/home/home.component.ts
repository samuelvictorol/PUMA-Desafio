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

  deleteUser(user: GitHubUser) {
    const confirmation = confirm('Tem certeza que deseja deletar ' + user.name + ' da sua lista de favoritos ?');
    if (confirmation){
      this.userService.deleteUser(user.login);
    }else {
      return
    }
  }

  toggleStar(user: GitHubUser) {
    const confirmation = confirm('Tem certeza que deseja marcar ' + user.name + ' como favorito ?');
    if (confirmation){
      this.userService.toggleStar(user.login);
    }else {
      return
    }
  }
}
