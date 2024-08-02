import { Component } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

  searchTerm = '';
  results: string[] = [];

  search() {
    if (this.searchTerm) {
      // For demonstration purposes, we are just simulating a search result
      // In a real application, you would probably make an HTTP request to a search API
      this.results = [`Result for "${this.searchTerm}"`];
    }
  }

}
