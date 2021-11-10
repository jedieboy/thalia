import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FileUploader } from 'ng2-file-upload';
import cloneDeep from "lodash.clonedeep";
import {NgForm} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { FirebaseDBService } from '../services/firebase-db.service';
const URL = '';
@Component({
  selector: 'admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})

export class AdminComponent implements OnInit {
  uploader:FileUploader;
  gallery:any;
  ytList:any = [];
  dataModal:any;
  page = 1;
  pageSize = 8;
  constructor(private fireService : FirebaseDBService, private formBuilder : FormBuilder,
    private ngbModal: NgbModal, private toastr: ToastrService) {
  }


  ngOnInit() {

    this.uploader = new FileUploader({
      url: '',
    });

    this.uploader.onAfterAddingFile = (fileitem) =>{
      fileitem['dynamicForm'] = (this.formBuilder.group({
        youtubeId : ['', Validators.required],
        title : ['', Validators.required],
        subtitle: ['']
      }))
    }
    this.getList();

  }

  uploadYT(){
    if(this.uploader.queue.length > 0){
      this.fireService.YtData = []
      this.uploader.queue.forEach((file:any)=>{
        if(file.dynamicForm.valid){
          this.fireService.uploadToStorage(file)
          .subscribe(
            (res:any) => {
              if(res){
                this.uploader.queue = []
                console.log(res)

              }
            },
            error => {
              console.log(error);
            }
          );
        }

      })

    }

  }

  getList(){
    this.fireService.getList().subscribe(data=>{
      if(data){
        var keyArray = []
        this.ytList = [];
        data.map((e)=>{
          this.ytList.push(e.payload.val());
          keyArray.push({key: e.payload.key, type: this.fireService.basePathYt})
        }
        )
        if(this.ytList){
        this.ytList.forEach((e:any, ctr) => {
          if(keyArray.length == this.ytList.length){
            e.key = keyArray[ctr].key;
            e.type = keyArray[ctr].type;
          }
        });
        }
      }
    });
  }
  modalRef:any;
  
  popupModal(template: TemplateRef<any>, data){
    this.modalRef = this.ngbModal.open(template, {
      backdrop: 'static',
      centered: true,
      animation: true
      // size: 'sm'
    });
    this.dataModal = cloneDeep(data);
  }

  close(){
    this.modalRef.close()
  }
  editItem(){

  }

  deleteItem(item){
    this.fireService.deleteFile(item);
  }

  updateYT(form){
    if(form.valid){
      var params = {
        id: form.value.ytid,
        src: this.dataModal.src,
        title: form.value.ytTitle,
        subtitle: form.value.ytSubs
      }
      this.fireService.updateFile(this.dataModal, params).then(()=>{
        this.modalRef.close();
        this.toastr.success( this.dataModal.id+ ' has been updated succesfully.','Youtube updated')
      })
    }
  }
}
