import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  constructor(private toast: ToastrService) {}
  showToast() {
    console.log('SHOW TOAST NOTIFICATION');
    this.toast.error('Hello, this is a success message!', 'Success!', {
      closeButton: true,
      progressBar: true,
      progressAnimation: 'decreasing',
      timeOut: 5000,
    });
  }
}
