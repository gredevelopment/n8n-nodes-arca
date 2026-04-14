import { IExecuteFunctions, IHttpRequestOptions, INodeExecutionData } from 'n8n-workflow';
import { baseUrl } from '../../baseUrl';

export async function listTasks(
	this: IExecuteFunctions,
	index: number,
): Promise<INodeExecutionData> {
	const workspaceId = this.getNodeParameter('workspaceId', index) as number;
	const listId = this.getNodeParameter('listId', index) as number;
	const additionalFields = this.getNodeParameter('additionalFields', index, {}) as {
		page?: number;
		limit?: number;
	};

	const qs: { [key: string]: any } = {
		page: additionalFields.page || 1,
		limit: additionalFields.limit || 50,
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
	const listId = this.getNodeParameter('listId', index) as number;
	const title = this.getNodeParameter('title', index) as string;
	const additionalFields = this.getNodeParameter('additionalFields', index, {}) as {
		description?: string;
		priority?: string;
		statusIdForTask?: number;
		dueDate?: string;
		startDate?: string;
	};

	const body: { [key: string]: any } = {
		list_id: listId,
		title,
	};

	if (additionalFields.description) {
		body.description = additionalFields.description;
	}
	if (additionalFields.priority) {
		body.priority = additionalFields.priority;
	}
	if (additionalFields.statusIdForTask) {
		body.status_id = additionalFields.statusIdForTask;
	}
	if (additionalFields.dueDate) {
		body.due_date = additionalFields.dueDate;
	}
	if (additionalFields.startDate) {
		body.start_date = additionalFields.startDate;
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
	const additionalFields = this.getNodeParameter('additionalFields', index, {}) as {
		title?: string;
		description?: string;
		priority?: string;
		statusIdForTask?: number;
		listId?: number;
		dueDate?: string;
		startDate?: string;
	};

	const body: { [key: string]: any } = {};

	if (additionalFields.title) {
		body.title = additionalFields.title;
	}
	if (additionalFields.description) {
		body.description = additionalFields.description;
	}
	if (additionalFields.priority) {
		body.priority = additionalFields.priority;
	}
	if (additionalFields.statusIdForTask) {
		body.status_id = additionalFields.statusIdForTask;
	}
	if (additionalFields.listId) {
		body.list_id = additionalFields.listId;
	}
	if (additionalFields.dueDate) {
		body.due_date = additionalFields.dueDate;
	}
	if (additionalFields.startDate) {
		body.start_date = additionalFields.startDate;
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
