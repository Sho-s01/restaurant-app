import { Component, Input, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import 'rxjs/Rx';
import * as papa from 'papaparse'
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TestBed } from '@angular/core/testing';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  constructor(private http: HttpClient, private modalService: NgbModal) { }
  file: any = '';
  restaurantData: any;
  inputSearch;
  filteredResults;
  cuisineList: any = [];
  settings: any = {}
  cuisineFilter:any=[]
  ngOnInit() {
    this.settings = {
      enableSearchFilter: true,
      text: "Select Cuisines",
      searchPlaceholderText:"Search Cuisines",
      // selectAllText: 'Select All Cuisines',
      unSelectAllText: 'UnSelect All',
      badgeShowLimit: 1,
    };
    let cuisine = [];
    this.getData().subscribe(data => {
      this.file = this.file + data

      papa.parse(data, {
        header: true,
        skipEmptyLines: true,
        complete: (result, file) => {
          this.restaurantData = result['data']
          this.filteredResults = this.restaurantData
          this.filteredResults.forEach((data, index) => {
            if (data['Cuisines'].split(',')) {
              let elem = data['Cuisines'].split(',')
              if (elem.length > 1) {
                elem.forEach((value) => {
                  if (value != '' && cuisine.indexOf(value.trim()) === -1) {
                    cuisine.push({ id: index, itemName: value.trim() })
                  }
                })
              }
              else {
                if (elem != '' && cuisine.indexOf(elem[0].trim()) === -1) {
                  cuisine.push({ id: index, itemName: elem[0].trim() })
                }
              }
            }

          })
          const map = new Map();
          let i = 0;
          for (const item of cuisine) {
            if (!map.has(item.itemName)) {
              map.set(item.itemName, true);

              this.cuisineList.push({
                id: i,
                itemName: item.itemName
              });
              i++
            }
          }
          
          console.log('this.restaurantData',this.restaurantData)
          // console.log('len', cuisine.length, 'cuisine', cuisine, 'list len', this.cuisineList.length, '-', this.cuisineList)
        }
      });
    });

  }

  public getData(): Observable<any> {
    return this.http.get('../assets/restaurants.csv',
      { responseType: 'text' })

  }

  searchRestaurant(event) {
    console.log('target val', event.target.value)
    if (event.target.value) {
      this.filteredResults = this.restaurantData.filter((data) => {
        return data['Restaurant Name'].toLowerCase().includes((String(this.inputSearch).toLowerCase()))
      })
    } else if (!event.target.value) {
      this.filteredResults = this.restaurantData
    }
  }
 
  filterCuisine(targetValue, target) {
    console.log(';taregt', targetValue,'ngmodel',this.cuisineFilter)
    if (target == 'add') {
      if (targetValue == 'all' || !targetValue) {
        this.filteredResults = this.restaurantData
      }
      else if (targetValue) {
        this.filteredResults = this.restaurantData.filter((data) => {
          return data['Cuisines'].toLowerCase().includes((String(targetValue).toLowerCase()))
        })
      }
    
    } else {
      if (targetValue == 'all' || !targetValue) {
        this.filteredResults = this.restaurantData
      }
      else if (targetValue) {
        this.filteredResults = this.restaurantData.filter((data) => {
          return data['Cuisines'].toLowerCase()!=((String(targetValue).toLowerCase()))
        })
      } 
    
    }

  }
  sortBy(field,dir) {
    console.log('filterd results', this.filteredResults, 'sorgtval', field)
    this.filteredResults.sort((a: any, b: any) => {
      // if (a[sortValue] < b[sortValue]) {
      //   return -1;
      // }
      // if (a[sortValue] > b[sortValue]) {
      //   return 1;
      // }
      // return 0;
      if (isNaN(a[field]) && isNaN(b[field])) {
        return dir*(a[field] < b[field] ? - 1 : (a[field] > b[field] ? 1 : 0));
      }
      return dir*(a[field] - b[field]);
    })

  }

  filter() {
    

    // activeModal.componentInstance.dataResult.subscribe((result) => {
    //   console.log('result in root-grid', result);
    //   if (result) {
    //     // this.keyData = result['key']
    //     // this.valueData = result['value']
    //     // this.addData(i, j)
    //   }
    //   if (result == 'Success') {
    //     this.modalService.dismissAll();
    //   }
    // })
  }


}
