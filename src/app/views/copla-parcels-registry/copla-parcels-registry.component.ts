import { Component, EventEmitter, Output } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import { CoplaFooterComponent } from "../../components/copla-footer/copla-footer.component";
import { CoplaAsideComponent } from "../../components/copla-aside/copla-aside.component";

@Component({
    selector: 'app-copla-parcels-registry',
    standalone: true,
    templateUrl: './copla-parcels-registry.component.html',
    styleUrl: './copla-parcels-registry.component.css',
    imports: [HeaderComponent,  CoplaFooterComponent, CoplaAsideComponent]
})
export class CoplaParcelsRegistryComponent {
  public case: number = 1;
  public breadcrumb: string = 'CoPla';
  public actualPage1: string = "Paquetería";
  public actualPage2: string = "Registro";

  @Output() caseChange = new EventEmitter<number>();

  public onCaseChange(newCase: number) {
    this.case = newCase;
    this.caseChange.emit(this.case);
  }

}
