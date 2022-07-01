import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http : HttpClient) { }

  getUsers(){
    //TODO: add a constants in another file
    return this.http.get<any>("https://62bb5958573ca8f83297cea4.mockapi.io/users");
  }

  postUser(data : any){
     //TODO: add a constants in another file
    return this.http.post<any>("https://62bb5958573ca8f83297cea4.mockapi.io/users/", data);
  }

  putProduct(data : any, id: number){
    return this.http.put<any>("https://62bb5958573ca8f83297cea4.mockapi.io/users/"+id,data);
  }

  deleteProduct(id: number){
    return this.http.delete<any>("https://62bb5958573ca8f83297cea4.mockapi.io/users/"+id);
  }

}
