 import { makeAutoObservable } from "mobx"
 
 export default class DeviceStore {
   constructor() {
     this._types = [];
     this._brands = [];
     this._devices = [];
     this._priceFilter = { min: null, max: null };
     this._selectedType = {};
     this._selectedBrands = [];
     this._selectedBrand = {};
     this._page = 1;
     this._count = 0;
     this._limit = 8;
     this._sortOrder = null;
     makeAutoObservable(this);
   }

   setTypes(types) {
     this._types = types;
   }

   setBrands(brands) {
     this._brands = brands;
   }

   setDevices(devices) {
     this._devices = devices;
   }

   setSelectedType(type) {
     this.setPage(1);
     this._selectedType = type;
     this._selectedBrands = [];
     this._priceFilter = { min: null, max: null };
     this._sortOrder = null; /*!Может привести к багам! */
   }

   setSelectedBrand(brand) {
     this._selectedBrand = brand;
   }

   setPage(page) {
     this._page = page;
   }

   setCount(count) {
     this._count = count;
   }

   setLimit(limit) {
     this._limit = limit;
   }

   setSelectedBrands(brandId) {
     this.setPage(1);
     if (this._selectedBrands.includes(brandId)) {
       this._selectedBrands = this._selectedBrands.filter(
         (id) => id !== brandId
       );
     } else {
       this._selectedBrands = [...this._selectedBrands, brandId];
     }
   }

   setPriceFilter(priceFilter) {
     this._priceFilter = priceFilter;
   }

   setSortOrder(order) {
     this._sortOrder = order;
     this.setPage(1);
   }

   get selectedBrands() {
     return this._selectedBrands;
   }

   get types() {
     return this._types;
   }

   get brands() {
     return this._brands;
   }

   get devices() {
     return this._devices;
   }

   get selectedType() {
     return this._selectedType;
   }

   get selectedBrand() {
     return this._selectedBrand;
   }

   get count() {
     return this._count;
   }

   get page() {
     return this._page;
   }

   get limit() {
     return this._limit;
   }

   get priceFilter() {
     return this._priceFilter;
   }

   get sortOrder() {
     return this._sortOrder;
   }

   resetFiltersExceptType() {
     this._selectedBrands = [];
     this._priceFilter = { min: null, max: null };
     this._sortOrder = null;
     this.setPage(1); /*мб конфликты, удалить если да*/
   }
 }
 
 