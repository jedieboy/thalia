import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { CommonService } from '../services/common.service';
import { FirebaseDBService } from '../services/firebase-db.service';

let apiLoaded = false;
@Component({
  selector: 'youtube-container',
  templateUrl: './youtube.component.html',
  styleUrls: ['./youtube.component.scss']
})
export class YoutubeComponent implements AfterViewInit {
  private subscription: Subscription = new Subscription();
  player: YT.Player;
  galData: any=[];
  playerId = true;

  constructor(private firebaseService: FirebaseDBService, private commonservice: CommonService) { 
    //Initial load for youtube video
    setTimeout(() => {
      this.init();
      this.playerId = true;
      window['onYouTubeIframeAPIReady'] = () => this.createPlayer();
    }, 1000);
  }
  
  ngAfterViewInit() {

    //to fetch data in firebase database
    this.subscription.add(this.firebaseService.getList().subscribe(data=>{
      this.player = null;
      if(data){
        this.galData = [];
        data.map(e => {
          this.galData.push(e.payload.val());
        });
        if(this.galData.length > 0){
          //To display image from firabase storage
          this.galData.forEach((img:any) => {
             img.src = this.firebaseService.displayImage(img.src)
          });
          
        }
      }
    }));
  }
  apiChange(event){
    console.log(event)
  }

  createPlayer() {
    this.player = new window['YT'].Player('player', {
      height: '100%',
      width: '100%',
      videoId: this.galData[0] ? this.galData[0].id :'',
      events: {
        onReady: (event) => this.onPlayerReady(event),
        onStateChange : (event) => this.onPlayerStateChange(event),
        onApiChange: (event) => this.apiChange(event)
      },
      playerVars: {
        autoplay: 0,        // Auto-play the video on load
        controls: 1,        // Show pause/play buttons in player
        showinfo: 1,        // Hide the video title
        modestbranding: 1,  // Hide the Youtube Logo
        loop: 1,            // Run the video in a loop
        fs: 0,              // Hide the full screen button
        cc_load_policy: 0, // Hide closed captions
        iv_load_policy: 0,  // Hide the Video Annotations
        autohide: 1         // Hide video controls when playing
      },
    });
  }
  init() {
    if (!apiLoaded) {
     
      // This code loads the IFrame Player API code asynchronously, according to the instructions at
      // https://developers.google.com/youtube/iframe_api_reference#Getting_Started
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      document.body.appendChild(tag);
      apiLoaded = true;
    }
  }

  onPlayerReady(player) {
    this.player = player;
  }
  onPlayerStateChange(event) {
    console.log(event['target'])
    this.playerId = event['target'].i.i.videoId;
  }

  setYTVideo(gal){
    this.galData.forEach(e => {
      if(gal.id == e.id){
        e.selected = true
      }else{
        e.selected = false;
      }
    });
    this.player['target'].loadVideoById(gal.id);
    this.player['target'].stopVideo();
  }

  gotoYoutube(){
    window.open('https://www.youtube.com/channel/UC6UCBnYa4IjU0nbrDt8KOmg', "_blank");
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
    window['onYouTubeIframeAPIReady'] = null;
    if (this.player) {
      this.player.destroy();
    }
  }
}
