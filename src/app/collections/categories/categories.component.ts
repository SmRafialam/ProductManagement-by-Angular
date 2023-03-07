import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { CategoryService } from 'src/app/services/category.service';
declare var $:any;

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit{
  public isCollapsed = true;
  categoryItems : any[] = [];
  constructor(private accountService: ApiService, private catServices: CategoryService){

  }

  ngOnInit(): void {
    this.loadScripts();
    this.loadCategories();
  }

  loadCategories(){
    this.catServices.getCategories().subscribe((data:any)=>{
      console.log(data.result);
      this.categoryItems = data.result;
    })

  }

  private loadScripts() {
    console.log("custom js")
    $(".expand-btn").click(function () {
      console.log("expand")
      $(".pruvit-cms").toggleClass("expandSideMenu");
    });

  }
}
