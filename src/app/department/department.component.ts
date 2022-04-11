import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PaggingService } from '../pagging/pagging.service';
import { PaggingModel } from '../shared/model/pagging.model';
import { ideasSearchParamModel } from '../ideas/ideas-search-param.model';
import { ideasService } from '../ideas/ideas.service';
import { ideasModel } from '../ideas/ideas.model';
import { commentSearchParamModel } from '../Comment/comment-search-param.model';
import { commentService } from '../Comment/comment.service';
import { commentModel } from '../Comment/comment.model';

import { categorySearchParamModel } from '../category/category-search-param.model';
import { categoryModel } from '../category/category.model';
import { categoryService } from '../category/category.service';

import Swal from 'sweetalert2';


@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class departmentComponent implements OnInit {


  closeModalResult = '';
  // isEditCategory = false; // hiện chi tiết của ideas
  ideas: ideasModel[] = [];
  status: boolean;
  comments: commentModel[] = [];
  categorys: categoryModel[] = [];
  editingcategory: categoryModel = null;
  isCollapsedFilter = false;//trạng thái mở của khung filter 
  IDideas: string;
  @ViewChild('modalComment', { static: true }) modalComment: ElementRef
  @ViewChild('modalAddcategory', { static: true }) modalAddcategory: ElementRef;
  @ViewChild('modalEditcategory', { static: true }) modalEditcategory: ElementRef;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private paggingService: PaggingService,
    private ideasService: ideasService,
    private commentService: commentService,
    private categoryService: categoryService,
  ) { }

  ngOnInit(): void {

    this.paggingService.pagging.subscribe((paggingModel) => {
      this.onSearch(paggingModel);
    });
    let searchParam = new categorySearchParamModel();
    this.categoryService.requestSearch(searchParam)
      .subscribe((methodModel) => {
        this.categorys = methodModel.items;
        // console.log(methodModel)
      });
  }

  /** 
  *Xử lý tìm kiếm ideads
  */
  onSearch(pagging: PaggingModel) {
    const projectId = this.route.snapshot.params['idManage'];//TODO khởi tạo giao diện của dataset của project có id = idProject
    if (!pagging) {
      pagging = this.paggingService.pagging.getValue();
    }
    let searchParam = new ideasSearchParamModel();
    searchParam.departmentId = projectId;
    this.ideasService.requestSearch(pagging, searchParam)
      .subscribe(resultPagging => {
        this.ideas = resultPagging.items;
      });
    // console.log(this.ideas)
  }

  // mở model sửa comment
  openModalComment(id: string) {
    // openModalComment() {
    this.modalService.open(this.modalComment, {})
      .result
      .then(
        (result) => {//Closed

          if (result === 'create') {//không dùng
          }
        }, (reason) => {//Dismissed
          this.closeModalResult = `Dismissed ${this.getDismissModalReason(reason)}`;

        });
    let searchParam = new commentSearchParamModel();
    // searchParam.ideaId = id.toString();
    searchParam.ideaId = '1';
    this.IDideas = id;
    this.commentService.requestSearch(searchParam)
      .subscribe((methodModel) => {
        this.comments = methodModel.items;
        console.log(this.comments)
      });
  }

  /**xử lý change tạo comment */
  onCreateComment(form: NgForm) {
    //TODO nếu sửa lỗi thì không đóng modal
    const comment = new commentModel();
    comment.ideaId = this.IDideas;
    comment.staffId = '1';
    comment.anonymous = Number(form.value.status);
    comment.content = form.value.content;
    this.commentService.requestCreate(comment).subscribe(
      data => {
        console.log(data)
        this.modalService.dismissAll(this.modalComment,),
          Swal.fire({
            title: "Success",
            icon: 'success',
            timer: 1500,
          }
          )
      }
      , error => {
        console.log(error)
      }
    )
  }

  // mở modal add category
  onAddCategory() {
    this.modalService.open(this.modalAddcategory, {})
      .result
      .then(
        (result) => {//Closed
          if (result === 'create') {//không dùng
          }
        }, (reason) => {//Dismissed
          this.closeModalResult = `Dismissed ${this.getDismissModalReason(reason)}`;
        });
  }

  // xử lý add category
  onCreateCategory(form: NgForm) {
    const category = new categoryModel();
    let searchParam = new categorySearchParamModel();
    category.name = form.value.categoryname;
    console.log(category.name);
    this.categoryService.requestCreate(category).subscribe(
      data => {
        console.log(data),
          // this.onSearchcategory;
          this.categoryService.requestSearch(searchParam)
            .subscribe((methodModel) => {
              this.categorys = methodModel.items;
              console.log(methodModel)
              console.log("methodModel")
            });
        this.modalService.dismissAll(this.modalAddcategory,),
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

  // mở modal edit category
  onEditCategory(ids: string) {
    const id = Number(ids)
    this.categoryService.request(id).subscribe(result => {
      this.editingcategory = result;
      console.log(this.editingcategory);
      this.modalService.open(this.modalEditcategory, {})
        .result
        .then(
          (result) => {//Closed
            console.log(result);
          }, (reason) => {//Dismissed
            this.closeModalResult = `Dismissed ${this.getDismissModalReason(reason)}`;
            console.log(this.closeModalResult);
          });
    }, error => {
      console.log(error);
    });
  }

  // xử lý edit modal edit category
  onEditUser(form: NgForm) {
    //TODO nếu sửa lỗi thì không đóng modal
    const category = new categoryModel();
    category.id = this.editingcategory.id;
    // category.name = this.editingUser.username;
    category.name = form.value.name;
    this.categoryService.requestUpdate(category).subscribe(
      data => {
        this.editingcategory = data;//cập nhật thông tin của user đang sửa
        this.modalService.dismissAll(this.modalAddcategory,),
          Swal.fire({
            title: "Success",
            icon: 'success',
            timer: 1500,
          }
          )
      }
      , error => {
        console.log(error);
        console.log(error)
        Swal.fire({
          title: error.error,
          icon: 'error',
        }
        )
      }
    )
  }

  // xử lý xóa category
  onDeleteCategory(id: string) {
    Swal.fire({
      title: 'Delete?',
      text: 'Are you sure?',
      icon: 'warning',
      showDenyButton: true, // hiện button "No"
      denyButtonColor: '#00CCD6',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        const category = new categoryModel();
        category.id = id
        this.categoryService.requestDelete(category)
          .subscribe(response => {
            console.log(response);
            // this.onSearch(null);//tìm kiếm lại trang đầu
            Swal.fire({
              title: 'Deleted!',
              text: 'Your file has been deleted.',
              icon: 'success',
              timer: 1500,
            }
            );
          },
            error => {
              console.log(error)
              Swal.fire({
                // hiện lỗi đang gặp phải
                title: error.error.message,
                icon: 'error',
              }
              );
            }
          );
      }
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
