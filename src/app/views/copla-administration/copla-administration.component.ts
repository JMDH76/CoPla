import { Component, EventEmitter, Output } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import { CoplaFooterComponent } from "../../components/copla-footer/copla-footer.component";
import { CoplaAsideComponent } from "../../components/copla-aside/copla-aside.component";

@Component({
    selector: 'app-copla-administration',
    standalone: true,
    templateUrl: './copla-administration.component.html',
    styleUrl: './copla-administration.component.css',
    imports: [HeaderComponent, CoplaFooterComponent, CoplaAsideComponent]
})
export class CoplaAdministrationComponent {
  public case: number = 1;

  @Output() caseChange = new EventEmitter<number>();

  public onCaseChange(newCase: number) {
    this.case = newCase;
    this.caseChange.emit(this.case);
  }

  public actualPage: string = "Administración";
  public breadcrumb: string = 'CoPla';
}
