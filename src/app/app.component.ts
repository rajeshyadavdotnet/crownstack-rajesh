import { Component, OnInit } from '@angular/core';
import { ajax, AjaxResponse } from 'rxjs/ajax';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { LocationData, Branch, Category, SubCategory } from './module';

import { ApiserviceService } from './apiservice.service';
import { HttpErrorResponse } from '@angular/common/http';

const DATA_SOURCE = 'assets/catalog.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  locationData: LocationData[];
  locationSelectedData: any;
  branchSelectedData: Branch;
  categorySelectedData: Category;
  subcategorySelectedData: SubCategory;
  showCategoryData = false;
  hideWelcomMsg = false;
  selectedBranchName: string;

  constructor(private apiService: ApiserviceService) {}

  // Get blog data
  getLocationData(target): void {
    this.apiService.getLocation().subscribe(
      (res: any) => {
        this.locationSelectedData = res.data.locations.filter(
          (loc) => loc.name === target
        );
        this.hideWelcomMsg = true;
      },
      (err: HttpErrorResponse) => {
        console.log(err);
      }
    );
  }
  getBranchData(branchname) {
    this.branchSelectedData = this.locationSelectedData[0].branches.filter(
      (br) => br.name === branchname
    );
    this.selectedBranchName = this.branchSelectedData[0].name;
    this.categorySelectedData = this.branchSelectedData[0].categories;
    this.showCategoryData = true;
  }
  getSubCategoryData(sub) {
    this.subcategorySelectedData = this.categorySelectedData[0].subcategories;
    this.showCategoryData = false;
  }

  ngOnInit() {
    const categoryData$ = ajax(DATA_SOURCE);
    categoryData$
      .pipe(
        map((data: AjaxResponse) => {
          return data.response;
        }),
        map((apiResponse: any) => {
          return apiResponse.data.locations;
        }),
        catchError((err) => of([]))
      )
      .subscribe((locationData: LocationData[]) => {
        this.locationData = locationData;
      });
  }
  onLocationClick(event) {
    this.getLocationData(event.target.text);
  }

  onBranchClick(event) {
    this.getBranchData(event.target.text);
  }
}
