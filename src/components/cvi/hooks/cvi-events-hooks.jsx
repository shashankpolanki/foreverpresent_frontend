import { useCallback } from 'react';
import { useAppMessage, useDailyEvent } from '@daily-co/daily-react';

export function useObservableEvent(callback) {
	return useDailyEvent(
		'app-message',
		useCallback(
			(event) => {
				callback(event.data);
			},
			[callback]
		)
	);
}

export function useSendAppMessage() {
	const sendAppMessage = useAppMessage();

	return useCallback(
		(message) => {
			sendAppMessage(message, '*');
		},
		[sendAppMessage]
	);
}
