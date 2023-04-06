import { Component, Input } from '@angular/core';
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
export class RecursiveComponent {

  @Input() subCategories!: subCategories[];
  categoryItems : any[] = [];

  constructor( private catServices: CategoryService){


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
}
