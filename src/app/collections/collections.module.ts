import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesComponent } from './categories/categories.component';
import { AttributesComponent } from './attributes/attributes.component';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from '../shared/sidebar/sidebar.component';
import { SharedModule } from '../shared/shared.module';
import { CollectionSidebarComponent } from './collection-sidebar/collection-sidebar.component';



@NgModule({
    declarations: [
        CategoriesComponent,
        AttributesComponent,
        CollectionSidebarComponent
    ],
    exports: [
        CategoriesComponent,
        AttributesComponent,
    ],
    imports: [
        CommonModule,
        RouterModule,
        SharedModule
    ]
})
export class CollectionsModule { }
