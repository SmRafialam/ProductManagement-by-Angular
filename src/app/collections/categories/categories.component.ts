import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/services/auth.service';
import { CategoryService } from 'src/app/services/category.service';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { FormGroup,FormControl, FormArray, FormBuilder, Validators } from '@angular/forms';
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
  categoryForm!: FormGroup;
  subCategoryForm!: FormGroup;
  parentId!: string;

  constructor(private http: HttpClient,private accountService: ApiService, private catServices: CategoryService, private formBuilder: FormBuilder){


  }

  ngOnInit(): void {
    //this.loadScripts();
    this.loadCategories();
    //this.dataSource.data = this.categoryItems;
    this.getData();


    this.categoryForm = new FormGroup({
        name: new FormControl(''),
        shortText: new FormControl(''),
        longText: new FormControl(''),
        media: new FormControl([]),
        parent: new FormControl(''),
        subCategories: new FormControl([])
      });

    this.subCategoryForm= new FormGroup ({
        name: new FormControl(''),
        shortText: new FormControl(''),
        longText: new FormControl(''),
        media: new FormControl([]),
        parent: new FormControl(''),
        subCategories: new FormControl([])
    });
  }



  onSubmit() {

    this.catServices.addCategories(this.categoryForm.value).subscribe((res) => {
      this.categoryItems.push(res);
      this.loadCategories();
      console.log('Category added successfully!!');
    }, error => {
      console.error('There was an error:', error);
    });
    this.isModalVisible = false;

    // const formData = this.categoryForm.value;

    // // Replace null values with empty string values in the formData object
    // Object.keys(formData).forEach(key => {
    //   if (formData[key] === null) {
    //     formData[key] = '';
    //   }
    // });

    // const parentCategory = formData.parent;

    // // If a parent category is selected, add the new category as a subcategory
    // if (parentCategory) {
    //   // Find the parent category in the categoryItems array
    //   const parentIndex = this.categoryItems.findIndex(category => category.id === parentCategory);

    //     // Create subcategory form data
    //     const subcategoryFormData = this.createSubCategoryForm(parentCategory).value;

    //     // Add the new subcategory
    //     this.categoryItems[parentIndex].subCategories.push(subcategoryFormData);
    // } else if(!parentCategory) {
    //   // If no parent category is selected, add the new category to the top level
    //   this.catServices.addCategories(formData).subscribe((res) => {
    //     this.categoryItems.push(res);
    //     this.loadCategories();
    //     console.log('Category added successfully!!');
    //   }, error => {
    //     console.error('There was an error:', error);
    //   });
    // }

    // // Reset the form
    // this.categoryForm.reset();
    // this.isModalVisible = false;
  }

  onSubCategoriesSubmit(): void {
    const subCategoryFormValue = this.subCategoryForm.value;
    const parentCategory = subCategoryFormValue.parent;


    // If a parent category is selected, add the new category as a subcategory
    if (parentCategory) {
      // Find the parent category in the categoryItems array
      const parentIndex = this.categoryItems.findIndex(category => category.id === parentCategory);

        // Create subcategory form data
        const subcategoryFormData = this.categoryForm.value;

        // Add the new subcategory
        this.categoryItems[parentIndex].subCategories.push(subcategoryFormData);
    } else if(!parentCategory) {
      // If no parent category is selected, add the new category to the top level
      this.catServices.addCategories(subCategoryFormValue).subscribe((res) => {
        this.subCategoryItems.push(res);
        this.loadCategories();
        console.log('Category added successfully!!');
      }, error => {
        console.error('There was an error:', error);
      });
    }


    // Reset the form
    this.subCategoryForm.reset();
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

    // this.catServices.getCategories().subscribe((data:any)=>{
    //   console.log(data.result);
    //   // Create a flat list of categories with parent information
    //   const flatList = data.result.map((category:any) => {
    //     return {
    //       ...category,
    //       parent: category.parent || null
    //     }
    //   });

    //   // Use a recursive function to create a nested tree structure based on subcategories
    //   const createTree = (categories:any, parent:any) => {
    //     return categories.filter((category:any) => category.parent === parent)
    //                     .map((category:any) => {
    //                       return {
    //                         ...category,
    //                         subCategories: createTree(categories, category.id)
    //                       }
    //                     });
    //   }

    //   this.categoryItems = createTree(flatList, null);

    //   console.log(this.categoryItems);
    // })
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


