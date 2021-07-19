import { ChangeDetectorRef, Component } from '@angular/core';

export interface Result {
  question: string;
  answer: string;
  // visible?: boolean;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'text-to-speech';
  speech = '';
  results: Result[] = [
    { question: 'hello (there)', answer: 'Hello there!' },
    { question: 'hi (there)', answer: 'Hello there!' },
    {
      question: 'how are you (doing)',
      answer: "I'm good! Hope you're good too!",
    },
    { question: 'what are you doing', answer: 'Nothing much.' },
    { question: 'open (the) cart', answer: 'Opening the Cart' },
    { question: 'close (the) cart', answer: 'Closing the Cart' },
  ];
  questions: Result[] = [];

  constructor(private ref: ChangeDetectorRef) {}

  public setVisibleResult = (userSaid: string, index: number): void => {
    // this.results[index].visible = true;
    this.questions.push({
      question: userSaid,
      answer: this.results[index].answer,
    });
    this.ref.detectChanges();
  };
}
