import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  apiHost: string;
  categoryItems: any;

  constructor(private http: HttpClient) {
    this.apiHost = environment.apiHost;
  }

  getCategories(): Observable<any>{
    //const url = 'https://pim-nest.vercel.app/api/v1/collections/snippet/category';
     const endpoint = 'collections/category';
     const url = `${this.apiHost}${endpoint}`;
     return this.http.get(url);
    }

  getAttributes(){
    const endpoint = 'collections/attribute';
     const url = `${this.apiHost}${endpoint}`;
     return this.http.get(url);
  }

  addCategories(data:any): Observable<any>{
    const endpoint = 'collections/category';
     const url = `${this.apiHost}${endpoint}`;
     return this.http.post(url,data,{
      headers: new HttpHeaders({
      'Content-Type':  'application/json',
    })
  });
  }

  deleteCategory(id:string) :Observable<any>{
    // const httpHeaders = new HttpHeaders({
    //   'Content-Type': 'application/json'
    // });
    // const options = {
    //   headers: httpHeaders
    // };

    // const url = `/api/v1/collections/category/${id}`;

    // return this.http.delete(url,options);
    const endpoint = 'collections/category/';
    const url = `${this.apiHost}${endpoint}`+id;
    return this.http.delete(url,{
      headers: new HttpHeaders({
      'Content-Type':  'application/json',
    })
  });
  }


}
