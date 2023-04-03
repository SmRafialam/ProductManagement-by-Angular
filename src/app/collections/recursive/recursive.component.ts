import { Component, Input } from '@angular/core';

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


}
