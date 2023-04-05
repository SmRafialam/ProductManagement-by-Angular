import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.css']
})
export class DeleteModalComponent implements OnInit{
  dataSource = new MatTreeNestedDataSource<any>();
  categoryItems : any[] = [];

  constructor(private catServices: CategoryService,public dialogRef: MatDialogRef<DeleteModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,private dialog: MatDialog){

  }

  ngOnInit(): void {

    const dialogRef = this.dialog.open(DeleteModalComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        // Perform delete operation
        console.log('Item deleted');
      }
    });
  }

  loadCategories(){
    this.catServices.getCategories().subscribe((data:any)=>{
      console.log(data.result);
      //this.categoryItems = data.result;
      this.categoryItems = this.CategoryData(data.result);
      console.log(this.categoryItems);
    })

  }

  getData(){
      this.catServices.getCategories().subscribe((categories: any) => {
      this.dataSource.data = categories;
      console.log(categories);
    });
  }

  onDelete(catId: any) {
    const confirmation = confirm(`Are you sure you want to delete id: ${catId}?`);
    if (confirmation) {
      this.catServices.deleteCategory(catId).subscribe(data => {
        this.getData();
        // this.deleteModal();
        // this.dataSource.data = this.dataSource.data.filter(item => item.id !== catId);
        console.log("Category deleted successfully!!")
      }, error => {
        console.log('Error deleting category:', error);
      });
    }
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
