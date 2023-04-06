import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/services/auth.service';
import { CategoryService } from 'src/app/services/category.service';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { FormGroup,FormControl, FormArray } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { DeleteModalComponent } from './delete-modal/delete-modal.component';


declare var $:any;

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit{
  isModalVisible:boolean = true;

  isParent = (_: number, node: any) => node.subCategories && node.subCategories.length > 0;
  isChild = (_: number, node: any) => !(node.subCategories && node.subCategories.length > 0);
  public isCollapsed = true;
  categoryItems : any[] = [];
  subCategoryItems : any[] = [];
  public root: any[] = [];
  treeControl = new NestedTreeControl<any>(node => node.subCategories);
  dataSource = new MatTreeNestedDataSource<any>();
  snackBar: any;
  deleteButton:any = document.querySelector('.delete-button');

  constructor(private http: HttpClient,private accountService: ApiService, private catServices: CategoryService){


  }

  ngOnInit(): void {
    //this.loadScripts();
    this.loadCategories();
    //this.dataSource.data = this.categoryItems;
    this.getData();

  }



  myForm = new FormGroup({
    name: new FormControl(''),
    shortText: new FormControl('The world\'s preeminent Pure Therapeutic Ketones made naturally.'),
    longText: new FormControl(''),
    media: new FormControl([]),
    parent: new FormControl(''),
    subCategories: new FormArray([])
  });



  onSubmit() {
    // const formData = this.myForm.value;
    // const subCategories = formData.subCategories?.map((category: any) => {
    //   return {
    //     name: category.name,
    //     shortText: category.shortText,
    //     longText: category.longText,
    //     media: category.media,
    //     parent: formData.name,
    //     subCategories: category.subCategories,
    //   };
    // });
    // const category = {
    //   name: formData.name,
    //   shortText: formData.shortText,
    //   longText: formData.longText,
    //   media: formData.media,
    //   parent: formData.parent,
    //   subCategories,
    // };
    this.catServices.addCategories(this.myForm.value).subscribe((res) => {
      this.categoryItems.push(res);
      this.loadCategories();
      console.log('Category added successfully!!');
    }, error => {
      console.error('There was an error:', error);
    });
    this.isModalVisible = false;
  }

  hasChild = (_: number, node: any) => !!node.subCategories && node.subCategories.length > 0;
  // hasParent = this.treeControl.getParent(node:any);


  loadCategories(){
    this.catServices.getCategories().subscribe((data:any)=>{
      console.log(data.result);
      //this.categoryItems = data.result;
      this.categoryItems = this.CategoryData(data.result);
      console.log(this.categoryItems);
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

getData(){
    this.catServices.getCategories().subscribe((categories: any) => {
    this.dataSource.data = categories;
    console.log(categories);
  });
}



onDelete(catId: any) {

  // const confirmation = confirm(`Are you sure you want to delete id: ${catId}?`);
  // if (confirmation) {
    this.catServices.deleteCategory(catId).subscribe(data => {
      //this.getData();
      this.categoryItems = this.categoryItems.filter(item => item.id !== catId);

      console.log("Category deleted successfully!!");

    }, error => {
      console.log('Error deleting category:', error);
    });
  // }
}


// openDeleteModal() {

//   const dialogRef = this.dialog.open(DeleteModalComponent);

//   dialogRef.afterClosed().subscribe(result => {
//     // Handle the modal result if needed
//     console.log(result);
//   });
// }


// confirmDelete() {
//   const dialogRef = this.dialog.open(DeleteModalComponent);

//   dialogRef.afterClosed().subscribe((result) => {
//     if (result === true) {
//       // Perform delete operation
//       console.log('Item deleted');
//     }
//   });
// }

 }




