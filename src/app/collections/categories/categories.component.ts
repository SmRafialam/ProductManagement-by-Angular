import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/auth.service';
import { CategoryService } from 'src/app/services/category.service';
import {NestedTreeControl} from '@angular/cdk/tree';
import {MatTreeNestedDataSource} from '@angular/material/tree';
declare var $:any;

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit{
  isParent = (_: number, node: any) => node.subCategories && node.subCategories.length > 0;
  isChild = (_: number, node: any) => !(node.subCategories && node.subCategories.length > 0);
  public isCollapsed = true;
  categoryItems : any[] = [];
  subCategoryItems : any[] = [];
  public root: any[] = [];
  treeControl = new NestedTreeControl<any>(node => node.subCategories);
  dataSource = new MatTreeNestedDataSource<any>();

  constructor(private accountService: ApiService, private catServices: CategoryService){


  }

  ngOnInit(): void {
    this.loadScripts();
    this.loadCategories();
    // this.dataSource.data = this.categoryItems;

  }

  hasChild = (_: number, node: any) => !!node.subCategories && node.subCategories.length > 0;
  // hasParent = this.treeControl.getParent(node:any);


  loadCategories(){
    this.catServices.getCategories().subscribe((data:any)=>{
      console.log(data.result);
      //this.categoryItems = data.result;
      this.categoryItems = this.CategoryData(data.result);
      console.log(this.categoryItems);
        //Create root for top-level node(s)
        // Cache found parent index
    //     const map: any[] = [];
    //     data.result.forEach((node: any) => {
    //       // No parentId means top level
    //       if (!node.parent) return this.root.push(node);

    //       // Insert node as child of parent in flat array
    //       let parentIndex = map[node.parent];
    //       if (typeof parentIndex !== "string") {
    //         parentIndex = data.result.findIndex((el:any) => el.id === node.parent);
    //         map[node.parent] = parentIndex;
    //       }

    //       if (!data.result[parentIndex].subCategory) {
    //         return data.result[parentIndex].subCategory = [node];
    //       }

    //       data.result[parentIndex].subCategory.push(node);
    //     });

    //     console.log(this.root);



    })

  }

  private loadScripts() {
    console.log("custom js")
    $(".expand-btn").click(function () {
      console.log("expand")
      $(".pruvit-cms").toggleClass("expandSideMenu");
    });

  }

 CategoryData(data:any,parent=null){
  //console.log(data);

  return data.reduce((acc:any,curEle:any)=>{
    if(curEle.parent == parent){
      const currentCategory = {...curEle,subCategories:[]};
      const child = this.CategoryData(data,curEle.id);
      if(child.length !== 0){
        currentCategory.subCategories = child;
      }
        acc.push(currentCategory)

    }

    return acc;

  },[])
}


}
