// src/app/components/beneficiaries/beneficiaries.component.ts
import { Component, OnInit } from '@angular/core';
import { BeneficiaryService } from '../../services/beneficiary.service';
import { Beneficiary } from '../../models/beneficiary';
import { RouteService } from '../../services/route.service';

@Component({
  selector: 'app-beneficiaries',
  templateUrl: './beneficiaries.component.html',
  styleUrls: ['./beneficiaries.component.css']
})
export class BeneficiariesComponent implements OnInit {
  beneficiaries: Beneficiary[] = [];
  selectedBeneficiary: Beneficiary = {
    beneficiaireId: 0,
    name: '',
    accountNumber: '',
    bankName: '',
    compteId: 13 // Default compteId
  };
  isModalOpen = false;
  showSidebar = false;

  constructor(
    private beneficiaryService: BeneficiaryService,
    private routeService: RouteService
  ) {}

  ngOnInit(): void {
    this.loadBeneficiaries();
    this.routeService.isSidebarVisible().subscribe(isVisible => {
      this.showSidebar = isVisible;
    });
  }

  loadBeneficiaries(): void {
    this.beneficiaryService.getBeneficiaries().subscribe(data => {
      this.beneficiaries = data;
    });
  }

  openModal(): void {
    this.selectedBeneficiary = {
      beneficiaireId: 0,
      name: '',
      accountNumber: '',
      bankName: '',
      compteId: 13 // Ensure compteId is set when opening the modal
    };
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

  saveBeneficiary(): void {
    if (this.selectedBeneficiary) {
      if (this.selectedBeneficiary.beneficiaireId) {
        this.beneficiaryService.updateBeneficiary(this.selectedBeneficiary.beneficiaireId, this.selectedBeneficiary)
          .subscribe(() => {
            this.loadBeneficiaries();
            this.closeModal();
          });
      } else {
        this.beneficiaryService.addBeneficiary(this.selectedBeneficiary)
          .subscribe(() => {
            this.loadBeneficiaries();
            this.closeModal();
          });
      }
    }
  }

  deleteBeneficiary(id: number): void {
    this.beneficiaryService.deleteBeneficiary(id).subscribe(() => this.loadBeneficiaries());
  }

  editBeneficiary(beneficiary: Beneficiary): void {
    this.selectedBeneficiary = { ...beneficiary };
    this.openModal();
  }
}
