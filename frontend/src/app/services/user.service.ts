import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import GitHubUser from '../interfaces/GitHubUser';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  usersDB: GitHubUser[] = [];

  constructor(private http: HttpClient) { 
  }

  public async getAllUsers () {
    const db = await lastValueFrom(this.http.get<GitHubUser[]>('http://localhost:3333/users'))
    this.usersDB = Object.values(db);
    return this.usersDB;
  
  }

  public async insertUser(user: any) {
    await lastValueFrom(this.http.post<GitHubUser>('http://localhost:3333/users', user));
    this.loader();
  }

  getAllUsersLenght(){
    return this.usersDB.length;
  }

  public async deleteUser(user: string) {
    await lastValueFrom(this.http.delete<GitHubUser>('http://localhost:3333/users/' + user));
    this.loader();
  }

  loader() {
    const loader = document.querySelector('.loader-wrapper') as HTMLElement;
    loader.style.display = 'flex';
    
    setTimeout(() => {
      // fazer animacao de loading aqui 
      location.reload();
    }, 1500);
  }

  async toggleStar(user: any) {
    await lastValueFrom(this.http.patch<GitHubUser>('http://localhost:3333/users/' + user + '/toggle-star', user));
    this.loader();
  }

}
