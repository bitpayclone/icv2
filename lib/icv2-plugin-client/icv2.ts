// todo: provide instance of icv2 for injection in Angular apps
// import {provide, Provider} from 'angular2/core';

import { Activity } from './';
import { PluginApiMessage, ReadyMessage, ActivityMessage } from './plugin-api-messages';

export class Icv2 {
  private _host = window.parent;

  constructor() {
    window.addEventListener('message', this._receiveData.bind(this));
    this.ready();
  }

  private _receiveData(event: MessageEvent) {
    console.log('plugin recieved data:');
    console.log(event.data);
    var request: PluginApiMessage;
    try{
      console.log(event);
      request = PluginApiMessage.deserialize(event);
    } catch(error){
      console.error(error);
    }

    // route to proper handler
    // if(request instanceof DeeplinkHandler){
    //   this._runActivityResponder(request);
    // }

  }

  private _sendData(message: PluginApiMessage) {
    this._host.postMessage(message.serialize(), '*');
  }

  private ready() {
    this._sendData(new ReadyMessage());
  }

  public saveActivity(activity: Activity[]){
    this._sendData(new ActivityMessage({activity: activity}));
  }

}
