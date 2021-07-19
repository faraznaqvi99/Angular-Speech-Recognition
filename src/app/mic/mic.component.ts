import {
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
  ChangeDetectorRef,
} from '@angular/core';
import { faMicrophone } from '@fortawesome/free-solid-svg-icons';
import { Annyang, CommandOption } from 'annyang';
import { Result } from '../app.component';

declare var annyang: Annyang;

@Component({
  selector: 'mic-component',
  templateUrl: './mic.component.html',
  styleUrls: ['./mic.component.scss'],
})
export class MicComponent implements OnInit {
  isMicOpen = false;
  faMicrophone = faMicrophone;

  constructor(private ref: ChangeDetectorRef) {}

  @Input('setVisibleResult') setVisibleResult: (
    userSaid: string,
    index: number
  ) => void;
  @Input() results: Result[] = [];

  commandHandler = () => {
    console.log('Command');
  };

  commands: CommandOption = {};

  // commands = {
  //   'hello (there)': this.commandHandler,
  //   'hi (there)': this.commandHandler,
  //   'how are you (doing)': this.commandHandler,
  //   'what are you doing': this.commandHandler,
  //   'open (the) cart': this.openCart,
  //   'close (the) cart': this.closeCart,
  // };

  ngOnInit() {
    this.results.map((result: Result, index) => {
      this.commands[`${result.question}`] = this.commandHandler;
    });
    annyang.addCommands(this.commands);
    annyang.addCallback('resultMatch', (userSaid, command, possibleResults) => {
      console.log('matched');
      this.onMicClick();
      if (userSaid && command) {
        const matchedIndex = this.results.findIndex(
          (result) => command === result.question
        );
        if (matchedIndex > -1) this.setVisibleResult(userSaid, matchedIndex);
      }
    });

    annyang.addCallback('resultNoMatch', () => {
      this.onMicClick();
    });
  }

  ngDoCheck = () => {
    console.log('changes');
  };

  onMicClick = () => {
    this.isMicOpen = !this.isMicOpen;
    this.ref.detectChanges();

    if (this.isMicOpen) {
      annyang.start({ autoRestart: false, continuous: false });
    } else {
      annyang.abort();
    }
  };
}
