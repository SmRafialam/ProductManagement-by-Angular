import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { CategoryService } from 'src/app/services/category.service';

export class subCategories{
  id: string = '';
  name: string = '';
  subCategories: any[] = [];
  shortText: any;
  longText: any;
  media: any;
  parent: any;
}

@Component({
  selector: 'app-recursive',
  templateUrl: './recursive.component.html',
  styleUrls: ['./recursive.component.css']
})
export class RecursiveComponent implements OnInit{
  @Output() subCategoriesChange = new EventEmitter<any[]>();


  @Input() subCategories: subCategories[] = [];
  categoryItems : any[] = [];
  subCategoryForm!: FormGroup;
  subCategoryItems : any[] = [];
  selectedSubCategory: null | undefined;
  selectedCategory: any;
  isModalVisible:boolean = true;
  dataSource = new MatTreeNestedDataSource<any>();
  currentCategoryId!:string;


  constructor( private catServices: CategoryService,private changeDetectorRef: ChangeDetectorRef){


  }

  ngOnInit(): void {

    //this.loadSubCategories();

    //console.log(this.subCategories)

    this.subCategoryForm= new FormGroup ({
      name: new FormControl(''),
      shortText: new FormControl(''),
      longText: new FormControl(''),
      media: new FormControl([]),
      parent: new FormControl(''),
      subCategories: new FormControl([])
    });

  }

  onEditClick(catId: any) {
    //console.log(catId);
    this.currentCategoryId = catId;
    const currentSubCategories = this.subCategories.find((c)=>{return c.id === catId});
    console.log(currentSubCategories)
    if (currentSubCategories) {
      this.subCategoryForm.setValue({
          name: currentSubCategories.name,
          shortText: currentSubCategories.shortText,
          longText: currentSubCategories.longText,
          media: currentSubCategories.media,
          parent: currentSubCategories.parent,
          subCategories: currentSubCategories.subCategories
      });
  } else {
      console.log(`Subcategory with id ${catId} not found`);
  }

  }

  onCategoriesCreate(CategoryData:any){
    const currentSubCategoriesIndex = this.subCategories.findIndex((c) => c.id === this.currentCategoryId);

    this.catServices.editCategories(this.currentCategoryId,CategoryData).subscribe((data:any)=>{
      console.log(data.result,"Subategory successfully updated!");

      this.subCategories.push(data.result);

      data.result[0].subCategories = [];
      this.subCategories[currentSubCategoriesIndex].subCategories.push(data.result[0]);// Reset the form

      // Emit the updated subCategories array
      // this.subCategoriesChange.emit(this.subCategoryItems);

      // Reset the form
      this.subCategoryForm.reset();
      this.isModalVisible = false;

      // Trigger change detection to update the view
      this.changeDetectorRef.detectChanges();
    })
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

  loadSubCategories(){
    this.catServices.getCategories().subscribe((data:any)=>{
     // console.log(data.result);
      //this.categoryItems = data.result;
      this.subCategoryItems = this.CategoryData(data.result);
     console.log(this.subCategoryItems);
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

  onSubCategoriesSubmit(catId: any): void {
    const subCategoryFormValue = this.subCategoryForm.value;
    const parentCategoryId = catId;// subCategoryFormValue.parent;
    const parentInd = this.subCategories.findIndex(subCategory => subCategory.id === parentCategoryId);


      // If no parent category is selected, add the new category to the top level
      subCategoryFormValue.parent = catId;
      this.catServices.addCategories(subCategoryFormValue).subscribe((res) => {
        console.log(res);
        res.result[0].subCategories = [];
        this.subCategories[parentInd].subCategories.push(res.result[0]);// Reset the form
        //this.CategoryData(this.subCategories,catId);
        // this.loadSubCategories();
        console.log(this.subCategories)
        this.subCategoryForm.reset();
        this.isModalVisible = false;
        console.log('Subcategory added successfully!!');

        // Trigger change detection to update the view
        this.changeDetectorRef.detectChanges();
      }, error => {
        console.error('There was an error:', error);
      });

  }

}
