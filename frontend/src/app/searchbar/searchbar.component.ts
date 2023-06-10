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
  modal = false;

  constructor(private userService: UserService) { }


  ngOnInit(): void {
  }

  async findUser() {
    try {
      const response = await fetch(`https://api.github.com/users/${this.username}`);
      if (response.ok) {
        this.modal = true;
        this.user = await response.json();
      } else {
        this.user = null;
        alert('nao achou o usuario')
      }
    } catch (error) {
      alert('Não foi possivel buscar o usuario no momento.')
    }
  }

  addFavUser() {
    this.userService.insertUser(this.user);
    this.userService.getAllUsers();
    this.closeModal();
  }

  closeModal() {
    this.modal = false;
  }

}
