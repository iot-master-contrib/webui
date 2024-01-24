import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';  
import { NzButtonModule } from 'ng-zorro-antd/button';
@Component({
  selector: 'app-search-form',
  standalone: true,
  imports: [NzSpaceModule, NzInputModule,FormsModule,NzButtonModule ],
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss']
})
export class SearchFormComponent {
  @Input() searchText = "搜索"
  @Input() placeholder = "关键字";
  @Output() onSearch = new EventEmitter<string>();
  text = "";
  handleClear() {
    this.text = "";
    this.onSearch.emit('');
  }
}
