import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
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
  currentCategoryId!:string;

  constructor(private catServices: CategoryService,private changeDetectorRef: ChangeDetectorRef){


  }

  ngOnInit(): void {
    //this.loadScripts();
    this.loadCategories();
    //this.dataSource.data = this.categoryItems;
    //this.getData();

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
      console.log(res);
      this.categoryItems.push(res.result);
      this.loadCategories();
      console.log('Category added successfully!!');
    }, error => {
      console.error('There was an error:', error);
    });
    this.isModalVisible = false;
  }


  onSubCategoriesSubmit(catId: any): void {
    const subCategoryFormValue = this.subCategoryForm.value;
    const parentCategory = subCategoryFormValue.parent;

    // If a parent category is selected, add the new category as a subcategory
    if (parentCategory) {
      // Find the parent category in the categoryItems array
      const parentIndex = this.categoryItems.findIndex(category => category.id === parentCategory);

      // Create subcategory form data
      const subcategoryFormData = this.subCategoryForm.value;

      // Add the new subcategory
      this.categoryItems[parentIndex].subCategories.push(subcategoryFormData);

      // Reset the form
      this.subCategoryForm.reset();
      this.isModalVisible = false;

      // Trigger change detection to update the view
      this.changeDetectorRef.detectChanges();

      this.loadCategories();

    } else {
      // If no parent category is selected, add the new category to the top level
      subCategoryFormValue.parent = catId;
      this.catServices.addCategories(subCategoryFormValue).subscribe((res) => {
        console.log(res.result);
        this.subCategoryItems.push(res.result);// Reset the form
        this.subCategoryForm.reset();
        this.isModalVisible = false;
        console.log('Subcategory added successfully!!');
        this.loadCategories();

        // Trigger change detection to update the view
        this.changeDetectorRef.detectChanges();
      }, error => {
        console.error('There was an error:', error);
      });
    }
  }

  onEditClick(catId: any) {
    this.currentCategoryId = catId;
    const currentCategories = this.categoryItems.find((c)=>{return c.id === catId});
    console.log(currentCategories)

    this.subCategoryForm.setValue({
      name: currentCategories.name,
      shortText: currentCategories.shortText,
      longText: currentCategories.longText,
      media: currentCategories.media,
      parent: currentCategories.parent,
      subCategories: currentCategories.subCategories
    })
  }

  onCategoriesCreate(CategoryData:any){

    this.catServices.editCategories(this.currentCategoryId,CategoryData).subscribe((data:any)=>{
      console.log(data,"Category successfully updated!");

      this.subCategoryItems.push(data.result);

      // data.result[0].subCategories = [];
      // this.categoryItems[currentSubCategoriesIndex].subCategories.push(data.result[0]);// Reset the form

      this.loadCategories();
      // Reset the form
      this.subCategoryForm.reset();
      this.isModalVisible = false;

      // Trigger change detection to update the view
      this.changeDetectorRef.detectChanges();
    })
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
    this.dataSource.data = categories.result;
    console.log(categories.result);
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

 }


