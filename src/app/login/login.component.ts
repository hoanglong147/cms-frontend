import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from './login.service';
import { Datalogin } from './data.model'
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isLoading = false;
  error: string = null;
  closeModalResult = '';

  @ViewChild('modalEditUser', { static: true }) modalEditUser: ElementRef;

  constructor(
    private loginService: LoginService,
    private router: Router,
    private modalService: NgbModal,
  ) { }

  ngOnInit(): void {
    const user = this.loginService.user.getValue();
    if (user) {//đã đăng nhập thành công thì khác null
      this.router.navigate(['/']);//đã đăng nhập rồi thì không hiển thị trang đăng nhập
    }
  }
  // mở register
  openModalEditUser() {
    this.modalService.open(this.modalEditUser, {})
      .result
      .then(
        (result) => {//Closed
          // console.log(result);
          if (result === 'create') {//không dùng
          }
        }, (reason) => {//Dismissed
          this.closeModalResult = `Dismissed ${this.getDismissModalReason(reason)}`;
        });
  }

  // /**Ấn nút save user */
  onCreateUser(form: NgForm) {
    //TODO nếu sửa lỗi thì không đóng modal
    const user = new Datalogin();
    user.username = form.value.username;
    user.password = form.value.password;
    this.loginService.requestRegister(user).subscribe(
      data => {
        console.log(data)
        Swal.fire({
          title: 'Register success!',
          icon: 'success',
          timer: 1500,
        }
        )
      }
      , error => {
        // console.log(error)

        if (error.error.text == "Success") {
          this.modalService.dismissAll(this.modalEditUser,),
          Swal.fire({
            title: "ssssSuccess",
            icon: 'success',
            timer: 1500,
          }
          )
        }
        else{
          Swal.fire({
            title: error.error,
            icon: 'error',
          }
          )
        }
        ;
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
  onSubmitLogin(form: NgForm) {
    if (!form.valid) {
      return;
    }

    const username = form.value.username;
    const password = form.value.password;
    this.isLoading = true;

    this.loginService.login(username, password).subscribe(
      resData => {
        this.isLoading = false;
        this.router.navigate(['/']);//hoặc path '/project'
        console.log(resData.roles)
        
      },
      errorMessage => {
        // console.log(errorMessage);//login service có pipe error để chỉ output errorMessage dạng string
        this.error = errorMessage;
        this.isLoading = false;
      }
    );

    // form.reset();//có thể làm cái khác reset
  }
}
