import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { KeyValue } from '@angular/common';
import { LoadingController } from '@ionic/angular';

import { ConferenceData } from '../../providers/conference-data';
import { LiveUpdateService } from '../../providers/live-update.service';


@Component({
  selector: 'app-expo-hall',
  templateUrl: './expo-hall.page.html',
  styleUrls: ['./expo-hall.page.scss'],
})
export class ExpoHallPage implements OnInit {
  sponsors: any;

  constructor(
    private loadingCtrl: LoadingController,
    private confData: ConferenceData,
    private changeDetection: ChangeDetectorRef,
    public liveUpdateService: LiveUpdateService,
  ) { }

  updateSponsors() {
    this.confData.getSponsors().subscribe((sponsors: any[]) => {
      this.sponsors = sponsors;
    });
  }

  reloadSponsors() {
    this.loadingCtrl.create({
      message: 'Fetching latest...',
      duration: 10000,
    }).then((loader) => {
      loader.present();
      this.confData.getSponsors().subscribe((sponsors: any[]) => {
        this.sponsors = sponsors;
        this.changeDetection.detectChanges();
        setTimeout(() => {loader.dismiss()}, 100);
      });
    });
  }

  ngOnInit() {
    this.reloadSponsors();
  }

}
