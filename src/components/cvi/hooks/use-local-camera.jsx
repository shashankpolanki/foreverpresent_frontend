import { useCallback, useMemo } from 'react';
import { useDaily, useDevices, useLocalSessionId, useVideoTrack } from '@daily-co/daily-react';

export const useLocalCamera = () => {
	const daily = useDaily();
	const localSessionId = useLocalSessionId();
	const { isOff: isCamMuted } = useVideoTrack(localSessionId);
	const { camState } = useDevices();
	const isCamReady = useMemo(() => camState === 'granted', [camState]);

	const onToggleCamera = useCallback(async () => {
		if (!daily) return;

		// If camera is currently off (muted) and we're about to turn it on
		if (isCamMuted) {
			try {
				console.log('Camera is OFF, attempting to turn ON...');
				console.log('Current camState:', camState);

				const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

				// Always update input settings to reinitialize camera
				// This is needed because setLocalVideo(false) stops the track
				console.log('Updating Daily input settings to enable camera...');

				// Build inputSettings - Safari doesn't support background-blur
				const inputSettings = {};
				if (!isSafari) {
					inputSettings.video = {
						processor: {
							type: 'background-blur'
						}
					};
				}

				await daily.updateInputSettings(inputSettings);

				// Enable local video
				await daily.setLocalVideo(true);

				console.log('Camera enabled successfully');

			} catch (err) {
				console.error('Failed to enable camera:', err);

				// If it failed, might need permission - try requesting it
				if (camState !== 'granted') {
					try {
						console.log('Requesting camera permission via getUserMedia...');
						const videoStream = await navigator.mediaDevices.getUserMedia({
							video: true,
							audio: false
						});

						console.log('Camera permission granted, retrying...');
						videoStream.getTracks().forEach(track => track.stop());

						// Retry enabling camera
						const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
						const inputSettings = {};
						if (!isSafari) {
							inputSettings.video = {
								processor: {
									type: 'background-blur'
								}
							};
						}
						await daily.updateInputSettings(inputSettings);
						await daily.setLocalVideo(true);

						console.log('Camera enabled successfully after permission request');
					} catch (retryErr) {
						console.error('Failed to enable camera after permission request:', retryErr);
						alert('Camera permission denied or failed to enable. Please check your browser settings.');
					}
				} else {
					alert('Failed to enable camera. Please try again.');
				}
			}
		} else {
			// Camera is ON, turn it OFF
			console.log('Camera is ON, turning OFF...');
			daily.setLocalVideo(false);
		}
	}, [daily, isCamMuted, camState]);

	return {
		isCamReady,
		isCamMuted,
		localSessionId,
		onToggleCamera,
	};
};
