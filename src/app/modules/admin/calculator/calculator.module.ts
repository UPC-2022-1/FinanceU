import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FuseCardModule } from '@fuse/components/card';
import { FuseAlertModule } from '@fuse/components/alert';
import { SharedModule } from 'app/shared/shared.module';
import { CalculatorComponent } from './calculator.component';
import { NumbersOnlyDirective } from 'app/directives/numbers-only.directive';
import { MatGridListModule } from '@angular/material/grid-list';
import { FuseMasonryModule } from '@fuse/components/masonry';

const calculatorRoutes: Route[] = [
    {
        path     : '',
        component: CalculatorComponent
    }
];

@NgModule({
    declarations: [
        CalculatorComponent,
        NumbersOnlyDirective,
    ],
    imports     : [
        RouterModule.forChild(calculatorRoutes),
        MatButtonModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatProgressSpinnerModule,
        FuseCardModule,
        FuseAlertModule,
        SharedModule,
        MatGridListModule,
        FuseMasonryModule
    ]
})
export class CalculatorModule
{
}
