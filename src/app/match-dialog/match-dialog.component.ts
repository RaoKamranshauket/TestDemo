import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';

@Component({
  selector: 'app-match-dialog',
  templateUrl: './match-dialog.component.html'
})
export class MatchDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { matchPercentage: number }) {}
}
