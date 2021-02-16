import { Component } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';


const listAnimation = trigger('listAnimation', [
  transition('* <=> *', [
    query(':enter',
      [style({ opacity: 0}), stagger('60ms', animate('600ms ease-out', style({ opacity: 1 })))],
      { optional: true }
    ),
    query(':leave',
      animate('200ms', style({ opacity: 0 })),
      { optional: true }
    )
  ])
]);


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [listAnimation]
})
export class AppComponent {
  title = 'my-app';
  notes = [];
  selectedNote = null;
  titleSelected = null;
  contentSelected = null;
  counter = 0;

  addNote() {
    this.notes.push({
      title:'New Note',
      content:'',
      id: uuidv4(),
      index: this.counter,
    });

    this.counter = this.counter + 1;
  }

  deleteNote(id){
    let index = this.notes.findIndex(note => note.id === id);
    this.notes.splice(index, 1);
  };

  changeNoteTitle(id, event){
    let titleName = event.target.value;
    let note = this.findNoteById(id);
    note.title = titleName;
  };

  changeNoteContent(id, event){
    let content = event.target.value;
    let note = this.findNoteById(id);
    note.content = content;
  };

  findNoteById(id){
    return this.notes.find(note => note.id === id);
  };

  onSelectedNote(id){
    this.selectedNote = this.findNoteById(id);
  };

  onTitleInput(id){
    console.log(this.titleSelected);
    this.titleSelected = true;
    this.contentSelected = false;
    this.selectedNote = this.findNoteById(id);
  };

  onContentInput(id){
    this.contentSelected = true;
    this.titleSelected = false;
    this.selectedNote = this.findNoteById(id);
  };

  onBlurTitle(id, index){

    console.log(index);
    let divTitle = document.getElementsByClassName("divTitle")[index];
    divTitle.innerHTML =  this.findNoteById(id).title;
  };

  onBlurContent(id, index){
    let divContent = document.getElementsByClassName("divContent")[index];
    divContent.innerHTML =  this.findNoteById(id).content;
    
  };
}

