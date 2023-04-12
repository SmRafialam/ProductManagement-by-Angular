import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CategoryService } from 'src/app/services/category.service';

export class subCategories{
  id: string = '';
  name: string = '';
  subCategories: subCategories[] = [];
}

@Component({
  selector: 'app-recursive',
  templateUrl: './recursive.component.html',
  styleUrls: ['./recursive.component.css']
})
export class RecursiveComponent implements OnInit{

  @Input() subCategories!: subCategories[];
  categoryItems : any[] = [];
  subCategoryForm!: FormGroup;
  subCategoryItems : any[] = [];
  selectedSubCategory: null | undefined;
  selectedCategory: any;

  constructor( private catServices: CategoryService){


  }

  ngOnInit(): void {

    this.loadCategories();

    this.subCategoryForm= new FormGroup ({
      name: new FormControl(''),
      shortText: new FormControl(''),
      longText: new FormControl(''),
      media: new FormControl([]),
      parent: new FormControl(''),
      subCategories: new FormControl([])
  });
  }


  onDelete(catId: any) {

    // const confirmation = confirm(`Are you sure you want to delete id: ${catId}?`);
    // if (confirmation) {
      this.catServices.deleteCategory(catId).subscribe(data => {
        //this.getData();
        this.subCategories = this.subCategories.filter(item => item.id !== catId);

        console.log("Category deleted successfully!!");

      }, error => {
        console.log('Error deleting category:', error);
      });
    // }
  }

  loadCategories(){
    this.catServices.getCategories().subscribe((data:any)=>{
      console.log(data.result);
      //this.categoryItems = data.result;
      this.categoryItems = this.CategoryData(data.result);
      console.log(this.categoryItems);
    })
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

  onSubCategoriesSubmit(catId: any) {
    const subCategoryFormValue = this.subCategoryForm.value;
    const parentCategory = subCategoryFormValue.parent;

    // If a parent category is selected, add the new category as a subcategory
    if (parentCategory) {
      // Find the parent category in the categoryItems array
      const parentCategoryObj = this.findCategoryById(this.categoryItems, parentCategory);

      if (parentCategoryObj) {
        // Create subcategory form data
        const subcategoryFormData = this.subCategoryForm.value;

        // Add the new subcategory to the parent category
        parentCategoryObj.subCategories.push(subcategoryFormData);
      } else {
        console.log(`Parent category with ID ${parentCategory} not found.`);
      }
    } else {
      // If no parent category is selected, add the new category to the top level
      subCategoryFormValue.parent = catId;
      this.catServices.addCategories(subCategoryFormValue).subscribe((res) => {
        this.subCategoryItems.push(res);
        this.loadCategories();
        console.log('Subcategory added successfully!!');
      }, error => {
        console.error('There was an error:', error);
      });
    }
  }

  // Recursive function to find a category by ID in a nested category hierarchy
  findCategoryById(categories: any[], categoryId: string): any {
    for (const category of categories) {
      if (category.id === categoryId) {
        return category;
      } else if (category.subCategories.length > 0) {
        const foundCategory = this.findCategoryById(category.subCategories, categoryId);
        if (foundCategory) {
          return foundCategory;
        }
      }
    }

    return null;
  }


}
