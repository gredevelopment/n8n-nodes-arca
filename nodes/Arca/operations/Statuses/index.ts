import {
	IExecuteFunctions,
	IHttpRequestOptions,
	INodeExecutionData,
	IDataObject,
} from 'n8n-workflow';

const baseUrl = 'https://api.getarca.app/api/v1';

export async function listStatuses(
	this: IExecuteFunctions,
	index: number,
): Promise<INodeExecutionData> {
	const workspaceId = this.getNodeParameter('workspaceId', index) as number;

	const options: IHttpRequestOptions = {
		method: 'GET',
		url: `${baseUrl}/workspaces/${workspaceId}/statuses`,
		json: true,
	};

	const response = await this.helpers.httpRequestWithAuthentication.call(this, 'arcaApi', options);

	return {
		json: response,
		pairedItem: { item: index },
	};
}

export async function createStatus(
	this: IExecuteFunctions,
	index: number,
): Promise<INodeExecutionData> {
	const workspaceId = this.getNodeParameter('workspaceId', index) as number;
	const name = this.getNodeParameter('name', index) as string;
	const category = this.getNodeParameter('category', index) as string;
	const icon = this.getNodeParameter('icon', index) as string;
	const color = this.getNodeParameter('color', index) as string;

	const options: IHttpRequestOptions = {
		method: 'POST',
		url: `${baseUrl}/statuses`,
		json: true,
		body: {
			workspace_id: workspaceId,
			name,
			category,
		},
	};

	if (icon) {
		options.body.icon = icon;
	}
	if (color) {
		options.body.color = color;
	}

	const response = await this.helpers.httpRequestWithAuthentication.call(this, 'arcaApi', options);

	return {
		json: response,
		pairedItem: { item: index },
	};
}

export async function updateStatus(
	this: IExecuteFunctions,
	index: number,
): Promise<INodeExecutionData> {
	const statusId = this.getNodeParameter('statusId', index) as number;
	const name = this.getNodeParameter('name', index) as string;
	const category = this.getNodeParameter('category', index) as string;
	const icon = this.getNodeParameter('icon', index) as string;
	const color = this.getNodeParameter('color', index) as string;
	const position = this.getNodeParameter('position', index) as number;

	const body: { [key: string]: any } = {};

	if (name) {
		body.name = name;
	}
	if (category) {
		body.category = category;
	}
	if (icon) {
		body.icon = icon;
	}
	if (color) {
		body.color = color;
	}
	if (position) {
		body.position = position;
	}

	const options: IHttpRequestOptions = {
		method: 'PATCH',
		url: `${baseUrl}/statuses/${statusId}`,
		json: true,
		body,
	};

	const response = await this.helpers.httpRequestWithAuthentication.call(this, 'arcaApi', options);

	return {
		json: response,
		pairedItem: { item: index },
	};
}

export async function deleteStatus(
	this: IExecuteFunctions,
	index: number,
): Promise<INodeExecutionData> {
	const statusId = this.getNodeParameter('statusId', index) as number;
	const reassignTo = this.getNodeParameter('reassignTo', index) as number;
	const qs: IDataObject = {};

	if (reassignTo) {
		qs.reassign_to = reassignTo;
	}

	const options: IHttpRequestOptions = {
		method: 'DELETE',
		url: `${baseUrl}/statuses/${statusId}`,
		qs,
		json: true,
	};

	const response = await this.helpers.httpRequestWithAuthentication.call(this, 'arcaApi', options);

	return {
		json: response === '' || response === undefined ? { success: true } : response,
		pairedItem: { item: index },
	};
}
