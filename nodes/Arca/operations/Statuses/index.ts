import {
	IExecuteFunctions,
	IHttpRequestOptions,
	INodeExecutionData,
	IDataObject,
} from 'n8n-workflow';
import { baseUrl } from '../../baseUrl';

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
	const additionalFields = this.getNodeParameter('additionalFields', index, {}) as {
		icon?: string;
		color?: string;
		position?: number;
	};

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

	if (additionalFields.icon) {
		options.body.icon = additionalFields.icon;
	}
	if (additionalFields.color) {
		options.body.color = additionalFields.color;
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
	const additionalFields = this.getNodeParameter('additionalFields', index, {}) as {
		icon?: string;
		color?: string;
		position?: number;
	};

	const body: { [key: string]: any } = {};

	if (name) {
		body.name = name;
	}
	if (category) {
		body.category = category;
	}
	if (additionalFields.icon) {
		body.icon = additionalFields.icon;
	}
	if (additionalFields.color) {
		body.color = additionalFields.color;
	}
	if (additionalFields.position) {
		body.position = additionalFields.position;
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
	const additionalFields = this.getNodeParameter('additionalFields', index, {}) as {
		reassignTo?: number;
	};
	const qs: IDataObject = {};

	if (additionalFields.reassignTo) {
		qs.reassign_to = additionalFields.reassignTo;
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
