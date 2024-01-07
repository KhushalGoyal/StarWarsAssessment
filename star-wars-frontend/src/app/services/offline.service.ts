import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, map, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OfflineService {
  private baseURL: string = environment.basURL;
  private indexedDB =
    window.indexedDB
  private dbRequest!: IDBOpenDBRequest;
  private http = inject(HttpClient)
  public isAppOnline : BehaviorSubject<boolean> = new BehaviorSubject(true);
  public onlineMode : boolean = true;

  constructor() {
    window.addEventListener("online", () => this.isAppOnline.next(true))
    window.addEventListener("offline", () => this.isAppOnline.next(false))
    this.isAppOnline.subscribe((value) => this.onlineMode = value)
    if (!this.indexedDB) {
      console.log("IndexedDB could not be found in this browser.");
    } else {
      console.log("IndexedDB Supported!")
    }
    this.dbRequest = indexedDB.open("StarWarsDatabase", 2);
    this.dbRequest.onerror = function (event) {
      console.error("An error occurred with IndexedDB");
      console.error(event);
    };
    this.dbRequest.onupgradeneeded = function (event) {
      const db = this.result;
        var objectstore = db.createObjectStore("star_wars", {
            autoIncrement: true,
        });
        objectstore.createIndex("search_term", "search_term", { unique: true });
        objectstore.createIndex("data", "data", { unique: false});
    };
  }

  getKey(type: string, name: string | undefined) {
    let key = `?type=${type}`;
    if (name) key += `&name=${name}`
    return key;
  }

  addData(data: any, type: string, name: string) {
    try {
      const db = this.dbRequest.result;
      const transaction = db.transaction(["star_wars"], "readwrite");
      const store = transaction.objectStore("star_wars")
      const key  = this.getKey(type, name)
      store.put({ data: data, search_term: key}, key)
    } catch (error) {
      console.log(error)
    }
  }

  get(query: string, type: string, name: string) : Observable<any> {
    if (this.onlineMode && this.isAppOnline.value) {
      return this.http.get(this.baseURL.concat(query)).pipe(
        map((res: any) => {
          this.addData(res, type, name)
          return res
        })
      )
    } else {
      const db = this.dbRequest.result;
      const transaction = db.transaction(["star_wars"], "readwrite");
      const store = transaction.objectStore("star_wars");
      const searchQuery = store.get(this.getKey(type, name))
      return Observable.create(
        (observer: any) => searchQuery.onsuccess = () => {
          observer.next(searchQuery?.result?.data ? searchQuery?.result?.data : {
            count: 0,
            next: null,
            previous: null,
            result: []
          })
        }
      )
    }
    
  }
}
