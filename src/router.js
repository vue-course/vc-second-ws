import Vue from 'vue';
import Router from 'vue-router';
import Boards from './views/Boards.vue';
import Board from './views/Board.vue';
import Task from './views/Task.vue';

Vue.use(Router);


export default new Router({
	mode: 'history',
	base: process.env.BASE_URL,
	routes: [
		{
			path: '/',
			name: 'boards',
			component: Boards
		},
		{
			path: '/board/:id',
			name: 'board',
			component: Board
		},
		{
			path: '/task/:id',
			name: 'task',
			component: Task
		}
	]
})