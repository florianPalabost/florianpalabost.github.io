import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  animesStatus = {
    completed: [],
    watching: [],
    want_to_watch: [],
    dont_want_to_watch: [],
    rewatched: []
  };
  allTimeSpent = 0;
  nbEpisodes = 0;
  data: any;
  user: any;

  constructor(private usersService: UsersService) {}

  async ngOnInit() {
    this.user = this.usersService.currentUserValue['user'];
    // this.data = await this.animeService.retrieveAnimesCompletedByUser(this.usersService.currentUserValue['user'].id);
  }
}
