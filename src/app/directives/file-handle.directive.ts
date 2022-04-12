import { Directive, EventEmitter, Input, Output } from '@angular/core';
import { DEFAULT_SIZE_IMAGE, DEFAULT_SIZE_VIDEO } from 'app/constant/constant';
import { HelperService } from 'app/services/helper.service';

export type FileFinishUploadType = { url: string, type: 'image' | 'video' };
export type FileFinishPendingType = { result: string | ArrayBuffer | null; file: File | null; type: string };

@Directive({
  selector: '[appFileHandle]',
  host: { '(change)': 'onFileChange($event)' }
})
export class FileHandleDirective {
  @Input() typeProcess: 'upload' | 'pending' | 'image' = 'upload';
  @Output() onFileHandling = new EventEmitter();
  @Output() onFileHandleFinish = new EventEmitter();
  constructor(
    private helperService: HelperService
  ) { }

  onFileChange($event: Event) {
    const file = ($event.target as HTMLInputElement).files;
    if (file) {
      this.process(file);
      return;
    }
    this.onFileHandleFinish.emit(null);
    const ele = $event.target as HTMLInputElement;
    ele.value = '';
  }

  process(files: FileList) {
    switch (this.typeProcess) {
      case 'upload': {
        this.onFileHandleUpload(files);
        break;
      }
      case 'pending': {
        this.onFileHandlePending(files);
        break;
      }
      case 'image': {
        this.onImageUpload(files);
        break;
      }
      default: { }
    }
  }

  async onImageUpload(files: FileList) {
    // this.onFileHandling.emit(true);
    // const listFileUpdate = this.validateFile(files);
    // if (listFileUpdate.length) {
    //   const result = await Promise.all(listFileUpdate.map(file => this.helperService.uploadImage(file)));
    //   this.onFileHandling.emit(false);
    //   this.onFileHandleFinish.emit(result as FileFinishUploadType[]);
    // }

    // this.onFileHandling.emit(false);
    // this.onFileHandleFinish.emit(null);
  }

  async onFileHandleUpload(files: FileList) {
    // this.onFileHandling.emit(true);
    // const listFileUpdate = this.validateFile(files);
    // if (listFileUpdate.length) {
    //   const result = await Promise.all(listFileUpdate.map(file => this.helperService.uploadFile(file)));
    //   this.onFileHandling.emit(false);
    //   this.onFileHandleFinish.emit(result as FileFinishUploadType[]);
    // }
    // // console.log(result);
    // this.onFileHandling.emit(false);
    // this.onFileHandleFinish.emit(null);
  }

  validateFile(files: FileList): File[] {
    return ([].map.call(files, (file: File) => file) as File[]).filter(file => {
      if (file.type.includes('image')) {
        const valid = file.size <= DEFAULT_SIZE_IMAGE;
        if (!valid) {
          this.helperService.showError('', 'Ảnh tải lên tối đa 5mb')
        }
        return valid;
      }
      const valid = file.size <= DEFAULT_SIZE_VIDEO;
      if (!valid) {
        this.helperService.showError('', 'Video tải lên tối đa 20mb');
      }
      return valid;
    });
  }

  async onFileHandlePending(files: FileList) {
    const listFileUpdate = this.validateFile(files);
    this.onFileHandling.emit(true);
    if (listFileUpdate.length) {
      const result = await Promise.all([].map.call(files, (file: File) => {
        return new Promise((resolve, reject) => {
          const type = file.type.split('/')[0];
          if (type === 'video') {
            resolve({ result: URL.createObjectURL(file), file: file, type })
          }
          const reader = new FileReader();
          reader.onload = () => resolve({ result: reader.result, file: file, type });
          reader.readAsDataURL(file);
        })
      }));
      this.onFileHandling.emit(false);
      this.onFileHandleFinish.emit(result as FileFinishPendingType[]);
      return;
    }
    this.onFileHandling.emit(false);
    this.onFileHandleFinish.emit(null);
  }
}
