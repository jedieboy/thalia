import { Inject, Injectable } from '@angular/core';
import { FirebaseApp } from '@angular/fire';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import {AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { BehaviorSubject, Observable } from 'rxjs';
import { finalize, map} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class FirebaseDBService {
  YtData:any = []
  YTSub = new BehaviorSubject(false);
  progress : Observable<number>;
  basePath = 'thumbnails';
  basePathYt = 'youtube';
  imgSrc;
  fKey;
  constructor(private db: AngularFireDatabase, private firestore: AngularFirestore, private storage : AngularFireStorage, 
    @Inject(FirebaseApp) firebaseApp: any, ) {
  //  this.customersRef = db.list(this.dbPath);
    // console.log(this.db)
  }

  uploadToStorage(fileUpload):Observable<any> {
    console.log(fileUpload)
    fileUpload.progress = 20;
    const filePath = `${this.basePath}/${fileUpload.file.name}`;
    const storageRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, fileUpload._file);
    uploadTask.snapshotChanges().pipe(
      finalize(() => {
        storageRef.getDownloadURL().subscribe(downloadURL => {
          this.YtData = {
            id: fileUpload.dynamicForm.value.youtubeId,
            src: downloadURL,
            title: fileUpload.dynamicForm.value.title,
            subtitle: fileUpload.dynamicForm.value.subtitle
          };
          fileUpload.progress = 100;
          this.saveFileData(this.YtData, this.basePathYt);
        });
      })
    ).subscribe();
    return uploadTask.percentageChanges(); 
  }
  saveFileData(data, folder): void {
      this.db.list(folder).push(data);
  }
  getProgress():Observable<any>{
    return this.progress;
  }
  getYTSub():Observable<any>{
    return this.YTSub.asObservable();
  }

  setKey(key){
    this.fKey = key;
  }

  getYoutubeList(){
    return this.firestore.collection("gallery").snapshotChanges()
  }
  getList(){
    return this.db.list(this.basePathYt).snapshotChanges();
  }
  displayImage(image:string){
    let ref = this.storage.refFromURL(image);
    var subs = new BehaviorSubject('');
    ref.getDownloadURL().subscribe(e=>{
      return subs.next(e);
    });
    
    return subs.asObservable();
  }
  deleteFile(item){
    console.log(item)
    this.db.list(item.type).remove(item.key).then(()=>{
      this.storage.refFromURL(item.src).delete()
    }).catch(error=>console.log(error));
  }
  updateFile(config, data){
    return this.db.database.ref(config.type + "/" + config.key).update(data);
    
  }


}
