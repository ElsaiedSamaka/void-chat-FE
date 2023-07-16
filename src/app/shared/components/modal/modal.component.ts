import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent implements OnInit {
  @Output() dismiss = new EventEmitter<boolean>();
  theme: string = '';
  constructor(private el: ElementRef, private themeService: ThemeService) {}

  ngOnInit() {
    document.body.appendChild(this.el.nativeElement);
    this.getCurrentTheme();
  }
  ngOnDestory() {
    this.el.nativeElement.remove();
  }
  onDismissClick() {
    this.dismiss.emit(false);
  }
  getCurrentTheme() {
    this.themeService.theme$.subscribe((theme) => {
      this.theme = theme;
    });
  }
}
