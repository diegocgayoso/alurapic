import { PlatformDetectorService } from './../../../core/plataform-detector/platform-detector.service';
import { Directive, OnInit, ElementRef } from '@angular/core';
@Directive({
  selector: '[immediateClick]'
})
export class immediateClickDirective implements OnInit {

  constructor(
      private element: ElementRef<any>,
      private platFormDetector: PlatformDetectorService) {}

      ngOnInit(): void {
          this.platFormDetector.isPlatformBrowser &&
          this.element.nativeElement.click();

  }
}
