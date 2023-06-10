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

  deleteUser(user: any) {
    const confirmation = confirm('Tem certeza que deseja deletar o usuário ' + user + ' ?');
    if (confirmation){
      this.userService.deleteUser(user);
    }else {
      return
    }
  }

  toggleStar(user: any) {
    const confirmation = confirm('Tem certeza que deseja marcar (' + user + ') como favorito ?');
    if (confirmation){
      this.userService.toggleStar(user);
    }else {
      return
    }
  }
}
