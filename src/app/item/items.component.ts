import { Component, OnInit } from '@angular/core';
import { CoreTypes, EventData, LayoutBase, View } from '@nativescript/core';

@Component({
  selector: 'ns-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {
  mapView = false;

  constructor() {}

  ngOnInit(): void {}

  onToggleLoaded(args: EventData): void {
    const lb = args.object as LayoutBase;
    const toggler = lb.page.getViewById('toggler') as View;

    lb.eachChildView((v: View) => {
      if (v.className === 'toggler') {
        return true;
      }
      v.on('tap', (a: EventData) => {
        const lbl = a.object as View;
        const loc = lbl.getLocationRelativeTo(lb);
        // toggler.translateX = loc.x;
        console.log(`tap ${loc.x}`);
        toggler.animate({
          translate: { x: loc.x - 2, y: 0 },
          duration: 280,
          curve: CoreTypes.AnimationCurve.easeInOut,
        });
      });

      v.on('loaded', (a: EventData) => {
        console.log(`Loaded ${v.id}`);
        const lbl = a.object as View;
        const loc = lbl.getLocationRelativeTo(lb);

        if (v.id === 'map' && this.mapView) {
          toggler.translateX = loc.x;
        } else if (v.id === 'list' && !this.mapView) {
          toggler.translateX = loc.x;
        }
        // toggler.translateX = loc.x;
      });

      return true;
    });
  }

  switchTab(newIndex: number) {
    if (newIndex === 0) {
      this.mapView = false;
    } else if (newIndex === 1) {
      this.mapView = true;
    }
  }
}
