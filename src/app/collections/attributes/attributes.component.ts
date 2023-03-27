import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
declare var $:any;

@Component({
  selector: 'app-attributes',
  templateUrl: './attributes.component.html',
  styleUrls: ['./attributes.component.css']
})
export class AttributesComponent implements OnInit{

  public attributeItems:any = [];
  public isCollapsed = true;

  ngOnInit(): void {
    console.log("Collections");
    // this.loadScripts();
    this.loadAttributes();
  }
  constructor(private catServices: CategoryService){


  }

  // private loadScripts() {
  //   console.log("custom js")
  //   $(".expand-btn").click(function () {
  //     console.log("expand")
  //     $(".pruvit-cms").toggleClass("expandSideMenu");
  //   });

  // }

  loadAttributes(){
    this.catServices.getAttributes().subscribe((data:any)=>{
      console.log(data.result);
      this.attributeItems = data.result;
      // /console.log(this.attributeItems);
  });
}
}
