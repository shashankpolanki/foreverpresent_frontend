import { useCallback } from 'react';
import { useDaily } from '@daily-co/daily-react';

export const useCVICall = () => {
	const daily = useDaily();

	const joinCall = useCallback(
		({ url }) => {
			// Ensure HTTPS for proper WebRTC
			const secureUrl = url?.replace(/^http:/, 'https:');

			// Join synchronously - Daily handles the promise internally
			daily?.join({
				url: secureUrl,
				inputSettings: {
					audio: {
						processor: {
							type: 'noise-cancellation',
						},
					},
				},
			});
		},
		[daily]
	);

	const leaveCall = useCallback(() => {
		daily?.leave();
	}, [daily]);

	return { joinCall, leaveCall };
};
