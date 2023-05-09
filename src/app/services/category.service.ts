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

  editCategories(id:string,value:any){
    const endpoint = 'collections/category/';
    const url = `${this.apiHost}${endpoint}`+id;
    return this.http.patch(url,value,{
      headers: new HttpHeaders({
      'Content-Type':  'application/json',
    })
  });
  }

  editSubCategory(categoryId:string, subCategoryId:string, value:any){
    const endpoint = 'collections/category/' + categoryId + '/subcategories/' + subCategoryId;
    const url = `${this.apiHost}${endpoint}`;
    return this.http.patch(url,value,{
      headers: new HttpHeaders({
      'Content-Type':  'application/json',
    })
  });
  }

  deleteCategory(id:string) :Observable<any>{
    const endpoint = 'collections/category/';
    const url = `${this.apiHost}${endpoint}`+id;
    return this.http.delete(url,{
      headers: new HttpHeaders({
      'Content-Type':  'application/json',
    })
  });
  }


}
