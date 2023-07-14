import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css'],
})
export class ToastComponent implements OnInit {
  @Input() toastMessage = '';
  @Input() toastType = 'success';
  @Input() toastTitle = '';
  @Output() dismiss = new EventEmitter<boolean>();
  constructor(private el: ElementRef) {}

  ngOnInit() {
    document.body.appendChild(this.el.nativeElement);
  }
  ngOnDestory() {
    this.el.nativeElement.remove();
  }
  onDismissClick() {
    this.dismiss.emit(false);
  }
  automaticDismiss() {
    setTimeout(() => {
      this.dismiss.emit(false);
    }, 3000);
  }
}
