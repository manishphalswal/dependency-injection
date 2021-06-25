import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { IUser } from '../model/user';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  _url_root_users: string = "https://jsonplaceholder.typicode.com/users";
  _url_root_posts: string = "https://jsonplaceholder.typicode.com/posts";

  private _prop: string = "foo";
  public propChanged: BehaviorSubject<string> = new BehaviorSubject<string>(this._prop);

  getProp(): string {
    return this._prop;
  }

  setProp(prop: string) {
    this._prop = prop;
    this.propChanged.next(this._prop);
  }

  constructor(private http: HttpClient) { }

  getUsersViaRest(): Observable<IUser[]> {
    let headers = new HttpHeaders().set("Authorization", "Bearer | token");
    return this.http.get<IUser[]>(this._url_root_users, {headers});
  }

  getUserByIdViaRest(userId: number): Observable<IUser> {
    return this.http.get<IUser>(`${this._url_root_users}/${userId}`);
  }

  createUserViaRest(user: IUser): Observable<IUser> {
    return this.http.post<IUser>(this._url_root_users, user);
  }

  updateUserViaRest(user: IUser): Observable<IUser> {
    return this.http.put<IUser>(`${this._url_root_users}/${user.id}`, user);
  }

  getUserPostsViaRest(userId: number): Observable<any> {
    let params: HttpParams = new HttpParams().set('userId', userId.toString());
    return this.http.get<any>(this._url_root_posts, { params });
  }
  
  deleteUserViaRest(userId: number): Observable<IUser> {
    return this.http.delete<IUser>(`${this._url_root_users}/${userId}`);
  }

}
