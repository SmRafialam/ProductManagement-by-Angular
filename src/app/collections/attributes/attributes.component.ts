import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CategoryService } from 'src/app/services/category.service';
declare var $:any;

@Component({
  selector: 'app-attributes',
  templateUrl: './attributes.component.html',
  styleUrls: ['./attributes.component.css']
})

export class AttributesComponent implements OnInit{

  public attributeItems:any = [];
  public isCollapsed = true;
  attributeForm!: FormGroup;
  isModalVisible!: boolean ;


  ngOnInit(): void {
    console.log("Collections");
    // this.loadScripts();
    this.loadAttributes();

    this.attributeForm = new FormGroup({
      name: new FormControl(''),
      enableSkuSuffix: new FormControl(false),
      choices: new FormControl('')
    });
  }
  constructor(private catServices: CategoryService){


  }

  onSubmitAttribute(){
    console.log("Attribute");
    this.catServices.addAttributes(this.attributeForm.value).subscribe((res) => {
      console.log(res.result);
      this.attributeItems.push(res.result);
      console.log('Attributes added successfully!!');
      this.loadAttributes();
    }, error => {
      console.error('There was an error:', error);
    });
    this.isModalVisible = false;
  }

  loadAttributes(){
    this.catServices.getAttributes().subscribe((data:any)=>{
      console.log(data.result);
      this.attributeItems = data.result;
      // /console.log(this.attributeItems);
    });
  }


}
