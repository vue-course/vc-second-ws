import {BoardsService} from "./boards-service";


export const BoardsServicePlugin = {
	install(Vue) {
		Vue.prototype.$boards = new BoardsService();
	}
};