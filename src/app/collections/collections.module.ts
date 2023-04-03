import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesComponent } from './categories/categories.component';
import { RecursiveComponent } from './recursive/recursive.component';
import { AttributesComponent } from './attributes/attributes.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { CollectionSidebarComponent } from './collection-sidebar/collection-sidebar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTreeModule } from '@angular/material/tree';
import { ReactiveFormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { DeleteModalComponent } from './categories/delete-modal/delete-modal.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTabsModule } from '@angular/material/tabs';


@NgModule({
    declarations: [
        CategoriesComponent,
        AttributesComponent,
        CollectionSidebarComponent,
        DeleteModalComponent,
        RecursiveComponent
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
        MatTreeModule,
        ReactiveFormsModule,
        MatMenuModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatExpansionModule,
        MatProgressBarModule,
        MatTabsModule

    ],
    entryComponents: [
      DeleteModalComponent
    ]
})
export class CollectionsModule { }
