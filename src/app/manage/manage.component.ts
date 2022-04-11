import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ProjectModel } from './manage.model';
import { ProjectService } from './manage.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PaggingService } from '../pagging/pagging.service';
import { PaggingModel } from '../shared/model/pagging.model';
import { ProjectSearchParamModel } from './manage-search-param.model';
import { User } from '../login/user.model';


@Component({
  selector: 'app-project',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ProjectComponent implements OnInit {

  user: User;
  minSTT = 1;
  /** map code ra tên hiển thị trên giao diện */
  mapStatus = {
    1: 'Active',
    2: 'Inactive'
  };

  @ViewChild('wrapper', { static: true }) wrapper: ElementRef;
  @ViewChild('formCreate', { static: true }) formCreate: ElementRef;
  @ViewChild('formFilter') formFilter: NgForm;
  @ViewChild('modalCreateProject', { static: true }) modalCreateProject: ElementRef;
  @ViewChild('modalEditProject', { static: true }) modalEditProject: ElementRef;

  projects: ProjectModel[] = [];
  closeModalResult = '';
  isCollapsedFilter = false;//trạng thái mở của khung filter project
  isEditProject = false;//kiểm tra modal đang xem hay đang sửa project
  // editingProject: ProjectModel = null;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private modalService: NgbModal,
    private paggingService: PaggingService,
    // private departmentComponent: departmentComponent,
  ) { }

  ngOnInit(): void {
    this.paggingService.pagging.subscribe((paggingModel) => {
      this.onSearch(paggingModel);
    });
  }

  /** 
   * Xử lý ấn nút tìm kiếm project
   */
  onSearch(pagging: PaggingModel) {
    if (!pagging) {
      pagging = this.paggingService.pagging.getValue();
    }
    let searchParam = new ProjectSearchParamModel();
    if (!this.formFilter) {
      searchParam = searchParam.build(null);
    } else {
      searchParam = searchParam.build(this.formFilter.form.value);
    }
    this.projectService.requestSearch(pagging, searchParam)
      .subscribe(resultPagging => {
        this.projects = resultPagging.items;
      });
    // console.log(this.projects)
  }

  onClearFilterForm() {
    this.formFilter.reset();
  }
  onManageDepartment(id: string) {
    // this.router.navigate(['department']);
    // this.departmentComponent.name = name;
    this.router.navigate(['manage', id, 'department']);
  }
  /**
   * Mở modal tạo project.
   */
  openModalCreateProject() {
    this.modalService.open(this.modalCreateProject, {})
      .result
      .then(
        (result) => {//Closed
          if (result === 'create') {//không dùng
          }
        }, (reason) => {//Dismissed
          this.closeModalResult = `Dismissed ${this.getDismissModalReason(reason)}`;
        });
  }

  

  private getDismissModalReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
