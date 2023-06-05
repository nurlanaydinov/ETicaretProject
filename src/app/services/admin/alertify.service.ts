import { Injectable } from '@angular/core';
declare var alertify: any

@Injectable({
  providedIn: 'root'
})
export class AlertifyService {

  constructor() { }

 // message(message: string, messageType: MessageType, position: Position, delay: number = 3, dismissOthers: boolean = false)
 message(message: string, options: Partial<ALertifyOptions>)
 {
    alertify.set('notifier', 'delay', options.delay)
    alertify.set('notifier','position', options.position)
    const msg = alertify[options.messageType](message);
    if(options.dismissOthers){
        msg.dismissOthers();
    }
  }

  dismiss(){
    alertify.dismissAll();
  }
}

export class ALertifyOptions{
  messageType: MessageType = MessageType.Message;
  position: Position = Position.TopRight;
  delay: number = 1;
  dismissOthers: boolean = false;
}
export enum MessageType{
  Error = "error",
  Success = "success",
  Message = "message",
  Notify = "notify",
  Warning = "warning"
}

export enum Position{
  TopCenter = "top-center",
  TopLeft = "top-left",
  TopRight = "top-right",
  BottomCenter = "bottom-center",
  BottomRight = "bottom-right",
  BottomLeft = "bottom-left"
}
