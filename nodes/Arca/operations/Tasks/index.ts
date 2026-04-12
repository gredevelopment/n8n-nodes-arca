import { IExecuteFunctions, IHttpRequestOptions, INodeExecutionData } from 'n8n-workflow';
import { baseUrl } from '../../baseUrl';

export async function listTasks(
	this: IExecuteFunctions,
	index: number,
): Promise<INodeExecutionData> {
	const workspaceId = this.getNodeParameter('workspaceId', index) as number;
	const listId = this.getNodeParameter('listId', index) as number;
	const page = this.getNodeParameter('page', index, 1) as number;
	const limit = this.getNodeParameter('limit', index, 50) as number;

	const qs: { [key: string]: any } = {
		page,
		limit,
	};

	if (listId) {
		qs.list_id = listId;
	}

	const options: IHttpRequestOptions = {
		method: 'GET',
		url: `${baseUrl}/workspaces/${workspaceId}/tasks`,
		qs,
		json: true,
	};

	const response = await this.helpers.httpRequestWithAuthentication.call(this, 'arcaApi', options);

	return {
		json: response,
		pairedItem: { item: index },
	};
}

export async function getTask(this: IExecuteFunctions, index: number): Promise<INodeExecutionData> {
	const taskId = this.getNodeParameter('taskId', index) as number;

	const options: IHttpRequestOptions = {
		method: 'GET',
		url: `${baseUrl}/tasks/${taskId}`,
		json: true,
	};

	const response = await this.helpers.httpRequestWithAuthentication.call(this, 'arcaApi', options);

	return {
		json: response,
		pairedItem: { item: index },
	};
}

export async function createTask(
	this: IExecuteFunctions,
	index: number,
): Promise<INodeExecutionData> {
	const workspaceId = this.getNodeParameter('workspaceId', index) as number;
	const listId = this.getNodeParameter('listId', index) as number;
	const title = this.getNodeParameter('title', index) as string;
	const description = this.getNodeParameter('description', index) as string;
	const priority = this.getNodeParameter('priority', index) as string;
	const statusId = this.getNodeParameter('statusIdForTask', index) as number;
	const dueDate = this.getNodeParameter('dueDate', index) as string;
	const startDate = this.getNodeParameter('startDate', index) as string;

	const body: { [key: string]: any } = {
		workspace_id: workspaceId,
		list_id: listId,
		title,
	};

	if (description) {
		body.description = description;
	}
	if (priority) {
		body.priority = priority;
	}
	if (statusId) {
		body.status_id = statusId;
	}
	if (dueDate) {
		body.due_date = dueDate;
	}
	if (startDate) {
		body.start_date = startDate;
	}

	const options: IHttpRequestOptions = {
		method: 'POST',
		url: `${baseUrl}/tasks`,
		json: true,
		body,
	};

	const response = await this.helpers.httpRequestWithAuthentication.call(this, 'arcaApi', options);

	return {
		json: response,
		pairedItem: { item: index },
	};
}

export async function updateTask(
	this: IExecuteFunctions,
	index: number,
): Promise<INodeExecutionData> {
	const taskId = this.getNodeParameter('taskId', index) as number;
	const title = this.getNodeParameter('title', index) as string;
	const description = this.getNodeParameter('description', index) as string;
	const priority = this.getNodeParameter('priority', index) as string;
	const statusId = this.getNodeParameter('statusIdForTask', index) as number;
	const listId = this.getNodeParameter('listId', index) as number;
	const dueDate = this.getNodeParameter('dueDate', index) as string;
	const startDate = this.getNodeParameter('startDate', index) as string;

	const body: { [key: string]: any } = {};

	if (title) {
		body.title = title;
	}
	if (description) {
		body.description = description;
	}
	if (priority) {
		body.priority = priority;
	}
	if (statusId) {
		body.status_id = statusId;
	}
	if (listId) {
		body.list_id = listId;
	}
	if (dueDate) {
		body.due_date = dueDate;
	}
	if (startDate) {
		body.start_date = startDate;
	}

	const options: IHttpRequestOptions = {
		method: 'PATCH',
		url: `${baseUrl}/tasks/${taskId}`,
		json: true,
		body,
	};

	const response = await this.helpers.httpRequestWithAuthentication.call(this, 'arcaApi', options);

	return {
		json: response,
		pairedItem: { item: index },
	};
}

export async function deleteTask(
	this: IExecuteFunctions,
	index: number,
): Promise<INodeExecutionData> {
	const taskId = this.getNodeParameter('taskId', index) as number;

	const options: IHttpRequestOptions = {
		method: 'DELETE',
		url: `${baseUrl}/tasks/${taskId}`,
		json: true,
	};

	const response = await this.helpers.httpRequestWithAuthentication.call(this, 'arcaApi', options);

	return {
		json: response === '' || response === undefined ? { success: true } : response,
		pairedItem: { item: index },
	};
}
