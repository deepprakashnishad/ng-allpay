import { 
  Component, 
  OnInit, 
} from '@angular/core';
import {FormControl} from '@angular/forms';
import { NotifierService } from 'angular-notifier';
import { environment } from './../../environments/environment';
import {
  MatBottomSheet,
  MatBottomSheetModule,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {
  ngOnInit() {
    
  }
}