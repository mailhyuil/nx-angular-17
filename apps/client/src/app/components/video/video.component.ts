import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import videojs from 'video.js';
import Player from 'video.js/dist/types/player';
@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss'],
  standalone: true,
  imports: [],
})
export class VideoComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('target') video?: ElementRef<HTMLVideoElement>;
  player?: Player;
  ngOnInit(): void {}
  ngAfterViewInit(): void {
    if (this.video) {
      this.player = videojs(
        this.video?.nativeElement,

        {
          autoplay: true,
          controls: true,
          sources: [
            {
              src: 'https://www.w3schools.com/html/mov_bbb.mp4',
              type: 'video/mp4',
            },
          ],
        },
        () => {
          console.log('videojs ready', this);
        }
      );
    }
  }
  ngOnDestroy(): void {
    if (this.player) {
      this.player.dispose();
    }
  }
}
