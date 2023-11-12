import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UserDto } from 'api/src/lib/models/user-dto';
import { UserService } from 'api/src/lib/services/user.service';
import { lastValueFrom } from 'rxjs';
@Component({
  standalone: true,
  imports: [RouterModule, FormsModule, ReactiveFormsModule],
  selector: 'nx-angular-17-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  users?: UserDto[];
  username?: string;
  password?: string;
  constructor(private readonly userHttpService: UserService) {}
  async ngOnInit() {
    this.getUsers();
  }
  getUsers() {
    this.userHttpService.userControllerFindAll().subscribe((users) => {
      this.users = users;
    });
  }
  async submit() {
    await lastValueFrom(
      this.userHttpService.userControllerCreate({
        body: {
          username: this.username!,
          password: this.password!,
        },
      })
    );
    this.getUsers();
  }
}
