import { Component,ElementRef, ViewChild,OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatchDialogComponent } from '../match-dialog/match-dialog.component';
@Component({
  selector: 'app-user-test',
  templateUrl: './user-test.component.html',
  styleUrls: ['./user-test.component.css']
})
export class UserTestComponent implements OnInit {
  audio: HTMLAudioElement;
  duration: number = 0;
  currentTime: number = 0;
  audioEnded: boolean = false;
  timerInterval: any;
  showTextArea:boolean=false;
  timeLeft: number =60; // 3 minutes timer
  mainDiv:boolean=true;
  submit:boolean=false;
  userInput:any;

  constructor(public dialog: MatDialog) {}

  openDialog() {
    this.dialog.open(MatchDialogComponent, {
      data: { matchPercentage: this.matchPercentage }
    });
  }

  ngOnInit() {
    this.showTextArea=false;
    this.audio = new Audio('assets/audio/audioFile.mpeg'); // Replace with your audio file path
    this.audio.load();
    this.audio.addEventListener('loadedmetadata', () => {
      this.duration = this.audio.duration;
    });

    this.audio.addEventListener('timeupdate', () => {
      this.currentTime = this.audio.currentTime;
    });

    this.audio.addEventListener('ended', () => {
      this.audioEnded = true;
      this.showTextArea=true;
    });
  }

  toggleAudio() {
    if (this.audio.paused) {
      this.audio.play();
      this.startTimer();
    }
  }

  startTimer() {
    this.timerInterval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        clearInterval(this.timerInterval);
        this.compareText(this.userInput);
      }
    }, 1000);
  }

  seekTo() {
    // Seeking disabled as per the requirements
  }

  formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  }

  referenceText: string = 'There was a crow who lived in a forest close to a town. The crow was travelling for a long time so he was very thirsty. He looked around for water to drink, but was unable to find any water source.';
  matchPercentage: number = 0;

  compareText(textareaValue: string): void {
    let sanitizedReference = this.sanitizeText(this.referenceText).split(' ').filter(word => word);
    let sanitizedInput = this.sanitizeText(textareaValue).split(' ').filter(word => word);

    let matchCount = 0;
    sanitizedInput.forEach(word => {
      if (sanitizedReference.includes(word)) {
        matchCount++;
      }
    });

    // Calculate percentage based on input text
    this.matchPercentage = sanitizedInput.length > 0 ? (matchCount / sanitizedInput.length) * 100 : 0;

    // Display the result in a dialog or similar component
    this.openDialog();
   this.mainDiv=false;
   this.submit=true;

  }

  private sanitizeText(text: string): string {
    return text.replace(/[.,]/g, '').toLowerCase(); // Remove punctuation and convert to lower case
  }

}
