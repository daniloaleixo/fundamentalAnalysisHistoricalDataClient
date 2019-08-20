import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, ViewChild, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent, MatAutocomplete } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-chips',
  templateUrl: './chips.component.html',
  styleUrls: ['./chips.component.scss']
})
export class ChipsComponent implements OnInit {

  public formControl = new FormControl();
  public filteredOutput: Observable<string[]>;

  @Input() placeholder: string;
  @Input() arrayValues: string[] = [];
  @Input() visible?: boolean = true;
  @Input() selectable?: boolean = true;
  @Input() removable?: boolean = true;
  @Input() addOnBlur?: boolean = true;
  @Input() separatorKeysCodes?: number[] = [ENTER, COMMA];
  @Input() autocompleteValues: string[] = [];
  @Output() arrayValuesStream = new EventEmitter();

  @ViewChild('chipInput', { read: false }) fruitInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto', { read: false }) matAutocomplete: MatAutocomplete;


  constructor() {
    this.filteredOutput = this.formControl.valueChanges.pipe(
      startWith(null),
      map((value: string | null) => {
        this.arrayValuesStream.emit(this.arrayValues);
        return value ? this._filter(value) : this.autocompleteValues.slice()
      }
      )
    );
  }

  ngOnInit() { }

  add(event: MatChipInputEvent): void {
    // Add fruit only when MatAutocomplete is not open
    // To make sure this does not conflict with OptionSelected Event
    if (!this.matAutocomplete.isOpen) {
      const input = event.input;
      const value = event.value;

      // Add our fruit
      if ((value || '').trim()) {
        this.arrayValues.push(value.trim());
      }

      // Reset the input value
      if (input) {
        input.value = '';
      }

      this.formControl.setValue(null);
    }
  }

  remove(fruit: string): void {
    const index = this.arrayValues.indexOf(fruit);

    if (index >= 0) {
      this.arrayValues.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.arrayValues.push(event.option.viewValue);
    this.fruitInput.nativeElement.value = '';
    this.formControl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.autocompleteValues.filter(fruit => fruit.toLowerCase().indexOf(filterValue) === 0);
  }

}
