// import { Injectable } from '@nestjs/common';
// import { UserActionDTO } from '../DTO/UserActionDTO';
// import { UserService } from './user.service';
// import { ActionService } from './action.service';
// import UserRequestDTO from '../DTO/UserRequestDTO';
// import ActionDTO from '../DTO/ActionDTO';
//
// @Injectable()
// export class UserActionService {
//   userActions: Map<string, UserActionDTO>;
//
//   constructor(
//     private readonly userService: UserService,
//     private readonly actionService: ActionService,
//   ) {
//     this.userActions = new Map<string, UserActionDTO>();
//
//     const usersRecord: Record<string, UserRequestDTO> = userService.getAllUsers();
//     const actionsRecord: Record<string, ActionDTO> =
//       actionService.getAllActions();
//
//     const users: UserRequestDTO[] = [];
//     const actions: ActionDTO[] = [];
//
//     for (const key in usersRecord) {
//       users.push(usersRecord[key]);
//     }
//
//     for (const key in actionsRecord) {
//       actions.push(actionsRecord[key]);
//     }
//
//     let usersLength: number = users.length;
//
//     while (usersLength) {
//       const idx: number = Math.floor(Math.random() * users.length);
//       const user: UserRequestDTO = users[idx];
//
//       const action: ActionDTO =
//         actions[Math.floor(Math.random() * actions.length)];
//       const id: string = Math.random().toString(36).slice(2, 10);
//
//       this.userActions.set(id, { userId: user.id, actionId: action.id });
//
//       usersLength--;
//     }
//   }
//
//   getAllUserAction(): UserActionDTO[] {
//     return Array.from(this.userActions.values());
//   }
//
//   getUsersAndActions(): Record<string, UserRequestDTO> {
//     const users: Record<string, UserRequestDTO> = this.userService.getAllUsers();
//     const actions: Record<string, ActionDTO> =
//       this.actionService.getAllActions();
//
//     for (const action of this.userActions.values()) {
//       if (!users[action.userId].actions) {
//         users[action.userId].actions = {};
//       }
//
//       // @ts-expect-error actions is initalized above ^^
//       users[action.userId].actions[action.actionId] = actions[action.actionId];
//     }
//
//     return users;
//   }
// }
