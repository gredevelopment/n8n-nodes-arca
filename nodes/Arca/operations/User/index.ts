import { IExecuteFunctions, IHttpRequestOptions, INodeExecutionData } from 'n8n-workflow';

const baseUrl = 'https://api.getarca.app/api/v1';

export async function getCurrentUser(this: IExecuteFunctions, index: number): Promise<INodeExecutionData> {
	const options: IHttpRequestOptions = {
		method: 'GET',
		url: `${baseUrl}/me`,
		json: true,
	};

	const response = await this.helpers.httpRequestWithAuthentication.call(this, 'arcaApi', options);

	return {
		json: response,
		pairedItem: { item: index },
	};
}
