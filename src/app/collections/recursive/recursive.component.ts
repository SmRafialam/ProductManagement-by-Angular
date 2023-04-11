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

  constructor( private catServices: CategoryService){


  }

  ngOnInit(): void {
    this.subCategoryForm= new FormGroup ({
      name: new FormControl(''),
      shortText: new FormControl(''),
      longText: new FormControl(''),
      media: new FormControl(['']),
      parent: new FormControl(),
      subCategories: new FormControl([''])
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



  onSubCategoriesSubmit() {
    // this.subCategoryItems = event.target.value;
  }
}
