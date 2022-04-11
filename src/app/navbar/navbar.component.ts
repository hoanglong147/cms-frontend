import { User } from './../login/user.model';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { LoginService } from '../login/login.service';
import { SidebarService } from '../sidebar/sidebar.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
// import { ProjectService } from '../project/project.service';
// import { ProjectSearchParamModel } from '../project/project-search-param.model';
import { ProjectModel } from '../manage/manage.model';
import { PaggingModel } from '../shared/model/pagging.model';
import { NgForm } from '@angular/forms';
import { UserService } from './navbar.service'
import { UserModel } from './user.model';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  UserLogin: User;
  user: UserModel[] = [];
  isManageProjectPage: boolean;
  private sidebarCollapsed: boolean;
  isBack: boolean = false;
  projects: ProjectModel[] = [];
  flag: boolean = false;
  href: string = '';
  arrayUrl: string[];
  closeModalResult = '';
  nameUrl: string = '';
  searchText = '';
  @ViewChild('modalEditUser', { static: true }) modalEditUser: ElementRef;
  @ViewChild('modalCreateUser', { static: true }) modalCreateUser: ElementRef;
  @ViewChild('modalChange', { static: true }) modalChange: ElementRef;
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private loginService: LoginService,
    private sidebarService: SidebarService,
    private modalService: NgbModal,
    // private projectService: ProjectService
    private UserService: UserService,
  ) { }

  ngOnInit(): void {
    this.sidebarService.sidebarCollapsed.subscribe((isCollapsed) => {
      this.sidebarCollapsed = isCollapsed;
      this.loginService.user.subscribe((user) => {
        this.UserLogin = user;
      });
    });

  }

  toogleSidebar(event: Event) {
    event.preventDefault();
    this.sidebarService.sidebarCollapsed.next(!this.sidebarCollapsed);
  }

  onLogout() {
    this.loginService.logout();
  }
  getUser() {
    return this.UserLogin.username;
  }
  getId() {
    this.href = this.router.url;
    this.arrayUrl = this.href.split('/');
    return this.arrayUrl[2];
  }

// mở modal sửa profile
  openModalEditUser() {
    this.modalService.open(this.modalEditUser, {})
    .result
    .then(
      (result) => {//Closed

        if (result === 'create') {//không dùng
        }
      }, (reason) => {//Dismissed
        this.closeModalResult = `Dismissed ${this.getDismissModalReason(reason)}`;
      });
  }
// mở model sửa passwword
  openModalChange() {
    this.modalService.open(this.modalChange, {})
    .result
    .then(
      (result) => {//Closed
    
        if (result === 'create') {//không dùng
        }
      }, (reason) => {//Dismissed
        this.closeModalResult = `Dismissed ${this.getDismissModalReason(reason)}`;
   
      });
  }

  // update profile
  onCreateUpdate(form: NgForm) {
    //TODO nếu sửa lỗi thì không đóng modal
    const user = new UserModel();
    user.id = form.value.id;
    user.name = form.value.name;
    user.address = form.value.address;
    user.email = form.value.email;
    this.UserService.requestUpdate(user).subscribe(
      data => {
        console.log(data),
        this.modalService.dismissAll(this.modalEditUser,),
        Swal.fire({
          title: "Success",
          icon: 'success',
          timer: 1500,
        }
        )
      }
      , error => {
        console.log(error)
        Swal.fire({
          title: error.error,
          icon: 'error',
        }
        )
      }
    )
  }

 /**xử lý change password user */
 onCreateChange(form: NgForm) {
  //TODO nếu sửa lỗi thì không đóng modal
  const user = new UserModel();
  user.username = this.UserLogin.username;
  user.newPassword = form.value.newPassword;
  user.oldPassword = form.value.oldPassword;
  this.UserService.requestChange(user).subscribe(
    data => {
      console.log(data),
        this.modalService.dismissAll(this.modalEditUser,),
        Swal.fire({
          title: "Success",
          icon: 'success',
          timer: 1500,
        }
        )
    }
    , error => {
      console.log(error)
      Swal.fire({
        title: error.error,
        icon: 'error',
      }
      )
    }
  )
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
