export default class ObserverManager {

    static eventMap: Map<EObserverEvent, IObserverListenner[]> = new Map<EObserverEvent, IObserverListenner[]>();

    static registerEvent(eventID: EObserverEvent, listenner: IObserverListenner) {
        try {
            if (!this.eventMap.has(eventID))
                this.eventMap.set(eventID, []);

            let members = this.eventMap.get(eventID);
            members.push(listenner);
        } catch (error) {
            console.log('OBSERVER: error: ' + error);
        }
    }
    static unregisterEvent(eventID: EObserverEvent, listenner: IObserverListenner) {
        try {
            if (!this.eventMap.has(eventID)) {
                console.log('OBSERVER: Has no eventID ' + eventID);
                return;
            }
            let members = this.eventMap.get(eventID);
            let index = members.indexOf(listenner);
            members.splice(index, 1);
            if (members.length == 0) {
                this.eventMap.delete(eventID);
            }
        } catch (error) {
            console.log('OBSERVER: error: ' + error);
        }
    }
    static postEvent(eventID: EObserverEvent, seeker?: Object) {
        try {
            if (!this.eventMap.has(eventID)) {
                console.log('OBSERVER: Has no eventID ' + eventID);
                return;
            }
            let members = this.eventMap.get(eventID);
            if (members || members.length != 0)
                members.forEach(member => {
                    member.executeObserverEvent(eventID,seeker);
                });
            console.log('OBSERVER: Post Event '+eventID);
            
        } catch (error) {
            console.log('OBSERVER: error: '+error);
        }
    }
}
export enum EObserverEvent {
    GameReady,
    GameStart,
    GamePlay,
    GameEnd,
}

export interface IObserverListenner {
    executeObserverEvent(eventID?:EObserverEvent,seeker?: Object);
}
