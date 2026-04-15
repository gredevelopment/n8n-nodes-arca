import {
	IExecuteFunctions,
	ILoadOptionsFunctions,
	INodeExecutionData,
	INodePropertyOptions,
	INodeType,
	INodeTypeDescription,
	IHttpRequestOptions,
	NodeOperationError,
} from 'n8n-workflow';
import { baseUrl } from './baseUrl';

async function getWorkspaces(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
	const options: IHttpRequestOptions = {
		method: 'GET',
		url: `${baseUrl}/workspaces`,
		json: true,
	};

	const response = await this.helpers.httpRequestWithAuthentication.call(this, 'arcaApi', options);

	return Array.isArray(response)
		? response.map((workspace: any) => ({ name: workspace.name, value: workspace.id }))
		: [];
}

async function getFolders(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
	const workspaceId = this.getNodeParameter('workspaceId', undefined) as number | undefined;
	if (!workspaceId) return [];

	const options: IHttpRequestOptions = {
		method: 'GET',
		url: `${baseUrl}/workspaces/${workspaceId}/folders`,
		json: true,
	};

	const response = await this.helpers.httpRequestWithAuthentication.call(this, 'arcaApi', options);

	return Array.isArray(response)
		? response.map((folder: any) => ({ name: folder.name, value: folder.id }))
		: [];
}

async function getLists(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
	const workspaceId = this.getNodeParameter('workspaceId', undefined) as number | undefined;
	if (!workspaceId) return [];

	const options: IHttpRequestOptions = {
		method: 'GET',
		url: `${baseUrl}/workspaces/${workspaceId}/lists`,
		json: true,
	};

	const response = await this.helpers.httpRequestWithAuthentication.call(this, 'arcaApi', options);

	return Array.isArray(response)
		? response.map((list: any) => ({ name: list.name, value: list.id }))
		: [];
}

async function getStatuses(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
	const workspaceId = this.getNodeParameter('workspaceId', undefined) as number | undefined;
	if (!workspaceId) return [];

	const options: IHttpRequestOptions = {
		method: 'GET',
		url: `${baseUrl}/workspaces/${workspaceId}/statuses`,
		json: true,
	};

	const response = await this.helpers.httpRequestWithAuthentication.call(this, 'arcaApi', options);

	return Array.isArray(response)
		? response.map((status: any) => ({ name: status.name, value: status.id }))
		: [];
}

async function getLabels(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
	const workspaceId = this.getNodeParameter('workspaceId', undefined) as number | undefined;
	if (!workspaceId) return [];

	const options: IHttpRequestOptions = {
		method: 'GET',
		url: `${baseUrl}/workspaces/${workspaceId}/labels`,
		json: true,
	};

	const response = await this.helpers.httpRequestWithAuthentication.call(this, 'arcaApi', options);

	return Array.isArray(response)
		? response.map((label: any) => ({ name: label.name, value: label.id }))
		: [];
}

import {
	userOperations,
	userFields,
	workspacesOperations,
	workspacesFields,
	foldersOperations,
	foldersFields,
	listsOperations,
	listsFields,
	tasksOperations,
	tasksFields,
	statusesOperations,
	statusesFields,
	labelsOperations,
	labelsFields,
	commentsOperations,
	commentsFields,
} from './resources';

import {
	getCurrentUser,
	listWorkspaces,
	getWorkspace,
	listWorkspaceMembers,
	listFolders,
	createFolder,
	updateFolder,
	deleteFolder,
	listLists,
	createList,
	updateList,
	deleteList,
	listTasks,
	getTask,
	createTask,
	updateTask,
	deleteTask,
	listStatuses,
	createStatus,
	updateStatus,
	deleteStatus,
	listLabels,
	createLabel,
	updateLabel,
	deleteLabel,
	listComments,
	createComment,
} from './operations';

export class Arca implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Arca',
		name: 'arca',
		icon: 'file:./arca.svg',
		group: ['transform'],
		version: 1,
		subtitle:
			'={{"Resource: " + $parameter["resource"] + ", Operation: " + $parameter["operation"]}}',
		description:
			'Interact with the Arca API to manage users, workspaces, folders, lists, tasks, statuses, labels, and comments.',
		defaults: {
			name: 'Arca',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				displayName: 'Arca API Key',
				name: 'arcaApi',
				required: true,
			},
		],
		usableAsTool: true,
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{ name: 'Comment', value: 'comment' },
					{ name: 'Folder', value: 'folder' },
					{ name: 'Label', value: 'label' },
					{ name: 'List', value: 'list' },
					{ name: 'Status', value: 'status' },
					{ name: 'Task', value: 'task' },
					{ name: 'User', value: 'user' },
					{ name: 'Workspace', value: 'workspace' },
				],
				default: 'user',
			},
			...userOperations,
			...workspacesOperations,
			...foldersOperations,
			...listsOperations,
			...tasksOperations,
			...statusesOperations,
			...labelsOperations,
			...commentsOperations,
			...userFields,
			...workspacesFields,
			...foldersFields,
			...listsFields,
			...tasksFields,
			...statusesFields,
			...labelsFields,
			...commentsFields,
		],
	};

	methods = {
		loadOptions: {
			getWorkspaces,
			getFolders,
			getLists,
			getStatuses,
			getLabels,
		},
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];

		for (let i = 0; i < items.length; i++) {
			try {
				const resource = this.getNodeParameter('resource', i) as string;
				const operation = this.getNodeParameter('operation', i) as string;
				let result: INodeExecutionData;

				if (resource === 'user') {
					if (operation === 'getCurrentUser') {
						result = await getCurrentUser.call(this, i);
					} else {
						throw new NodeOperationError(this.getNode(), `Unknown user operation: ${operation}`);
					}
				} else if (resource === 'workspace') {
					if (operation === 'listWorkspaces') {
						result = await listWorkspaces.call(this, i);
					} else if (operation === 'getWorkspace') {
						result = await getWorkspace.call(this, i);
					} else if (operation === 'listWorkspaceMembers') {
						result = await listWorkspaceMembers.call(this, i);
					} else {
						throw new NodeOperationError(
							this.getNode(),
							`Unknown workspace operation: ${operation}`,
						);
					}
				} else if (resource === 'folder') {
					if (operation === 'listFolders') {
						result = await listFolders.call(this, i);
					} else if (operation === 'createFolder') {
						result = await createFolder.call(this, i);
					} else if (operation === 'updateFolder') {
						result = await updateFolder.call(this, i);
					} else if (operation === 'deleteFolder') {
						result = await deleteFolder.call(this, i);
					} else {
						throw new NodeOperationError(this.getNode(), `Unknown folder operation: ${operation}`);
					}
				} else if (resource === 'list') {
					if (operation === 'listLists') {
						result = await listLists.call(this, i);
					} else if (operation === 'createList') {
						result = await createList.call(this, i);
					} else if (operation === 'updateList') {
						result = await updateList.call(this, i);
					} else if (operation === 'deleteList') {
						result = await deleteList.call(this, i);
					} else {
						throw new NodeOperationError(this.getNode(), `Unknown list operation: ${operation}`);
					}
				} else if (resource === 'task') {
					if (operation === 'listTasks') {
						result = await listTasks.call(this, i);
					} else if (operation === 'getTask') {
						result = await getTask.call(this, i);
					} else if (operation === 'createTask') {
						result = await createTask.call(this, i);
					} else if (operation === 'updateTask') {
						result = await updateTask.call(this, i);
					} else if (operation === 'deleteTask') {
						result = await deleteTask.call(this, i);
					} else {
						throw new NodeOperationError(this.getNode(), `Unknown task operation: ${operation}`);
					}
				} else if (resource === 'status') {
					if (operation === 'listStatuses') {
						result = await listStatuses.call(this, i);
					} else if (operation === 'createStatus') {
						result = await createStatus.call(this, i);
					} else if (operation === 'updateStatus') {
						result = await updateStatus.call(this, i);
					} else if (operation === 'deleteStatus') {
						result = await deleteStatus.call(this, i);
					} else {
						throw new NodeOperationError(this.getNode(), `Unknown status operation: ${operation}`);
					}
				} else if (resource === 'label') {
					if (operation === 'listLabels') {
						result = await listLabels.call(this, i);
					} else if (operation === 'createLabel') {
						result = await createLabel.call(this, i);
					} else if (operation === 'updateLabel') {
						result = await updateLabel.call(this, i);
					} else if (operation === 'deleteLabel') {
						result = await deleteLabel.call(this, i);
					} else {
						throw new NodeOperationError(this.getNode(), `Unknown label operation: ${operation}`);
					}
				} else if (resource === 'comment') {
					if (operation === 'listComments') {
						result = await listComments.call(this, i);
					} else if (operation === 'createComment') {
						result = await createComment.call(this, i);
					} else {
						throw new NodeOperationError(this.getNode(), `Unknown comment operation: ${operation}`);
					}
				} else {
					throw new NodeOperationError(this.getNode(), `Unknown resource: ${resource}`);
				}

				returnData.push(result);
			} catch (error) {
				if (this.continueOnFail()) {
					returnData.push({
						json: { error: error.message },
						pairedItem: { item: i },
					});
				} else {
					throw error;
				}
			}
		}

		return [returnData];
	}
}
