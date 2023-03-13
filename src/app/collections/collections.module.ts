import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesComponent } from './categories/categories.component';
import { AttributesComponent } from './attributes/attributes.component';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from '../shared/sidebar/sidebar.component';
import { SharedModule } from '../shared/shared.module';
import { CollectionSidebarComponent } from './collection-sidebar/collection-sidebar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatTreeModule} from '@angular/material/tree';


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
        SharedModule,
        BrowserAnimationsModule,
        MatButtonModule,
        MatIconModule,
        MatTreeModule
    ]
})
export class CollectionsModule { }
