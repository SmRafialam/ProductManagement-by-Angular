import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatTreeNestedDataSource } from '@angular/material/tree';
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
  @Output() subCategoriesChange = new EventEmitter<any[]>();


  @Input() subCategories!: subCategories[];
  categoryItems : any[] = [];
  subCategoryForm!: FormGroup;
  subCategoryItems : any[] = [];
  selectedSubCategory: null | undefined;
  selectedCategory: any;
  isModalVisible:boolean = true;
  dataSource = new MatTreeNestedDataSource<any>();


  constructor( private catServices: CategoryService,private changeDetectorRef: ChangeDetectorRef){


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
     // console.log(data.result);
      //this.categoryItems = data.result;
      this.categoryItems = this.CategoryData(data.result);
     // console.log(this.categoryItems);
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

    // If a parent category is selected, add the new category as a subcategory
    if (subCategoryFormValue.parent) {
      // Find the parent category in the subCategoryItems array
      const parentCategory = this.subCategoryItems.find(
        (item) => item.id === subCategoryFormValue.parent
      );

      if (parentCategory) {
        // Create subcategory form data
        const subcategoryFormData = this.subCategoryForm.value;

        // Add the new subcategory to the parent category
        this.catServices.addCategories(subcategoryFormData).subscribe(
          (res) => {
            console.log(res);
            parentCategory.subCategories.push(res.result);
            // this.subCategories = [...this.subCategories];

            // Step 2: Emit updated subCategories array
            this.subCategoriesChange.emit(this.subCategories);

            // Reset the form
            this.subCategoryForm.reset();
            this.isModalVisible = false;

            // Update the view
            this.updateSubCategories();
          },
          (error) => {
            console.error('There was an error:', error);
          }
        );
      } else {
        console.log(`Parent category with ID ${subCategoryFormValue.parent} not found.`);
      }
    } else {
      // If no parent category is selected, add the new category to the top level
      subCategoryFormValue.parent = catId;
      this.catServices.addCategories(subCategoryFormValue).subscribe(
        (res) => {
          console.log(res);
          this.subCategoryItems.push(res.result);
          console.log('Subcategory added successfully!!');
          this.loadCategories();

          // Reset the form
          this.subCategoryForm.reset();
          this.isModalVisible = false;

          // Update the view
          this.updateSubCategories();
        },
        (error) => {
          console.error('There was an error:', error);
        }
      );
    }
  }


  // Recursive function to find a category by ID in a nested category hierarchy
  // findCategoryById(categories: any[], category Id: string): any {
  //   for (const category of categories) {
  //     if (category.id === categoryId) {
  //       return category;
  //     } else if (category.subCategories.length > 0) {
  //       const foundCategory = this.findCategoryById(category.subCategories, categoryId);
  //       if (foundCategory) {
  //         return foundCategory;
  //       }
  //     }
  //   }

  //   return null;
  // }

  updateSubCategories() {
    this.dataSource.data = this.categoryItems;
    this.changeDetectorRef.detectChanges();
  }


}
