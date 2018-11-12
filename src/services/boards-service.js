if (!localStorage.db) {
	localStorage.setItem('db', JSON.stringify({
		boards: [createNewBoard()],
		stages: [],
		tasks: []
	}));
}

const cache = {};

/**
 * get Database
 * @returns {Promise<{
 *  boards: Array<{id: string, name: string}>,
 *  stages: Array<{id: string, name: string, board: string}>,
 *  tasks: Array<{id: string, stage: string, title: string}>
 *     }>}
 */
function getDB() {
	if (cache.db) {
		return Promise.resolve(cache.db);
	}
	return Promise
		.resolve(localStorage.db)
		.then(JSON.parse)
		.then(db => (cache.db = db) && db);
}

/**
 * set Database
 * @param db: {boards: Array, stages: Array, tasks: Array}
 * @returns {Promise<{boards: Array, stages: Array, tasks: Array}>}
 */
function setDB(db) {
	cache.db = db;
	return Promise.resolve(db)
		.then(JSON.stringify)
		.then(s => localStorage.setItem('db', s))
		.then(getDB);
}

/**
 *
 * @returns {Promise<{id: string, name: string}>}
 */
function getBoard() {
	return getDB().then(db => db.boards[0]);
}

/**
 * new board object
 * @returns {{id: string, name: string}}
 */
function createNewBoard() {
	return {id: getUUID(), name: 'New Board'};
}

/**
 * generate guid
 * @returns {string}
 */
function getUUID() {
	return Date.now().toString() + Math.random().toString();
}


class BoardsService {


	/**
	 *
	 * @returns {Promise<Array<{id: string, name: string, tasks: Array}>>}
	 */
	getStages() {
		return Promise
			.all([getDB(), getBoard()])
			.then(([db, board]) => {
				return db.stages
					.filter(stage => stage.board === board.id)
					.map((stage) => {
						return {
							...stage,
							tasks: db.tasks.filter(task => task.stage === stage.id).map(task => Object.assign({}, task))
						};
					});
			});
	}

	/**
	 *
	 * @param id: string
	 * @param name: string
	 * @returns {Promise<{id: string, name: string, tasks: Array}>}
	 */
	setStage({id, name}) {
		const isNew = !id;
		let updatedStage;
		if (isNew) {
			id = getUUID();
		}
		return Promise.all([getDB(), getBoard()])
			.then(([db, board]) => {
				if (isNew) {
					updatedStage = {id, name, board: board.id};
					db.stages.push(updatedStage);
				} else {
					updatedStage = db.stages.find(stage => stage.id === id);
					updatedStage.name = name;
				}
				updatedStage = {
					...updatedStage,
					tasks: isNew ? [] : db.tasks.filter(task => task.stage === updatedStage.id),
				};
				return db;
			})
			.then(setDB)
			.then(() => updatedStage);
	}

	/**
	 *
	 * @param id
	 */
	deleteStage(id) {
		return getDB()
			.then(db => {
				db.stages = db.stages.filter(stage => stage.id !== id);
				return db;
			})
			.then(setDB)
			.then(() => true);
	}

	/**
	 *
	 * @param id: string | undefined
	 * @param stage: string
	 * @param title: string
	 * @returns {Promise<{boards: Array, stages: Array, tasks: Array} | never>}
	 */
	setTask({id, stage, title}) {
		let updatedTask;
		return getDB()
			.then(db => {
				if (id) {
					updatedTask = db.tasks.find(task => task.id === id);
					if(stage) updatedTask.stage = stage;
					if(title) updatedTask.title = title;
				} else {
					updatedTask = {id: getUUID(), stage, title};
					db.tasks.push(updatedTask);
				}

				updatedTask = {...updatedTask};
				return db;
			})
			.then(setDB)
			.then(() => updatedTask);

	}

	/**
	 * get task by id
	 * @param id
	 * @returns {Promise<{id: string, stage: string, title: string}>}
	 */
	getTask(id) {
		return getDB()
			.then(db => {
				const task = db.tasks.find(task => task.id === id);

				return {
					...task,
				};
			});
	}

	/**
	 *
	 * @param id
	 */
	deleteTask(id) {
		return getDB()
			.then(db => {
				db.tasks = db.tasks.filter(task => task.id !== id);
				return db;
			})
			.then(setDB)
			.then(() => true);
	}

}

export const BoardService = new BoardsService;