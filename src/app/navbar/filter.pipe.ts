// import { Pipe, PipeTransform } from '@angular/core';
// // import { NavbarComponent } from './navbar.component';
// import {ProjectModel} from '../manage/manage.model'
// @Pipe({ name: 'appFilter' })
// export class FilterPipe implements PipeTransform {
//   /**
//    * Pipe filters the list of elements based on the search text provided
//    *
//    * @param items list of elements to search in
//    * @param searchText search string
//    * @returns list of elements filtered by search text or []
//    */
//   transform(projects:ProjectModel[], searchText: string): ProjectModel[] {
//     if (!projects) {
//       return [];
//     }
//     if (!searchText) {
//       return projects;
//     }
//     searchText = searchText.toLocaleLowerCase();

//     return projects.filter(project => 
//       // return it.toLocaleLowerCase().includes(searchText);
//      (( project.name.toLowerCase().indexOf(searchText.toLowerCase()) !== -1) ||  project.id.toLowerCase().indexOf(searchText.toLowerCase()) !== -1));
//     };
//   }

