import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import GitHubUser from '../interfaces/GitHubUser';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { 
  }

  public async getAllUsers () {
    const db = await lastValueFrom(this.http.get<GitHubUser[]>('http://localhost:3333/users'))
    return Object.values(db);
  
  }
}
