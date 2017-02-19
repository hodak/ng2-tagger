import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'tagger',
  templateUrl: './tagger.component.html',
  styleUrls: ['./tagger.component.css'],
})
export class TaggerComponent {
  @Input() tags = [];
  @Input() singleTagTemplate;
  @Input() delimiterKeyCodes = [32, 13, 188]; // [space, enter, comma]
  @Input() tagValidator = (_) => null;
  @Output() newTag = new EventEmitter();
  @Output() deleteTag = new EventEmitter();

  error;

  onKeyDown(event, input) {
    if(this.delimiterKeyCodes.indexOf(event.keyCode) === -1) { return }
    event.preventDefault();

    input.value = input.value.trim();
    if(input.value.length === 0) { return }

    let error = this.tagValidator(input.value)
    if(error) { return this.error = error; }
    this.error = null;

    this.newTag.emit(input.value);
    input.value = '';
  }

  delete(tag, index) {
    this.deleteTag.emit({ tag, index });
  }
}
