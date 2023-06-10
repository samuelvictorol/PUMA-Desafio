import { Component, OnInit } from '@angular/core';
import GitHubUser from '../interfaces/GitHubUser';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css']
})
export class SearchbarComponent implements OnInit {
  username = '';
  user: GitHubUser | null = null;
  users: GitHubUser[] = [];
  modal = false;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  async findUser() {
    if(this.userService.getAllUsersLenght() == 5){
      return alert('Você já tem 5 usuarios favoritos. Apague um para continuar.')
    }else if (await this.checkUsername()) {
      return alert('Você já tem esse usuario como favorito.')
    } 
    else{
      try {
        const response = await fetch(`https://api.github.com/users/${this.username}`);
        if (response.ok) {
          this.modal = true;
          const fullUser = await response.json();
          this.user = {
            login: fullUser.login,
            name: fullUser.name,
            avatar_url: fullUser.avatar_url,
            html_url: fullUser.html_url,
            fav: false
          }
        } else {
          this.user = null;
          this.username = '';
          alert('Usuário não Existe')
        }
      } catch (error) {
        alert('Não foi possivel buscar o usuario no momento.')
      }
    } 
  }
  addFavUser() {
    this.userService.insertUser(this.user);
    // this.userService.getAllUsers();
    this.closeModal();
  }

  async checkUsername(){
    const users = await this.userService.getAllUsers();
    let userExists = false;
    users.forEach((user) => {
      if(user.login == this.username){
        userExists = true;
        return;
      }
    });
    return userExists
  }

  closeModal() {  
    this.modal = false;
  }

}
