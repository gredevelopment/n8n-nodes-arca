import {
	IWebhookFunctions,
	IDataObject,
	INodeType,
	INodeTypeDescription,
	IWebhookResponseData,
} from 'n8n-workflow';

export class ArcaTrigger implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Arca Trigger',
		name: 'arcaTrigger',
		icon: 'file:arca.svg',
		group: ['trigger'],
		version: 1,
		description:
			'Receive real-time HTTPS notifications from Arca when events happen in your workspaces, such as task creation, status changes, list updates, and more',
		defaults: {
			name: 'Arca Trigger',
		},
		inputs: [],
		outputs: ['main'],
		credentials: [
			{
				displayName: 'Arca API',
				name: 'arcaApi',
				required: false,
			},
		],
		webhooks: [
			{
				name: 'default',
				httpMethod: 'POST',
				responseMode: 'onReceived',
				path: 'arca-webhook',
			},
		],
		properties: [
			{
				displayName:
					'Add the webhook URL in your Arca dashboard under Settings → Webhooks to start receiving events.',
				name: 'notice',
				type: 'notice',
				default: '',
			},
			{
				displayName: 'Auth Token (Optional)',
				name: 'authToken',
				type: 'string',
				typeOptions: {
					password: true,
				},
				default: '',
				description:
					'Optional webhook auth token from Arca. If set, requests without a matching Authorization header will be rejected.',
			},
		],
	};

	async webhook(this: IWebhookFunctions): Promise<IWebhookResponseData> {
		const bodyData = this.getBodyData() as IDataObject;
		const headers = this.getHeaderData();
		const authToken = this.getNodeParameter('authToken', '') as string;

		// Verify User-Agent header (Arca sends "Arca-Webhooks/1.0")
		const userAgent = headers['user-agent'] as string;
		if (!userAgent || !userAgent.includes('Arca-Webhooks')) {
			return {
				workflowData: [
					this.helpers.returnJsonArray([
						{
							source: 'Arca',
							node: 'ArcaTrigger',
							error: 'Unauthorized: Invalid user agent',
							timestamp: new Date().toISOString(),
						},
					]),
				],
				webhookResponse: {
					status: 401,
					body: { error: 'Unauthorized: Invalid user agent' },
				},
			};
		}

		// Verify auth token if configured
		if (authToken) {
			const authHeader = headers['authorization'] as string;
			const expectedAuth = `Bearer ${authToken}`;

			if (!authHeader || authHeader !== expectedAuth) {
				return {
					workflowData: [
						this.helpers.returnJsonArray([
							{
								source: 'Arca',
								node: 'ArcaTrigger',
								error: 'Unauthorized: Invalid or missing auth token',
								timestamp: new Date().toISOString(),
							},
						]),
					],
					webhookResponse: {
						status: 401,
						body: { error: 'Unauthorized: Invalid or missing auth token' },
					},
				};
			}
		}

		// Read event type from X-Arca-Event header
		const eventType = (headers['x-arca-event'] as string) || (bodyData.event as string);

		// Accept ping event for webhook setup verification
		if (eventType === 'ping') {
			return {
				workflowData: [
					this.helpers.returnJsonArray([
						{
							source: 'Arca',
							node: 'ArcaTrigger',
							event: 'ping',
							message: 'Webhook setup successful',
							timestamp: new Date().toISOString(),
							...bodyData,
						},
					]),
				],
				webhookResponse: {
					status: 200,
					body: { message: 'Webhook ping received successfully' },
				},
			};
		}

		// Validate event type
		const validEventPrefixes = ['task.', 'folder.', 'list.'];
		const isValidEvent =
			eventType && validEventPrefixes.some((prefix) => eventType.startsWith(prefix));

		if (!isValidEvent) {
			return {
				workflowData: [
					this.helpers.returnJsonArray([
						{
							source: 'Arca',
							node: 'ArcaTrigger',
							error: 'Invalid or missing event type',
							timestamp: new Date().toISOString(),
							receivedEvent: eventType,
						},
					]),
				],
				webhookResponse: {
					status: 400,
					body: { error: 'Invalid or missing event type' },
				},
			};
		}

		// Build output data from webhook payload
		const outputData: IDataObject = {
			source: 'Arca',
			node: 'ArcaTrigger',
			event: eventType,
			timestamp: bodyData.timestamp || new Date().toISOString(),
			workspace: bodyData.workspace,
			user: bodyData.user,
			before: bodyData.before,
			after: bodyData.after,
		};

		return {
			workflowData: [this.helpers.returnJsonArray([outputData])],
			webhookResponse: {
				status: 200,
				body: {
					message: 'Arca webhook received successfully',
					event: eventType,
					processed: true,
				},
			},
		};
	}
}
